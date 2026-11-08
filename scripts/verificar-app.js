// Portão de navegador do protótipo: executa os RF da spec do Astrea navegável
// em cada página de prototipo/, sem janela, e imprime uma linha por requisito.
//
// Uso, na raiz do repositório:
//   node scripts/verificar-app.js [--rf RF-01,RF-03] [--paginas a.html,b.html]
//     [--exceto a.html] [--grupos acoes,dados] [--lista] [--fumaca]
// Sai com 0 sem falha e com 1 com falha ou argumento fora do contrato.
//
// Playwright: mesma regra de scripts/exportar-slides.js.
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');

const raiz = path.resolve(__dirname, '..');
const PROTOTIPO = path.join(raiz, 'prototipo');
const VIEWPORT = { width: 1440, height: 900 };
const LARGURAS_ESTREITAS = [1024, 700];
const TEMPO_MS = 4000;
const MAX_MOTIVOS = 10;
const CAMADAS = '[role="dialog"]:visible, [role="alertdialog"]:visible';
const CONTROLE_NATIVO = ['select', 'input[type=date]', 'input[type=datetime-local]', 'input[type=month]',
  'input[type=week]', 'input[type=time]', 'input[type=checkbox]', 'input[type=radio]']
  .map((s) => s + ':visible').join(', ');
// Estados além da abertura simples, medidos por RF-07 e pelo contraste de RF-12.
const VARIANTES = {
  'agenda.html': ['?estado=vazio'],
  'contatos.html': ['?ficha=1', '?adicionar=1'],
  'processos.html': ['?ficha=1'],
};
const ABRE_PAINEL = ['[data-abre-painel]', '[data-acao="criar-atividade"]', '[data-acao="nova-etiqueta"]']
  .map((s) => s + ':visible').join(', ');
// Página cujo item ativo do menu é de outro módulo.
const MODULO_DA_PAGINA = { 'buscas.html': 'processos.html' };
const CONTROLES = 'a[href], button, input:not([type=hidden]), select, textarea, summary, [tabindex], '
  + '[contenteditable="true"], [role="button"], [role="link"], [role="radio"], [role="checkbox"], '
  + '[role="switch"], [role="tab"], [role="combobox"]';
const NOME_ETIQUETA = 'Etiqueta de verificação';

const PAGINAS = ['kanban.html', 'design-system.html', 'area-de-trabalho.html', 'agenda.html',
  'contatos.html', 'atendimentos.html', 'processos.html', 'publicacoes.html', 'financeiro.html',
  'documentos.html', 'indicadores.html', 'alertas.html', 'suporte.html', 'ias.html',
  'administracao.html', 'buscas.html'];

const CATALOGO = {
  fundamentos: ['cor', 'tipografia', 'espaco', 'raio', 'sombra', 'foco', 'icones', 'densidade', 'tema'],
  acoes: ['botao-primario', 'botao-secundario', 'botao-texto', 'botao-icone', 'botao-destrutivo',
    'grupo-botoes', 'menu-acoes'],
  formulario: ['campo', 'area-texto', 'busca', 'seletor', 'seletor-multiplo', 'seletor-pessoas',
    'data', 'periodo', 'caixa', 'radio', 'chave'],
  feedback: ['toast', 'faixa-aviso', 'dialogo', 'tooltip', 'progresso', 'skeleton', 'estado-vazio', 'upsell'],
  dados: ['tag', 'chip-filtro', 'chip-prazo', 'selo', 'avatar', 'tabela', 'linha-atividade',
    'card-atividade', 'card-contato', 'paginacao'],
  navegacao: ['navbar', 'sidebar-expandida', 'sidebar-recolhida', 'abas', 'trilha', 'barra-filtros',
    'painel-lateral', 'barra-acoes', 'stepper'],
};
const ESTADOS = ['default', 'hover', 'active', 'foco', 'disabled', 'erro', 'carregando', 'vazio'];

// --- argumentos -------------------------------------------------------------

function listaValidada(flag, valor, permitidos) {
  if (valor === undefined || valor.startsWith('--')) throw new Error(`${flag} sem valor`);
  const itens = valor.split(',').map((s) => s.trim()).filter(Boolean);
  const desconhecido = itens.find((i) => !permitidos.includes(i));
  if (desconhecido) throw new Error(`${flag}: valor desconhecido "${desconhecido}"`);
  return itens;
}

function lerArgumentos(argv) {
  const opcoes = { rf: null, paginas: null, exceto: [], grupos: null, lista: false, fumaca: false };
  const comValor = {
    '--rf': ['rf', Object.keys(VERIFICACOES)],
    '--paginas': ['paginas', PAGINAS],
    '--exceto': ['exceto', PAGINAS],
    '--grupos': ['grupos', Object.keys(CATALOGO)],
  };
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    if (flag === '--lista') opcoes.lista = true;
    else if (flag === '--fumaca') opcoes.fumaca = true;
    else if (comValor[flag]) {
      const [campo, permitidos] = comValor[flag];
      opcoes[campo] = listaValidada(flag, argv[++i], permitidos);
    } else throw new Error(`argumento desconhecido "${flag}"`);
  }
  return opcoes;
}

function paginasDe(opcoes) {
  const fora = new Set(opcoes.exceto);
  const todas = PAGINAS.filter((p) => !fora.has(p));
  const restritas = opcoes.paginas ? todas.filter((p) => opcoes.paginas.includes(p)) : todas;
  return { todas, restritas, fora };
}

// --- apoio ------------------------------------------------------------------

function exigir(condicao, motivo) {
  if (!condicao) throw new Error(motivo);
}

function primeiraLinha(erro) {
  return String(erro && erro.message || erro).split('\n')[0];
}

async function passo(falhas, rotulo, fn) {
  try {
    await fn();
  } catch (erro) {
    falhas.push(`${rotulo}: ${primeiraLinha(erro)}`);
  }
}

function arquivoDe(href) {
  const caminho = (href || '').split(/[?#]/)[0];
  return caminho.endsWith('.html') ? path.posix.basename(caminho) : null;
}

function urlDe(alvo) {
  const [arquivo, query] = alvo.split('?');
  const local = path.join(PROTOTIPO, arquivo);
  exigir(fs.existsSync(local), 'arquivo ausente');
  return pathToFileURL(local).href + (query ? '?' + query : '');
}

async function abrir(page, alvo) {
  await page.goto(urlDe(alvo));
  await page.evaluate(() => document.fonts.ready.then(() => true));
}

async function novaSessao(browser) {
  const contexto = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  contexto.setDefaultTimeout(TEMPO_MS);
  contexto.setDefaultNavigationTimeout(TEMPO_MS);
  const erros = [];
  const nomeDe = (p) => (p ? path.posix.basename(new URL(p.url()).pathname) : '?');
  contexto.on('console', (m) => {
    if (m.type() === 'error') erros.push(`${nomeDe(m.page())}: console.error: ${m.text().slice(0, 160)}`);
  });
  contexto.on('weberror', (e) => erros.push(`${nomeDe(e.page())}: pageerror: ${primeiraLinha(e.error())}`));
  return { contexto, page: await contexto.newPage(), erros };
}

function relatar(rf, falhas) {
  if (!falhas.length) {
    console.log(`${rf} ok`);
    return;
  }
  const motivos = falhas.slice(0, MAX_MOTIVOS).join('; ');
  const resto = falhas.length > MAX_MOTIVOS ? ` (+${falhas.length - MAX_MOTIVOS})` : '';
  console.log(`${rf} FALHOU: ${motivos}${resto}`);
}

function exigirPaginas(paginas) {
  exigir(paginas.length > 0, 'nenhuma página a verificar');
}

function fechada(page) {
  return page.locator(CAMADAS).first().waitFor({ state: 'hidden' });
}

function aberta(page) {
  return page.locator(CAMADAS).first().waitFor({ state: 'visible' });
}

async function contarCamadas(page) {
  return page.locator(CAMADAS).count();
}

// Mede a página aberta, cada variante de URL e cada painel aberto nelas.
async function emCadaEstado(page, nome, medir) {
  for (const alvo of [nome, ...(VARIANTES[nome] || []).map((q) => nome + q)]) {
    await abrir(page, alvo);
    await medir(alvo);
    const total = await page.locator(ABRE_PAINEL).count();
    for (let i = 0; i < total; i++) {
      await abrir(page, alvo);
      await page.locator(ABRE_PAINEL).nth(i).click();
      await aberta(page);
      await medir(`${alvo}, painel ${i + 1}`);
    }
  }
}

// --- RF-01, RF-03, RF-04, RF-05: moldura ------------------------------------

async function clicarItemMenu(page, nome, i, fora) {
  await abrir(page, nome);
  const link = page.locator('.menu-lateral a').nth(i);
  const href = await link.getAttribute('href');
  const alvo = arquivoDe(href);
  exigir(alvo, `href sem arquivo ("${href}")`);
  if (fora.has(alvo)) return;
  exigir(fs.existsSync(path.join(PROTOTIPO, alvo)), `destino ${alvo} ausente`);
  await link.click();
  await page.waitForURL((u) => path.posix.basename(u.pathname) === alvo)
    .catch(() => { throw new Error(`clique em ${alvo} abriu ${page.url()}`); });
  const h1 = await page.locator('h1').count();
  exigir(h1 > 0, `${alvo} sem h1`);
}

async function rf01({ page }, { todas, fora }, falhas) {
  exigirPaginas(todas);
  for (const nome of todas) {
    await passo(falhas, nome, async () => {
      await abrir(page, nome);
      const total = await page.locator('.menu-lateral a').count();
      exigir(total > 0, 'menu sem itens');
      for (let i = 0; i < total; i++) {
        await passo(falhas, `${nome}, item ${i + 1}`, () => clicarItemMenu(page, nome, i, fora));
      }
    });
  }
}

async function caixa(page, seletor) {
  const box = await page.locator(seletor).first().boundingBox();
  exigir(box, `${seletor} ausente ou invisível`);
  return ['x', 'y', 'width', 'height'].map((k) => box[k].toFixed(2)).join(' ');
}

async function rf03({ page }, { todas }, falhas) {
  exigirPaginas(todas);
  const referencia = {};
  for (const nome of todas) {
    await passo(falhas, nome, async () => {
      await abrir(page, nome);
      for (const seletor of ['.cabecalho', '.menu-lateral']) {
        const medida = await caixa(page, seletor);
        referencia[seletor] = referencia[seletor] || { nome, medida };
        const base = referencia[seletor];
        exigir(medida === base.medida, `${seletor} em ${medida}, e ${base.nome} em ${base.medida}`);
      }
    });
  }
}

function fundo(locator) {
  return locator.first().evaluate((el) => getComputedStyle(el).backgroundColor);
}

async function checarItemAtivo(page, nome) {
  await abrir(page, nome);
  await page.mouse.move(VIEWPORT.width - 1, VIEWPORT.height - 1);
  const ativos = page.locator('.menu-lateral a[aria-current="page"]');
  const total = await ativos.count();
  if (nome === 'administracao.html') {
    exigir(total === 0, `${total} item(ns) do menu lateral com aria-current="page"`);
    const noUsuario = await page.locator('.cabecalho [aria-current="page"]').count();
    exigir(noUsuario > 0, 'sem [aria-current="page"] no menu do usuário (.cabecalho)');
    return;
  }
  exigir(total === 1, `${total} itens com aria-current="page"`);
  const modulo = MODULO_DA_PAGINA[nome] || nome;
  const alvoAtivo = arquivoDe(await ativos.first().getAttribute('href'));
  exigir(alvoAtivo === modulo, `item ativo aponta para ${alvoAtivo}, esperado ${modulo}`);
  const inativos = page.locator('.menu-lateral a:not([aria-current])');
  exigir(await inativos.count() > 0, 'menu sem item inativo para comparar');
  const [corAtivo, corInativo] = [await fundo(ativos), await fundo(inativos)];
  exigir(corAtivo !== corInativo, `fundo do item ativo igual ao inativo (${corAtivo})`);
}

async function rf04({ page }, { todas }, falhas) {
  exigirPaginas(todas);
  for (const nome of todas) await passo(falhas, nome, () => checarItemAtivo(page, nome));
}

const temaDe = (page) => page.locator('html').getAttribute('data-tema');
const menuDe = (page) => page.locator('body').getAttribute('data-menu');

async function rf05({ page }, { todas }, falhas) {
  exigirPaginas(todas);
  const [inicio, ...resto] = todas;
  await abrir(page, inicio);
  const antes = await temaDe(page);
  await page.click('#alternar-tema');
  await page.click('#recolher-menu');
  const tema = await temaDe(page);
  exigir(tema && tema !== antes, `#alternar-tema não mudou html[data-tema] (${antes} -> ${tema})`);
  for (const nome of [...resto, inicio]) {
    await passo(falhas, nome, async () => {
      await abrir(page, nome);
      const atual = await temaDe(page);
      exigir(atual === tema, `html[data-tema] é ${atual}, esperado ${tema}`);
      const menu = await menuDe(page);
      exigir(menu === 'recolhido', `body[data-menu] é ${menu}, esperado recolhido`);
    });
  }
}

// --- RF-06, RF-07: design system e controle nativo --------------------------

// Executa no navegador.
function auditarCatalogo({ catalogo, estados }) {
  const problemas = [];
  const temMotivo = (el) => (el.textContent.trim() || el.getAttribute('data-motivo') || '').length > 0;
  const auditarEstado = (id, peca, estado) => {
    if (peca.querySelector(`[data-estado="${estado}"]`)) return;
    const ausente = peca.querySelector(`[data-ausente="${estado}"]`);
    if (!ausente) problemas.push(`${id}: estado ${estado} sem data-estado nem data-ausente`);
    else if (!temMotivo(ausente)) problemas.push(`${id}: data-ausente="${estado}" sem motivo`);
  };
  for (const [grupo, ids] of Object.entries(catalogo)) {
    for (const id of ids) {
      const peca = document.querySelector(`[data-ds="${id}"]`);
      if (!peca) problemas.push(`${grupo}: falta [data-ds="${id}"]`);
      else if (grupo !== 'fundamentos') estados.forEach((e) => auditarEstado(id, peca, e));
    }
  }
  return problemas;
}

async function rf06({ page }, { todas, opcoes }, falhas) {
  exigirPaginas(todas.filter((p) => p === 'design-system.html'));
  const grupos = opcoes.grupos || Object.keys(CATALOGO);
  const catalogo = Object.fromEntries(grupos.map((g) => [g, CATALOGO[g]]));
  await abrir(page, 'design-system.html');
  falhas.push(...await page.evaluate(auditarCatalogo, { catalogo, estados: ESTADOS }));
}

async function rf07({ page }, { restritas }, falhas) {
  const paginas = restritas.filter((p) => p !== 'kanban.html');
  exigirPaginas(paginas);
  for (const nome of paginas) {
    await passo(falhas, nome, () => emCadaEstado(page, nome, async (estado) => {
      const total = await page.locator(CONTROLE_NATIVO).count();
      if (total > 0) falhas.push(`${estado}: ${total} controle(s) nativo(s) visível(is)`);
    }));
  }
}

// --- RF-08 a RF-11: telas ---------------------------------------------------

async function checarSecoes(page) {
  const [atrasadas, hoje] = await Promise.all(['atrasadas', 'hoje']
    .map((s) => page.locator(`[data-secao="${s}"]`).first().boundingBox()));
  exigir(atrasadas && hoje, 'seções atrasadas e hoje precisam estar visíveis');
  exigir(atrasadas.y < hoje.y, 'atrasadas não está acima de hoje');
}

async function checarChipPrazo(page) {
  const chip = page.locator('.chip-prazo:visible').first();
  const texto = (await chip.innerText()).trim();
  exigir(texto, '.chip-prazo sem texto');
  const temCorPropria = await chip.evaluate((el) => {
    const proprio = getComputedStyle(el);
    const semFundo = ['transparent', 'rgba(0, 0, 0, 0)'].includes(proprio.backgroundColor);
    return !semFundo || proprio.color !== getComputedStyle(el.parentElement).color;
  });
  exigir(temCorPropria, '.chip-prazo sem cor própria');
}

async function trocarSeletor(page, seletor) {
  const raizSeletor = page.locator(seletor).first();
  const atual = await raizSeletor.getAttribute('data-valor');
  const gatilho = raizSeletor.locator('button, [role="combobox"]').first();
  await (await gatilho.count() ? gatilho : raizSeletor).click();
  await page.locator('[role="option"]:not([aria-selected="true"]):visible').first().click();
  const novo = await raizSeletor.getAttribute('data-valor');
  exigir(novo && novo !== atual, `${seletor}: data-valor não mudou (${atual} -> ${novo})`);
  return novo;
}

async function checarFiltroPersiste(page, fora) {
  const seletor = '[data-filtro="situacao"]';
  await abrir(page, 'area-de-trabalho.html');
  const valor = await trocarSeletor(page, seletor);
  if (fora.has('processos.html')) return;
  await abrir(page, 'processos.html');
  await abrir(page, 'area-de-trabalho.html');
  const voltou = await page.locator(seletor).first().getAttribute('data-valor');
  exigir(voltou === valor, `filtro voltou como ${voltou}, esperado ${valor}`);
}

async function rf08({ page }, { todas, fora }, falhas) {
  exigirPaginas(todas.filter((p) => p === 'area-de-trabalho.html'));
  await abrir(page, 'area-de-trabalho.html');
  await passo(falhas, 'seções', () => checarSecoes(page));
  await passo(falhas, 'prazos', async () => {
    const total = await page.locator('[data-area-principal] [data-tipo="prazo"]').count();
    exigir(total > 0, 'nenhum [data-tipo="prazo"] na área principal');
  });
  await passo(falhas, 'chip', () => checarChipPrazo(page));
  await passo(falhas, 'copiar', async () => {
    exigir(await page.locator('[data-acao="copiar-numero"]').count() > 0, 'falta [data-acao="copiar-numero"]');
  });
  await passo(falhas, 'filtro', () => checarFiltroPersiste(page, fora));
}

function hojeIso() {
  const agora = new Date();
  const doisDigitos = (n) => String(n).padStart(2, '0');
  return `${agora.getFullYear()}-${doisDigitos(agora.getMonth() + 1)}-${doisDigitos(agora.getDate())}`;
}

// A base da grade sai do descendente mais baixo, para pegar a última linha
// mesmo quando a grade rola por dentro.
function baseDaGrade(grade) {
  const bases = [...grade.querySelectorAll('*')].map((el) => el.getBoundingClientRect())
    .filter((r) => r.width > 0 && r.height > 0).map((r) => r.bottom);
  return Math.max(grade.getBoundingClientRect().bottom, ...bases);
}

async function rf09({ page }, { todas }, falhas) {
  exigirPaginas(todas.filter((p) => p === 'agenda.html'));
  await passo(falhas, 'hoje', async () => {
    await abrir(page, 'agenda.html');
    const data = await page.locator('[data-agenda-data]').first().getAttribute('data-agenda-data');
    exigir(data === hojeIso(), `data-agenda-data é ${data}, esperado ${hojeIso()}`);
  });
  await passo(falhas, 'vazio', async () => {
    await abrir(page, 'agenda.html?estado=vazio');
    exigir(await page.locator('.grade-agenda').first().isVisible(), '.grade-agenda não visível');
  });
  await passo(falhas, 'mês', async () => {
    await abrir(page, 'agenda.html');
    await page.click('[data-visao="mes"]');
    const base = await page.locator('.grade-agenda').first().evaluate(baseDaGrade);
    exigir(base <= VIEWPORT.height, `última linha termina em ${Math.round(base)}px`);
  });
}

async function abrirCriarAtividade(page) {
  await page.click('[data-acao="criar-atividade"]');
  await aberta(page);
  const camadas = await contarCamadas(page);
  exigir(camadas === 1, `${camadas} camadas ao abrir o painel`);
}

async function rf10({ page }, { todas }, falhas) {
  exigirPaginas(todas.filter((p) => p === 'agenda.html'));
  await abrir(page, 'agenda.html');
  await passo(falhas, 'abrir e fechar', async () => {
    await abrirCriarAtividade(page);
    await page.click('[data-acao="fechar-painel"]');
    await fechada(page);
    exigir(await contarCamadas(page) === 0, 'fechar abriu nova camada');
  });
  await passo(falhas, 'data passada', async () => {
    await abrir(page, 'agenda.html');
    await abrirCriarAtividade(page);
    const dialogo = page.locator(CAMADAS).first();
    await dialogo.locator('input[data-campo="data"], [data-campo="data"] input').first().fill('01/01/2020');
    await page.keyboard.press('Tab');
    await dialogo.locator('[data-aviso="data-passada"]').first().waitFor({ state: 'visible' });
    const camadas = await contarCamadas(page);
    exigir(camadas === 1, `${camadas} camadas com o aviso de data`);
  });
}

async function checarVisaoLembrada(page) {
  await abrir(page, 'contatos.html');
  await page.click('[data-visao="cards"]');
  await page.reload();
  const marcada = await page.locator('[data-visao="cards"]').first().evaluate((el) =>
    ['aria-pressed', 'aria-selected', 'aria-checked', 'aria-current'].some((a) => {
      const valor = el.getAttribute(a);
      return valor !== null && valor !== 'false';
    }));
  exigir(marcada, '[data-visao="cards"] não aparece escolhida depois de recarregar');
}

async function checarLeituraSemVazio(page) {
  await abrir(page, 'contatos.html?ficha=1');
  exigir(await page.locator('[data-campo-leitura]').count() > 0, 'ficha sem [data-campo-leitura]');
  const vazios = await page.locator('[data-campo-leitura=""]:visible').count();
  exigir(vazios === 0, `${vazios} campo(s) vazio(s) visível(is)`);
}

async function checarBarraFixa(page) {
  await abrir(page, 'contatos.html?adicionar=1');
  const posicao = await page.locator('.barra-acoes').first().evaluate((el) => getComputedStyle(el).position);
  exigir(['sticky', 'fixed'].includes(posicao), `.barra-acoes com position ${posicao}`);
}

async function confirmarPainel(page) {
  await page.keyboard.press('Enter');
  const fechou = await page.locator(CAMADAS).first().waitFor({ state: 'hidden', timeout: 800 })
    .then(() => true, () => false);
  if (fechou) return;
  await page.locator(CAMADAS).first().getByRole('button', { name: /salvar|criar|adicionar|confirmar/i }).first().click();
  await fechada(page);
}

async function checarNovaEtiqueta(page) {
  await abrir(page, 'contatos.html?adicionar=1');
  const url = page.url();
  await page.click('[data-acao="nova-etiqueta"]');
  await aberta(page);
  await page.locator(CAMADAS).first().locator('input:not([type]), input[type=text]').first().fill(NOME_ETIQUETA);
  await confirmarPainel(page);
  await page.getByText(NOME_ETIQUETA).first().waitFor({ state: 'visible' });
  exigir(page.url() === url, `a URL mudou para ${page.url()}`);
}

async function rf11({ page }, { todas }, falhas) {
  exigirPaginas(todas.filter((p) => p === 'contatos.html'));
  await passo(falhas, 'visão', () => checarVisaoLembrada(page));
  await passo(falhas, 'ficha', () => checarLeituraSemVazio(page));
  await passo(falhas, 'adicionar', () => checarBarraFixa(page));
  await passo(falhas, 'etiqueta', () => checarNovaEtiqueta(page));
}

// --- RF-12: teclado e contraste ---------------------------------------------

// Executa no navegador. Devolve os controles visíveis que ainda não receberam foco.
function controlesSemFoco(seletor) {
  const visivel = (el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && el.checkVisibility({ visibilityProperty: true }) && !el.closest('[inert]');
  };
  const rotulo = (el) => {
    const nome = el.getAttribute('aria-label') || el.textContent.trim().slice(0, 30);
    return `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''} "${nome}"`;
  };
  const faltam = [...document.querySelectorAll(seletor)]
    .filter((el) => el.getAttribute('tabindex') !== '-1' && !el.matches(':disabled') && visivel(el))
    .filter((el) => !window.__focados.has(el));
  return { faltam: faltam.map(rotulo), noBody: document.activeElement === document.body };
}

async function checarTab(page, nome, falhas) {
  await abrir(page, nome);
  await page.evaluate(() => {
    window.__focados = new Set();
    document.addEventListener('focusin', (e) => window.__focados.add(e.target), true);
  });
  let estado = await page.evaluate(controlesSemFoco, CONTROLES);
  const limite = estado.faltam.length * 2 + 20;
  for (let i = 0; i < limite && estado.faltam.length; i++) {
    await page.keyboard.press('Tab');
    estado = await page.evaluate(controlesSemFoco, CONTROLES);
    if (estado.noBody) break;
  }
  for (const controle of estado.faltam) falhas.push(`${nome}: Tab não alcança ${controle}`);
}

async function checarPaineis(page, nome) {
  await abrir(page, nome);
  const origens = page.locator('[data-abre-painel]');
  const total = await origens.count();
  let abertos = 0;
  for (let i = 0; i < total; i++) {
    const origem = origens.nth(i);
    if (!await origem.isVisible()) continue;
    abertos++;
    await origem.click();
    await aberta(page);
    await page.keyboard.press('Escape');
    await fechada(page);
    const focada = await origem.evaluate((el) => el === document.activeElement);
    exigir(focada, `painel ${i + 1}: o foco não voltou à origem`);
  }
  return abertos;
}

// Executa no navegador. Fundo com imagem ou gradiente fica sem medir: a cor
// resultante depende do pixel. Cor em formato desconhecido vira problema.
function medirContraste() {
  const paraRgba = (css) => {
    const rgb = css.match(/^rgba?\(([\d.]+)[, ]+([\d.]+)[, ]+([\d.]+)(?:[,/ ]+([\d.]+))?\)$/);
    if (rgb) return { r: +rgb[1], g: +rgb[2], b: +rgb[3], a: rgb[4] === undefined ? 1 : +rgb[4] };
    const srgb = css.match(/^color\(srgb ([\d.]+) ([\d.]+) ([\d.]+)(?: \/ ([\d.]+))?\)$/);
    if (srgb) return { r: srgb[1] * 255, g: srgb[2] * 255, b: srgb[3] * 255, a: srgb[4] === undefined ? 1 : +srgb[4] };
    throw new Error(`cor não interpretada: ${css}`);
  };
  const sobre = (cima, baixo) => {
    const mistura = (c) => cima[c] * cima.a + baixo[c] * (1 - cima.a);
    return { r: mistura('r'), g: mistura('g'), b: mistura('b'), a: 1 };
  };
  const canal = (v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const luminancia = (c) => 0.2126 * canal(c.r) + 0.7152 * canal(c.g) + 0.0722 * canal(c.b);
  const razao = (a, b) => {
    const [claro, escuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
    return (claro + 0.05) / (escuro + 0.05);
  };
  const fundoEfetivo = (el) => {
    const camadas = [];
    for (let no = el; no; no = no.parentElement) {
      const estilo = getComputedStyle(no);
      if (estilo.backgroundImage !== 'none') return null;
      const cor = paraRgba(estilo.backgroundColor);
      if (cor.a > 0) camadas.push(cor);
      if (cor.a === 1) break;
    }
    return camadas.reverse().reduce((base, cor) => sobre(cor, base), { r: 255, g: 255, b: 255, a: 1 });
  };
  const opacidade = (el) => {
    let total = 1;
    for (let no = el; no; no = no.parentElement) total *= parseFloat(getComputedStyle(no).opacity);
    return total;
  };
  const medivel = (el) => {
    const r = el.getBoundingClientRect();
    return r.width > 1 && r.height > 1 && el.checkVisibility({ visibilityProperty: true })
      && !el.closest(':disabled, [aria-disabled="true"], [data-estado="disabled"]');
  };
  const avaliar = (el, achados) => {
    const estilo = getComputedStyle(el);
    const fundo = fundoEfetivo(el);
    const cor = paraRgba(estilo.color);
    const alfa = cor.a * opacidade(el);
    if (!fundo || alfa === 0) return;
    const tamanho = parseFloat(estilo.fontSize);
    const grande = tamanho >= 24 || (tamanho >= 18.66 && parseInt(estilo.fontWeight, 10) >= 700);
    const valor = razao(sobre({ ...cor, a: alfa }, fundo), fundo);
    if (valor < (grande ? 3 : 4.5)) achados.set(`${estilo.color}|${estilo.backgroundColor}|${grande}`,
      `"${el.textContent.trim().slice(0, 30)}" com ${valor.toFixed(2)}`);
  };
  const achados = new Map();
  const percurso = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (percurso.nextNode()) {
    const el = percurso.currentNode.parentElement;
    if (percurso.currentNode.textContent.trim() && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(el.tagName) && medivel(el)) {
      avaliar(el, achados);
    }
  }
  return [...achados.values()];
}

async function checarContraste(page, nome, falhas) {
  const medirNoTema = (tema) => async (estado) => {
    const atual = await temaDe(page);
    exigir(atual === tema, `${estado}: tema ${atual}, esperado ${tema}`);
    await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}' });
    for (const achado of await page.evaluate(medirContraste)) falhas.push(`${estado} [${tema || 'padrão'}]: ${achado}`);
  };
  await abrir(page, nome);
  const antes = await temaDe(page);
  await emCadaEstado(page, nome, medirNoTema(antes));
  await abrir(page, nome);
  await page.click('#alternar-tema');
  const depois = await temaDe(page);
  exigir(depois !== antes, '#alternar-tema não mudou o tema');
  await emCadaEstado(page, nome, medirNoTema(depois));
}

async function rf12({ page }, { restritas, opcoes }, falhas) {
  exigirPaginas(restritas);
  let paineis = 0;
  for (const nome of restritas) {
    await passo(falhas, `${nome} Tab`, () => checarTab(page, nome, falhas));
    await passo(falhas, `${nome} painéis`, async () => { paineis += await checarPaineis(page, nome); });
    await passo(falhas, `${nome} contraste`, () => checarContraste(page, nome, falhas));
  }
  if (!opcoes.paginas) exigir(paineis > 0, 'nenhum [data-abre-painel] visível em página alguma');
}

// --- RF-15: largura ---------------------------------------------------------

async function rf15({ page }, { restritas }, falhas) {
  exigirPaginas(restritas);
  for (const largura of LARGURAS_ESTREITAS) {
    await page.setViewportSize({ width: largura, height: VIEWPORT.height });
    for (const nome of restritas) {
      await passo(falhas, `${nome} em ${largura}`, async () => {
        await abrir(page, nome);
        const { rolagem, cliente } = await page.evaluate(() => ({
          rolagem: document.documentElement.scrollWidth,
          cliente: document.documentElement.clientWidth,
        }));
        exigir(rolagem <= cliente, `scrollWidth ${rolagem} maior que clientWidth ${cliente}`);
      });
    }
  }
}

// --- execução ---------------------------------------------------------------

const VERIFICACOES = {
  'RF-01': rf01, 'RF-03': rf03, 'RF-04': rf04, 'RF-05': rf05, 'RF-06': rf06, 'RF-07': rf07,
  'RF-08': rf08, 'RF-09': rf09, 'RF-10': rf10, 'RF-11': rf11, 'RF-12': rf12, 'RF-15': rf15,
};

async function executarRf(browser, rf, contexto) {
  const sessao = await novaSessao(browser);
  const falhas = [];
  await passo(falhas, 'execução', () => VERIFICACOES[rf](sessao, contexto, falhas));
  await sessao.contexto.close();
  falhas.push(...new Set(sessao.erros));
  relatar(rf, falhas);
  return falhas.length === 0;
}

async function fumaca(browser) {
  const sessao = await novaSessao(browser);
  const falhas = [];
  await passo(falhas, 'kanban.html', () => abrir(sessao.page, 'kanban.html'));
  await sessao.contexto.close();
  falhas.push(...new Set(sessao.erros));
  console.log(falhas.length ? `fumaca FALHOU: ${falhas.join('; ')}` : 'fumaca ok');
  return falhas.length === 0;
}

async function principal() {
  const opcoes = lerArgumentos(process.argv.slice(2));
  if (opcoes.lista) {
    Object.keys(VERIFICACOES).forEach((rf) => console.log(rf));
    return true;
  }
  const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    if (opcoes.fumaca) return await fumaca(browser);
    const contexto = { ...paginasDe(opcoes), opcoes };
    let tudoOk = true;
    for (const rf of opcoes.rf || Object.keys(VERIFICACOES)) {
      tudoOk = await executarRf(browser, rf, contexto) && tudoOk;
    }
    return tudoOk;
  } finally {
    await browser.close();
  }
}

principal().then(
  (ok) => { process.exitCode = ok ? 0 : 1; },
  (erro) => { console.error(primeiraLinha(erro)); process.exitCode = 1; },
);
