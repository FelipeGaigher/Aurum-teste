// Captura uma página do protótipo no Figma pelo MCP html-to-design.
// Uso: node scripts/capturar-figma.js <pagina.html> <captureId> <endpoint> [largura]
// Serve a pasta prototipo/ em localhost, abre a página em Chrome headless,
// injeta o capture.js do Figma e envia a árvore DOM para o endpoint.
'use strict';
const { spawn } = require('child_process');
const { chromium } = require('playwright');

const PORTA = Number(process.env.PORTA) || 8765;
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
    // CANAL=chromium usa o navegador do Playwright; o Chrome instalado caiu com "Target crashed" em 08/11.
    const canal = process.env.CANAL || 'chrome';
    const browser = await chromium.launch({
      channel: canal === 'chromium' ? undefined : canal,
      headless: true,
      args: ['--disable-gpu', '--disable-dev-shm-usage', '--js-flags=--max-old-space-size=4096'],
    });
    const page = await browser.newPage({ viewport: { width: largura, height: 900 } });
    // ESTADO='{"chave":"valor"}' grava no localStorage antes da página carregar.
    // Serve para abrir a tela num estado que o protótipo guarda só no navegador, como a visão Lista.
    if (process.env.ESTADO) {
      await page.addInitScript((estado) => {
        for (const [chave, valor] of Object.entries(estado)) localStorage.setItem(chave, valor);
      }, JSON.parse(process.env.ESTADO));
    }
    await page.goto(`http://localhost:${PORTA}/${pagina}`, { waitUntil: 'networkidle' });
    // O protótipo declara Museo Sans e Open Sans antes de Segoe UI. Nenhuma das duas está
    // instalada aqui, e a captura chegava ao Figma em Segoe UI, fonte que o Figma não tem.
    // Open Sans entra pelo Google Fonts só na captura; o HTML continua sem CDN.
    await page.addStyleTag({ url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap' });
    // O código de exemplo usa ui-monospace e Consolas, que o Figma não tem. Só na captura, vira Roboto Mono.
    await page.addStyleTag({ content: ':root { --component-code-font: "Roboto Mono", monospace; }' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
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
