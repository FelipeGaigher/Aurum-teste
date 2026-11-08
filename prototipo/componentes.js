// Componentes do design system. Não depende da moldura: uma tela pode usar as
// peças sem o cabeçalho e o menu. Entrada fora do contrato vira erro nomeado.
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

  window.DS = { ICONES: Object.keys(ICONES), icone, botao, grupoBotoes, menuAcoes };
})();
