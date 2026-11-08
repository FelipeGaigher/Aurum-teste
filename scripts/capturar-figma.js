// Captura uma página do protótipo no Figma pelo MCP html-to-design.
// Uso: node scripts/capturar-figma.js <pagina.html> <captureId> <endpoint> [largura]
// Serve a pasta prototipo/ em localhost, abre a página em Chrome headless,
// injeta o capture.js do Figma e envia a árvore DOM para o endpoint.
'use strict';
const { spawn } = require('child_process');
const { chromium } = require('playwright');

const PORTA = 8765;
const [pagina, captureId, endpoint, larguraArg] = process.argv.slice(2);
if (!pagina || !captureId || !endpoint) {
  console.error('uso: node scripts/capturar-figma.js <pagina.html> <captureId> <endpoint> [largura]');
  process.exit(2);
}
const largura = Number(larguraArg) || 1440;

function servir() {
  const servidor = spawn('python', ['-m', 'http.server', String(PORTA), '-d', 'prototipo'], {
    stdio: 'ignore',
  });
  return new Promise((resolve) => setTimeout(() => resolve(servidor), 1200));
}

(async () => {
  const servidor = await servir();
  let codigo = 0;
  try {
    const browser = await chromium.launch({ channel: 'chrome', headless: true });
    const page = await browser.newPage({ viewport: { width: largura, height: 900 } });
    await page.goto(`http://localhost:${PORTA}/${pagina}`, { waitUntil: 'networkidle' });
    const resposta = await page.context().request.get('https://mcp.figma.com/mcp/html-to-design/capture.js');
    await page.evaluate((fonte) => {
      const el = document.createElement('script');
      el.textContent = fonte;
      document.head.appendChild(el);
    }, await resposta.text());
    await page.waitForTimeout(800);
    const resultado = await page.evaluate(
      ({ id, destino }) => window.figma.captureForDesign({ captureId: id, endpoint: destino, selector: 'body' }),
      { id: captureId, destino: endpoint },
    );
    console.log(JSON.stringify(resultado));
    await browser.close();
  } catch (erro) {
    console.error(erro.message);
    codigo = 1;
  } finally {
    servidor.kill();
  }
  process.exit(codigo);
})();
