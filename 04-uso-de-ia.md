# Uso de IA nesta atividade

Parágrafo pedido no enunciado. Fontes: `04-processo.html` e
`docs/2026-11-08-revisao-respostas.md`, seção "Uso de IA".

Usei o Claude Code como par de trabalho durante toda a atividade. A IA não
escreveu a estratégia. Ela recebeu as minhas decisões em conversa e as
transformou em documento-fonte, que eu iterei linha a linha. Um exemplo:
apontei que a Área de trabalho abre numa lista só e esconde a tarefa
atrasada das outras. A IA catalogou a observação como ponto de atenção, o
PA-31, com tela e evidência. No protótipo isso virou a seção Atrasadas acima
de Hoje. O comparativo de 08/11 mediu o resultado contra o produto. O
protótipo saiu de uma spec e de um plano de 23 tasks. Cada subagente recebeu
uma task e os arquivos dela, até sete em paralelo. Antes do commit, cada
task passou por portões automáticos. Eles barram cor solta, referência de
rede, dado real, cara de interface gerada por IA, frase longa e voz passiva.
Um revisor em contexto limpo julgou cada onda contra a spec. Os decks
nasceram em HTML, viraram PNG pelo Playwright e entraram no Figma. A IA
também percorreu o Astrea em produção, só com leitura, e comparou cada fluxo
com o protótipo. O comparativo achou quatro caminhos em que o protótipo
perdia cliques, e eu mandei corrigir os quatro. A direção visual, os cinco
problemas, o trade-off, o escopo e cada correção ao vivo foram decisões
minhas.