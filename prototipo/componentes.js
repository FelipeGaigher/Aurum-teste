// Componentes do design system. Só a trilha depende da moldura, para sair da
// mesma função que monta a do cabeçalho; as outras peças valem sem cabeçalho e
// sem menu. Entrada fora do contrato vira erro nomeado.
(function () {
  const ICONES = {
    mais: '<path d="M12 5v14M5 12h14"/>',
    seta: '<path d="M8 10l4 4 4-4"/>',
    editar: '<path d="M4 20h4L19 9l-4-4L4 16zM13 7l4 4"/>',
    copiar: '<rect x="9" y="9" width="11" height="11" rx="1"/><path d="M5 15H4V4h11v1"/>',
    arquivar: '<path d="M3 5h18v4H3zM5 9v10h14V9M10 13h4"/>',
    lixeira: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5"/>',
    opcoes: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    fechar: '<path d="M6 6l12 12M18 6L6 18"/>',
    busca: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    calendario: '<rect x="4" y="5" width="16" height="15" rx="1"/><path d="M4 10h16M8 3v4M16 3v4"/>',
    marca: '<path d="M5 12l5 5 9-10"/>',
    menos: '<path d="M6 12h12"/>',
    esquerda: '<path d="M14 8l-4 4 4 4"/>',
    direita: '<path d="M10 8l4 4-4 4"/>',
    alerta: '<path d="M12 4 3 20h18zM12 10v4M12 17h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    relogio: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
    cadeado: '<rect x="5" y="11" width="14" height="9" rx="1"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  };
  const GIRO = '<circle cx="12" cy="12" r="9" stroke-dasharray="42 15"/>';

  const VARIANTES = ['primario', 'secundario', 'texto', 'icone', 'destrutivo'];
  const TAMANHOS = ['medio', 'pequeno'];
  const VARIANTES_DO_CANCELAR = ['secundario', 'texto'];

  let proximoId = 0;

  function exigir(condicao, peca, motivo) {
    if (!condicao) throw new Error(`DS.${peca}: ${motivo}`);
  }

  function svg(conteudo, classe) {
    const modelo = document.createElement('template');
    modelo.innerHTML = `<svg class="${classe}" viewBox="0 0 24 24" aria-hidden="true">${conteudo}</svg>`;
    return modelo.content.firstElementChild;
  }

  function icone(nome) {
    exigir(ICONES[nome], 'icone', `ícone desconhecido "${nome}"`);
    return svg(ICONES[nome], 'icone');
  }

  function bloquearClique(evento) {
    evento.preventDefault();
    evento.stopImmediatePropagation();
  }

  function validarBotao({ variante, tamanho, iconeEsquerda, rotulo }) {
    exigir(VARIANTES.includes(variante), 'botao', `variante desconhecida "${variante}"`);
    exigir(TAMANHOS.includes(tamanho), 'botao', `tamanho desconhecido "${tamanho}"`);
    exigir(rotulo, 'botao', 'rotulo é obrigatório');
    exigir(variante !== 'icone' || iconeEsquerda, 'botao', 'variante icone exige iconeEsquerda');
    exigir(!/^cancelar$/i.test(rotulo) || VARIANTES_DO_CANCELAR.includes(variante), 'botao',
      '"Cancelar" é sempre secundario ou texto (PA-19)');
  }

  function botao(opcoes) {
    const props = { variante: 'secundario', tamanho: 'medio', carregando: false, ...opcoes };
    validarBotao(props);
    const { variante, tamanho, iconeEsquerda, iconeDireita, rotulo, carregando } = props;

    const el = document.createElement('button');
    el.type = 'button';
    el.className = `botao botao-${variante}${tamanho === 'pequeno' ? ' botao-pequeno' : ''}`;
    if (carregando) el.append(svg(GIRO, 'icone botao-giro'));
    else if (iconeEsquerda) el.append(icone(iconeEsquerda));

    if (variante === 'icone') {
      el.setAttribute('aria-label', rotulo);
      el.title = rotulo;
    } else {
      el.append(rotulo);
      if (iconeDireita) el.append(icone(iconeDireita));
    }

    // Carregando segue focável: o foco não se perde enquanto a ação termina.
    if (carregando) {
      el.setAttribute('aria-busy', 'true');
      el.setAttribute('aria-disabled', 'true');
      el.addEventListener('click', bloquearClique, true);
    }
    return el;
  }

  function grupoBotoes(itens) {
    exigir(Array.isArray(itens) && itens.length, 'grupoBotoes', 'itens precisa de ao menos um botão');
    const grupo = document.createElement('div');
    grupo.className = 'grupo-botoes';
    grupo.setAttribute('role', 'group');
    grupo.append(...itens.map((item) => (item instanceof HTMLElement ? item : botao(item))));
    return grupo;
  }

  function itemDeMenu(item, fechar) {
    exigir(item.rotulo, 'menuAcoes', 'item sem rotulo');
    const el = document.createElement('button');
    el.type = 'button';
    el.setAttribute('role', 'menuitem');
    el.textContent = item.rotulo;
    if (item.destrutivo) el.classList.add('is-destrutivo');
    if (item.desabilitado) el.setAttribute('aria-disabled', 'true');
    el.addEventListener('click', () => {
      if (item.desabilitado) return;
      fechar(true);
      if (item.aoClicar) item.aoClicar();
    });
    return el;
  }

  function grupoDestrutivo(itens, fechar) {
    const grupo = document.createElement('div');
    grupo.className = 'menu-suspenso-grupo';
    grupo.setAttribute('role', 'group');
    grupo.setAttribute('aria-label', 'Ações destrutivas');
    grupo.append(...itens.map((i) => itemDeMenu(i, fechar)));
    return grupo;
  }

  function ligarMenu(raiz, gatilho, lista) {
    const itens = () => [...lista.querySelectorAll('[role="menuitem"]')];
    const fora = (e) => { if (!raiz.contains(e.target)) fechar(false); };
    function fechar(devolverFoco) {
      lista.hidden = true;
      gatilho.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', fora);
      if (devolverFoco) gatilho.focus();
    }
    function abrir() {
      lista.hidden = false;
      lista.classList.toggle('is-direita', lista.getBoundingClientRect().right > window.innerWidth);
      gatilho.setAttribute('aria-expanded', 'true');
      document.addEventListener('click', fora);
      itens()[0].focus();
    }
    const mover = (passo) => {
      const todos = itens();
      todos[(todos.indexOf(document.activeElement) + passo + todos.length) % todos.length].focus();
    };
    const TECLAS = {
      ArrowDown: () => mover(1),
      ArrowUp: () => mover(-1),
      Home: () => itens()[0].focus(),
      End: () => itens().at(-1).focus(),
      Escape: () => fechar(true),
    };
    gatilho.addEventListener('click', () => (lista.hidden ? abrir() : fechar(false)));
    lista.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') { fechar(false); return; }
      if (!TECLAS[e.key]) return;
      e.preventDefault();
      TECLAS[e.key]();
    });
    return fechar;
  }

  function menuAcoes(opcoes) {
    const { rotulo, itens } = opcoes || {};
    exigir(rotulo, 'menuAcoes', 'rotulo é obrigatório');
    exigir(Array.isArray(itens) && itens.length, 'menuAcoes', 'itens precisa de ao menos uma ação');

    const raiz = document.createElement('div');
    raiz.className = 'menu-acoes';
    const id = `ds-menu-${++proximoId}`;
    const gatilho = botao({ variante: 'secundario', rotulo, iconeDireita: 'seta' });
    gatilho.setAttribute('aria-haspopup', 'menu');
    gatilho.setAttribute('aria-expanded', 'false');
    gatilho.setAttribute('aria-controls', id);

    const lista = document.createElement('div');
    lista.className = 'menu-suspenso';
    lista.id = id;
    lista.setAttribute('role', 'menu');
    lista.setAttribute('aria-label', rotulo);
    lista.hidden = true;

    const fechar = ligarMenu(raiz, gatilho, lista);
    const comuns = itens.filter((i) => !i.destrutivo);
    const destrutivos = itens.filter((i) => i.destrutivo);
    lista.append(...comuns.map((i) => itemDeMenu(i, fechar)));
    if (destrutivos.length) lista.append(grupoDestrutivo(destrutivos, fechar));

    raiz.append(gatilho, lista);
    return raiz;
  }

  // --- formulário ------------------------------------------------------------

  const LARGURAS = ['p', 'm', 'g', 'total'];
  const TIPOS_DE_TEXTO = ['text', 'email', 'tel', 'url', 'number'];
  const TEMPO_DE_DIGITACAO_MS = 500;
  const MARGEM_DA_TELA_PX = 8;
  const FORMATO_DA_DATA = 'dd/mm/aaaa';
  const AVISO_DE_DATA = `Data inválida. Use ${FORMATO_DA_DATA}.`;
  const AVISO_DE_PERIODO = 'A data final vem antes da inicial.';

  function novoId(prefixo) {
    return `ds-${prefixo}-${++proximoId}`;
  }

  function criar(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  function criarBotao(classe) {
    const el = criar('button', classe);
    el.type = 'button';
    return el;
  }

  function marcaObrigatorio() {
    const marca = criar('span', 'campo-obrigatorio');
    const asterisco = criar('span', null, '*');
    asterisco.setAttribute('aria-hidden', 'true');
    marca.append(asterisco, criar('span', 'visualmente-oculto', ' obrigatório'));
    return marca;
  }

  function rotuloDoCampo(texto, obrigatorio, alvo) {
    const nativo = alvo.matches('input, textarea');
    const el = criar(nativo ? 'label' : 'span', 'campo-rotulo', texto);
    el.id = novoId('rotulo');
    if (nativo) {
      el.htmlFor = alvo.id;
    } else {
      alvo.setAttribute('aria-labelledby', el.id);
      el.addEventListener('click', () => alvo.focus());
    }
    if (obrigatorio) el.append(marcaObrigatorio());
    return el;
  }

  // PA-21: o rótulo fica acima do controle em toda peça. A caixa é a exceção:
  // o texto ao lado dela é o próprio rótulo, e ele também não some.
  function casco(peca, props, controles, alvo, { rotuloAcima = true } = {}) {
    const { rotulo, ajuda, obrigatorio, largura = 'm', erro } = props;
    exigir(rotulo, peca, 'rotulo é obrigatório (PA-21)');
    exigir(LARGURAS.includes(largura), peca, `largura desconhecida "${largura}"`);

    const raiz = criar('div', `campo campo-${largura}`);
    const rotuloEl = rotuloAcima ? rotuloDoCampo(rotulo, obrigatorio, alvo) : null;
    if (rotuloEl) raiz.append(rotuloEl);
    raiz.append(...controles);

    let ajudaEl = null;
    if (ajuda) {
      ajudaEl = criar('p', 'campo-ajuda', ajuda);
      ajudaEl.id = novoId('ajuda');
      raiz.append(ajudaEl);
    }

    function mostrarErro(mensagem) {
      raiz.querySelector(':scope > .campo-erro')?.remove();
      raiz.classList.toggle('is-erro', Boolean(mensagem));
      const descricoes = ajudaEl ? [ajudaEl.id] : [];
      if (mensagem) {
        const erroEl = criar('p', 'campo-erro', mensagem);
        erroEl.id = novoId('erro');
        erroEl.setAttribute('role', 'alert');
        raiz.append(erroEl);
        descricoes.push(erroEl.id);
        alvo.setAttribute('aria-invalid', 'true');
      } else {
        alvo.removeAttribute('aria-invalid');
      }
      if (descricoes.length) alvo.setAttribute('aria-describedby', descricoes.join(' '));
      else alvo.removeAttribute('aria-describedby');
    }

    mostrarErro(erro);
    return { raiz, rotuloId: rotuloEl && rotuloEl.id, mostrarErro };
  }

  function prepararEntrada(entrada, props, prefixo) {
    entrada.id = props.id || novoId(prefixo);
    entrada.value = props.valor ?? '';
    entrada.autocomplete = props.autocomplete || 'off';
    entrada.disabled = Boolean(props.desabilitado);
    if (props.placeholder) entrada.placeholder = props.placeholder;
  }

  function refletirValor(raiz, entrada, aoMudar) {
    raiz.dataset.valor = entrada.value;
    entrada.addEventListener('input', () => {
      raiz.dataset.valor = entrada.value;
      if (aoMudar) aoMudar(entrada.value);
    });
    return raiz;
  }

  function controleDeTexto(entrada, nomeDoIcone) {
    const controle = criar('div', 'campo-controle');
    if (nomeDoIcone) {
      controle.classList.add('tem-icone');
      controle.append(icone(nomeDoIcone));
    }
    controle.append(entrada);
    return controle;
  }

  function campo(props = {}) {
    const tipo = props.tipo || 'text';
    exigir(TIPOS_DE_TEXTO.includes(tipo), 'campo', `tipo desconhecido "${tipo}"`);
    const entrada = criar('input', 'campo-entrada');
    entrada.type = tipo;
    prepararEntrada(entrada, props, 'campo');
    const { raiz } = casco('campo', props, [controleDeTexto(entrada, props.icone)], entrada);
    return refletirValor(raiz, entrada, props.aoMudar);
  }

  function areaTexto(props = {}) {
    const entrada = criar('textarea', 'campo-entrada campo-area');
    entrada.rows = props.linhas || 3;
    prepararEntrada(entrada, props, 'area');
    const { raiz } = casco('areaTexto', props, [controleDeTexto(entrada)], entrada);
    return refletirValor(raiz, entrada, props.aoMudar);
  }

  // A classe .busca já é da moldura, por isso esta peça usa .campo-busca.
  function busca(props = {}) {
    const entrada = criar('input', 'campo-entrada');
    entrada.type = 'text';
    entrada.setAttribute('role', 'searchbox');
    prepararEntrada(entrada, { placeholder: 'Buscar', ...props }, 'busca');

    const controle = criar('div', 'campo-controle campo-busca tem-icone');
    controle.append(props.carregando ? svg(GIRO, 'icone botao-giro') : icone('busca'), entrada);
    const limpar = botao({ variante: 'icone', tamanho: 'pequeno', iconeEsquerda: 'fechar', rotulo: 'Limpar busca' });
    limpar.classList.add('campo-acao');
    controle.append(limpar);
    if (props.carregando) entrada.setAttribute('aria-busy', 'true');

    const { raiz } = casco('busca', props, [controle], entrada);
    refletirValor(raiz, entrada, props.aoMudar);
    const atualizarLimpar = () => { limpar.hidden = !entrada.value || entrada.disabled; };
    const esvaziar = () => {
      entrada.value = '';
      entrada.dispatchEvent(new Event('input', { bubbles: true }));
      entrada.focus();
    };
    entrada.addEventListener('input', atualizarLimpar);
    limpar.addEventListener('click', esvaziar);
    entrada.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && entrada.value) { e.preventDefault(); e.stopPropagation(); esvaziar(); }
      if (e.key === 'Enter') { e.preventDefault(); if (props.aoBuscar) props.aoBuscar(entrada.value); }
    });
    atualizarLimpar();
    return raiz;
  }

  // Lista ou calendário: um flutuante aberto por vez, na página inteira.
  let flutuante = null;

  function abrirFlutuante(item) {
    if (flutuante) flutuante.fechar(false);
    flutuante = item;
  }

  function soltarFlutuante(item) {
    if (flutuante === item) flutuante = null;
  }

  // Abaixo da âncora; acima só quando embaixo não cabe e em cima há mais espaço.
  function posicionar({ ancora, painel }) {
    const caixa = ancora.getBoundingClientRect();
    const margem = parseFloat(getComputedStyle(painel).marginTop);
    const altura = painel.offsetHeight + 2 * margem;
    const cabeAbaixo = caixa.bottom + altura <= window.innerHeight || window.innerHeight - caixa.bottom >= caixa.top;
    const limite = window.innerWidth - painel.offsetWidth - MARGEM_DA_TELA_PX;
    painel.style.setProperty('--flutuante-esquerda', `${Math.max(MARGEM_DA_TELA_PX, Math.min(caixa.left, limite))}px`);
    painel.style.setProperty('--flutuante-largura', `${caixa.width}px`);
    painel.style.setProperty('--flutuante-topo', `${cabeAbaixo ? caixa.bottom : caixa.top - altura}px`);
  }

  document.addEventListener('pointerdown', (e) => {
    if (flutuante && !flutuante.ancora.contains(e.target) && !flutuante.painel.contains(e.target)) flutuante.fechar(false);
  });
  document.addEventListener('scroll', (e) => {
    if (flutuante && !flutuante.painel.contains(e.target)) posicionar(flutuante);
  }, true);
  window.addEventListener('resize', () => { if (flutuante) posicionar(flutuante); });

  function semAcento(texto) {
    return texto.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
  }

  // Devolve a função que acha a próxima opção pelo que foi digitado, ou -1.
  function digitacao(rotulos) {
    const alvos = rotulos.map(semAcento);
    let termo = '';
    let relogio;
    function buscar(tecla, atual) {
      clearTimeout(relogio);
      relogio = setTimeout(() => { termo = ''; }, TEMPO_DE_DIGITACAO_MS);
      const inicio = termo ? atual : atual + 1;
      termo += semAcento(tecla);
      for (let i = 0; i < alvos.length; i++) {
        const candidato = (inicio + i) % alvos.length;
        if (alvos[candidato].startsWith(termo)) return candidato;
      }
      return -1;
    }
    buscar.emCurso = () => termo !== '';
    return buscar;
  }

  function validarOpcoes(peca, opcoes) {
    exigir(Array.isArray(opcoes) && opcoes.length, peca, 'opcoes precisa de ao menos uma opção');
    exigir(opcoes.every((o) => Array.isArray(o) && o.length === 2), peca, 'cada opção é um par [chave, rotulo]');
  }

  function validarValor(peca, opcoes, valor) {
    exigir(opcoes.some(([chave]) => chave === valor), peca, `valor desconhecido "${valor}"`);
  }

  function montarLista(id, opcoes) {
    const lista = criar('ul', 'seletor-lista');
    lista.id = `${id}-lista`;
    lista.setAttribute('role', 'listbox');
    lista.tabIndex = -1;
    lista.hidden = true;
    const itens = opcoes.map(([, rotulo], indice) => {
      const opcao = criar('li', 'seletor-opcao');
      opcao.id = `${id}-opcao-${indice}`;
      opcao.setAttribute('role', 'option');
      opcao.append(criar('span', null, rotulo), icone('marca'));
      return opcao;
    });
    lista.append(...itens);
    return { lista, itens };
  }

  function montarGatilho(id, lista, { carregando, desabilitado }) {
    const gatilho = criarBotao('campo-entrada seletor-gatilho');
    gatilho.id = id;
    gatilho.setAttribute('aria-haspopup', 'listbox');
    gatilho.setAttribute('aria-expanded', 'false');
    gatilho.setAttribute('aria-controls', lista.id);
    gatilho.disabled = Boolean(desabilitado);
    gatilho.append(carregando ? svg(GIRO, 'icone botao-giro') : icone('seta'));
    if (carregando) {
      gatilho.setAttribute('aria-busy', 'true');
      gatilho.setAttribute('aria-disabled', 'true');
      gatilho.addEventListener('click', bloquearClique, true);
    }
    return gatilho;
  }

  const ehDigitacao = (e) => e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;

  // Padrão ARIA de listbox: o botão abre, o foco vai para a lista e a opção ativa vem por aria-activedescendant.
  function ligarLista({ gatilho, lista, itens, rotulos, inicial, aoAtivar }) {
    const item = { ancora: gatilho, painel: lista, fechar };
    const buscar = digitacao(rotulos);
    let ativo = 0;

    function marcarAtivo(indice, rolar) {
      ativo = Math.min(Math.max(indice, 0), itens.length - 1);
      itens.forEach((opcao, outro) => opcao.toggleAttribute('data-ativa', outro === ativo));
      lista.setAttribute('aria-activedescendant', itens[ativo].id);
      if (rolar) itens[ativo].scrollIntoView({ block: 'nearest' });
    }

    function fechar(devolverFoco) {
      if (lista.hidden) return;
      lista.hidden = true;
      gatilho.setAttribute('aria-expanded', 'false');
      lista.removeAttribute('aria-activedescendant');
      soltarFlutuante(item);
      if (devolverFoco) gatilho.focus();
    }

    function abrir() {
      abrirFlutuante(item);
      lista.hidden = false;
      gatilho.setAttribute('aria-expanded', 'true');
      posicionar(item);
      marcarAtivo(inicial(), true);
      lista.focus();
    }

    function digitar(tecla) {
      const achado = buscar(tecla, ativo);
      if (achado >= 0) marcarAtivo(achado, true);
    }

    const MOVER = {
      ArrowDown: () => ativo + 1,
      ArrowUp: () => ativo - 1,
      Home: () => 0,
      End: () => itens.length - 1,
    };
    const ACOES = {
      Enter: () => aoAtivar(ativo),
      Escape: () => fechar(true),
    };

    gatilho.addEventListener('click', () => (lista.hidden ? abrir() : fechar(true)));
    gatilho.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        abrir();
      } else if (ehDigitacao(e) && e.key !== ' ') {
        e.preventDefault();
        abrir();
        digitar(e.key);
      }
    });
    lista.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') { fechar(true); return; }
      if (e.key === ' ' && !buscar.emCurso()) { e.preventDefault(); aoAtivar(ativo); return; }
      if (MOVER[e.key]) { e.preventDefault(); marcarAtivo(MOVER[e.key](), true); return; }
      if (ACOES[e.key]) { e.preventDefault(); e.stopPropagation(); ACOES[e.key](); return; }
      if (ehDigitacao(e)) { e.preventDefault(); digitar(e.key); }
    });
    lista.addEventListener('mousemove', (e) => {
      const opcao = e.target.closest('[role="option"]');
      if (opcao && itens.indexOf(opcao) !== ativo) marcarAtivo(itens.indexOf(opcao), false);
    });
    lista.addEventListener('click', (e) => {
      const opcao = e.target.closest('[role="option"]');
      if (opcao) aoAtivar(itens.indexOf(opcao));
    });
    return { fechar };
  }

  function seletor(props = {}) {
    const { opcoes, valor, aoEscolher } = props;
    validarOpcoes('seletor', opcoes);
    if (valor !== undefined) validarValor('seletor', opcoes, valor);

    const id = props.id || novoId('seletor');
    const { lista, itens } = montarLista(id, opcoes);
    const gatilho = montarGatilho(id, lista, props);
    const texto = criar('span', 'seletor-valor');
    gatilho.prepend(texto);
    const { raiz, rotuloId } = casco('seletor', props, [gatilho, lista], gatilho);
    gatilho.setAttribute('aria-labelledby', `${rotuloId} ${id}`);
    lista.setAttribute('aria-labelledby', rotuloId);

    let selecionado = valor === undefined ? 0 : opcoes.findIndex(([chave]) => chave === valor);
    function marcarSelecionado() {
      const [chave, rotulo] = opcoes[selecionado];
      itens.forEach((opcao, indice) => opcao.setAttribute('aria-selected', String(indice === selecionado)));
      texto.textContent = rotulo;
      texto.classList.toggle('is-vazio', chave === '');
      raiz.dataset.valor = chave;
    }

    const controle = ligarLista({
      gatilho, lista, itens,
      rotulos: opcoes.map(([, rotulo]) => rotulo),
      inicial: () => selecionado,
      aoAtivar: (indice) => {
        const mudou = indice !== selecionado;
        selecionado = indice;
        marcarSelecionado();
        controle.fechar(true);
        if (mudou && aoEscolher) aoEscolher(opcoes[indice][0]);
      },
    });
    marcarSelecionado();
    return raiz;
  }

  function chipRemovivel(rotulo, desabilitado, aoRemover) {
    const chip = criar('li', 'seletor-chip');
    const remover = criarBotao();
    remover.append(icone('fechar'));
    remover.setAttribute('aria-label', `Remover ${rotulo}`);
    remover.title = `Remover ${rotulo}`;
    remover.disabled = Boolean(desabilitado);
    remover.addEventListener('click', aoRemover);
    chip.append(criar('span', null, rotulo), remover);
    return chip;
  }

  function seletorMultiplo(props = {}) {
    const { opcoes, valor = [], aoEscolher, desabilitado } = props;
    validarOpcoes('seletorMultiplo', opcoes);
    exigir(Array.isArray(valor), 'seletorMultiplo', 'valor é uma lista de chaves');
    valor.forEach((v) => validarValor('seletorMultiplo', opcoes, v));

    const id = props.id || novoId('seletor');
    const { lista, itens } = montarLista(id, opcoes);
    lista.setAttribute('aria-multiselectable', 'true');
    const gatilho = montarGatilho(id, lista, props);
    const texto = criar('span', 'seletor-valor');
    gatilho.prepend(texto);
    const chips = criar('ul', 'seletor-chips');
    const { raiz, rotuloId } = casco('seletorMultiplo', props, [gatilho, lista, chips], gatilho);
    gatilho.setAttribute('aria-labelledby', `${rotuloId} ${id}`);
    lista.setAttribute('aria-labelledby', rotuloId);

    const selecionados = new Set(valor);
    function emOrdem() {
      return opcoes.filter(([chave]) => selecionados.has(chave));
    }

    function desenhar() {
      const escolhidas = emOrdem();
      itens.forEach((opcao, indice) => opcao.setAttribute('aria-selected', String(selecionados.has(opcoes[indice][0]))));
      texto.textContent = escolhidas.length ? `${escolhidas.length} selecionado${escolhidas.length > 1 ? 's' : ''}` : (props.placeholder || 'Selecione');
      texto.classList.toggle('is-vazio', !escolhidas.length);
      raiz.dataset.valor = escolhidas.map(([chave]) => chave).join(',');
      chips.replaceChildren(...escolhidas.map(([chave, rotulo]) => chipRemovivel(rotulo, desabilitado, () => {
        alternar(chave);
        (chips.querySelector('button') || gatilho).focus();
      })));
    }

    function alternar(chave) {
      if (selecionados.has(chave)) selecionados.delete(chave);
      else selecionados.add(chave);
      desenhar();
      if (aoEscolher) aoEscolher(emOrdem().map(([c]) => c));
    }

    ligarLista({
      gatilho, lista, itens,
      rotulos: opcoes.map(([, rotulo]) => rotulo),
      inicial: () => Math.max(0, opcoes.findIndex(([chave]) => selecionados.has(chave))),
      aoAtivar: (indice) => alternar(opcoes[indice][0]),
    });
    desenhar();
    return raiz;
  }

  function iniciais(nome) {
    const partes = nome.trim().split(/\s+/);
    return (partes[0][0] + (partes.length > 1 ? partes.at(-1)[0] : '')).toUpperCase();
  }

  function avatarDecorativo(nome) {
    const el = criar('span', 'pessoa-avatar', iniciais(nome));
    el.setAttribute('aria-hidden', 'true');
    return el;
  }

  function avatarRemovivel(nome, desabilitado, aoRemover) {
    const el = criarBotao('pessoa');
    el.setAttribute('aria-label', `Remover ${nome}`);
    el.title = nome;
    el.disabled = Boolean(desabilitado);
    el.append(avatarDecorativo(nome), icone('fechar'));
    el.addEventListener('click', aoRemover);
    return el;
  }

  function opcaoDePessoa(nome, aoAdicionar) {
    const el = criarBotao('pessoas-opcao');
    el.append(avatarDecorativo(nome), criar('span', null, nome));
    el.addEventListener('click', aoAdicionar);
    return el;
  }

  // PA-58: a lista de pessoas abre no próprio campo, no fluxo da página, sem popover.
  function seletorPessoas(props = {}) {
    const { opcoes, valor = [], aoEscolher, desabilitado } = props;
    validarOpcoes('seletorPessoas', opcoes);
    exigir(Array.isArray(valor), 'seletorPessoas', 'valor é uma lista de chaves');
    valor.forEach((v) => validarValor('seletorPessoas', opcoes, v));

    const grupo = criar('div', 'pessoas');
    grupo.setAttribute('role', 'group');
    const linha = criar('ul', 'pessoas-lista');
    const mais = botao({ variante: 'icone', iconeEsquerda: 'mais', rotulo: 'Adicionar pessoa' });
    mais.classList.add('pessoas-mais');
    mais.setAttribute('aria-expanded', 'false');
    const disponiveis = criar('ul', 'pessoas-disponiveis');
    disponiveis.id = novoId('pessoas');
    disponiveis.hidden = true;
    mais.setAttribute('aria-controls', disponiveis.id);
    grupo.append(linha, disponiveis);

    const { raiz } = casco('seletorPessoas', props, [grupo], grupo);
    const selecionados = new Set(valor);

    function avisar() {
      raiz.dataset.valor = [...selecionados].join(',');
      if (aoEscolher) aoEscolher([...selecionados]);
    }

    function definirAberto(aberto) {
      disponiveis.hidden = !aberto;
      mais.setAttribute('aria-expanded', String(aberto));
    }

    function desenhar() {
      const presentes = opcoes.filter(([chave]) => selecionados.has(chave));
      const restantes = opcoes.filter(([chave]) => !selecionados.has(chave));
      const avatares = presentes.map(([chave, nome]) => {
        const item = criar('li');
        item.append(avatarRemovivel(nome, desabilitado, () => {
          selecionados.delete(chave);
          desenhar();
          avisar();
          mais.focus();
        }));
        return item;
      });
      const itemMais = criar('li');
      itemMais.append(mais);
      linha.replaceChildren(...avatares, itemMais);
      mais.disabled = Boolean(desabilitado) || !restantes.length;
      disponiveis.replaceChildren(...restantes.map(([chave, nome], indice) => {
        const item = criar('li');
        item.append(opcaoDePessoa(nome, () => {
          selecionados.add(chave);
          desenhar();
          avisar();
          focarProxima(indice);
        }));
        return item;
      }));
      if (!restantes.length) definirAberto(false);
    }

    function focarProxima(indice) {
      const botoes = disponiveis.querySelectorAll('button');
      if (botoes.length) botoes[Math.min(indice, botoes.length - 1)].focus();
      else mais.focus();
    }

    mais.addEventListener('click', () => {
      definirAberto(disponiveis.hidden);
      if (!disponiveis.hidden) focarProxima(0);
    });
    // preventDefault: o Esc fecha só a lista, nunca o painel em volta.
    disponiveis.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      e.stopPropagation();
      definirAberto(false);
      mais.focus();
    });

    desenhar();
    raiz.dataset.valor = [...selecionados].join(',');
    return raiz;
  }

  const doisDigitos = (n) => String(n).padStart(2, '0');
  const paraIso = (d) => `${d.getFullYear()}-${doisDigitos(d.getMonth() + 1)}-${doisDigitos(d.getDate())}`;
  const paraTexto = (d) => `${doisDigitos(d.getDate())}/${doisDigitos(d.getMonth() + 1)}/${d.getFullYear()}`;
  const mesmoDia = (a, b) => Boolean(a && b) && paraIso(a) === paraIso(b);
  const somarDias = (d, dias) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + dias);

  function somarMeses(d, meses) {
    const ultimo = new Date(d.getFullYear(), d.getMonth() + meses + 1, 0).getDate();
    return new Date(d.getFullYear(), d.getMonth() + meses, Math.min(d.getDate(), ultimo));
  }

  // Devolve a data, ou null quando o dia não existe no calendário.
  function dataDe(dia, mes, ano) {
    const d = new Date(ano, mes - 1, dia);
    return d.getFullYear() === ano && d.getMonth() === mes - 1 && d.getDate() === dia ? d : null;
  }

  function deTexto(texto) {
    const partes = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(texto);
    return partes ? dataDe(+partes[1], +partes[2], +partes[3]) : null;
  }

  function deIso(iso) {
    const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    return partes ? dataDe(+partes[3], +partes[2], +partes[1]) : null;
  }

  function aplicarMascara(texto) {
    const digitos = texto.replace(/\D/g, '').slice(0, 8);
    return [digitos.slice(0, 2), digitos.slice(2, 4), digitos.slice(4)].filter(Boolean).join('/');
  }

  // Cada barra entra depois do segundo e do quarto dígito.
  function posicaoDoDigito(digitos) {
    return digitos + (digitos > 2 ? 1 : 0) + (digitos > 4 ? 1 : 0);
  }

  function mascararEntrada(entrada) {
    const noFim = entrada.selectionStart === entrada.value.length;
    const digitosAntes = entrada.value.slice(0, entrada.selectionStart).replace(/\D/g, '').length;
    entrada.value = aplicarMascara(entrada.value);
    if (!noFim) entrada.setSelectionRange(posicaoDoDigito(digitosAntes), posicaoDoDigito(digitosAntes));
  }

  const FORMATO_DO_MES = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' });
  const FORMATO_DO_DIA = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' });
  const DIAS_DA_SEMANA = [['domingo', 'D'], ['segunda-feira', 'S'], ['terça-feira', 'T'], ['quarta-feira', 'Q'],
    ['quinta-feira', 'Q'], ['sexta-feira', 'S'], ['sábado', 'S']];
  const PASSOS_DO_CALENDARIO = {
    ArrowLeft: (d) => somarDias(d, -1),
    ArrowRight: (d) => somarDias(d, 1),
    ArrowUp: (d) => somarDias(d, -7),
    ArrowDown: (d) => somarDias(d, 7),
    Home: (d) => somarDias(d, -d.getDay()),
    End: (d) => somarDias(d, 6 - d.getDay()),
    PageUp: (d) => somarMeses(d, -1),
    PageDown: (d) => somarMeses(d, 1),
  };

  function semanasDoMes(referencia) {
    const ano = referencia.getFullYear();
    const mes = referencia.getMonth();
    const celulas = Array(new Date(ano, mes, 1).getDay()).fill(null);
    const total = new Date(ano, mes + 1, 0).getDate();
    for (let dia = 1; dia <= total; dia++) celulas.push(new Date(ano, mes, dia));
    const semanas = [];
    for (let i = 0; i < celulas.length; i += 7) semanas.push(celulas.slice(i, i + 7));
    return semanas;
  }

  function cabecalhoDoCalendario() {
    const cabeca = criar('thead');
    const linha = criar('tr');
    linha.append(...DIAS_DA_SEMANA.map(([nome, letra]) => {
      const th = criar('th', null, letra);
      th.scope = 'col';
      th.setAttribute('aria-label', nome);
      return th;
    }));
    cabeca.append(linha);
    return cabeca;
  }

  function diaDoCalendario(data, foco, selecionada, aoEscolher) {
    const celula = criar('td');
    if (!data) return celula;
    const dia = criarBotao('calendario-dia');
    dia.textContent = data.getDate();
    dia.tabIndex = mesmoDia(data, foco) ? 0 : -1;
    dia.setAttribute('aria-label', FORMATO_DO_DIA.format(data));
    if (mesmoDia(data, selecionada)) dia.setAttribute('aria-pressed', 'true');
    if (mesmoDia(data, new Date())) dia.setAttribute('aria-current', 'date');
    dia.addEventListener('click', () => aoEscolher(data));
    celula.append(dia);
    return celula;
  }

  function criarCalendario({ aoEscolher, aoFechar }) {
    const painel = criar('div', 'calendario');
    painel.setAttribute('role', 'group');
    painel.setAttribute('aria-label', 'Calendário');
    painel.id = novoId('calendario');
    painel.hidden = true;

    const titulo = criar('span', 'calendario-titulo');
    titulo.id = novoId('calendario-titulo');
    titulo.setAttribute('aria-live', 'polite');
    const botaoDeMes = (iconeEsquerda, rotulo) => botao({ variante: 'icone', tamanho: 'pequeno', iconeEsquerda, rotulo });
    const anterior = botaoDeMes('esquerda', 'Mês anterior');
    const proximo = botaoDeMes('direita', 'Próximo mês');
    const topo = criar('div', 'calendario-topo');
    topo.append(anterior, titulo, proximo);

    const grade = criar('table', 'calendario-grade');
    grade.setAttribute('role', 'grid');
    grade.setAttribute('aria-labelledby', titulo.id);
    const corpo = criar('tbody');
    grade.append(cabecalhoDoCalendario(), corpo);
    painel.append(topo, grade);

    let foco = new Date();
    let selecionada = null;

    function desenhar(focar) {
      titulo.textContent = FORMATO_DO_MES.format(foco);
      corpo.replaceChildren(...semanasDoMes(foco).map((semana) => {
        const linha = criar('tr');
        linha.append(...semana.map((data) => diaDoCalendario(data, foco, selecionada, aoEscolher)));
        return linha;
      }));
      if (focar) focarDia();
    }

    function focarDia() {
      corpo.querySelector('[tabindex="0"]').focus();
    }

    function mudarMes(passo) {
      foco = somarMeses(foco, passo);
      desenhar(false);
    }

    anterior.addEventListener('click', () => mudarMes(-1));
    proximo.addEventListener('click', () => mudarMes(1));
    grade.addEventListener('keydown', (e) => {
      const passo = PASSOS_DO_CALENDARIO[e.key];
      if (!passo) return;
      e.preventDefault();
      foco = passo(foco);
      desenhar(true);
    });
    // O Tab que sai do calendário fecha e devolve ao botão, e a ordem segue dali.
    painel.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        aoFechar();
        return;
      }
      const saindo = e.key === 'Tab' && (e.shiftKey ? e.target === anterior : e.target.matches('.calendario-dia'));
      if (saindo) aoFechar();
    });

    function mostrar(data) {
      selecionada = data;
      foco = data || new Date();
      desenhar(false);
    }

    return { painel, mostrar, focarDia };
  }

  // Máscara e calendário de uma data. O valor de máquina é ISO; a tela mostra dd/mm/aaaa.
  function controleData({ nome, valor, placeholder, desabilitado, aoMudar, aoSair }) {
    const inicial = valor ? deIso(valor) : null;
    const entrada = criar('input', 'campo-entrada');
    entrada.type = 'text';
    entrada.inputMode = 'numeric';
    entrada.maxLength = FORMATO_DA_DATA.length;
    prepararEntrada(entrada, { valor: inicial ? paraTexto(inicial) : '', placeholder: placeholder || FORMATO_DA_DATA, desabilitado }, 'data');
    if (nome) entrada.setAttribute('aria-label', nome);

    const alternar = botao({ variante: 'icone', tamanho: 'pequeno', iconeEsquerda: 'calendario', rotulo: 'Abrir calendário' });
    alternar.classList.add('campo-acao');
    alternar.disabled = Boolean(desabilitado);
    alternar.setAttribute('aria-expanded', 'false');

    const caixa = criar('div', 'campo-controle');
    const calendario = criarCalendario({
      aoEscolher: (data) => {
        entrada.value = paraTexto(data);
        fechar(false);
        entrada.focus();
        notificar();
        if (aoSair) aoSair();
      },
      aoFechar: () => fechar(true),
    });
    alternar.setAttribute('aria-controls', calendario.painel.id);
    caixa.append(entrada, alternar, calendario.painel);
    const item = { ancora: caixa, painel: calendario.painel, fechar };

    const lerData = () => deTexto(entrada.value);
    const iso = () => { const d = lerData(); return d ? paraIso(d) : ''; };
    let ultimo = iso();
    function notificar() {
      if (iso() === ultimo) return;
      ultimo = iso();
      if (aoMudar) aoMudar(ultimo);
    }

    function fechar(devolverFoco) {
      if (calendario.painel.hidden) return;
      calendario.painel.hidden = true;
      alternar.setAttribute('aria-expanded', 'false');
      soltarFlutuante(item);
      if (devolverFoco) alternar.focus();
    }

    function abrir() {
      abrirFlutuante(item);
      calendario.mostrar(lerData());
      calendario.painel.hidden = false;
      alternar.setAttribute('aria-expanded', 'true');
      posicionar(item);
      calendario.focarDia();
    }

    entrada.addEventListener('input', () => { mascararEntrada(entrada); notificar(); });
    entrada.addEventListener('blur', () => { if (aoSair) aoSair(); });
    alternar.addEventListener('click', () => (calendario.painel.hidden ? abrir() : fechar(true)));
    calendario.mostrar(inicial);

    return {
      caixa, entrada, iso, lerData,
      invalida: () => entrada.value !== '' && !lerData(),
    };
  }

  function validarIso(peca, valor) {
    exigir(!valor || deIso(valor), peca, `data fora do formato aaaa-mm-dd "${valor}"`);
  }

  function data(props = {}) {
    validarIso('data', props.valor);
    let raiz;
    let mostrarErro = () => {};
    const controle = controleData({
      ...props,
      aoMudar: (iso) => {
        raiz.dataset.valor = iso;
        if (props.aoMudar) props.aoMudar(iso);
      },
      aoSair: () => mostrarErro(controle.invalida() ? AVISO_DE_DATA : ''),
    });
    if (props.id) controle.entrada.id = props.id;
    if (props.campo) controle.entrada.dataset.campo = props.campo;
    ({ raiz, mostrarErro } = casco('data', props, [controle.caixa], controle.entrada));
    raiz.dataset.valor = controle.iso();
    return raiz;
  }

  function periodo(props = {}) {
    validarIso('periodo', props.inicio);
    validarIso('periodo', props.fim);
    let raiz;
    let mostrarErro = () => {};

    function notificar() {
      raiz.dataset.valor = `${inicio.iso()}/${fim.iso()}`;
      if (props.aoMudar) props.aoMudar(inicio.iso(), fim.iso());
    }

    function validar() {
      const [de, ate] = [inicio.lerData(), fim.lerData()];
      if (inicio.invalida() || fim.invalida()) mostrarErro(AVISO_DE_DATA);
      else mostrarErro(de && ate && ate < de ? AVISO_DE_PERIODO : '');
    }

    const comuns = { placeholder: props.placeholder, desabilitado: props.desabilitado, aoMudar: notificar, aoSair: validar };
    const inicio = controleData({ ...comuns, nome: 'Data inicial', valor: props.inicio });
    const fim = controleData({ ...comuns, nome: 'Data final', valor: props.fim });

    const grupo = criar('div', 'periodo');
    grupo.setAttribute('role', 'group');
    grupo.append(inicio.caixa, criar('span', 'periodo-separador', 'até'), fim.caixa);
    ({ raiz, mostrarErro } = casco('periodo', { largura: 'g', ...props }, [grupo], grupo));
    raiz.dataset.valor = `${inicio.iso()}/${fim.iso()}`;
    return raiz;
  }

  function caixa(props = {}) {
    const { rotulo, marcada = false, indeterminada = false, desabilitado, obrigatorio, aoMudar } = props;
    const el = criarBotao('caixa');
    el.setAttribute('role', 'checkbox');
    el.disabled = Boolean(desabilitado);

    const marca = criar('span', 'caixa-marca');
    marca.setAttribute('aria-hidden', 'true');
    marca.append(icone('marca'), icone('menos'));
    const texto = criar('span', 'caixa-texto', rotulo);
    if (obrigatorio) texto.append(marcaObrigatorio());
    el.append(marca, texto);

    const { raiz } = casco('caixa', props, [el], el, { rotuloAcima: false });
    let estado = indeterminada ? 'mixed' : String(Boolean(marcada));
    function aplicar() {
      el.setAttribute('aria-checked', estado);
      raiz.dataset.valor = estado;
    }
    el.addEventListener('click', () => {
      estado = estado === 'true' ? 'false' : 'true';
      aplicar();
      if (aoMudar) aoMudar(estado === 'true');
    });
    aplicar();
    return raiz;
  }

  const TECLAS_DE_RADIO = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

  function radio(props = {}) {
    const { opcoes, valor, aoEscolher, desabilitado, grupo: nomeDoGrupo = novoId('radio') } = props;
    validarOpcoes('radio', opcoes);
    if (valor !== undefined) validarValor('radio', opcoes, valor);

    const grupo = criar('div', 'radio-grupo');
    grupo.setAttribute('role', 'radiogroup');
    const itens = opcoes.map(([chave, rotulo]) => {
      const el = criarBotao('radio');
      el.setAttribute('role', 'radio');
      el.dataset.grupo = nomeDoGrupo;
      el.dataset.valor = chave;
      el.disabled = Boolean(desabilitado);
      el.append(criar('span', 'radio-bola'), criar('span', 'radio-texto', rotulo));
      return el;
    });
    grupo.append(...itens);
    const { raiz } = casco('radio', props, [grupo], grupo);

    // Tabindex móvel: um ponto de Tab por grupo, na opção marcada ou na primeira.
    let atual = valor;
    function aplicar() {
      itens.forEach((el) => {
        const marcado = el.dataset.valor === atual;
        el.setAttribute('aria-checked', String(marcado));
        el.tabIndex = marcado ? 0 : -1;
      });
      if (atual === undefined) itens[0].tabIndex = 0;
      raiz.dataset.valor = atual ?? '';
    }
    function escolher(el) {
      const mudou = el.dataset.valor !== atual;
      atual = el.dataset.valor;
      aplicar();
      if (mudou && aoEscolher) aoEscolher(atual);
    }
    itens.forEach((el) => el.addEventListener('click', () => escolher(el)));
    grupo.addEventListener('keydown', (e) => {
      const passo = TECLAS_DE_RADIO[e.key];
      if (!passo) return;
      e.preventDefault();
      const proximo = itens[(itens.indexOf(e.target) + passo + itens.length) % itens.length];
      escolher(proximo);
      proximo.focus();
    });
    aplicar();
    return raiz;
  }

  function chave(props = {}) {
    const { ligada = false, textos = ['Não', 'Sim'], desabilitado, carregando, aoMudar } = props;
    exigir(Array.isArray(textos) && textos.length === 2, 'chave', 'textos precisa de [desligada, ligada]');

    const el = criarBotao('chave');
    el.setAttribute('role', 'switch');
    el.disabled = Boolean(desabilitado);
    const trilho = criar('span', 'chave-trilho');
    trilho.append(criar('span', 'chave-botao'));
    const estadoEl = criar('span', 'chave-estado');
    el.append(trilho, estadoEl);
    if (carregando) {
      el.append(svg(GIRO, 'icone botao-giro'));
      el.setAttribute('aria-busy', 'true');
      el.setAttribute('aria-disabled', 'true');
      el.addEventListener('click', bloquearClique, true);
    }

    const { raiz } = casco('chave', { largura: 'p', ...props }, [el], el);
    let estado = Boolean(ligada);
    function aplicar() {
      el.setAttribute('aria-checked', String(estado));
      estadoEl.textContent = textos[Number(estado)];
      raiz.dataset.valor = String(estado);
    }
    el.addEventListener('click', () => {
      estado = !estado;
      aplicar();
      if (aoMudar) aoMudar(estado);
    });
    aplicar();
    return raiz;
  }

  // --- feedback --------------------------------------------------------------

  // O prefixo é lido pelo leitor de tela: o tipo nunca depende só da cor e do ícone.
  const TIPOS_DE_AVISO = {
    info: { icone: 'info', prefixo: 'Informação' },
    sucesso: { icone: 'marca', prefixo: 'Concluído' },
    aviso: { icone: 'alerta', prefixo: 'Atenção' },
    erro: { icone: 'alerta', prefixo: 'Erro' },
  };

  function botaoDeAcao(peca, acao) {
    exigir(acao.rotulo, peca, 'acao sem rotulo');
    const el = botao({ variante: 'texto', tamanho: 'pequeno', rotulo: acao.rotulo });
    if (acao.aoClicar) el.addEventListener('click', acao.aoClicar);
    return el;
  }

  function botaoFechar(rotulo, aoClicar) {
    const el = botao({ variante: 'icone', tamanho: 'pequeno', iconeEsquerda: 'fechar', rotulo });
    el.addEventListener('click', aoClicar);
    return el;
  }

  function aviso(peca, classe, props = {}) {
    const { tipo = 'info', mensagem, acao, fechar = false, aoFechar } = props;
    const meta = TIPOS_DE_AVISO[tipo];
    exigir(meta, peca, `tipo desconhecido "${tipo}"`);
    exigir(mensagem, peca, 'mensagem é obrigatória');

    const raiz = criar('div', `${classe} ${classe}-${tipo}`);
    raiz.setAttribute('role', tipo === 'erro' ? 'alert' : 'status');
    const texto = criar('p', `${classe}-mensagem`);
    texto.append(criar('span', 'visualmente-oculto', `${meta.prefixo}: `), mensagem);
    raiz.append(icone(meta.icone), texto);
    if (acao) raiz.append(botaoDeAcao(peca, acao));
    if (fechar) {
      raiz.append(botaoFechar('Fechar aviso', () => {
        raiz.remove();
        if (aoFechar) aoFechar();
      }));
    }
    return raiz;
  }

  // PA-30: o toast avisa só o que acontece fora da tela. O resultado de uma ação
  // visível fica junto dela, na barra de ações ou no próprio campo.
  function toast(props) {
    return aviso('toast', 'toast', props);
  }

  function faixaAviso(props) {
    return aviso('faixaAviso', 'faixa-aviso', props);
  }

  // PA-27: uma camada por vez na página. Diálogo e painel lateral passam por aqui.
  let camada = null;

  function ocuparCamada(peca, dono) {
    exigir(!camada || camada === dono, peca, 'já existe uma camada aberta (PA-27)');
    camada = dono;
  }

  function soltarCamada(dono) {
    if (camada === dono) camada = null;
  }

  function cabecaDoDialogo(titulo, aoFechar) {
    const tituloEl = criar('h2', 'dialogo-titulo', titulo);
    tituloEl.id = novoId('dialogo-titulo');
    const topo = criar('div', 'dialogo-topo');
    topo.append(tituloEl, botaoFechar('Fechar', aoFechar));
    return { topo, tituloId: tituloEl.id };
  }

  function dialogo(props = {}) {
    const { titulo, texto, acoes, aoFechar } = props;
    exigir(titulo, 'dialogo', 'titulo é obrigatório');
    exigir(Array.isArray(acoes) && acoes.length, 'dialogo', 'acoes precisa de ao menos uma ação');

    const el = criar('dialog', 'dialogo');
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    const { topo, tituloId } = cabecaDoDialogo(titulo, fechar);
    el.setAttribute('aria-labelledby', tituloId);
    el.append(topo);
    if (texto) {
      const textoEl = criar('p', 'dialogo-texto', texto);
      textoEl.id = novoId('dialogo-texto');
      el.setAttribute('aria-describedby', textoEl.id);
      el.append(textoEl);
    }
    const rodape = grupoBotoes(acoes.map((acao) => {
      const botaoDaAcao = botao(acao);
      botaoDaAcao.addEventListener('click', () => {
        if (acao.aoClicar) acao.aoClicar();
        if (acao.fecha !== false) fechar();
      });
      return botaoDaAcao;
    }));
    rodape.classList.add('dialogo-acoes');
    el.append(rodape);

    let origem = null;
    const controle = { el, abrir, fechar };

    function abrir(de) {
      ocuparCamada('dialogo', controle);
      origem = de || document.activeElement;
      if (!el.isConnected) document.body.append(el);
      el.showModal();
      rodape.querySelector('button').focus();
    }

    function fechar() {
      if (el.open) el.close();
    }

    // Esc fecha pelo próprio dialog; o close devolve o foco a quem abriu.
    el.addEventListener('close', () => {
      soltarCamada(controle);
      if (origem && origem.isConnected) origem.focus();
      origem = null;
      if (aoFechar) aoFechar();
    });
    return controle;
  }

  function tooltip(props = {}) {
    const { alvo, rotulo } = props;
    exigir(alvo instanceof HTMLElement, 'tooltip', 'alvo precisa ser um elemento');
    exigir(rotulo, 'tooltip', 'rotulo é obrigatório');

    const raiz = criar('span', 'tooltip');
    const dica = criar('span', 'dica', rotulo);
    dica.id = novoId('dica');
    dica.setAttribute('role', 'tooltip');
    alvo.removeAttribute('title');
    // Botão de ícone já tem o rótulo como nome. A dica só vira descrição quando diz outra coisa.
    if (alvo.getAttribute('aria-label') !== rotulo) {
      const antes = (alvo.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
      alvo.setAttribute('aria-describedby', [...antes, dica.id].join(' '));
    }
    raiz.append(alvo, dica);
    // WCAG 1.4.13: Esc dispensa a dica sem tirar o foco.
    raiz.addEventListener('keydown', (e) => { if (e.key === 'Escape') raiz.classList.add('is-dispensada'); });
    raiz.addEventListener('focusout', () => raiz.classList.remove('is-dispensada'));
    raiz.addEventListener('pointerleave', () => raiz.classList.remove('is-dispensada'));
    return raiz;
  }

  function progresso(props = {}) {
    const { rotulo, valor, maximo = 100, erro } = props;
    exigir(rotulo, 'progresso', 'rotulo é obrigatório');
    const indeterminado = valor === undefined || valor === null;
    exigir(indeterminado || (valor >= 0 && valor <= maximo), 'progresso', `valor fora de 0 a ${maximo}`);

    const raiz = criar('div', 'progresso');
    const rotuloEl = criar('span', 'progresso-rotulo', rotulo);
    rotuloEl.id = novoId('progresso');
    let leitura = 'Carregando';
    if (!indeterminado) leitura = maximo === 100 ? `${valor}%` : `${valor} de ${maximo}`;
    const topo = criar('div', 'progresso-topo');
    topo.append(rotuloEl, criar('span', 'progresso-valor', leitura));

    const barra = criar('div', 'progresso-barra');
    barra.setAttribute('role', 'progressbar');
    barra.setAttribute('aria-labelledby', rotuloEl.id);
    barra.setAttribute('aria-valuemin', '0');
    barra.setAttribute('aria-valuemax', String(maximo));
    if (indeterminado) {
      raiz.classList.add('is-indeterminado');
    } else {
      barra.setAttribute('aria-valuenow', String(valor));
      barra.setAttribute('aria-valuetext', leitura);
      barra.style.setProperty('--progresso', `${(valor / maximo) * 100}%`);
    }
    barra.append(criar('span', 'progresso-preenchido'));
    raiz.append(topo, barra);
    if (erro) {
      raiz.classList.add('is-erro');
      const erroEl = criar('p', 'campo-erro', erro);
      erroEl.id = novoId('erro');
      erroEl.setAttribute('role', 'alert');
      barra.setAttribute('aria-describedby', erroEl.id);
      raiz.append(erroEl);
    }
    return raiz;
  }

  const FORMAS_DO_ESQUELETO = ['bloco', 'linha'];

  function skeleton(props = {}) {
    const { rotulo = 'Carregando', linhas = 3, forma = 'bloco' } = props;
    exigir(FORMAS_DO_ESQUELETO.includes(forma), 'skeleton', `forma desconhecida "${forma}"`);
    exigir(Number.isInteger(linhas) && linhas > 0, 'skeleton', 'linhas é um inteiro maior que zero');
    const raiz = criar('div', `skeleton skeleton-${forma}`);
    raiz.setAttribute('role', 'status');
    raiz.append(criar('span', 'visualmente-oculto', rotulo));
    for (let i = 0; i < linhas; i++) {
      const traco = criar('span', 'skeleton-traco');
      traco.setAttribute('aria-hidden', 'true');
      raiz.append(traco);
    }
    return raiz;
  }

  // acao: as props de DS.botao com aoClicar, ou um elemento pronto.
  function botaoDeProps(acao) {
    if (acao instanceof HTMLElement) return acao;
    const el = botao({ variante: 'primario', ...acao });
    if (acao.aoClicar) el.addEventListener('click', acao.aoClicar);
    return el;
  }

  function estadoVazio(props = {}) {
    const { titulo, texto, acao } = props;
    exigir(titulo, 'estadoVazio', 'titulo é obrigatório');
    const raiz = criar('div', 'estado-vazio');
    raiz.append(criar('p', 'estado-vazio-titulo', titulo));
    if (texto) raiz.append(criar('p', 'estado-vazio-texto', texto));
    if (acao) raiz.append(botaoDeProps(acao));
    return raiz;
  }

  const ROTULO_DO_UPSELL = 'Conhecer planos';

  // A peça única de bloqueio por plano (PA-13). O botão é sempre o mesmo.
  function upsell(props = {}) {
    const { titulo, texto, nivel = 2, aoConhecer } = props;
    exigir(titulo, 'upsell', 'titulo é obrigatório');
    exigir(texto, 'upsell', 'texto é obrigatório');
    exigir([2, 3, 4].includes(nivel), 'upsell', 'nivel é 2, 3 ou 4');
    const raiz = criar('section', 'upsell');
    const tituloEl = criar(`h${nivel}`, 'upsell-titulo', titulo);
    tituloEl.id = novoId('upsell');
    raiz.setAttribute('aria-labelledby', tituloEl.id);
    const conhecer = botao({ variante: 'primario', rotulo: ROTULO_DO_UPSELL });
    if (aoConhecer) conhecer.addEventListener('click', aoConhecer);
    raiz.append(icone('cadeado'), tituloEl, criar('p', 'upsell-texto', texto), conhecer);
    return raiz;
  }

  // --- dados -----------------------------------------------------------------

  const TIPOS_DE_ATIVIDADE = { tarefa: 'Tarefa', prazo: 'Prazo', audiencia: 'Audiência', evento: 'Evento' };
  const ICONE_DO_PRAZO = { vencido: 'alerta', hoje: 'relogio', proximo: 'calendario', concluido: 'marca' };
  const DENSIDADES = ['padrao', 'compacta'];

  function dataDoPrazo(dias) {
    const d = somarDias(new Date(), dias);
    return `${doisDigitos(d.getDate())}/${doisDigitos(d.getMonth() + 1)}`;
  }

  // PA-34: vencido, hoje e próximos se distinguem pelo texto, e a cor reforça.
  function descreverPrazo(dias, concluida = false) {
    exigir(Number.isInteger(dias), 'descreverPrazo', 'dias é um inteiro');
    if (concluida) return { estadoPrazo: 'concluido', rotulo: `Concluída · prazo ${dataDoPrazo(dias)}` };
    if (dias < 0) return { estadoPrazo: 'vencido', rotulo: `Vencido há ${-dias} ${dias === -1 ? 'dia' : 'dias'}` };
    if (dias === 0) return { estadoPrazo: 'hoje', rotulo: 'Vence hoje' };
    return { estadoPrazo: 'proximo', rotulo: `Vence em ${dataDoPrazo(dias)}` };
  }

  function chipPrazo(props = {}) {
    const { estadoPrazo, rotulo } = props;
    exigir(ICONE_DO_PRAZO[estadoPrazo], 'chipPrazo', `estadoPrazo desconhecido "${estadoPrazo}"`);
    exigir(rotulo, 'chipPrazo', 'rotulo é obrigatório: a cor nunca fala sozinha (PA-34)');
    const el = criar('span', `chip-prazo chip-prazo-${estadoPrazo}`);
    el.dataset.prazo = estadoPrazo;
    el.append(icone(ICONE_DO_PRAZO[estadoPrazo]), criar('span', null, rotulo));
    return el;
  }

  function tag(props = {}) {
    exigir(props.rotulo, 'tag', 'rotulo é obrigatório');
    return criar('span', 'tag', props.rotulo);
  }

  function tagDoTipo(tipo) {
    exigir(TIPOS_DE_ATIVIDADE[tipo], 'tipo', `tipo desconhecido "${tipo}"`);
    return tag({ rotulo: TIPOS_DE_ATIVIDADE[tipo] });
  }

  function chipFiltro(props = {}) {
    const { rotulo, ativo = false, contagem, desabilitado, aoAlternar } = props;
    exigir(rotulo, 'chipFiltro', 'rotulo é obrigatório');
    const el = criarBotao('chip-filtro');
    el.disabled = Boolean(desabilitado);
    el.append(icone('marca'), criar('span', null, rotulo));
    if (contagem !== undefined) el.append(criar('span', 'chip-filtro-contagem', String(contagem)));
    let estado = Boolean(ativo);
    const aplicar = () => el.setAttribute('aria-pressed', String(estado));
    el.addEventListener('click', () => {
      estado = !estado;
      aplicar();
      if (aoAlternar) aoAlternar(estado);
    });
    aplicar();
    return el;
  }

  // PA-29: selo sem explicação não entra. A descrição vira dica e texto lido.
  function selo(props = {}) {
    const { rotulo, descricao } = props;
    exigir(rotulo, 'selo', 'rotulo é obrigatório');
    const el = criar('span', 'selo', rotulo);
    if (descricao) {
      el.title = descricao;
      el.append(criar('span', 'visualmente-oculto', `: ${descricao}`));
    }
    return el;
  }

  function avatar(props = {}) {
    const { nome, mostrarNome = false } = props;
    exigir(nome, 'avatar', 'nome é obrigatório');
    const el = criar('span', 'avatar');
    const inicial = criar('span', 'avatar-inicial', iniciais(nome));
    if (mostrarNome) {
      inicial.setAttribute('aria-hidden', 'true');
      el.append(inicial, criar('span', 'avatar-nome', nome));
    } else {
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', nome);
      el.title = nome;
      el.append(inicial);
    }
    return el;
  }

  function numeroDoProcesso(processo) {
    const el = criar('span', 'numero-processo');
    el.append(criar('span', 'visualmente-oculto', 'Processo '), processo);
    return el;
  }

  // PA-11 e PA-38: o número é texto, e copiar é um botão de ícone com rótulo.
  function botaoCopiar(processo) {
    const el = botao({ variante: 'icone', tamanho: 'pequeno', iconeEsquerda: 'copiar', rotulo: 'Copiar número' });
    el.dataset.acao = 'copiar-numero';
    const envolto = tooltip({ alvo: el, rotulo: 'Copiar número' });
    const dica = envolto.querySelector('.dica');
    const anuncio = criar('span', 'visualmente-oculto');
    anuncio.setAttribute('role', 'status');
    let relogio;
    function avisar(texto) {
      anuncio.textContent = texto;
      dica.textContent = texto;
      clearTimeout(relogio);
      relogio = setTimeout(() => { dica.textContent = 'Copiar número'; anuncio.textContent = ''; }, 2000);
    }
    el.addEventListener('click', () => {
      const area = navigator.clipboard;
      if (!area) { avisar('Não foi possível copiar'); return; }
      area.writeText(processo).then(() => avisar('Número copiado'), () => avisar('Não foi possível copiar'));
    });
    envolto.append(anuncio);
    return envolto;
  }

  function acoesDaLinha(acoes) {
    const grupo = criar('div', 'linha-acoes');
    acoes.forEach((acao) => {
      exigir(acao.rotulo && acao.icone, 'linhaAtividade', 'cada ação tem rotulo e icone');
      const el = botao({ variante: 'icone', tamanho: 'pequeno', iconeEsquerda: acao.icone, rotulo: acao.rotulo });
      if (acao.aoClicar) el.addEventListener('click', acao.aoClicar);
      grupo.append(tooltip({ alvo: el, rotulo: acao.rotulo }));
    });
    return grupo;
  }

  function validarAtividade(peca, props) {
    exigir(props.titulo, peca, 'titulo é obrigatório');
    exigir(TIPOS_DE_ATIVIDADE[props.tipo], peca, `tipo desconhecido "${props.tipo}"`);
  }

  function linhaAtividade(props = {}) {
    const {
      titulo, tipo, estadoPrazo, prazo, processo, responsavel, acoes = [],
      mostrarProcesso = true, copiarNumero = true, densidade = 'padrao',
    } = props;
    validarAtividade('linhaAtividade', props);
    exigir(DENSIDADES.includes(densidade), 'linhaAtividade', `densidade desconhecida "${densidade}"`);
    exigir(Array.isArray(acoes), 'linhaAtividade', 'acoes é uma lista');

    const raiz = criar('li', `linha-atividade linha-${densidade}`);
    raiz.dataset.tipo = tipo;
    const prazoEl = criar('div', 'linha-prazo');
    if (estadoPrazo) prazoEl.append(chipPrazo({ estadoPrazo, rotulo: prazo }));
    const principal = criar('div', 'linha-principal');
    principal.append(criar('span', 'linha-titulo', titulo), tagDoTipo(tipo));
    raiz.append(prazoEl, principal);

    const processoEl = criar('div', 'linha-processo');
    if (mostrarProcesso && processo) {
      processoEl.append(numeroDoProcesso(processo));
      if (copiarNumero) processoEl.append(botaoCopiar(processo));
    }
    const pessoa = criar('div', 'linha-responsavel');
    if (responsavel) pessoa.append(avatar({ nome: responsavel, mostrarNome: true }));
    raiz.append(processoEl, pessoa, acoesDaLinha(acoes));
    return raiz;
  }

  function cardAtividade(props = {}) {
    const {
      titulo, tipo, estadoPrazo, prazo, processo, responsavel, tags = [], aoAbrir,
      mostrarPrazo = true, mostrarProcesso = true, mostrarResponsavel = true, mostrarTags = true, copiarNumero = false,
    } = props;
    validarAtividade('cardAtividade', props);
    exigir(Array.isArray(tags), 'cardAtividade', 'tags é uma lista de rótulos');

    const raiz = criar('article', 'card-atividade');
    raiz.dataset.tipo = tipo;
    raiz.tabIndex = 0;
    const tituloEl = criar('h3', 'card-atividade-titulo', titulo);
    tituloEl.id = novoId('card');
    raiz.setAttribute('aria-labelledby', tituloEl.id);

    if (mostrarPrazo && estadoPrazo) raiz.append(chipPrazo({ estadoPrazo, rotulo: prazo }));
    raiz.append(tituloEl);
    const etiquetas = criar('div', 'card-atividade-tags');
    etiquetas.append(tagDoTipo(tipo));
    if (mostrarTags) etiquetas.append(...tags.map((rotulo) => tag({ rotulo })));
    raiz.append(etiquetas);
    if (mostrarProcesso && processo) {
      const numero = criar('div', 'card-atividade-processo');
      numero.append(numeroDoProcesso(processo));
      if (copiarNumero) numero.append(botaoCopiar(processo));
      raiz.append(numero);
    }
    if (mostrarResponsavel && responsavel) raiz.append(avatar({ nome: responsavel, mostrarNome: true }));

    if (aoAbrir) {
      raiz.addEventListener('click', (e) => { if (!e.target.closest('button, a')) aoAbrir(); });
      raiz.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target === raiz) aoAbrir(); });
    }
    return raiz;
  }

  const CAMPOS_DO_CONTATO = [['email', 'E-mail'], ['telefone', 'Telefone'], ['processo', 'Processo']];

  // O cartão inteiro abre a ficha. Pelo teclado, abre o botão do nome.
  function cardContato(props = {}) {
    const { nome, tipo, acoes = [], aoAbrir } = props;
    exigir(nome, 'cardContato', 'nome é obrigatório');
    const raiz = criar('article', 'card-contato');
    const topo = criar('div', 'card-contato-topo');
    const tituloEl = criar('h3', 'card-contato-nome');
    tituloEl.id = novoId('contato');
    raiz.setAttribute('aria-labelledby', tituloEl.id);
    if (aoAbrir) {
      const abrir = criarBotao('card-contato-abrir');
      abrir.textContent = nome;
      abrir.addEventListener('click', aoAbrir);
      tituloEl.append(abrir);
      raiz.addEventListener('click', (e) => { if (!e.target.closest('button, a')) aoAbrir(); });
    } else {
      tituloEl.textContent = nome;
    }
    const identidade = criar('div', 'card-contato-identidade');
    identidade.append(tituloEl);
    if (tipo) identidade.append(tag({ rotulo: tipo }));
    const inicial = avatar({ nome });
    inicial.removeAttribute('role');
    inicial.removeAttribute('aria-label');
    inicial.setAttribute('aria-hidden', 'true');
    topo.append(inicial, identidade);
    raiz.append(topo);

    // A leitura não mostra campo vazio (RF-11).
    const presentes = CAMPOS_DO_CONTATO.filter(([chave]) => props[chave]);
    if (presentes.length) {
      const lista = criar('dl', 'card-contato-dados');
      presentes.forEach(([chave, rotulo]) => lista.append(criar('dt', null, rotulo), criar('dd', null, props[chave])));
      raiz.append(lista);
    }
    if (acoes.length) {
      const rodape = acoesDaLinha(acoes);
      rodape.className = 'card-contato-acoes';
      raiz.append(rodape);
    }
    return raiz;
  }

  function celula(valor) {
    const td = criar('td');
    if (valor instanceof HTMLElement) td.append(valor);
    else if (valor === undefined || valor === null || valor === '') {
      const traco = criar('span', 'tabela-sem-dado', '—');
      traco.setAttribute('aria-hidden', 'true');
      td.append(traco, criar('span', 'visualmente-oculto', 'Não informado'));
    } else td.textContent = String(valor);
    return td;
  }

  function linhasDeEsqueleto(colunas, total) {
    return Array.from({ length: total }, () => {
      const tr = criar('tr', 'tabela-carregando');
      tr.append(...colunas.map(() => {
        const td = criar('td');
        const traco = criar('span', 'skeleton-traco');
        traco.setAttribute('aria-hidden', 'true');
        td.append(traco);
        return td;
      }));
      return tr;
    });
  }

  // colunas: pares [chave, rotulo]. linhas: objetos com as chaves; o valor é texto ou elemento.
  function tabela(props = {}) {
    const { rotulo, colunas, linhas = [], carregando = false, vazio, densidade = 'padrao' } = props;
    exigir(rotulo, 'tabela', 'rotulo é obrigatório');
    exigir(Array.isArray(colunas) && colunas.length && colunas.every((c) => Array.isArray(c) && c.length === 2),
      'tabela', 'colunas são pares [chave, rotulo]');
    exigir(DENSIDADES.includes(densidade), 'tabela', `densidade desconhecida "${densidade}"`);

    const quadro = criar('div', 'tabela-quadro');
    const tabelaEl = criar('table', `tabela tabela-${densidade}`);
    const legenda = criar('caption', 'visualmente-oculto', rotulo);
    legenda.id = novoId('tabela');
    // A tabela larga rola dentro do quadro, e o quadro entra no Tab para rolar pelo teclado.
    quadro.setAttribute('role', 'region');
    quadro.setAttribute('aria-labelledby', legenda.id);
    quadro.tabIndex = 0;

    const cabeca = criar('thead');
    const linhaCabeca = criar('tr');
    linhaCabeca.append(...colunas.map(([, texto]) => {
      const th = criar('th', null, texto);
      th.scope = 'col';
      return th;
    }));
    cabeca.append(linhaCabeca);

    const corpo = criar('tbody');
    if (carregando) {
      tabelaEl.setAttribute('aria-busy', 'true');
      corpo.append(...linhasDeEsqueleto(colunas, 3));
    } else if (!linhas.length) {
      const tr = criar('tr', 'tabela-vazia');
      const td = criar('td');
      td.colSpan = colunas.length;
      td.append(estadoVazio(vazio || { titulo: 'Nenhum registro encontrado.' }));
      tr.append(td);
      corpo.append(tr);
    } else {
      corpo.append(...linhas.map((linha) => {
        const tr = criar('tr');
        tr.append(...colunas.map(([chave]) => celula(linha[chave])));
        return tr;
      }));
    }
    tabelaEl.append(legenda, cabeca, corpo);
    quadro.append(tabelaEl);
    return quadro;
  }

  const PAGINAS_SEM_RETICENCIAS = 7;

  function paginasVisiveis(atual, total) {
    if (total <= PAGINAS_SEM_RETICENCIAS) return Array.from({ length: total }, (_, i) => i + 1);
    const perto = [1, atual - 1, atual, atual + 1, total].filter((p) => p >= 1 && p <= total);
    const unicas = [...new Set(perto)].sort((a, b) => a - b);
    return unicas.flatMap((p, i) => (i && p - unicas[i - 1] > 1 ? [null, p] : [p]));
  }

  function paginacao(props = {}) {
    const { pagina = 1, total, rotulo = 'Paginação', desabilitado, aoMudar } = props;
    exigir(Number.isInteger(total) && total > 1, 'paginacao', 'total é um inteiro maior que 1');
    exigir(Number.isInteger(pagina) && pagina >= 1 && pagina <= total, 'paginacao', `pagina fora de 1 a ${total}`);

    const raiz = criar('nav', 'paginacao');
    raiz.setAttribute('aria-label', rotulo);
    let atual = pagina;

    function ir(destino) {
      atual = destino;
      desenhar();
      raiz.querySelector('[aria-current="page"]').focus();
      if (aoMudar) aoMudar(atual);
    }

    function botaoDePagina(numero) {
      const el = criarBotao('paginacao-pagina');
      el.textContent = numero;
      el.setAttribute('aria-label', `Página ${numero}`);
      el.disabled = Boolean(desabilitado);
      if (numero === atual) el.setAttribute('aria-current', 'page');
      else el.addEventListener('click', () => ir(numero));
      return el;
    }

    function seta(iconeEsquerda, texto, destino) {
      const el = botao({ variante: 'icone', tamanho: 'pequeno', iconeEsquerda, rotulo: texto });
      el.disabled = Boolean(desabilitado) || destino < 1 || destino > total;
      el.addEventListener('click', () => ir(destino));
      return el;
    }

    function desenhar() {
      const lista = criar('ul', 'paginacao-lista');
      lista.append(...paginasVisiveis(atual, total).map((numero) => {
        const item = criar('li');
        if (numero === null) {
          const reticencias = criar('span', 'paginacao-reticencias', '…');
          reticencias.setAttribute('aria-hidden', 'true');
          item.append(reticencias);
        } else item.append(botaoDePagina(numero));
        return item;
      }));
      raiz.replaceChildren(seta('esquerda', 'Página anterior', atual - 1), lista, seta('direita', 'Próxima página', atual + 1));
      raiz.dataset.valor = String(atual);
    }

    desenhar();
    return raiz;
  }

  // --- navegação -------------------------------------------------------------

  const FOCAVEIS = 'button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

  function validarAbas({ rotulo, itens, valor }) {
    exigir(rotulo, 'abas', 'rotulo é obrigatório');
    exigir(Array.isArray(itens) && itens.length > 1, 'abas', 'itens precisa de ao menos duas abas');
    exigir(itens.every((i) => i.chave && i.rotulo), 'abas', 'cada aba tem chave e rotulo');
    const inicial = valor === undefined ? (itens.find((i) => !i.desabilitado) || {}).chave : valor;
    exigir(itens.some((i) => i.chave === inicial && !i.desabilitado), 'abas', `valor desconhecido ou desabilitado "${inicial}"`);
    return inicial;
  }

  function parDeAba(base, item, indice) {
    const aba = criarBotao('aba');
    aba.id = `${base}-aba-${indice}`;
    aba.setAttribute('role', 'tab');
    aba.disabled = Boolean(item.desabilitado);
    aba.textContent = item.rotulo;
    const painel = criar('div', 'abas-painel');
    painel.id = `${base}-painel-${indice}`;
    painel.setAttribute('role', 'tabpanel');
    painel.setAttribute('aria-labelledby', aba.id);
    painel.tabIndex = 0;
    aba.setAttribute('aria-controls', painel.id);
    if (item.conteudo) painel.append(...[].concat(item.conteudo));
    return { chave: item.chave, aba, painel };
  }

  // Padrão ARIA de abas, com ativação automática: a seta já mostra o painel.
  function abas(props = {}) {
    let atual = validarAbas(props);
    const raiz = criar('div', 'abas');
    const lista = criar('div', 'abas-lista');
    lista.setAttribute('role', 'tablist');
    lista.setAttribute('aria-label', props.rotulo);
    const base = novoId('abas');
    const pares = props.itens.map((item, indice) => parDeAba(base, item, indice));

    function aplicar() {
      pares.forEach(({ chave, aba, painel }) => {
        const marcada = chave === atual;
        aba.setAttribute('aria-selected', String(marcada));
        aba.tabIndex = marcada ? 0 : -1;
        painel.hidden = !marcada;
      });
      raiz.dataset.valor = atual;
    }

    function escolher(par, focar) {
      const mudou = par.chave !== atual;
      atual = par.chave;
      aplicar();
      if (focar) par.aba.focus();
      if (mudou && props.aoMudar) props.aoMudar(atual);
    }

    lista.addEventListener('keydown', (e) => {
      const livres = pares.filter((p) => !p.aba.disabled);
      const posicao = livres.findIndex((p) => p.aba === e.target);
      const destino = { ArrowRight: posicao + 1, ArrowLeft: posicao - 1, Home: 0, End: livres.length - 1 }[e.key];
      if (posicao < 0 || destino === undefined) return;
      e.preventDefault();
      escolher(livres[(destino + livres.length) % livres.length], true);
    });
    pares.forEach((par) => par.aba.addEventListener('click', () => escolher(par, false)));
    lista.append(...pares.map((p) => p.aba));
    raiz.append(lista, ...pares.map((p) => p.painel));
    aplicar();
    return raiz;
  }

  // A trilha do cabeçalho e esta peça saem da mesma função, em moldura.js.
  function trilha(props = {}) {
    const { itens } = props;
    exigir(window.Moldura, 'trilha', 'exige moldura.js carregado antes de componentes.js');
    exigir(Array.isArray(itens) && itens.length, 'trilha', 'itens precisa de ao menos um nível acima da página');
    exigir(itens.every((i) => i.rotulo && i.pagina), 'trilha', 'cada nível tem rotulo e pagina');
    const modelo = document.createElement('template');
    modelo.innerHTML = window.Moldura.htmlTrilha(itens);
    return modelo.content.firstElementChild;
  }

  function elementos(peca, valor, nome) {
    const lista = valor === undefined || valor === null ? [] : [].concat(valor);
    exigir(lista.every((el) => el instanceof Node), peca, `${nome} aceita só elementos montados`);
    return lista;
  }

  // itens: as peças de filtro já montadas. O resultado é lido pelo leitor de tela quando muda.
  function barraFiltros(props = {}) {
    const { rotulo, itens, aoLimpar } = props;
    exigir(rotulo, 'barraFiltros', 'rotulo é obrigatório');
    const filtros = elementos('barraFiltros', itens, 'itens');
    exigir(filtros.length, 'barraFiltros', 'itens precisa de ao menos um filtro');

    const el = criar('div', 'barra-filtros');
    el.setAttribute('role', 'group');
    el.setAttribute('aria-label', rotulo);
    const grupo = criar('div', 'barra-filtros-itens');
    grupo.append(...filtros);
    const resultado = criar('p', 'barra-filtros-resultado');
    resultado.setAttribute('role', 'status');
    const fim = criar('div', 'barra-filtros-fim');
    fim.append(resultado);
    const limpar = aoLimpar ? botao({ variante: 'texto', rotulo: 'Limpar filtros' }) : null;
    if (limpar) {
      limpar.addEventListener('click', aoLimpar);
      fim.append(limpar);
    }
    el.append(grupo, fim);

    function atualizar({ resultado: texto = '', ativos = 0, carregando = false } = {}) {
      exigir(Number.isInteger(ativos) && ativos >= 0, 'barraFiltros', 'ativos é um inteiro a partir de zero');
      resultado.replaceChildren(...(carregando ? [svg(GIRO, 'icone botao-giro'), 'Atualizando a lista'] : [texto]));
      el.toggleAttribute('aria-busy', carregando);
      if (limpar) {
        limpar.hidden = ativos === 0;
        limpar.textContent = ativos > 1 ? `Limpar ${ativos} filtros` : 'Limpar filtro';
      }
    }
    atualizar(props);
    return { el, atualizar };
  }

  // PA-27: uma camada só. Conteúdo novo troca dentro do painel com trocar(), sem abrir outra.
  // antesDeFechar: o X, o Esc e o Cancelar passam por ele; devolver false mantém o painel aberto.
  // fechar() fecha sempre, para quem já decidiu, como o Salvar.
  function painelLateral(props = {}) {
    const { aoFechar, antesDeFechar } = props;
    const el = criar('dialog', 'painel-lateral');
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    const tituloEl = criar('h2', 'painel-lateral-titulo');
    tituloEl.id = novoId('painel-titulo');
    el.setAttribute('aria-labelledby', tituloEl.id);
    const fecharEl = botaoFechar('Fechar painel', () => pedirFechar());
    fecharEl.dataset.acao = 'fechar-painel';
    const topo = criar('div', 'painel-lateral-topo');
    topo.append(tituloEl, fecharEl);
    const corpoEl = criar('div', 'painel-lateral-corpo');
    const rodapeEl = criar('div', 'painel-lateral-rodape');
    el.append(topo, corpoEl, rodapeEl);

    let origem = null;
    const controle = { el, abrir, fechar, pedirFechar, trocar };

    function focarInicio() {
      (corpoEl.querySelector(FOCAVEIS) || fecharEl).focus();
    }

    function trocar({ titulo, corpo, rodape } = {}) {
      exigir(titulo, 'painelLateral', 'titulo é obrigatório');
      const conteudo = elementos('painelLateral', corpo, 'corpo');
      exigir(conteudo.length, 'painelLateral', 'corpo é obrigatório');
      tituloEl.textContent = titulo;
      corpoEl.replaceChildren(...conteudo);
      rodapeEl.replaceChildren(...elementos('painelLateral', rodape, 'rodape'));
      rodapeEl.hidden = !rodapeEl.childElementCount;
      if (el.open) focarInicio();
    }

    function abrir(de) {
      ocuparCamada('painelLateral', controle);
      origem = de || document.activeElement;
      if (!el.isConnected) document.body.append(el);
      el.showModal();
      focarInicio();
    }

    function fechar() {
      if (el.open) el.close();
    }

    function pedirFechar() {
      if (!antesDeFechar || antesDeFechar() !== false) fechar();
    }

    // O Esc passa por pedirFechar. Peça interna que trata o próprio Esc chama preventDefault,
    // e o painel fica aberto. O cancel cobre o Esc que chega ao dialog sem passar pelo keydown.
    el.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' || e.defaultPrevented) return;
      e.preventDefault();
      pedirFechar();
    });
    el.addEventListener('cancel', (e) => {
      e.preventDefault();
      pedirFechar();
    });
    // O close devolve o foco a quem abriu.
    el.addEventListener('close', () => {
      soltarCamada(controle);
      if (origem && origem.isConnected) origem.focus();
      origem = null;
      if (aoFechar) aoFechar();
    });
    trocar(props);
    return controle;
  }

  // --- criar atividade -------------------------------------------------------

  const PRIORIDADES = [['baixa', 'Baixa'], ['media', 'Média'], ['alta', 'Alta']];
  const LISTAS_DE_TAREFAS = [['escritorio', 'Tarefas do escritório']];
  // A ordem segue o Astrea: o modal de tarefa (tela 14) e o de evento (varredura, seção 2).
  // Prazo e audiência usam a ordem da tarefa, sem a lista; audiência ganha o local.
  const CAMPOS_DO_TIPO = {
    tarefa: ['descricao', 'data', 'avisoData', 'lista', 'processo', 'pessoas', 'prioridade'],
    prazo: ['descricao', 'data', 'avisoData', 'processo', 'pessoas', 'prioridade'],
    audiencia: ['descricao', 'data', 'avisoData', 'local', 'processo', 'pessoas', 'prioridade'],
    evento: ['titulo', 'data', 'avisoData', 'ate', 'diaInteiro', 'local', 'pessoas', 'observacoes', 'processo'],
  };

  function opcoesDePessoas(responsavel, pessoas) {
    const nomes = [...new Set([responsavel, ...pessoas].filter(Boolean))];
    exigir(nomes.length, 'painelCriarAtividade', 'precisa de ao menos uma pessoa');
    return nomes.map((nome) => [nome, nome]);
  }

  function camposDaAtividade({ responsavel, pessoas, aoMudarData, aoSalvarConcluida, dataInicial }) {
    // PA-57: a data passada avisa no próprio painel, sem segundo diálogo.
    const avisoData = faixaAviso({
      tipo: 'aviso',
      mensagem: 'Esta data já passou. A atividade entra na agenda nesse dia.',
      acao: { rotulo: 'Salvar como concluída', aoClicar: aoSalvarConcluida },
    });
    avisoData.dataset.aviso = 'data-passada';
    avisoData.hidden = true;
    return {
      // PA-56 fica no Backlog: a descrição segue como o único texto da tarefa.
      descricao: areaTexto({ rotulo: 'Descrição', obrigatorio: true, largura: 'total' }),
      titulo: campo({ rotulo: 'Título do evento', obrigatorio: true, largura: 'total' }),
      data: data({ rotulo: 'Data', obrigatorio: true, campo: 'data', valor: dataInicial || paraIso(new Date()), aoMudar: aoMudarData }),
      avisoData,
      ate: data({ rotulo: 'Até', campo: 'data-fim' }),
      diaInteiro: caixa({ rotulo: 'Dia inteiro' }),
      // PA-54: a lista tem um valor só, e ele já vem escolhido.
      lista: seletor({ rotulo: 'Lista de tarefas', obrigatorio: true, opcoes: LISTAS_DE_TAREFAS, valor: 'escritorio' }),
      local: campo({ rotulo: 'Endereço ou local', largura: 'total' }),
      processo: busca({ rotulo: 'Processo, caso ou atendimento', placeholder: 'Número do processo ou nome do cliente', largura: 'total' }),
      // PA-58: responsável e envolvidos no mesmo campo, sem popover.
      pessoas: seletorPessoas({
        rotulo: 'Responsável e envolvidos', obrigatorio: true,
        opcoes: opcoesDePessoas(responsavel, pessoas), valor: responsavel ? [responsavel] : [],
      }),
      // PA-55 aguarda dado: a prioridade segue nascendo Baixa.
      prioridade: seletor({ rotulo: 'Prioridade', obrigatorio: true, opcoes: PRIORIDADES, valor: 'baixa' }),
      observacoes: areaTexto({ rotulo: 'Observações', largura: 'total' }),
    };
  }

  // A foto do formulário: valor de máquina e texto digitado de cada campo.
  function fotoDosCampos(campos) {
    return Object.values(campos).map((el) => [el.dataset.valor ?? '',
      ...[...el.querySelectorAll('input, textarea')].map((entrada) => entrada.value)].join('|')).join('\n');
  }

  function confirmacaoDeSaida(aoVoltar, aoSair) {
    const el = criar('div', 'criar-atividade-saida');
    el.setAttribute('role', 'group');
    const pergunta = criar('p', 'criar-atividade-pergunta', 'Sair sem salvar? O que você preencheu se perde.');
    pergunta.id = novoId('saida');
    el.setAttribute('aria-labelledby', pergunta.id);
    const voltar = botao({ variante: 'secundario', rotulo: 'Continuar editando' });
    voltar.addEventListener('click', aoVoltar);
    const sair = botao({ variante: 'destrutivo', rotulo: 'Sair sem salvar' });
    sair.addEventListener('click', aoSair);
    el.append(pergunta, grupoBotoes([voltar, sair]));
    el.hidden = true;
    return { el, voltar };
  }

  // PA-27, PA-59 e PA-60: um painel só para os quatro tipos. Formulário vazio fecha
  // direto; com dado, a confirmação de saída troca o rodapé, sem outra camada.
  // Salvar dispara "atividade-criada" no document, com a atividade em detail.
  function montarCriarAtividade({ tipo: tipoInicial, responsavel, pessoas, data: dataInicial }) {
    let tipo = tipoInicial;
    let painel = null;
    const campos = camposDaAtividade({
      responsavel, pessoas, dataInicial,
      aoMudarData: (iso) => { campos.avisoData.hidden = !iso || iso >= paraIso(new Date()); },
      aoSalvarConcluida: () => salvar(true),
    });
    const formulario = criar('div', 'criar-atividade-campos');
    const tipoEl = radio({
      rotulo: 'Tipo', opcoes: Object.entries(TIPOS_DE_ATIVIDADE), valor: tipo,
      aoEscolher: (novo) => { tipo = novo; desenhar(); },
    });
    const barra = barraAcoes({
      rotulo: 'Ações da atividade',
      acoes: [
        { variante: 'texto', rotulo: 'Cancelar', aoClicar: () => painel.pedirFechar() },
        { variante: 'primario', rotulo: 'Salvar', aoClicar: () => salvar(false) },
      ],
    });
    const saida = confirmacaoDeSaida(() => mostrarSaida(false), () => painel.fechar());

    function desenhar() {
      formulario.replaceChildren(...CAMPOS_DO_TIPO[tipo].map((chave) => campos[chave]));
    }

    function mostrarSaida(mostrar) {
      saida.el.hidden = !mostrar;
      barra.el.hidden = mostrar;
      (mostrar ? saida.voltar : barra.el.querySelector('button')).focus();
    }

    function salvar(concluida) {
      const texto = campos[tipo === 'evento' ? 'titulo' : 'descricao'];
      const valores = { titulo: texto.dataset.valor.trim(), data: campos.data.dataset.valor };
      const faltam = [!valores.titulo && texto, !valores.data && campos.data].filter(Boolean);
      if (faltam.length) {
        barra.definirSituacao('erro', 'Preencha os campos obrigatórios marcados com *.');
        faltam[0].querySelector('input, textarea').focus();
        return;
      }
      const [primeira] = campos.pessoas.dataset.valor.split(',').filter(Boolean);
      document.dispatchEvent(new CustomEvent('atividade-criada', {
        detail: {
          tipo, ...valores, concluida, responsavel: primeira || '',
          processo: campos.processo.dataset.valor.trim(), prioridade: campos.prioridade.dataset.valor,
        },
      }));
      painel.fechar();
    }

    desenhar();
    const inicial = fotoDosCampos(campos);
    painel = painelLateral({
      titulo: 'Nova atividade',
      corpo: [tipoEl, formulario],
      rodape: [barra.el, saida.el],
      antesDeFechar: () => {
        if (fotoDosCampos(campos) === inicial) return true;
        mostrarSaida(true);
        return false;
      },
      aoFechar: () => painel.el.remove(),
    });
    return painel;
  }

  // Cada abertura monta um formulário novo. pessoas: os nomes que o seletor oferece;
  // o responsável padrão é o usuário da moldura.
  function painelCriarAtividade(props = {}) {
    const { tipo = 'tarefa', pessoas = (window.DADOS && window.DADOS.RESPONSAVEIS) || [], data } = props;
    const { responsavel = window.Moldura && window.Moldura.USUARIO } = props;
    exigir(CAMPOS_DO_TIPO[tipo], 'painelCriarAtividade', `tipo desconhecido "${tipo}"`);
    exigir(Array.isArray(pessoas), 'painelCriarAtividade', 'pessoas é uma lista de nomes');
    return { abrir: (origem) => montarCriarAtividade({ tipo, responsavel, pessoas, data }).abrir(origem) };
  }

  // PA-30: o resultado da ação aparece na barra, junto do botão. Toast só para o que está fora da tela.
  const SITUACOES_DA_BARRA = {
    padrao: { icone: null, texto: '' },
    salvando: { icone: 'giro', texto: 'Salvando…' },
    salvo: { icone: 'marca', texto: 'Salvo' },
    erro: { icone: 'alerta', texto: 'Não foi possível salvar.' },
  };

  function botaoDaBarra(acao, ocupada) {
    const el = botao(acao);
    if (acao.bloqueio) {
      el.disabled = true;
      const motivo = criar('p', 'barra-acoes-motivo', acao.bloqueio);
      motivo.id = novoId('motivo');
      el.setAttribute('aria-describedby', motivo.id);
      return { el, motivo };
    }
    el.addEventListener('click', () => { if (!ocupada() && acao.aoClicar) acao.aoClicar(); });
    return { el, motivo: null };
  }

  // acoes: as props de DS.botao, com aoClicar e bloqueio (o motivo, em texto, de o botão estar desligado).
  function barraAcoes(props = {}) {
    const { rotulo, acoes, situacao = 'padrao', mensagem } = props;
    exigir(rotulo, 'barraAcoes', 'rotulo é obrigatório');
    exigir(Array.isArray(acoes) && acoes.length, 'barraAcoes', 'acoes precisa de ao menos uma ação');

    const el = criar('div', 'barra-acoes');
    el.setAttribute('role', 'group');
    el.setAttribute('aria-label', rotulo);
    const status = criar('p', 'barra-acoes-status');
    status.setAttribute('role', 'status');
    const alerta = criar('p', 'barra-acoes-status barra-acoes-erro');
    alerta.setAttribute('role', 'alert');
    const lugar = criar('div', 'barra-acoes-situacao');
    lugar.append(status, alerta);

    let atual = situacao;
    const pares = acoes.map((acao) => botaoDaBarra(acao, () => atual === 'salvando'));
    const fim = criar('div', 'barra-acoes-fim');
    fim.append(grupoBotoes(pares.map((p) => p.el)), ...pares.filter((p) => p.motivo).map((p) => p.motivo));
    el.append(lugar, fim);

    function definirSituacao(nova, texto) {
      const meta = SITUACOES_DA_BARRA[nova];
      exigir(meta, 'barraAcoes', `situação desconhecida "${nova}"`);
      atual = nova;
      el.dataset.situacao = nova;
      const frase = texto || meta.texto;
      let marca = null;
      if (meta.icone) marca = meta.icone === 'giro' ? svg(GIRO, 'icone botao-giro') : icone(meta.icone);
      const conteudo = frase ? [marca, frase].filter(Boolean) : [];
      status.replaceChildren(...(nova === 'erro' ? [] : conteudo));
      alerta.replaceChildren(...(nova === 'erro' ? conteudo : []));
      pares.forEach(({ el: b, motivo }) => {
        if (motivo) return;
        if (nova === 'salvando') b.setAttribute('aria-disabled', 'true');
        else b.removeAttribute('aria-disabled');
      });
    }
    definirSituacao(situacao, mensagem);
    return { el, definirSituacao };
  }

  function validarStepper({ rotulo, passos, atual, erro }) {
    exigir(rotulo, 'stepper', 'rotulo é obrigatório');
    exigir(Array.isArray(passos) && passos.length > 1 && passos.every(Boolean), 'stepper', 'passos precisa de ao menos dois rótulos');
    exigir(Number.isInteger(atual) && atual >= 0 && atual <= passos.length, 'stepper', `atual fora de 0 a ${passos.length}`);
    exigir(erro === undefined || (Number.isInteger(erro) && erro >= 0 && erro < passos.length), 'stepper', 'erro é o índice de um passo');
  }

  const LEITURA_DO_PASSO = { feito: ', concluído', erro: ', com erro', atual: ', passo atual', pendente: '' };

  function passoDoStepper(texto, indice, { atual, erro, aoIr }) {
    let situacao = 'pendente';
    if (indice === erro) situacao = 'erro';
    else if (indice < atual) situacao = 'feito';
    else if (indice === atual) situacao = 'atual';

    const item = criar('li', `stepper-passo stepper-${situacao}`);
    if (indice === atual) item.setAttribute('aria-current', 'step');
    const marca = criar('span', 'stepper-marca');
    marca.setAttribute('aria-hidden', 'true');
    if (situacao === 'feito') marca.append(icone('marca'));
    else if (situacao === 'erro') marca.append(icone('alerta'));
    else marca.textContent = String(indice + 1);
    const partes = [marca, criar('span', 'stepper-nome', texto)];
    if (LEITURA_DO_PASSO[situacao]) partes.push(criar('span', 'visualmente-oculto', LEITURA_DO_PASSO[situacao]));

    // Só o passo feito volta. O passo seguinte não é botão: o caminho segue em ordem.
    const voltavel = aoIr && indice < atual;
    const alvo = voltavel ? criarBotao('stepper-ir') : criar('span', 'stepper-ir');
    alvo.append(...partes);
    if (voltavel) alvo.addEventListener('click', () => aoIr(indice));
    item.append(alvo);
    return item;
  }

  // PA-28: a peça única para passo a passo e progresso de formulário. atual igual ao total é o fim.
  function stepper(props = {}) {
    const opcoes = { atual: 0, ...props };
    validarStepper(opcoes);
    const { rotulo, passos, atual } = opcoes;
    const raiz = criar('div', 'stepper');
    raiz.setAttribute('role', 'group');
    raiz.setAttribute('aria-label', rotulo);
    const leitura = atual === passos.length ? 'Todos os passos concluídos' : `Passo ${atual + 1} de ${passos.length}`;
    const lista = criar('ol', 'stepper-lista');
    lista.append(...passos.map((texto, indice) => passoDoStepper(texto, indice, opcoes)));
    raiz.append(criar('p', 'stepper-leitura', leitura), lista);
    raiz.dataset.valor = String(atual);
    return raiz;
  }

  window.DS = {
    ICONES: Object.keys(ICONES), icone, botao, grupoBotoes, menuAcoes,
    campo, areaTexto, busca, seletor, seletorMultiplo, seletorPessoas, data, periodo, caixa, radio, chave,
    toast, faixaAviso, dialogo, tooltip, progresso, skeleton, estadoVazio, upsell,
    descreverPrazo, chipPrazo, chipFiltro, tag, selo, avatar, tabela, linhaAtividade, cardAtividade, cardContato, paginacao,
    abas, trilha, barraFiltros, painelLateral, barraAcoes, stepper, painelCriarAtividade,
  };
})();
