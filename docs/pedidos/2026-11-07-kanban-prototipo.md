# Pedido: protótipo local do Kanban da Q3

Grau 1 da `spec-flow`. Este arquivo descreve a alteração. O contrato de
design mora em `03-tela.md`; este pedido só diz o que vira código.

## O que é

Um protótipo navegável do Kanban da gestão de atividades do Astrea. Fica no
repositório e roda local. Serve para ver a tela evoluir sem depender do Figma.

## Onde

- `prototipo/kanban.html`: arquivo único, CSS e JS embutidos, sem build,
  sem CDN, sem dependência externa. Abre com dois cliques ou por
  `python -m http.server 8000` na raiz do repositório.
- `prototipo/README.md`: como rodar, o que é fictício, o que está aberto.

## O que a tela mostra

A moldura da tela 11 de `01-telas-observadas.md`, sem a faixa de campanha
e sem o selo comercial. Cabeçalho com logo, busca global e menu do usuário.
Menu lateral com os dez itens atuais, "Área de trabalho" ativo.

Dentro, o Kanban com três colunas, A fazer, Fazendo e Concluído, conforme
`03-pesquisa-astrea.md`. Acima das colunas, filtros de responsável, tipo e
período, e o botão de criar atividade.

Cada card tem cinco dados. Prazo fatal como dado dominante, com cor e
texto para vencido e vence hoje. Título da atividade. Tipo em chip, entre
tarefa, evento, prazo e audiência. Processo vinculado. Responsável com
inicial. Um card traz uma sugestão de IA no mesmo chip dos outros, com botões
confirmar e desfazer.

Estados visíveis sem código: coluna vazia, carregando, e foco de teclado
em card, botão, campo e coluna. Um controle no rodapé alterna carregando
e vazio, para a demonstração.

Arrastar card entre colunas altera o status e atualiza a contagem da coluna.
Setas do teclado movem o card em foco entre colunas.

Tema claro e escuro pela coleção Semantic. Segue o sistema e tem chave
visível, conforme a regra da casa para HTML.

## Tokens

Toda cor, raio, espaço e tipografia vem de variável CSS declarada em
`:root`. Três camadas com o nome do contrato: `--primitive-*`, `--color-*`,
`--space-*`, `--radius` e `--font-*`. Nenhum hex fora do
bloco de primitivos. O primitivo azul parte de `#008fd5`, o azul do
Astrea. Um raio só.

Família tipográfica em aberto em `03-tela.md`. O protótipo declara
`--font-sans` com IBM Plex Sans primeiro e fallback de sistema, e troca
quando a decisão fechar.

## Dado fictício

Dez atividades de escritório de advocacia. Número de processo no padrão
CNJ, nomes de responsável inventados, prazos nos próximos dez dias e dois
vencidos. Tudo dentro do arquivo, em um array no JS.

## Critérios de aceite

- `python ~/.claude/skills/sem-plastico/scripts/detectar.py prototipo/kanban.html` devolve 0.
- `grep -nE "#[0-9a-fA-F]{3,8}\b" prototipo/kanban.html` só acha linhas dentro do bloco `:root` de primitivos.
- Arrastar um card para outra coluna altera a contagem das duas colunas.
- Tab percorre filtros, botão, cards e colunas, com foco visível em todos.
- Em janela de 1280px e de 1920px, sem rolagem horizontal da página.
- Tema escuro troca pelo sistema e pela chave, sem recarregar.
- Nenhuma dependência externa: o arquivo abre sem rede.

## Fora do escopo

- Persistência. Recarregar volta ao dado fictício.
- Criar atividade de verdade. O botão abre um painel vazio com os campos
  rotulados, sem salvar.
- Agenda e Área de trabalho em lista. Só o Kanban.
- Versão para celular.
