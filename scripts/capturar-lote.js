// Roda as capturas de scripts/capturas-figma.json em lote, com concorrência limitada.
// Uso: PROMPT_ID=<id> node scripts/capturar-lote.js <ids.json> [concorrencia]
// ids.json: { "<indice>": "<captureId>", ... }. O índice é a posição do quadro na lista
// achatada dos fluxos. Cada captura roda em processo próprio, com porta própria.
'use strict';
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const raiz = path.resolve(__dirname, '..');
const plano = JSON.parse(fs.readFileSync(path.join(raiz, 'scripts', 'capturas-figma.json'), 'utf8'));
const ids = JSON.parse(fs.readFileSync(path.resolve(process.argv[2]), 'utf8'));
const concorrencia = Number(process.argv[3]) || 6;
const promptId = process.env.PROMPT_ID;
if (!promptId) {
  console.error('defina PROMPT_ID');
  process.exit(2);
}

const quadros = [];
plano.fluxos.forEach((f, fi) => f.quadros.forEach((q, qi) => quadros.push({ ...q, fluxo: fi, posicao: qi, indice: quadros.length })));

function capturar(q, porta) {
  return new Promise((resolve) => {
    const id = ids[String(q.indice)];
    const endpoint = 'https://mcp.figma.com/mcp/capture/' + id + '/submit?bindVariables=true&promptId=' + promptId;
    const env = { ...process.env, PORTA: String(porta) };
    if (q.estado) env.ESTADO = JSON.stringify(q.estado);
    if (q.cliques) env.CLIQUES = q.cliques;
    if (q.css === 'kanban') env.CSS_EXTRA = plano.kanban_css;
    const filho = spawn('node', [path.join(raiz, 'scripts', 'capturar-figma.js'), q.pagina, id, endpoint, String(plano.largura)], { env, cwd: raiz });
    let saida = '';
    filho.stdout.on('data', (d) => { saida += d; });
    filho.stderr.on('data', (d) => { saida += d; });
    const limite = setTimeout(() => filho.kill(), 280000);
    filho.on('close', (codigo) => {
      clearTimeout(limite);
      const linhas = saida.trim().split('\n');
      resolve({ indice: q.indice, titulo: q.titulo, codigo, ultimaLinha: linhas[linhas.length - 1].slice(0, 70) });
    });
  });
}

(async () => {
  const fila = quadros.filter((q) => ids[String(q.indice)]);
  const resultados = [];
  let proximo = 0;
  let porta = 8801;
  async function trabalhador() {
    while (proximo < fila.length) {
      const q = fila[proximo];
      proximo += 1;
      const p = porta;
      porta += 1;
      resultados.push(await capturar(q, p));
    }
  }
  await Promise.all(Array.from({ length: concorrencia }, trabalhador));
  resultados.sort((a, b) => a.indice - b.indice);
  for (const r of resultados) {
    console.log(String(r.indice).padStart(2) + ' ' + r.titulo.slice(0, 48).padEnd(48) + ' ' + r.ultimaLinha);
  }
})();
