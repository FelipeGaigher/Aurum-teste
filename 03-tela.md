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

> decisão, 08/11, 18h: as capturas saem de `prototipo/area-de-trabalho.html`
> a 1920 de largura. São três: a visão Lista, a Lista com o detalhe ao
> lado e a visão Cards. Ficam em `prototipo/capturas/`, com os nomes
> `area-de-trabalho-1920.png`, `-detalhe.png` e `-cards.png`. Refiz as três
> depois que a visão Lista virou tabela do DS.

> decisão, 08/11, 13h27: o frame no Figma nasce por importação do
> protótipo. O `generate_figma_design` do MCP capturou
> `prototipo/area-de-trabalho.html` a 1440 de largura, direto no arquivo
> da entrega, nó `26-2`. O protótipo em HTML continua a fonte.

> aberto: o nó `26-2` é anterior ao painel de detalhe, às visões e à
> tabela. Default: recapturar a tela no Figma num nó novo, no lugar do `26-2`.

## O contrato: cada decisão nossa, visível na tela

| De onde vem | A decisão | Como aparece na Área de trabalho |
|---|---|---|
| Q1, P1 | Abrir em todas as listas | A tela abre com "Todas as listas" no filtro de lista |
| Q1, P1. PA-32 | Atrasadas com seção própria | Três seções em ordem fixa: Atrasadas, Hoje, Próximos. Atrasadas fica no topo |
| Q1, P1. PA-33, PA-53 | Prazo na área principal | Prazos, audiências e eventos ficam nas mesmas seções das tarefas. O widget "Lembretes" sai do canto |
| Q1, P1. PA-34 | Data com hierarquia | Cada linha abre pelo chip de prazo. Vencido, hoje e próximos têm cor e texto, nunca só cor |
| PA-39, revertido por Felipe | Resumo sem widget | A linha de estatísticas saiu. A faixa de cada seção mostra a contagem numa tag: "2 vencidas", "1 vence hoje" |
| Q1, P1 | Seção que abre e fecha | A faixa da seção é um botão com `aria-expanded`. A seta gira, e a tag continua visível com a seção fechada |
| Pedidos, filtro, 63 votos. PA-35, PA-36 | Filtro de quem e de situação | Filtros numa linha só: Lista, Responsável, Período e Situação. Ao lado, a visão e o botão de adicionar |
| PA-37 | Manter o último filtro | O filtro e a visão continuam ao voltar de um processo. A escolha fica no navegador |
| Q2, slide 3 | Uma lista, três visões | Cards, Lista e Kanban. A Lista é a tabela do DS, uma por seção, com as mesmas colunas: Prazo, Atividade, Processo, Responsável e Ações |
| Pedidos, copiar número, 8 votos. PA-38, PA-11 | Número do processo na linha | O número é link para o processo. Um botão de ícone ao lado copia o número: 1 clique |
| PA-40 | Ações da linha sem rótulo | As ações aparecem no hover e no foco de teclado, com dica |
| Lista e detalhe | Detalhe sem modal | O clique na linha abre o painel ao lado. A largura muda pelo divisor. Anterior e próximo trocam a atividade |
| Lista e detalhe | Ação no painel | Concluir e adiar viram botões redondos de ícone, com dica. "Abrir processo" é o botão primário |
| M14 a M16 | Cabeçalho do produto | Título na página, busca à direita e cinco atalhos: IA, Adicionar, Cronômetro, tema e Notificações. O sino mostra a contagem |
| Q2, slide 1 | Tokens semânticos primeiro | Nenhuma cor solta. Cada cor da tela tem nome: `color.bg.surface`, `color.text.danger`, `color.border.default` |
| Q2, slide 2 | Componente flexível | Cada componente tem propriedades booleanas e de texto. O estado é a única variante |
| Q2, slide 4. PA-01 a PA-15 | A moldura fica fixa | Cabeçalho, menu lateral, busca e ações no mesmo lugar de hoje. O item ativo tem fundo e `aria-current`. Sem faixa de campanha nem selo |
| Q2, slide 4 | Nada chega ao fluxo de prazo sem feature flag | A Área de trabalho nova fica atrás de flag. A antiga continua até a migração. Nota no racional, não na tela |
| Q1, telas 07, 09 e 11 | Rótulo visível e seletor do DS | Todo filtro tem rótulo fixo. Nenhum seletor nativo |
| Q1, vocabulário | Atividade como termo geral | A tela usa "atividade", com os tipos tarefa, prazo, audiência e evento |
| Q2, slide 3 | Componente entra no DS quando dois squads usam | Tabela, chip de prazo e painel já servem a outras páginas. O card ainda só serve a Área de trabalho |

> aberto: personalizar (37 votos) e ordenação manual (33 votos) ficam fora
> desta tela. Os dois pedem dado ou serviço novo. O contrato do protótipo
> só aceita o que reorganiza dado que já existe. Default: citar os dois
> como próxima etapa no slide da decisão.

> aberto: abaixo de 1100px o painel de detalhe some, sem alternativa.
> Default: na tela estreita, o painel abre por cima da lista, como em Alertas.

## Os componentes

Quatro componentes da tela entram no DS. Cada estado citado abaixo tem
célula própria em `prototipo/design-system.html`, com o atributo
`[data-estado]`. A variação muda o dado. O estado muda a interação.

### 1. Tabela, `DS.tabela`, seção `#tabela`

| Propriedade | Tipo |
|---|---|
| `rotulo` | Texto, obrigatório. Nome acessível da tabela |
| `colunas` | Pares de chave e rótulo |
| `linhas` | Objetos com as chaves. Valor em texto ou elemento |
| `carregando` | Booleana |
| `vazio` | Título e texto do estado vazio |
| `densidade` | Padrão ou compacta |

Estados no DS: `[data-estado="default"]`, `"hover"`, `"carregando"` e
`"vazio"`. Variação: Compacta. A tabela larga rola dentro do quadro, nunca
a página.

Na Área de trabalho, a linha abre o painel de detalhe. A linha escolhida
leva `aria-selected="true"`, fundo `--color-bg-subtle` e barra na cor de ação.

> aberto: a linha selecionada da tabela ainda não tem célula no DS. Hoje o
> estado `selecionado` existe só na Linha de atividade. Default: acrescentar
> `[data-estado="selecionado"]` na seção `#tabela` antes do envio.

Onde mais aparece: Contatos, Processos, Atendimentos, Documentos e Buscas.

### 2. Chip de prazo, `DS.chipPrazo`, seção `#chip-prazo`

| Propriedade | Tipo |
|---|---|
| `estadoPrazo` | Vencido, hoje, próximo ou concluído |
| `rotulo` | Texto, obrigatório: "Vencido há 2 dias", "Vence hoje", "Vence em 12/11" |

Estado no DS: `[data-estado="default"]`, o prazo próximo. Variações:
Vencido, Vence hoje e Concluída. O chip não tem hover nem foco, porque não
é controle. O DS escreve o motivo de cada estado ausente.

Cor e texto, nunca só cor. O vencido leva fundo `--color-bg-danger`, borda
`--color-text-danger` e ícone de alerta. O componente recusa chip sem rótulo.

Onde mais aparece: Agenda, Alertas, Contatos e Processos.

### 3. Card de atividade, `DS.cardAtividade`, seção `#card-atividade`

| Propriedade | Tipo |
|---|---|
| `titulo`, `tipo`, `prazo` | Texto |
| `processo`, `responsavel` | Texto |
| `tags` | Lista de rótulos |
| `mostrarPrazo`, `mostrarProcesso` | Booleana |
| `mostrarResponsavel`, `mostrarTags` | Booleana |
| `copiarNumero` | Booleana |

Estados no DS: `[data-estado="default"]`, `"hover"`, `"active"`, `"foco"` e
`"carregando"`. Variações: Vencido, Vence hoje e Concluída. Hover e active
trocam a borda pela cor de ação.

Onde aparece: visões Cards e Kanban da Área de trabalho. O módulo Kanban
ainda usa card próprio. Pela regra da Q2, o card só fecha a entrada no DS
quando o Kanban trocar o dele por este.

### 4. Painel de detalhe, `DS.painelDetalhe`, seção `#painel-detalhe`

| Propriedade | Tipo |
|---|---|
| `rotulo`, `titulo` | Texto, obrigatório |
| `chips` | Lista de etiquetas |
| `destaque` | Rótulo e valor: o primeiro dado que a pessoa lê |
| `linhas` | Ícone, rótulo e valor. Sem valor, aparece o traço |
| `acoes` | Botões. O último é o primário |
| `aoAnterior`, `aoProximo` | Troca o item sem fechar o painel |

Estados no DS: `[data-estado="default"]`, `"foco"`, `"carregando"`,
`"vazio"` e `"oculto"`. Oculto deixa só o botão de reabrir, e o foco vai
para ele.

Na Área de trabalho, o destaque é o prazo. As linhas são processo,
responsável, lista e situação. O divisor muda a largura entre 300 e 560px.

Onde mais aparece: Contatos, Processos, Alertas e a coluna da Agenda.

## O que a banca pede, e onde fica

| Pedido | Onde |
|---|---|
| A tela em alta fidelidade no Figma | Frame importado do protótipo, nó `26-2`. As capturas de 1920 em `prototipo/capturas/` são a versão atual |
| 3 a 5 componentes com estados | `03-componentes.html` e a página do DS, nó `28-2` no Figma |
| Uma decisão difícil | Seção abaixo |

## A decisão difícil

> decisão, 08/11: a tela abre em todas as listas, com Atrasadas acima de
> Hoje. O prazo é o dado dominante da linha.

O trade-off escrito para o slide:

Hoje a Área de trabalho abre na lista escolhida. Os prazos ficam num widget
de lembretes, no canto. Quem usa o Astrea há anos conhece esse lugar. Mudar
a abertura obriga a pessoa a reaprender a tela que ela mais abre. Escolhi
mudar assim mesmo. Hoje a lista da Área de trabalho marca o atraso só pela
cor da data. O vencido não tem seção (PA-32). O escritório não perde prazo
por não achar a lista. Perde por não ver a data. É a primeira restrição do
briefing.

O ganho: o atrasado é a primeira coisa na tela, em texto e cor. 136 de 407
votos pedem esse destaque.

O custo: reaprendizado na tela mais usada. A segunda restrição do briefing
pede "sem curva de reaprendizado brusca". Quem tem muitas listas vê mais
linhas na abertura.

Como reduzo o custo:

- O filtro de lista continua na tela. Quem quer uma lista só, escolhe, e a
  escolha fica gravada.
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

O painel ao lado é consequência dessa abertura, não um segundo trade-off.
A lista com as três seções precisa continuar visível enquanto a pessoa lê
uma atividade. O modal de hoje cobre a lista a cada clique.

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
- `01-pontos-de-atencao.md`, PA-01 a PA-15 e PA-32 a PA-40.
- `01-pedidos-clientes.md`, votos por tema.
- `01-varredura-modulos.md`, seção 1.
- `02-plano-ds.md`, slides 1 a 4.
- `prototipo/design-system.html`, seções `#tabela`, `#chip-prazo`, `#card-atividade` e `#painel-detalhe`.
- `prototipo/moldura.js`, cabeçalho com cinco atalhos.
- `docs/2026-11-08-revisao-respostas.md`, Questão 3.
- `docs/specs/2026-11-08-astrea-navegavel.md`, RF-06 e RF-08.
- `docs/plans/2026-11-08-astrea-navegavel.md`, Tasks 7, 10 e 11.
