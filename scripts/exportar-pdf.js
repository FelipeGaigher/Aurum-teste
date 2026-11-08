// Exporta um documento HTML da entrega em PDF A4, pelo Chrome, sem a chave de tema.
// Uso: node scripts/exportar-pdf.js <documento.html> <saida.pdf>
'use strict';
const path = require('path');
const { chromium } = require('playwright');

const [entrada, saida] = process.argv.slice(2);
if (!entrada || !saida) {
  console.error('uso: node scripts/exportar-pdf.js <documento.html> <saida.pdf>');
  process.exit(2);
}

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  await page.emulateMedia({ colorScheme: 'light', media: 'print' });
  await page.goto('file:///' + path.resolve(entrada).split(path.sep).join('/'), { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: '.tema { display: none !important; }' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  await page.pdf({ path: saida, format: 'A4', printBackground: true, margin: { top: '14mm', right: '14mm', bottom: '16mm', left: '14mm' } });
  await browser.close();
  console.log('ok', saida);
})();
