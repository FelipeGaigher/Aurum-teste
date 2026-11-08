# Uso de IA nesta atividade

Parágrafo pedido no enunciado. Fontes: `04-processo.html` e
`docs/2026-11-08-revisao-respostas.md`, seção "Uso de IA".

Usei o Claude Code como par de trabalho durante toda a atividade. O MCP
do Figma ficou ligado enquanto a cota permitiu. Depois, os decks viraram
PNG pelo Playwright e entraram no Figma pelo navegador. A IA não escreveu
a estratégia. Ela recebeu as minhas decisões em conversa e as transformou
em documento-fonte, que eu iterei linha a linha. O protótipo saiu de uma
spec e de um plano de 23 tasks. Cada subagente recebeu uma task e os
arquivos dela. Até sete subagentes trabalharam em paralelo, cada um no seu
arquivo. Antes do commit, cada task passou por portões automáticos. Um
script barrou cor solta, referência de rede e qualquer dado real. Um detector barrou
a cara de interface gerada por IA. Um linter barrou frase longa e voz
passiva. Depois, um revisor em contexto limpo julgou cada onda contra a
spec. Em 08/11 foram 132 commits depois do meio-dia, até as 18h13. A IA
também percorreu o Astrea em produção, só com leitura: texto da página,
árvore de acessibilidade e captura. Ela comparou cada fluxo com o
protótipo. O comparativo achou quatro caminhos em que o protótipo perdia
cliques, e eu mandei corrigir os quatro. A direção visual, os problemas, o
trade-off e o escopo foram decisões minhas.
