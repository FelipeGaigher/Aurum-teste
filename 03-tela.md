# Q3 — A primeira tela da nova direção

Documento-fonte da Q3. A tela escolhida é o Kanban da gestão de
atividades. Este arquivo guarda o contrato da tela: o que ela precisa
mostrar para provar a Q1 e a Q2. Desenhar contra o contrato, não contra o
gosto.

Legenda:

- `> decisão:` algo que já fechamos na conversa.
- `> aberto:` algo que ainda depende de você.

> decisão: a tela é o Kanban. É a visão que o produto promete no onboarding,
> "quadros Kanban para organizar atividades por etapa". É também a que menos
> aparece em fonte pública. Redesenhar o que ninguém mostra é onde a
> direção fica mais visível.

> aberto: confirmar no trial onde o Kanban mora e como ele é hoje. Sem o
> print do Kanban real, a tela nasce sem o "antes".

## O contrato: cada decisão nossa, visível na tela

| De onde vem | A decisão | Como aparece no Kanban |
|---|---|---|
| Q2, slide 1 | Tokens semânticos primeiro | Nenhuma cor solta. Cada cor da tela tem nome: `color.bg.surface`, `color.text.danger`, `color.border.default`. A página de componentes mostra o token ao lado do hex |
| Q2, slide 4 | A moldura fica fixa | Cabeçalho, menu lateral, busca e ações no mesmo lugar de hoje. O usuário cruza de tela legada para o Kanban novo e reconhece a casa |
| Q2, slide 4 | Nada chega ao fluxo de prazo sem feature flag | O Kanban novo é uma visão a mais, atrás de flag. A lista e a agenda antigas continuam. Nota no racional, não na tela |
| Q2, slide 1 | Padrões para funcionalidade com IA nos mesmos componentes | Uma sugestão de IA no card, no mesmo chip e na mesma cor dos outros. Um botão de confirmar e um de desfazer. Sem roxo à parte, sem ícone de brilho |
| Q1, inventário | Três azuis e três cinzas na mesma tela | Um azul de ação, uma escala de cinza. O inventário vira o "antes" da página de componentes |
| Q1, tela 11 | Azul igual para link, número e botão | Número é texto, link é link, botão é botão. Só a ação primária leva a cor de ação |
| Q1, tela 11 | Chamadas comerciais na moldura | A moldura do Kanban não tem faixa de campanha nem selo. Se o trial exigir aviso, ele vira uma linha discreta no rodapé do menu |
| Q1, telas 07 e 09 | Campo sem rótulo visível | Todo campo do card e do filtro tem rótulo fixo acima. O rótulo não some quando preenchido |
| Q1, telas 04 e 07 | Dois estilos de foco | Um token de foco, visível em botão, card, campo e coluna. Aparece no estado "foco" de cada componente |
| Q1, tela 11 | Seletor nativo entre componentes customizados | Filtro de responsável e de período com o mesmo seletor do DS |
| Q1, vocabulário | Tarefa no produto, atividade no enunciado | A tela usa uma palavra só. A escolha é decisão registrada no racional |
| Briefing | Prazo processual é o que não pode falhar | O prazo fatal é o dado mais visível do card. Vencido e vence hoje têm cor e texto, nunca só cor |
| Briefing | Recorte na gestão de atividades | Cada card liga uma atividade a um processo e a um responsável. Os três aparecem no card |
| Q2, slide 3 | Componente entra no DS quando dois squads usam | Os 3 a 5 componentes escolhidos são os que Agenda e Área de trabalho também usam. Card de atividade, chip de prazo, seletor de responsável, filtro, estado vazio |

## O que a banca pede, e onde fica

| Pedido | Onde |
|---|---|
| A tela em alta fidelidade no Figma | Frame `Q3 / Kanban`, 1440 de largura, na página "Questão 3" |
| 3 a 5 componentes com estados | Página "Questão 3", um frame por componente, estados padrão, hover, foco, erro, vazio e carregando |
| Uma decisão difícil | Seção abaixo, escrita antes de desenhar |

## A decisão difícil

> aberto: escolher entre as duas candidatas depois de ver o Kanban real.

Candidata 1. Manter a moldura atual, com o menu lateral e o cabeçalho que
existem. Isso mesmo sabendo que eles carregam os problemas da tela 11. O ganho
é a convivência com o legado, que o briefing exige. O custo é entregar uma
tela nova com uma moldura que a gente mesmo criticou.

Candidata 2. Mostrar o prazo fatal como a informação dominante do card,
acima do título da atividade. O ganho é que o escritório vive de prazo. O
custo é que o Kanban deixa de parecer um Kanban genérico e quem veio do
Trello estranha.

## Direção visual

> decisão: tipografia séria, sem arredondado de produto de consumo. Cores a
> partir do azul do Astrea, `#008fd5`, como primitivo. Um raio só. Densidade
> de quem olha trinta cards por dia.

> aberto: a família tipográfica. Candidatas: IBM Plex Sans, Source Sans 3,
> Inter Tight. Decidir depois de ver a fonte que o produto usa hoje, pelo
> snippet de console.

## Fontes deste documento

- `01-telas-observadas.md`, telas 05 a 11.
- `01-inventario-ui.md`, cores e componentes.
- `02-plano-ds.md`, slides 1, 3 e 4.
- `03-pesquisa-astrea.md`, seção sobre o Kanban.
