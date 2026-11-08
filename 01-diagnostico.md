# Q1 — Diagnóstico e direção de design

Documento-fonte dos 5 slides da Q1. O texto aqui é o que a gente itera; o
Figma recebe a versão fechada. A evidência mora em `01-telas-observadas.md`,
`01-inventario-ui.md`, `01-pontos-de-atencao.md`, `01-pedidos-clientes.md` e
`01-varredura-modulos.md`. Os prints ficam em `evidencias/`.

Legenda:

- `> decisão:` algo que já fechamos na conversa.
- `> aberto:` algo que ainda depende de você.

> decisão: os cinco problemas ficam na gestão de atividades. Cadastro,
> onboarding e Contatos saem da Q1 e vivem no backlog, para a Parte B.
> Decisão de Felipe em 07/11, que reverteu o default anterior.

> decisão: P5 passa para o slide 3. Os princípios ganham o slide 4 inteiro.
> Cada um agora traz heurística, lei de Gestalt, exemplo e uso diário.

> decisão: o deck `01-slides-q1.html` cai de 8 para 5 slides, o limite do
> enunciado. Os slides 1 a 5 abaixo espelham o deck.

> decisão: a varredura de 08/11 entra como desk research complementar.
> Ela não valida nada com usuário. Fontes:
> `docs/2026-11-08-varredura-astrea.md` e
> `docs/2026-11-08-comparativo-astrea-prototipo.md`.

---

## Slide 1 — Os cinco problemas

Pergunta da banca: "os 5 problemas de experiência mais relevantes". Com
evidência, e com o porquê de cada um importar para quem usa.

A frase do slide: **O Astrea sabe o que é um prazo. A interface ainda não
mostra isso.**

| Nº | Problema | Tipo | Telas |
|---|---|---|---|
| P1 | O prazo não domina as telas que existem para ele | Hierarquia e densidade | 11, 14, 17 a 20 |
| P2 | Sem hierarquia de nomes, a mesma atividade em quatro lugares | Arquitetura de informação, hipótese | 10, 11, 13, 14 |
| P3 | Criar uma atividade interrompe quem cria | Usabilidade de fluxo | 14, 15, 16 |
| P4 | Três azuis, três cinzas, quatro jeitos de criar | Consistência | 11, 13, 14, 17 a 20 |
| P5 | A moldura compete com o trabalho | Hierarquia e ruído | 11, 13 |

Separar sintoma de causa é o que a banca pede. Cada problema traz o sintoma
visto, a causa provável e o porquê de importar.

A evidência vem das telas do trial, do inventário de UI e de 407 votos.
A varredura de 08/11 complementa.

---

## Slide 2 — P1 e P2

### P1. O prazo não domina as telas que existem para ele

Sintoma:

- 136 de 407 votos (33%) pedem destaque de prazo, audiência, data limite e
  atividades do dia. ASTP-I-639 tem 43 votos.
- A Área de trabalho abre em uma lista e esconde tarefa atrasada de outra
  lista. PA-31.
- Prazo vencido não tem seção própria. Falta "Atrasadas" ao lado de "Hoje".
  PA-32.
- A linha da Área de trabalho marca atraso só pela cor da data. Não existe
  seção de atrasadas. Varredura de 08/11.
- A grade mensal da Agenda mostra duas semanas por tela de 1920 por 960.
  Quem planeja o mês não vê o mês. Telas 19 e 20.
- A tarefa criada não apareceu em nenhuma das quatro visões. Tela 17 a 20.
  A causa continua em aberto: filtro ou data retroativa. PA-50.
- Na varredura de 08/11, a Agenda abriu em "Ontem". As duas tarefas datadas
  da conta não apareceram com os filtros padrão.
- No modal, a prioridade é um seletor com "Baixa" por padrão. A data não
  distingue prazo fatal de data comum. Tela 14.

Ressalva: Alertas já mostra "Tarefa atrasada". O dado existe no produto. O
problema é a tela de abertura não o mostrar.

Causa provável: a Agenda nasceu como calendário genérico, com a
densidade de um calendário pessoal. A Área de trabalho abre por lista, não
por urgência. O objeto do escritório é o prazo processual, e ele não ganhou
lugar próprio na hierarquia.

Por que importa: o escritório depende do Astrea para não perder prazo. É a
primeira restrição do briefing. Um prazo que não salta aos olhos é o risco
mais caro que a interface pode carregar.

### P2. Sem hierarquia de nomes, a mesma atividade em quatro lugares

Hipótese a validar. O slide 5 diz como.

Sintoma:

- Nos pedidos, tarefa, prazo, audiência e evento aparecem como tipos
  diferentes. ASTP-I-639, ASTS-I-702.
- O produto não organiza esses tipos. A ficha do processo pede "Tipo de
  atividade" com Tarefa ou Evento. Prazo e Audiência existem só como etiqueta.
- "Tarefa" na Área de trabalho e no modal, "Atividade" na Agenda e no botão.
  Telas 11, 13 e 14.
- A mesma atividade aparece em quatro lugares: Área de trabalho, Agenda,
  lista lateral "Tarefas sem data" e Alertas. Tela 18 e varredura, seção 5.
- O número do processo já copia com 1 clique na lista de processos e na
  ficha. O problema é a linha da atividade, que não mostra o número.
- O onboarding promete "quadros Kanban". O item de menu "Gestão kanban"
  existe no código, oculto por flag de plano. A rota redireciona para a
  Área de trabalho. Telas 06 e 11, e `01-inventario-css-astrea.md`.

Causa provável: módulos construídos por times diferentes em épocas
diferentes, cada um com o próprio vocabulário e a própria visão. Falta um
termo geral com os tipos abaixo dele. "Atividade" pode ser esse termo. PA-23.

Por que importa: quem busca uma atividade precisa saber onde ela está e
como ela se chama. Ninguém mediu ainda o custo em chamado de suporte.

---

## Slide 3 — P3, P4 e P5

### P3. Criar uma atividade interrompe quem cria

Sintoma:

- Quatro campos obrigatórios para uma tarefa simples. "Lista de tarefas" é
  obrigatório com um só valor possível. Tela 14.
- "Envolver mais pessoas" abre um popover dentro do modal. Tela 16.
- Data no passado só pergunta "deseja continuar?", sem motivo nem opção
  de salvar como concluída. Tela 15.

Causa provável: o formulário acumulou campos e atalhos ao longo dos anos
sem um dono do fluxo inteiro. Cada campo faz sentido sozinho. Juntos,
viram atrito.

Por que importa: criar atividade é a ação mais repetida do dia. Atrito
pequeno, repetido todo dia, vira o motivo de a equipe anotar prazo fora do
sistema.

### P4. Três azuis, três cinzas, quatro jeitos de criar

Sintoma, medido no inventário:

- Azul da marca `#008fd5`, azul do componente `#228be6`, azul da campanha
  `#0255c4`, na mesma tela. Tela 11.
- Cinza de texto `#202124` do Material, `#6c757d` do Bootstrap, divisor
  `#dee2e6` do Mantine. Três bibliotecas.
- Três jeitos de criar nas capturas de 07/11. "Adicionar primeira tarefa"
  em caixa alta, "Adicionar atividade" com seta e um "+" redondo. Telas 11,
  13 e 17.
- Quatro formas de criar no comparativo de 08/11: "Adicionar tarefa",
  "Adicionar", "+" sem rótulo e "Adicionar documento" com seta. Voltar
  aparece em três formas. As cores não foram medidas de novo.
- Seletor nativo do navegador no widget, customizado no modal. Telas 11
  e 14.
- A mesma cor azul para link, número de estatística e botão. Tela 11.
- O menu lateral não tem estado ativo. O fundo cinza é só hover. PA-01.

Causa provável: não existe fonte única. Cada time puxou a biblioteca que
tinha à mão. É a terceira restrição do briefing, com hex.

Por que importa: cada divergência é um reaprendizado pequeno para o
usuário e um custo de manutenção para o time. Quando tudo é azul, nada
parece clicável.

### P5. A moldura compete com o trabalho

Sintoma:

- Faixa de campanha com contador regressivo, vista nas capturas de 07/11.
  Ela não apareceu na sessão de 08/11. A faixa é campanha, e campanha tem
  data. Tela 11.
- Cinco ícones, selo "1 ano grátis" e botão verde "Contratar" no
  cabeçalho. A varredura de 08/11 confirmou os três. Tela 11.
- "Conheça as IAs" com cor própria e fundo lilás no menu. A IA nasce fora
  do padrão. Telas 11 e 13.
- Estatísticas em azul de link. Na árvore de acessibilidade elas são link
  sem destino. Ninguém testou o clique ainda. Tela 11.
- A nuvem do cabeçalho significa "Resultados de buscas". Um especialista
  leu como salvar. PA-05.

Causa provável: a moldura não tem dono de produto. Marketing e IA entram
nela sem passar por um padrão.

Por que importa: quem vive no produto lê esse ruído o dia inteiro. E o
briefing pede que a IA nasça no mesmo padrão do resto.

---

## Slide 4 — Princípios de design

Pergunta da banca: "quais princípios guiariam a sua proposta de redesign".

| Princípio | O que ele decide | Nielsen | Gestalt | Exemplo no Astrea | No dia a dia |
|---|---|---|---|---|---|
| O prazo primeiro | O dado que não pode falhar é o mais visível em toda tela de atividade. Cor e texto, nunca só cor | Visibilidade do estado do sistema | Figura e fundo: o prazo é figura | Prazos e audiências em "Lembretes", abaixo das estatísticas. PA-33 | Teste de desfoque em toda revisão. Se o prazo some, a tela volta |
| Uma palavra, um lugar | Um nome para cada objeto e um caminho para cada ação. Atividade como termo geral, com tipos. O Kanban prometido aparece no menu, em todo plano | Correspondência com o mundo real | Região comum: os tipos no mesmo bloco | O prazo se espalha em quatro visões e um painel truncado. PA-48 | Glossário no design system. Rótulo novo passa por ele antes do handoff |
| A moldura é a âncora | Cabeçalho, menu e ações no mesmo lugar em tela nova e legada. O conteúdo migra, a casa fica | Consistência e padrões | Proximidade: controles afins juntos | A busca fica no centro do cabeçalho, longe das ações. PA-03 | Moldura é componente único no Figma e no código. Squad não redesenha |
| Todo erro tem saída | Nenhum botão morre em silêncio. Cada estado de erro diz o que houve e como voltar | Ajuda para corrigir erros | Proximidade: o aviso junto do campo | Data no passado abre um segundo diálogo. PA-57 | Handoff lista cada estado de erro e a saída dele |
| Densidade para quem consulta o dia todo | Compacto por padrão, com modo respirado por escolha. Tabela quando se compara, card quando se age | Flexibilidade e eficiência | Continuidade: a grade alinhada guia o olho | O mês mostra duas semanas por tela. PA-47. O número do processo não aparece na linha da atividade. Na lista de processos, ele já copia com 1 clique. PA-38 | Protótipo com volume real de atividades, não com três linhas |
| Mesmo padrão para tudo, inclusive a IA | A IA entra como componente do sistema, com confirmar e desfazer. Sem paleta nem ícone à parte | Consistência e padrões. Controle e liberdade | Similaridade: mesma função, mesma aparência | IA em roxo, com paleta própria. PA-10 | Recurso de IA usa o mesmo kit e a mesma revisão do design system |

Gestalt aqui é agrupamento perceptivo, a base da hierarquia visual. Cor é um
recurso entre outros.

Os princípios são a ponte para a Q2 e a Q3. Cada um aparece em pelo menos
uma linha do contrato da tela em `03-tela.md`.

O protótipo navegável aplica os seis princípios em 17 páginas. Cada página
usa a mesma moldura e as mesmas peças do design system.

---

## Slide 5 — O que validar antes de seguir

Pergunta da banca: "quais hipóteses você confirmaria antes de seguir, e
como".

| Hipótese | A planilha já responde | Como confirmar | Fontes a cruzar |
|---|---|---|---|
| P1: a Área de trabalho esconde o que atrasou | Em parte. 136 de 407 votos (33%) pedem destaque. Não diz se Alertas já resolve | Contas com tarefa atrasada fora da lista inicial. Quem abre Alertas antes da Área de trabalho. Cinco entrevistas com quem controla prazo | Pedido, analytics, entrevista |
| P1: a tarefa salva some porque a Agenda abre fora de hoje | Não | Em 08/11, a Agenda abriu em "Ontem" e não mostrou as duas tarefas. Repetir com data de hoje e filtro em "Todas" | Varredura, teste no trial, chamado |
| P1: a densidade baixa atrapalha o planejamento do mês | Não. A planilha cobre só a Área de trabalho | Qual visão da Agenda é mais usada e por quanto tempo. As mesmas entrevistas | Analytics, entrevista |
| P1: a tarefa salva sumiu por filtro ou data, não por bug | Não | Repetir o teste com data de hoje e filtro em "Todas". Abrir chamado se persistir | Teste no trial, chamado |
| P2: falta hierarquia de nomes, e "atividade" serve como termo geral | Em parte. Os títulos tratam tarefa, prazo, audiência e evento como coisas diferentes. Não medem confusão | Chamados com "onde está" ou "não achei". Termos que o cliente usa. Teste de cinco segundos com a tela da Agenda | Pedido, chamado, entrevista |
| P3: o modal de criar tem abandono | Não. Nenhum tema trata do formulário de criar | Funil do modal: aberto, preenchido, salvo. Tempo até salvar. Quantas atividades nascem com data passada e por quê | Analytics, chamado |
| P4: a inconsistência custa reaprendizado | Quase nada. O tema Design tem 3 votos | Que existe, o inventário já prova. O custo se mede em bugs visuais abertos e tempo de handoff | Inventário, backlog, time de design |
| P5: o ruído da moldura custa atenção | Não. Nenhum tema trata da moldura | Perguntar ao marketing se a faixa é fixa ou sazonal. Ela não apareceu em 08/11. Conversão de "Contratar" e de "1 ano grátis" contra o custo em CSAT. Teste do ícone de nuvem | Analytics de marketing, CSAT, entrevista |
| P5: os números de Estatísticas levam a algum lugar | Não | Testar o clique no trial. Cliques por conta no analytics | Teste no trial, analytics |

Limites da planilha:

- Cobre só a Área de trabalho.
- Vem de quem escolheu pedir. É autosseleção.
- Parte dos pedidos é antiga. Confira cada um no produto atual.
- Voto mostra pedido, não uso.

A varredura de 08/11 já fez a primeira rodada de desk research. Ela
percorreu 12 módulos e a moldura em produção, só com leitura. O comparativo
contou os cliques de 48 tarefas nos dois lados. Clique mede esforço. O
sucesso na tarefa só a entrevista e o analytics confirmam.

Como analisar: uma linha por hipótese, com quatro fontes.

| Fonte | O que ela diz |
|---|---|
| Pedido | O que o cliente pede |
| Chamado de suporte | Onde o cliente trava |
| Analytics | O que o cliente faz |
| Entrevista | Por que ele faz |

Duas fontes de tipos diferentes na mesma direção confirmam a hipótese. Se
elas divergem, a entrevista explica antes da decisão.

A regra: hipótese que custa caro corrigir se confirma antes. Hipótese que
se corrige por token segue direto para o plano da Q2.

---

## Fora do escopo da Q1

- Contatos, Financeiro e os outros módulos. Entram só como evidência de
  consistência em P4.
- As ideias de melhoria do backlog, `01-melhorias.md`. Elas são direção
  para a Parte B, não problema diagnosticado.
