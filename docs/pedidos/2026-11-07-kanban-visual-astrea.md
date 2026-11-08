# Pedido: o protótipo no visual atual do Astrea

Grau 1 da `spec-flow`, continuação do protótipo. Pedido de Felipe em
07/11: "tem que pegar o DS da Astrea pra fazer esse Kanban. Logo, sidebar,
navbar, tem que adicionar tudo isso. O tema escuro não, e está muito
quadrado."

## O que muda

O protótipo deixa de ter direção visual própria. Ele segue o visual do
Astrea logado, visto nas telas 11, 13 e 21 de `01-telas-observadas.md`.
Prints: `evidencias/08-area-de-trabalho-vazia.png`,
`evidencias/11-agenda-vazia.png` e `evidencias/20-contatos-lista.png`.
O Kanban novo entra dentro da moldura real.

## Arquivos

- Modify: `prototipo/kanban.html`
- Modify: `03-componentes.html`
- Modify: `prototipo/README.md`, só a nota sobre a fonte

## Tokens

- Só tema claro. Remover a chave de tema e o `light-dark()`. Declarar
  `color-scheme: light`.
- Primitivos novos de raio: `--primitive-radius-8: 8px` e
  `--primitive-radius-12: 12px`. Semântico `--radius: 8px` para campo,
  botão e chip. `--radius-card: 8px` para card e widget. O 4px sai.
- Azul: primitivo `--primitive-blue-500: #008fd5` segue como marca e logo.
  Ação com texto branco precisa de AA, então `--color-action` usa um azul
  da mesma família que passe de 4,5:1 sobre branco. Meça com o
  `contraste.py` e registre o valor.
- Cinzas no tom do Astrea: texto `#3d4852`, texto secundário `#6b7785`,
  borda `#e3e8ee`, fundo de página `#ffffff`, fundo de área `#f5f7f9`.
  Valores de partida, ajuste pelo print.
- Sombra como token: `--shadow-card: 0 1px 2px rgba(16, 24, 40, 0.06)`,
  usada em card e widget. A regra de hex só no bloco de primitivos vale
  para a sombra também: o rgba fica em primitivo.
- Fonte: `--font-sans: "Open Sans", "Segoe UI", system-ui, sans-serif`.
  O produto usa uma humanista sem serifa; Open Sans é a do site. Troca
  quando o snippet de console disser a família real.
- Tamanhos: título de página 28px, texto 15px, rótulo 13px, como no print.

## Moldura

Navbar branca, altura 88px, borda inferior `--color-border-default`:

- Logo "astrea": ícone quadrado arredondado em `--primitive-blue-500`,
  com um recorte branco no canto. Ao lado, a palavra "astrea" em caixa
  baixa, cinza do texto, peso 400, 28px. Tudo em SVG inline ou texto.
<!-- lint-ignore: deriva-terminologica — "Pesquisar" é o texto literal do campo no Astrea -->
- Campo de busca de 560px, raio 8, borda, placeholder "Pesquisar contato,
  processo ou atividade" e ícone de lupa à direita.
- À direita, cinco ícones de 22px em `--color-text-muted`: IA, mais,
  nuvem, relógio, engrenagem. O primeiro com fundo `--color-bg-subtle`
  como item ativo. Cada um com `aria-label` e `title`.
- Nome do usuário com seta para baixo.
- Sem selo "1 ano grátis", sem botão "Contratar", sem faixa de campanha.
  Decisão do contrato em `03-tela.md`. Registre no README.

Sidebar branca de 300px com borda direita:

- Dez itens, nesta ordem, cada um com ícone de linha de 18px à esquerda
  e texto 16px. Área de trabalho, lista. Agenda, calendário. Contatos,
  pessoa. Atendimentos, balão. Processos e casos, pasta. Publicações,
  documento. Financeiro, cifrão. Documentos, clipe. Indicadores, gráfico.
  Alertas, sino.
- Ícones em SVG inline com `stroke="currentColor"`, traço 1.75, estilo
  de linha. Nada de emoji nem fonte de ícone.
- Item ativo "Área de trabalho" com fundo `--color-bg-subtle`, texto em
  `--color-action` e `aria-current="page"`. O Astrea de hoje não marca o
  item ativo; isso é melhoria nossa, registre.
- Divisor, depois "Suporte" com ícone de interrogação. Sem "Conheça as
  IAs".

Conteúdo:

- Título "Área de trabalho" 28px, peso 500. À direita, o botão primário
  "Adicionar atividade" em caixa alta, como os botões do Astrea. Raio 8 e
  cor de ação.
- Abaixo do título, os filtros e o Kanban que já existem, com o raio novo.
- Card com borda, raio de card, sombra de card, fundo branco. Coluna com
  fundo de área e raio de card.
- Rodapé de demonstração como está.

## O que não muda

Dados fictícios, colunas, arrastar, teclado, filtros, painel e estados.
Regra de foco em `:focus-visible` e DOM por `createElement`. Nenhum hex
fora dos primitivos e nenhuma rede.

## Critérios de aceite

- `python prototipo/verificar.py prototipo/kanban.html 03-componentes.html` devolve 0.
- Headless em 1280 e 1920: sem rolagem horizontal. Logo, navbar e sidebar
  visíveis. Dez itens no menu. Contagens 5, 3 e 2.
- Todo par de texto e fundo passa no AA normal, medido com `contraste.py`.
  Exceção só do logotipo, já registrada.
- `03-componentes.html` mostra os mesmos componentes com os tokens novos.
