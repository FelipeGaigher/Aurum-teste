// Exporta cada section.slide dos decks HTML como PNG de 1920 por 1080, para
// importar no Figma sem o MCP.
//
// Uso, na raiz do repositório:
//   node scripts/exportar-slides.js            exporta os três decks para slides/
//   node scripts/exportar-slides.js 03-slides-q3.html q3   só um deck
//
// Playwright: o script usa o Chrome instalado na máquina, pelo canal "chrome".
// O módulo vem de `npm i -D playwright` ou da variável PLAYWRIGHT_MODULE, que
// aponta para uma pasta node_modules/playwright já existente.
const path = require('path');
const fs = require('fs');

const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const raiz = path.resolve(__dirname, '..');
const destino = path.join(raiz, 'slides');
const FONTES = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Geist:wght@400;500;600&display=swap';
const DECKS = [
  ['01-slides-q1.html', 'q1'],
  ['02-slides-q2.html', 'q2'],
  ['03-slides-q3.html', 'q3'],
];

const pedidos = process.argv.length > 2 ? [[process.argv[2], process.argv[3] || path.basename(process.argv[2], '.html')]] : DECKS;

async function exportar(page, arquivo, prefixo) {
  await page.goto('file:///' + path.join(raiz, arquivo).split(path.sep).join('/'));
  // As fontes do deck entram só na exportação. O HTML continua sem CDN.
  await page.addStyleTag({ url: FONTES });
  await page.addStyleTag({ content: 'body{padding:0!important;background:#fff} .tema,.capa{display:none!important} .slide{width:1920px!important;margin:0 0 40px!important;border:0!important}' });
  // Deck interativo: o PNG mostra tudo aberto, como a mídia print.
  await page.evaluate(() => document.querySelectorAll('details').forEach((d) => { d.open = true; }));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);
  const slides = await page.$$('section.slide');
  let i = 0;
  for (const slide of slides) {
    i += 1;
    const id = await slide.getAttribute('id');
    const box = await slide.boundingBox();
    const nome = path.join(destino, prefixo + '-' + String(i).padStart(2, '0') + '-' + id + '.png');
    await slide.screenshot({ path: nome });
    console.log(path.relative(raiz, nome), Math.round(box.width) + 'x' + Math.round(box.height));
  }
  const fontes = await page.evaluate(() => [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family));
  console.log('  fontes carregadas:', [...new Set(fontes)].join(', ') || 'nenhuma');
}

(async () => {
  fs.mkdirSync(destino, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 2000, height: 1200 }, deviceScaleFactor: 1, colorScheme: 'light' });
  for (const [arquivo, prefixo] of pedidos) await exportar(page, arquivo, prefixo);
  await browser.close();
})().catch((erro) => { console.error(erro.message); process.exit(1); });
