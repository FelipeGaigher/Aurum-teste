# Aurum — Teste Especialista UX/UI

Documentos-fonte da atividade prática. Cada questão tem um arquivo.

- `index.html` — o documento único de entrega, com os links do Figma, do protótipo e do repositório
- `00-briefing.md` — o enunciado
- `01-telas-observadas.md` — registro bruto das telas do Astrea, com prints em `evidencias/`
- `01-inventario-ui.md` — cores, componentes e vocabulário da interface atual
- `01-inventario-css-astrea.md` — o produto logado lido pelo Chrome: telas, CSS, tokens do Nectar e o Kanban oculto, com capturas em `evidencias/chrome/`
- `01-melhorias.md` — backlog de ideias de melhoria, com tela de origem e questão que alimentam
- `referencias/` — telas de outros produtos e resumos usados como referência, não como evidência
- `01-diagnostico.md` — Q1, derivada do registro de telas e do inventário
- `01-slides-q1.html` — Q1, os 5 slides em HTML para reproduzir no Figma
- `03-componentes.html` — Q3, os 5 componentes com estados e o token de cada propriedade
- `03-slides-q3.html` — Q3, a tela mais 3 páginas em HTML, com os componentes ao vivo
- `prototipo/` — o Astrea navegável, com o Kanban no topo do menu e a Área de trabalho da Q3. A pasta guarda também o design system em `design-system.html` e o portão estático `verificar.py`. A entrada é `area-de-trabalho.html`, e o `prototipo/README.md` descreve as páginas. `prototipo/capturas/` guarda os PNG que o slide da tela usa
- `02-plano-ds.md` — Q2, documento-fonte
- `02-slides-q2.html` — Q2, os 6 slides em HTML para reproduzir no Figma
- `03-tela.md` — Q3
- `03-pesquisa-astrea.md` — pesquisa do produto em fontes públicas, base da Q3
- `04-processo.md` — diário do processo do teste, fonte do parágrafo de IA
- `04-uso-de-ia.md` — parágrafo obrigatório
- `slides/` — os 15 frames dos três decks em PNG de 1920 por 1080, para importar no Figma sem o MCP
- `scripts/` — `verificar-app.js` é o portão de navegador do protótipo, `exportar-slides.js` gera `slides/`, `capturar-kanban.js` gera `prototipo/capturas/` e `capturar-figma.js` leva uma página do protótipo ao Figma. Todos usam o Playwright com o Chrome da máquina, sem janela

Figma: https://www.figma.com/design/OT2rzDJHctCE9WSfR19c2g/
