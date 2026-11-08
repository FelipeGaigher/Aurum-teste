// Moldura compartilhada: cabeçalho, menu lateral, tema e recolher.
// Entra no head. O tema vale já no carregamento, antes da primeira pintura;
// o HTML da moldura nasce quando o corpo da página existe.
(function () {
  const CHAVE_TEMA = 'astrea-tema';
  const CHAVE_MENU = 'astrea-menu';
  const USUARIO = 'Marina Couto';
  const GRUPO_ESPECIALISTA = 'Especialista UX/UI';

  const ICONES = {
    kanban: '<path d="M4 4h4v16H4zM10 4h4v11h-4zM16 4h4v7h-4z"/>',
    camadas: '<path d="M12 3 3 8l9 5 9-5zM3 13l9 5 9-5"/>',
    lista: '<path d="M9 6h11M9 12h11M9 18h11M4 6h1M4 12h1M4 18h1"/>',
    agenda: '<path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4"/>',
    pessoa: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
    balao: '<path d="M4 5h16v11H10l-6 4z"/>',
    pasta: '<path d="M3 6h6l2 2h10v11H3z"/>',
    jornal: '<path d="M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h7"/>',
    moeda: '<path d="M12 3v18M16 7.5C15 6 13.6 5.5 12 5.5c-2.2 0-4 1-4 3s1.8 2.6 4 3.2 4 1.2 4 3.3-1.8 3.2-4 3.2c-1.7 0-3.1-.6-4-2"/>',
    clipe: '<path d="M19 11l-7.5 7.5a4.6 4.6 0 0 1-6.5-6.5L13 4a3 3 0 0 1 4.3 4.3l-7.6 7.6a1.5 1.5 0 0 1-2.1-2.1L14.5 7"/>',
    grafico: '<path d="M4 4v16h16M8 15l4-4 3 3 5-6"/>',
    sino: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"/>',
    ajuda: '<circle cx="12" cy="12" r="9"/><path d="M9.6 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.7M12 17h.01"/>',
    chip: '<rect x="7" y="7" width="10" height="10"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
    recolher: '<path d="M11 7l-5 5 5 5M18 7l-5 5 5 5"/>',
    lupa: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
    mais: '<path d="M12 5v14M5 12h14"/>',
    cronometro: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 3h6"/>',
    cadeado: '<rect x="5" y="11" width="14" height="9" rx="1"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    lua: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    seta: '<path d="M8 10l4 4 4-4"/>',
    esquerda: '<path d="M14 6l-6 6 6 6"/>',
    questionario: '<path d="M8 4h8v3H8zM6 5.5H4V21h16V5.5h-2M8 12h8M8 16h8"/>',
  };

  const MENU = [
    { rotulo: 'Questionários', pagina: 'questionarios.html', icone: 'questionario', grupo: GRUPO_ESPECIALISTA },
    { rotulo: 'Gestão kanban', pagina: 'kanban.html', icone: 'kanban', grupo: GRUPO_ESPECIALISTA },
    { rotulo: 'Design system', pagina: 'design-system.html', icone: 'camadas', grupo: GRUPO_ESPECIALISTA },
    { rotulo: 'Área de trabalho', pagina: 'area-de-trabalho.html', icone: 'lista' },
    { rotulo: 'Agenda', pagina: 'agenda.html', icone: 'agenda' },
    { rotulo: 'Contatos', pagina: 'contatos.html', icone: 'pessoa' },
    { rotulo: 'Atendimentos', pagina: 'atendimentos.html', icone: 'balao' },
    { rotulo: 'Processos e casos', pagina: 'processos.html', icone: 'pasta' },
    { rotulo: 'Publicações', pagina: 'publicacoes.html', icone: 'jornal' },
    { rotulo: 'Financeiro', pagina: 'financeiro.html', icone: 'moeda' },
    { rotulo: 'Documentos', pagina: 'documentos.html', icone: 'clipe' },
    { rotulo: 'Indicadores', pagina: 'indicadores.html', icone: 'grafico' },
    { rotulo: 'Alertas', pagina: 'alertas.html', icone: 'sino' },
    { rotulo: 'Suporte', pagina: 'suporte.html', icone: 'ajuda' },
    { rotulo: 'Conheça as IAs', pagina: 'ias.html', icone: 'chip' },
  ];

  // Página de segundo nível: marca o item do módulo e ganha trilha (M14, M16).
  const MODULO_DA_PAGINA = { 'buscas.html': 'processos.html' };

  const PLANO = 'administracao.html#plano';

  // Fonte única do menu Adicionar (PA-24). O que pede upgrade fica no fim (PA-26).
  const ITENS_ADICIONAR = [
    { rotulo: 'Processo manual', destino: 'processos.html?adicionar=processo' },
    { rotulo: 'Processo busca automática', destino: 'processos.html?adicionar=busca' },
    { rotulo: 'Caso', destino: 'processos.html?adicionar=caso' },
    { rotulo: 'Atendimento', destino: 'atendimentos.html?adicionar=1' },
    // Tarefa e Evento abrem o painel de criar atividade na própria página. Sem
    // componentes.js, o link leva à Agenda, que abre o painel pelo parâmetro criar.
    { rotulo: 'Tarefa', destino: 'agenda.html?criar=tarefa', criar: 'tarefa' },
    { rotulo: 'Evento', destino: 'agenda.html?criar=evento', criar: 'evento' },
    { rotulo: 'Contato', destino: 'contatos.html?adicionar=1' },
  ];
  const ITENS_ADICIONAR_UPGRADE = [
    { rotulo: 'Honorário', destino: PLANO },
    { rotulo: 'Honorário com % no êxito', destino: PLANO },
    { rotulo: 'Despesa', destino: PLANO },
    { rotulo: 'Timesheet', destino: PLANO },
  ];

  const ITENS_USUARIO = [
    { rotulo: 'Meu perfil' },
    { rotulo: 'Meu plano', destino: PLANO },
    { rotulo: 'Administração', destino: 'administracao.html' },
    { rotulo: 'Sair' },
  ];

  function lerChave(chave) {
    try { return localStorage.getItem(chave); } catch (e) { return null; }
  }

  function gravarChave(chave, valor) {
    try { localStorage.setItem(chave, valor); } catch (e) { /* sem armazenamento */ }
  }

  // --- tema ------------------------------------------------------------------

  const sistema = window.matchMedia('(prefers-color-scheme: dark)');
  let temaSalvo = lerChave(CHAVE_TEMA);
  if (temaSalvo !== 'claro' && temaSalvo !== 'escuro') temaSalvo = null;

  function aplicarTemaNoDocumento() {
    if (temaSalvo) document.documentElement.dataset.tema = temaSalvo;
    else delete document.documentElement.dataset.tema;
  }
  aplicarTemaNoDocumento();

  function ligarTema() {
    const botao = document.getElementById('alternar-tema');
    const dica = botao.parentElement.querySelector('.dica');
    const aplicar = () => {
      aplicarTemaNoDocumento();
      const escuro = temaSalvo ? temaSalvo === 'escuro' : sistema.matches;
      const texto = escuro ? 'Usar tema claro' : 'Usar tema escuro';
      botao.setAttribute('aria-pressed', String(escuro));
      botao.setAttribute('aria-label', texto);
      dica.textContent = texto;
    };
    aplicar();
    sistema.addEventListener('change', aplicar);
    botao.addEventListener('click', () => {
      temaSalvo = botao.getAttribute('aria-pressed') === 'true' ? 'claro' : 'escuro';
      gravarChave(CHAVE_TEMA, temaSalvo);
      aplicar();
    });
  }

  // --- recolher --------------------------------------------------------------

  function ligarRecolher() {
    const botao = document.getElementById('recolher-menu');
    const aplicar = (recolhido) => {
      document.body.toggleAttribute('data-menu', recolhido);
      if (recolhido) document.body.setAttribute('data-menu', 'recolhido');
      botao.setAttribute('aria-expanded', String(!recolhido));
      const texto = recolhido ? 'Expandir menu' : 'Recolher menu';
      botao.title = texto;
      botao.setAttribute('aria-label', texto);
      document.querySelectorAll('.menu-lateral a').forEach((a) => {
        const r = a.querySelector('.rotulo');
        if (r) a.title = recolhido ? r.textContent : '';
      });
    };
    let salvo = lerChave(CHAVE_MENU);
    // No celular o menu fica sempre recolhido; a escolha salva volta a valer na tela larga.
    const estreito = window.matchMedia('(max-width: 700px)');
    const sincronizar = () => aplicar(estreito.matches || salvo === 'recolhido');
    sincronizar();
    estreito.addEventListener('change', sincronizar);
    botao.addEventListener('click', () => {
      const recolhido = document.body.getAttribute('data-menu') !== 'recolhido';
      salvo = recolhido ? 'recolhido' : 'aberto';
      aplicar(recolhido);
      gravarChave(CHAVE_MENU, salvo);
    });
  }

  // --- menus do cabeçalho ----------------------------------------------------

  function ligarMenu(botao, lista) {
    const itens = () => [...lista.querySelectorAll('[role="menuitem"]')];
    const aberto = () => !lista.hidden;
    const fechar = (devolverFoco) => {
      lista.hidden = true;
      botao.setAttribute('aria-expanded', 'false');
      if (devolverFoco) botao.focus();
    };
    const abrir = () => {
      lista.hidden = false;
      botao.setAttribute('aria-expanded', 'true');
      itens()[0].focus();
    };
    const mover = (passo) => {
      const todos = itens();
      const atual = todos.indexOf(document.activeElement);
      todos[(atual + passo + todos.length) % todos.length].focus();
    };
    const TECLAS = {
      ArrowDown: () => mover(1),
      ArrowUp: () => mover(-1),
      Home: () => itens()[0].focus(),
      End: () => itens().at(-1).focus(),
      Escape: () => fechar(true),
    };
    botao.addEventListener('click', () => (aberto() ? fechar(false) : abrir()));
    lista.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') { fechar(false); return; }
      if (!TECLAS[e.key]) return;
      e.preventDefault();
      TECLAS[e.key]();
    });
    document.addEventListener('click', (e) => {
      if (aberto() && !botao.contains(e.target) && !lista.contains(e.target)) fechar(false);
    });
    return { fechar };
  }

  // O painel nasce de componentes.js; a moldura só o chama, e o foco volta ao Adicionar.
  function ligarCriarAtividade(botao, lista, menu) {
    lista.addEventListener('click', (e) => {
      const item = e.target.closest('[data-criar]');
      if (!item || !window.DS || !window.DS.painelCriarAtividade) return;
      e.preventDefault();
      menu.fechar(false);
      window.DS.painelCriarAtividade({ tipo: item.dataset.criar }).abrir(botao);
    });
  }

  // --- notificações ----------------------------------------------------------

  // O sino conta as não lidas de dados.js. Página que não carrega dados.js recebe o arquivo aqui.
  function garantirDados(pronto) {
    if (window.DADOS && window.DADOS.notificacoes) { pronto(); return; }
    const script = document.createElement('script');
    script.src = 'dados.js';
    script.addEventListener('load', pronto);
    document.head.append(script);
  }

  function atualizarSino(botao) {
    const total = window.DADOS && window.DADOS.contarNaoLidas ? window.DADOS.contarNaoLidas() : 0;
    const marca = botao.querySelector('.atalho-contagem');
    marca.textContent = String(total);
    marca.hidden = total === 0;
    botao.setAttribute('aria-label', total ? `Notificações, ${total} ${total === 1 ? 'não lida' : 'não lidas'}` : 'Notificações');
  }

  // O painel nasce de componentes.js a cada abertura, com as notificações do momento.
  // Sem componentes.js, o sino leva à página de Alertas.
  function ligarNotificacoes(botao) {
    garantirDados(() => atualizarSino(botao));
    botao.addEventListener('click', () => {
      if (!window.DS || !window.DS.painelNotificacoes) { window.location.href = 'alertas.html'; return; }
      const itens = window.DADOS && window.DADOS.notificacoes ? window.DADOS.notificacoes() : [];
      const marcar = (ids) => {
        if (window.DADOS && window.DADOS.marcarLidas) window.DADOS.marcarLidas(ids);
        atualizarSino(botao);
      };
      const painel = window.DS.painelNotificacoes({
        itens,
        aoAbrir: (item) => marcar([item.id]),
        aoMarcarLidos: marcar,
      });
      painel.el.addEventListener('close', () => {
        botao.setAttribute('aria-expanded', 'false');
        painel.el.remove();
      });
      painel.abrir(botao);
      if (painel.el.open) botao.setAttribute('aria-expanded', 'true');
    });
  }

  // --- HTML ------------------------------------------------------------------

  function svg(nome, classe) {
    return `<svg class="${classe || 'icone'}" viewBox="0 0 24 24" aria-hidden="true">${ICONES[nome]}</svg>`;
  }

  function htmlItemSuspenso(item, pagina) {
    if (!item.destino) {
      return `<button type="button" role="menuitem" aria-disabled="true">${item.rotulo}</button>`;
    }
    const atual = item.destino === pagina ? ' aria-current="page"' : '';
    const criar = item.criar ? ` data-criar="${item.criar}" aria-haspopup="dialog"` : '';
    return `<a role="menuitem" href="${item.destino}"${atual}${criar}>${item.rotulo}</a>`;
  }

  function htmlListaSuspensa(id, rotulo, itens, pagina, upgrade) {
    const grupo = upgrade
      ? `<div class="menu-suspenso-grupo" role="group" aria-labelledby="${id}-upgrade">
          <div class="menu-suspenso-rotulo" id="${id}-upgrade">Disponível com upgrade</div>
          ${upgrade.map((i) => htmlItemSuspenso(i, pagina)).join('')}
        </div>`
      : '';
    return `<div class="menu-suspenso" id="${id}" role="menu" aria-label="${rotulo}" hidden>
        ${itens.map((i) => htmlItemSuspenso(i, pagina)).join('')}
        ${grupo}
      </div>`;
  }

  const ENTIDADES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, (c) => ENTIDADES[c]);
  }

  // Os níveis acima da página, do mais alto ao mais próximo. A página atual é o título.
  // DS.trilha usa esta mesma função.
  // A trilha é o caminho de volta padrão das páginas de segundo nível: seta e nome do módulo, no cabeçalho.
  function htmlTrilha(niveis) {
    const itens = niveis.map((n, i) => `<li><a href="${escapar(n.pagina)}">${i === 0 ? svg('esquerda') : ''}${escapar(n.rotulo)}</a></li>`);
    return `<nav class="trilha" aria-label="Trilha"><ol>${itens.join('')}</ol></nav>`;
  }

  function htmlTrilhaDaPagina(pagina) {
    const modulo = MENU.find((i) => i.pagina === MODULO_DA_PAGINA[pagina]);
    return modulo ? htmlTrilha([modulo]) : '';
  }

  function htmlCabecalho(pagina) {
    return `<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="cabecalho">
  <div class="marca">
    <a class="logo" href="area-de-trabalho.html" aria-label="Astrea, Área de trabalho">
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <rect class="logo-marca" x="0" y="4" width="24" height="24" rx="3"/>
        <rect class="logo-recorte" x="14" y="0" width="14" height="14"/>
        <rect class="logo-marca" x="18" y="0" width="10" height="10" rx="2"/>
      </svg>
      <span aria-hidden="true">astrea</span>
    </a>
    <button type="button" class="recolher" id="recolher-menu" aria-expanded="true" aria-controls="menu-principal">${svg('recolher')}</button>
  </div>

  <div class="titulo-cabecalho">
    <h1></h1>
    ${htmlTrilhaDaPagina(pagina)}
  </div>

  <div class="acoes">
    <form class="busca" role="search" onsubmit="event.preventDefault()">
      <label for="busca-global" class="visualmente-oculto">Pesquisar</label>
      <div class="busca-campo">
        <input id="busca-global" type="search" placeholder="Pesquisar contato, processo ou atividade" autocomplete="off">
        ${svg('lupa')}
      </div>
    </form>

    <ul class="atalhos">
      <li>
        <a class="atalho atalho-ia" href="ias.html" aria-label="Conheça as IAs">IA</a>
        <span class="dica" role="tooltip">Conheça as IAs</span>
      </li>
      <li>
        <button type="button" class="atalho" id="abrir-adicionar" aria-label="Adicionar" aria-haspopup="menu" aria-expanded="false" aria-controls="menu-adicionar">${svg('mais')}</button>
        <span class="dica" role="tooltip">Adicionar</span>
        ${htmlListaSuspensa('menu-adicionar', 'Adicionar', ITENS_ADICIONAR, pagina, ITENS_ADICIONAR_UPGRADE)}
      </li>
      <li>
        <button type="button" class="atalho" aria-disabled="true" aria-label="Cronômetro, bloqueado no plano atual">${svg('cronometro')}${svg('cadeado', 'icone selo-bloqueio')}</button>
        <span class="dica" role="tooltip">Cronômetro: disponível em planos superiores</span>
      </li>
      <li>
        <button type="button" class="atalho" id="alternar-tema" aria-pressed="false" aria-label="Usar tema escuro">${svg('lua')}</button>
        <span class="dica" role="tooltip">Usar tema escuro</span>
      </li>
      <li>
        <button type="button" class="atalho atalho-sino" id="abrir-notificacoes" data-abre-painel aria-haspopup="dialog" aria-expanded="false" aria-label="Notificações">${svg('sino')}<span class="atalho-contagem" aria-hidden="true" hidden></span></button>
        <span class="dica" role="tooltip">Notificações</span>
      </li>
    </ul>

    <div class="usuario-area">
      <button type="button" class="usuario" id="abrir-usuario" aria-label="${USUARIO}, menu do usuário" aria-haspopup="menu" aria-expanded="false" aria-controls="menu-usuario">
        <span class="usuario-nome">${USUARIO}</span>
        ${svg('seta')}
      </button>
      ${htmlListaSuspensa('menu-usuario', 'Menu do usuário', ITENS_USUARIO, pagina)}
    </div>
  </div>
</header>`;
  }

  // Item do menu. O design system monta a miniatura com esta mesma função.
  // selo: { rotulo, descricao }; selo sem explicação não entra (PA-29).
  function htmlItemMenu({ pagina, icone, rotulo, selo, ativo = false, recolhido = false }) {
    if (!ICONES[icone]) throw new Error(`Moldura.htmlItemMenu: ícone desconhecido "${icone}"`);
    if (selo && !(selo.rotulo && selo.descricao)) throw new Error('Moldura.htmlItemMenu: selo exige rotulo e descricao (PA-29)');
    const atual = ativo ? ' aria-current="page"' : '';
    const dica = recolhido ? ` title="${escapar(rotulo)}"` : '';
    const marca = selo
      ? `<span class="selo" title="${escapar(selo.descricao)}">${escapar(selo.rotulo)}<span class="visualmente-oculto">: ${escapar(selo.descricao)}</span></span>`
      : '';
    return `<a class="item-menu${recolhido ? ' is-recolhido' : ''}" href="${escapar(pagina)}"${atual}${dica}>`
      + `${svg(icone)}<span class="rotulo">${escapar(rotulo)}</span>${marca}</a>`;
  }

  function htmlLista(itens, ativa, atributos) {
    const linhas = itens.map((item) => `<li>${htmlItemMenu({ ...item, ativo: item.pagina === ativa })}</li>`);
    return `<ul ${atributos}>${linhas.join('')}</ul>`;
  }

  function htmlMenuLateral(pagina) {
    const ativa = MODULO_DA_PAGINA[pagina] || pagina;
    const especialista = MENU.filter((i) => i.grupo === GRUPO_ESPECIALISTA);
    const modulos = MENU.filter((i) => !i.grupo);
    return `<nav class="menu-lateral" id="menu-principal" aria-label="Menu principal">
    <p class="menu-grupo" id="grupo-especialista">${GRUPO_ESPECIALISTA}</p>
    ${htmlLista(especialista, ativa, 'aria-labelledby="grupo-especialista"')}
    <hr>
    ${htmlLista(modulos, ativa, 'aria-label="Módulos do Astrea"')}
    <div class="rodape-menu">
      <span aria-label="12 dias restantes do teste">12 dias</span>
      <span>1 ano grátis</span>
      <a href="${PLANO}">Contratar</a>
    </div>
  </nav>`;
  }

  // --- montagem --------------------------------------------------------------

  function montar() {
    if (document.querySelector('.cabecalho')) return;
    const pagina = document.body.dataset.pagina;
    document.body.insertAdjacentHTML('afterbegin', htmlCabecalho(pagina));
    document.querySelector('.cabecalho h1').textContent = document.body.dataset.titulo;
    document.querySelector('.corpo').insertAdjacentHTML('afterbegin', htmlMenuLateral(pagina));
    ligarTema();
    ligarRecolher();
    const adicionar = document.getElementById('abrir-adicionar');
    const listaAdicionar = document.getElementById('menu-adicionar');
    ligarCriarAtividade(adicionar, listaAdicionar, ligarMenu(adicionar, listaAdicionar));
    ligarMenu(document.getElementById('abrir-usuario'), document.getElementById('menu-usuario'));
    ligarNotificacoes(document.getElementById('abrir-notificacoes'));
  }

  window.Moldura = { MENU, USUARIO, montar, htmlItemMenu, htmlTrilha };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar);
  else montar();
})();
