// Módulo Questionários: uma aba por questão, perguntas à esquerda e a resposta à direita.
// O divisor segue o padrão window splitter da WAI-ARIA. Sem escolha, mostra a primeira pergunta.
(function () {
  const MIN = 260;
  const PADRAO = 320;
  const MAX = 480;
  const PASSO = 16;
  const CHAVE_LARGURA = 'astrea-questionarios-largura';

  const raiz = document.getElementById('questionarios');
  const questoes = [...raiz.querySelectorAll('[data-questao]')];
  const divisores = [...raiz.querySelectorAll('.qa-divisor')];
  const estreito = window.matchMedia('(max-width: 900px)');
  const url = new URLSearchParams(location.search);
  const limitar = (valor) => Math.min(MAX, Math.max(MIN, valor));
  let largura = PADRAO;

  function ler() {
    try { return Number(localStorage.getItem(CHAVE_LARGURA)); } catch (e) { return 0; }
  }

  function gravar() {
    try { localStorage.setItem(CHAVE_LARGURA, String(largura)); } catch (e) { /* sem armazenamento */ }
  }

  function aplicarLargura(valor) {
    largura = limitar(valor);
    raiz.style.setProperty('--qa-largura', `${largura}px`);
    divisores.forEach((d) => d.setAttribute('aria-valuenow', String(largura)));
  }

  function concluirLargura(valor) {
    aplicarLargura(valor);
    gravar();
  }

  function marcarNaUrl(questao, pergunta) {
    const proxima = new URLSearchParams({ questao, pergunta });
    try { history.replaceState(null, '', `?${proxima}`); } catch (e) { /* file:// em alguns navegadores */ }
  }

  function escolher(painel, id, peloUsuario) {
    painel.querySelectorAll('[data-pergunta]').forEach((b) => {
      const marcada = b.dataset.pergunta === id;
      b.classList.toggle('is-selecionado', marcada);
      b.setAttribute('aria-pressed', String(marcada));
    });
    painel.querySelectorAll('[data-resposta]').forEach((r) => { r.hidden = r.dataset.resposta !== id; });
    painel.dataset.atual = id;
    if (!peloUsuario) return;
    marcarNaUrl(painel.dataset.questao, id);
    const colunaRespostas = painel.querySelector('.qa-respostas');
    if (estreito.matches || colunaRespostas.getBoundingClientRect().top < 0) colunaRespostas.scrollIntoView({ block: 'start' });
  }

  function ligarDivisor(divisor) {
    let inicio = null;
    divisor.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      divisor.setPointerCapture(e.pointerId);
      inicio = { x: e.clientX, largura };
    });
    divisor.addEventListener('pointermove', (e) => {
      if (inicio) aplicarLargura(inicio.largura + e.clientX - inicio.x);
    });
    const soltar = (e) => {
      if (!inicio) return;
      divisor.releasePointerCapture(e.pointerId);
      inicio = null;
      concluirLargura(largura);
    };
    divisor.addEventListener('pointerup', soltar);
    divisor.addEventListener('pointercancel', soltar);
    divisor.addEventListener('dblclick', () => concluirLargura(PADRAO));
    divisor.addEventListener('keydown', (e) => {
      const destinos = { ArrowRight: largura + PASSO, ArrowLeft: largura - PASSO, Home: MIN, End: MAX, Enter: PADRAO };
      if (!(e.key in destinos)) return;
      e.preventDefault();
      concluirLargura(destinos[e.key]);
    });
  }

  questoes.forEach((painel) => {
    const ids = [...painel.querySelectorAll('[data-pergunta]')].map((b) => b.dataset.pergunta);
    const pedida = url.get('pergunta');
    escolher(painel, ids.includes(pedida) ? pedida : ids[0], false);
    painel.addEventListener('click', (e) => {
      const botao = e.target.closest('[data-pergunta]');
      if (botao) escolher(painel, botao.dataset.pergunta, true);
    });
  });
  divisores.forEach(ligarDivisor);
  aplicarLargura(ler() || PADRAO);
  ligarDobras();

  // P1 a P5: faixa que abre e fecha, no padrão da Área de trabalho. O estado vale só nesta sessão.
  function ligarDobras() {
    const CHAVE_DOBRAS = 'astrea-questionarios-dobras';
    const faixas = [...raiz.querySelectorAll('.qa-dobra-faixa')];
    let abertas = null;
    try { abertas = JSON.parse(sessionStorage.getItem(CHAVE_DOBRAS)); } catch (e) { abertas = null; }
    const aplicar = (faixa, aberta) => {
      faixa.setAttribute('aria-expanded', String(aberta));
      document.getElementById(faixa.getAttribute('aria-controls')).hidden = !aberta;
    };
    faixas.forEach((faixa) => {
      faixa.prepend(DS.icone('seta'));
      if (Array.isArray(abertas)) aplicar(faixa, abertas.includes(faixa.dataset.dobra));
      faixa.addEventListener('click', () => {
        aplicar(faixa, faixa.getAttribute('aria-expanded') !== 'true');
        const estado = faixas.filter((f) => f.getAttribute('aria-expanded') === 'true').map((f) => f.dataset.dobra);
        try { sessionStorage.setItem(CHAVE_DOBRAS, JSON.stringify(estado)); } catch (e) { /* sem armazenamento, vale só nesta visita */ }
      });
    });
  }

  const pedida = url.get('questao');
  const abas = DS.abas({
    rotulo: 'Questões',
    valor: questoes.some((q) => q.dataset.questao === pedida) ? pedida : questoes[0].dataset.questao,
    itens: questoes.map((q) => ({ chave: q.dataset.questao, rotulo: q.dataset.rotulo, conteudo: q })),
    aoMudar: (chave) => marcarNaUrl(chave, questoes.find((q) => q.dataset.questao === chave).dataset.atual),
  });
  raiz.append(abas);
})();
