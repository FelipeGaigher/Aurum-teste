// Captura o protótipo do Kanban em PNG, nos dois conjuntos de dados, em
// prototipo/capturas/. O slide da tela da Q3 lê a captura de 1920.
//
// Uso, na raiz do repositório: node scripts/capturar-kanban.js
// Playwright: mesma regra de scripts/exportar-slides.js.
const path = require('path');
const fs = require('fs');

const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const raiz = path.resolve(__dirname, '..');
const destino = path.join(raiz, 'prototipo', 'capturas');
const CAPTURAS = [
  { conjunto: 'escritorio', largura: 1920, altura: 1080, nome: 'kanban-escritorio-1920.png' },
  { conjunto: 'escritorio', largura: 1440, altura: 900, nome: 'kanban-escritorio-1440.png' },
  { conjunto: 'plano', largura: 1920, altura: 1080, nome: 'kanban-plano-1920.png' },
];

(async () => {
  fs.mkdirSync(destino, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome' });
  for (const c of CAPTURAS) {
    const page = await browser.newPage({ viewport: { width: c.largura, height: c.altura }, deviceScaleFactor: 1 });
    await page.goto('file:///' + path.join(raiz, 'prototipo', 'kanban.html').split(path.sep).join('/'));
    await page.check(`input[name="conjunto"][value="${c.conjunto}"]`);
    await page.waitForTimeout(300);
    const altura = await page.evaluate(() => document.documentElement.scrollHeight);
    await page.screenshot({ path: path.join(destino, c.nome), fullPage: true });
    console.log(c.nome, c.largura + 'x' + altura);
    await page.close();
  }
  await browser.close();
})().catch((erro) => { console.error(erro.message); process.exit(1); });
