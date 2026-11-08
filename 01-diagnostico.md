# Q1 — Diagnóstico e direção de design

Documento-fonte dos 5 slides da Q1. O texto aqui é o que a gente itera; o
Figma recebe a versão fechada. A evidência mora em `01-telas-observadas.md`
e em `01-inventario-ui.md`, e os prints em `evidencias/`.

Legenda:

- `> decisão:` algo que já fechamos na conversa.
- `> aberto:` algo que ainda depende de você.

> decisão: os cinco problemas ficam na gestão de atividades. Cadastro,
> onboarding e Contatos saem da Q1 e vivem no backlog, para a Parte B.
> Decisão de Felipe em 07/11, que reverteu o default anterior.

---

## Slide 1 — Os cinco problemas

Pergunta da banca: "os 5 problemas de experiência mais relevantes". Com
evidência, e com o porquê de cada um importar para quem usa.

A frase do slide: **O Astrea sabe o que é um prazo. A interface ainda não
mostra isso.**

| Nº | Problema | Tipo | Telas |
|---|---|---|---|
| P1 | O prazo não domina a tela que existe para ele | Hierarquia e densidade | 14, 17 a 20 |
| P2 | Dois nomes e três lugares para a mesma atividade | Arquitetura de informação | 10, 11, 13, 14 |
| P3 | Criar uma atividade interrompe quem cria | Usabilidade de fluxo | 14, 15, 16 |
| P4 | Três azuis, três cinzas, três jeitos de criar | Consistência | 11, 13, 14, 17 a 20 |
| P5 | A moldura compete com o trabalho | Hierarquia e ruído | 11, 13 |

Separar sintoma de causa é o que a banca pede. Cada slide de problema traz
o sintoma visto, a causa provável e o porquê de importar.

---

## Slide 2 — P1 e P2

### P1. O prazo não domina a tela que existe para ele

Sintoma:

- A grade mensal da Agenda mostra duas semanas por tela de 1920 por 960.
  Quem planeja o mês não vê o mês. Telas 19 e 20.
- A tarefa criada não apareceu em nenhuma das quatro visões. Tela 17 a 20.
- No modal, a prioridade é um seletor com "Baixa" por padrão. A data não
  distingue prazo fatal de data comum. Tela 14.

Causa provável: a Agenda foi desenhada como calendário genérico, com a
densidade de um calendário pessoal. O objeto do escritório é o prazo
processual, e ele não ganhou lugar próprio na hierarquia.

Por que importa: o escritório depende do Astrea para não perder prazo. É a
primeira restrição do briefing. Um prazo que não salta aos olhos é o risco
mais caro que a interface pode carregar.

### P2. Dois nomes e três lugares para a mesma atividade

Sintoma:

- O produto chama de "tarefa" na Área de trabalho e no modal, e de
  "atividade" na Agenda e no botão. Telas 11, 13 e 14.
- O onboarding promete "quadros Kanban". O Kanban não está no menu nem na
  Agenda. Telas 06 e 11.
- A mesma atividade vive em Área de trabalho, Agenda e lista lateral de
  "Tarefas sem data". Tela 18.

Causa provável: módulos construídos por times diferentes em épocas
diferentes, cada um com o próprio vocabulário e a própria visão. É o que o
briefing descreve, visto de dentro.

Por que importa: quem procura uma atividade precisa saber onde ela está e
como ela se chama. Dois nomes dobram o custo de aprender e o volume de
chamado de suporte.

---

## Slide 3 — P3 e P4

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
pequeno vezes trinta vezes ao dia vira o motivo de a equipe anotar prazo
fora do sistema.

### P4. Três azuis, três cinzas, três jeitos de criar

Sintoma, medido no inventário:

- Azul da marca `#008fd5`, azul do componente `#228be6`, azul da campanha
  `#0255c4`, na mesma tela. Tela 11.
- Cinza de texto `#202124` do Material, `#6c757d` do Bootstrap, divisor
  `#dee2e6` do Mantine. Três bibliotecas.
- Três jeitos de criar. "Adicionar primeira tarefa" em caixa alta.
  "Adicionar atividade" com seta de menu. Um "+" redondo na Agenda.
  Telas 11, 13 e 17.
- Seletor nativo do navegador no widget, customizado no modal. Telas 11
  e 14.
- A mesma cor azul para link, número de estatística e botão. Tela 11.

Causa provável: não existe fonte única. Cada time puxou a biblioteca que
tinha à mão. É a terceira restrição do briefing, com hex.

Por que importa: cada divergência é um reaprendizado pequeno para o
usuário e um custo de manutenção para o time. Quando tudo é azul, nada
parece clicável.

---

## Slide 4 — P5 e os princípios

### P5. A moldura compete com o trabalho

Sintoma:

- Faixa de campanha com contador regressivo no topo do produto logado,
  em toda tela. Tela 11.
- Três chamadas comerciais no cabeçalho: selo "1 ano grátis", botão
  verde "Contratar" e a faixa. Tela 11.
- "Conheça as IAs" com cor própria e fundo lilás no menu. A IA nasce fora
  do padrão. Telas 11 e 13.
- Estatísticas da coluna direita em azul de link, sem ação por trás.
  Tela 11.

Causa provável: a moldura não tem dono de produto. Marketing e IA entram
nela sem passar por um padrão.

Por que importa: quem vive no produto o dia inteiro lê o ruído trinta
vezes. E o briefing pede que a IA nasça no mesmo padrão do resto.

### Princípios de design

Pergunta da banca: "quais princípios guiariam a sua proposta de redesign".

| Princípio | O que ele decide |
|---|---|
| O prazo primeiro | O dado que não pode falhar é o mais visível em toda tela de atividade. Cor e texto, nunca só cor |
| Uma palavra, um lugar | Um nome para cada objeto e um caminho para cada ação. Atividade, com tipos. Kanban como visão, não como módulo |
| A moldura é a âncora | Cabeçalho, menu e ações no mesmo lugar em tela nova e legada. O conteúdo migra, a casa fica |
| Todo erro tem saída | Nenhum botão morre em silêncio. Cada estado de erro diz o que houve e como voltar |
| Densidade de quem olha trinta vezes por dia | Compacto por padrão, com modo respirado por escolha. Tabela quando se compara, card quando se age |
| Mesmo padrão para tudo, inclusive a IA | A IA entra como componente do sistema, com confirmar e desfazer. Sem paleta nem ícone à parte |

Os princípios são a ponte para a Q2 e a Q3. Cada um aparece em pelo menos
uma linha do contrato da tela em `03-tela.md`.

---

## Slide 5 — O que validar antes de seguir

Pergunta da banca: "quais hipóteses você confirmaria antes de seguir, e
como".

| Hipótese | Como confirmar | Fonte |
|---|---|---|
| P1: a densidade baixa da Agenda atrapalha o planejamento do mês | Analytics: qual visão da Agenda é mais usada e por quanto tempo. Cinco entrevistas com quem controla prazo no escritório | Analytics do produto, pesquisa |
| P1: a tarefa não aparecer é bug, não filtro | Repetir o teste com data de hoje e filtro em "Todas". Abrir chamado se persistir | Teste próprio, suporte |
| P2: "tarefa" e "atividade" confundem | Chamados de suporte com "onde está" ou "não achei". Teste de cinco segundos com a tela da Agenda | Suporte, pesquisa |
| P3: o modal de criar tem abandono | Funil do modal: aberto, preenchido, salvo. Tempo até salvar. Quantas atividades nascem com data passada e por quê | Analytics, suporte |
| P4: a inconsistência custa reaprendizado | Não precisa de usuário para provar que existe: o inventário já prova. Medir o custo por bugs visuais abertos e por tempo de handoff | Backlog, time de design |
| P5: o ruído da moldura custa atenção | Cliques na faixa e no X dela por usuário ativo. Conversão da faixa dentro do produto contra o custo em CSAT, com o marketing | Analytics de marketing, CSAT |

A regra: hipótese que custa caro corrigir se confirma antes. Hipótese que
se corrige por token segue direto para o plano da Q2.

---

## Fora do escopo da Q1

- Contatos, Financeiro e os outros módulos. Entram só como evidência de
  consistência em P4.
- As ideias de melhoria do backlog, `01-melhorias.md`. Elas são direção
  para a Parte B, não problema diagnosticado.
