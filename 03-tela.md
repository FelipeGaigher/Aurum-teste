# Q3 — A primeira tela da nova direção

Documento-fonte da Q3. A tela escolhida é a Área de trabalho do Astrea.
Este arquivo guarda o contrato da tela: o que ela precisa mostrar para
provar a Q1 e a Q2. Desenhar contra o contrato, não contra o gosto.

Legenda:

- `> decisão:` algo que já fechamos na conversa.
- `> aberto:` algo que ainda depende de você.

> decisão, 08/11: a tela é a Área de trabalho, não o Kanban. É a tela que o
> escritório abre todo dia. A planilha de pedidos cobre só ela: 80
> sugestões e 407 votos. 136 desses votos pedem destaque de prazo,
> audiência, data limite e atividades do dia. É a tela que prova P1, "o
> prazo não domina as telas que existem para ele". O Kanban segue no
> protótipo como módulo, mas sai da resposta da Q3.

> aberto: a captura da tela. O slide tem um espaço reservado,
> `data-captura="area-de-trabalho"`. A captura sai de
> `prototipo/area-de-trabalho.html` depois das Tasks 10 e 11 do plano.

> aberto: o frame no Figma. A banca pede alta fidelidade no Figma. O
> protótipo em HTML é a fonte. Falta decidir se o frame nasce por
> importação ou por desenho manual.

## O contrato: cada decisão nossa, visível na tela

| De onde vem | A decisão | Como aparece na Área de trabalho |
|---|---|---|
| Q1, P1. PA-31 | Abrir em todas as listas | A tela abre com "Todas as listas". A atividade atrasada de outra lista aparece na abertura |
| Q1, P1. PA-32 | Atrasadas com seção própria | Três seções em ordem fixa: Atrasadas, Hoje, Próximos. Atrasadas fica no topo |
| Q1, P1. PA-33, PA-53 | Prazo na área principal | Prazos, audiências e eventos ficam nas mesmas seções das tarefas. O widget "Lembretes" sai do canto |
| Q1, P1. PA-34 | Data com hierarquia | Cada linha abre pelo chip de prazo. Vencido, hoje e próximos têm cor e texto, nunca só cor |
| Pedidos, filtro, 63 votos. PA-35, PA-36 | Filtro de quem e de situação | Barra de filtros com responsável, período e situação. "Minhas" e "Delegadas" separam o que hoje fica misturado |
| PA-37 | Manter o último filtro | O filtro continua ao voltar de um processo. A escolha fica no navegador |
| Pedidos, copiar número, 8 votos. PA-38, PA-11 | Número do processo na linha | O número aparece como texto, não como link azul. Um botão de ícone com rótulo copia o número |
| PA-39 | Widgets sem competir com a lista | Estatísticas e processos viram uma linha de leitura horizontal acima das seções |
| PA-40 | Ações da linha sem rótulo | As ações aparecem no hover e no foco de teclado, com tooltip |
| Q2, slide 1 | Tokens semânticos primeiro | Nenhuma cor solta. Cada cor da tela tem nome: `color.bg.surface`, `color.text.danger`, `color.border.default` |
| Q2, slide 2 | Componente flexível | Cada componente tem propriedades booleanas e de texto. O estado é a única variante |
| Q2, slide 4. PA-01 a PA-15 | A moldura fica fixa | Cabeçalho, menu lateral, busca e ações no mesmo lugar de hoje. O item ativo tem fundo e `aria-current`. Sem faixa de campanha nem selo |
| Q2, slide 4 | Nada chega ao fluxo de prazo sem feature flag | A Área de trabalho nova fica atrás de flag. A antiga continua até a migração. Nota no racional, não na tela |
| Q1, telas 07, 09 e 11 | Rótulo visível e seletor do DS | Todo filtro tem rótulo fixo. Nenhum seletor nativo |
| Q1, vocabulário | Atividade como termo geral | A tela usa "atividade", com os tipos tarefa, prazo, audiência e evento |
| Q2, slide 3 | Componente entra no DS quando dois squads usam | Os cinco componentes da Q3 servem também a Agenda e o Kanban |

> aberto: personalizar (37 votos) e ordenação manual (33 votos) ficam fora
> desta tela. Os dois pedem dado ou serviço novo. O contrato do protótipo
> só aceita o que reorganiza dado que já existe. Default: citar os dois
> como próxima etapa no slide da decisão.

## Os componentes

Os cinco componentes servem a Área de trabalho, a Agenda e o Kanban. Cada um
tem propriedades e estados. A matriz de estados vem da Q2: default, hover,
active, foco, disabled, erro, carregando e vazio. Cada componente mostra só
os estados que existem para ele.

### 1. Linha de atividade, `DS.linhaAtividade`

| Propriedade | Tipo |
|---|---|
| `titulo` | Texto |
| `responsavel` | Texto |
| `mostrarProcesso` | Booleana |
| `copiarNumero` | Booleana |
| `acoes` | Booleana |
| `densidade` | Compacta ou confortável |

Estados: default, hover, foco, active (selecionada), carregando. A linha
não tem erro próprio: o erro mora no chip de prazo.

Onde mais aparece: lista lateral da Agenda, visão em lista do Kanban.

### 2. Chip de prazo, `DS.chipPrazo`

| Propriedade | Tipo |
|---|---|
| `estado` | Vencido, hoje, próximo, concluído |
| `texto` | Texto: "Vencido há 2 dias", "Vence hoje", "Vence em 12/11" |
| `mostrarHora` | Booleana |

Estados: um por valor de `estado`. O chip não tem hover nem foco, porque
não é controle. Cor e texto, nunca só cor.

Onde mais aparece: evento da Agenda, card do Kanban.

### 3. Seletor, `DS.seletor`

| Propriedade | Tipo |
|---|---|
| `rotulo` | Texto |
| `valor` | Texto |
| `obrigatorio` | Booleana |
| `erro` | Texto |

Estados: default, hover, foco, aberto, disabled, erro. É botão com
`aria-haspopup="listbox"`, não `select` nativo.

Onde mais aparece: visão e filtros da Agenda, filtros do Kanban, painel de
criar atividade.

### 4. Chip de filtro, `DS.chipFiltro`

| Propriedade | Tipo |
|---|---|
| `rotulo` | Texto |
| `contagem` | Texto |
| `removivel` | Booleana |

Estados: default, hover, foco, active (aplicado), disabled. O chip
aplicado leva `aria-pressed="true"` e marca de seleção, não só cor.

Onde mais aparece: filtro de tipo da Agenda, filtro de fase do Kanban.

### 5. Estado vazio, `DS.estadoVazio`

| Propriedade | Tipo |
|---|---|
| `titulo` | Texto |
| `texto` | Texto |
| `mostrarAcao` | Booleana |
| `motivo` | Sem dado ou filtro |

Estados: vazio sem dado, vazio por filtro, carregando. Vazio por filtro
troca a ação: "Limpar filtros" no lugar de "Adicionar atividade".

Onde mais aparece: dia vazio da Agenda, coluna vazia do Kanban.

## O que a banca pede, e onde fica

| Pedido | Onde |
|---|---|
| A tela em alta fidelidade no Figma | Frame `Q3 / Área de trabalho`, 1440 de largura, na página "Questão 3" |
| 3 a 5 componentes com estados | Página "Questão 3", um frame por componente, com as propriedades acima |
| Uma decisão difícil | Seção abaixo |

## A decisão difícil

> decisão, 08/11: a tela abre em todas as listas, com Atrasadas acima de
> Hoje. O prazo é o dado dominante da linha.

O trade-off escrito para o slide:

Hoje a Área de trabalho abre na lista escolhida. Os prazos ficam num widget
de lembretes, no canto. Quem usa o Astrea há anos conhece esse lugar. Mudar
a abertura obriga a pessoa a reaprender a tela que ela mais abre. Escolhi
mudar assim mesmo. A abertura atual esconde o atrasado. A atividade de
outra lista não aparece (PA-31). O vencido não tem seção (PA-32). O
escritório não perde prazo por não achar a lista. Perde por não ver a data.
É a primeira restrição do briefing.

O ganho: o atrasado é a primeira coisa na tela, em texto e cor. 136 de 407
votos pedem esse destaque.

O custo: reaprendizado na tela mais usada. A segunda restrição do briefing
pede "sem curva de reaprendizado brusca". Quem tem muitas listas vê mais
linhas na abertura.

Como reduzo o custo:

- O seletor de lista continua no mesmo lugar. Quem quer uma lista só,
  escolhe, e a escolha fica gravada.
- A moldura não muda. A pessoa reconhece a casa.
- O chip de prazo leva cor e texto, nunca só cor. "Vencido há 2 dias" diz
  o fato.
- A tela nova fica atrás de feature flag, com volta para a antiga por um
  ciclo.

O que eu não escolhi: a abertura de hoje. A lista escolhida abre a tela,
e os prazos ficam no widget de lembretes. O ganho era zero reaprendizado. O custo
era manter escondido o atrasado, o problema que a tela existe para
resolver.

O que confirma a aposta: duas medidas no beta atrás de flag. A primeira é
o tempo até o primeiro clique numa atividade atrasada. A segunda são os
chamados com "sumiu" ou "não vi o prazo". A volta para a tela antiga pode
passar do limite da linha de base. Nesse caso, a abertura volta para a
lista escolhida, sem reescrever componente.

> aberto: o limite de volta para a tela antiga. Default: o mesmo limite de
> chamados da fase 2 da Q2, medido antes do beta.

## Direção visual

> decisão, 07/11, de Felipe: o protótipo segue o visual atual do Astrea.
> Logo, navbar e sidebar iguais ao produto, raio 8, fonte `museo-sans` com
> reserva Open Sans. Os primitivos espelham as variáveis reais do CSS do
> Astrea. O fundo de ação usa `#1D6BB7`, porque o `#228BE6` reprova no AA
> com texto branco. A tela tem que parecer Astrea, não produto novo.

> decisão: densidade de quem consulta o dia todo. Corpo 13px, título 20px,
> controles 36px.

> decisão, 07/11, de Felipe: tema escuro. Segue o sistema e tem chave no
> cabeçalho. O Astrea não tem tema escuro, então a paleta é proposta,
> medida no AA.

> decisão, 08/11: dado fictício só. Nomes e números vêm do array
> `ATIVIDADES` de `prototipo/dados.js`.

## Fontes deste documento

- `00-briefing.md`, Questão 3 e restrições.
- `01-diagnostico.md`, P1 e slide 4.
- `01-pontos-de-atencao.md`, PA-01 a PA-15 e PA-31 a PA-40.
- `01-pedidos-clientes.md`, votos por tema.
- `01-varredura-modulos.md`, seção 1.
- `02-plano-ds.md`, slides 1 a 4.
- `docs/specs/2026-11-08-astrea-navegavel.md`, RF-06 e RF-08.
- `docs/plans/2026-11-08-astrea-navegavel.md`, Tasks 7, 10 e 11.
