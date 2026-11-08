# Q1 — Diagnóstico e direção de design

Documento-fonte dos 5 slides da Q1. O texto aqui é o que a gente itera; o
Figma recebe a versão fechada. A evidência mora em `01-telas-observadas.md`
e em `01-inventario-ui.md`, e os prints em `evidencias/`.

Legenda:

- `> decisão:` algo que já fechamos na conversa.
- `> aberto:` algo que ainda depende de você.

> decisão: quatro problemas na gestão de atividades e um no funil de
> entrada. O recorte do enunciado manda, e o funil é o achado mais forte
> que temos. Default assumido na conversa de 07/11.

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
| P3 | Criar uma atividade interrompe quem cria | Usabilidade de fluxo | 14, 15, 16, 22 |
| P4 | Três azuis, três cinzas, três rótulos, dois focos | Consistência e acessibilidade | 03, 04, 07, 11, 21 a 24 |
| P5 | O funil de entrada falha em silêncio | Usabilidade e feedback | 01 a 10 |

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
- Criar etiqueta leva para outra tela e abandona o cadastro. Tela 22.
- Data no passado só pergunta "deseja continuar?", sem motivo nem opção
  de salvar como concluída. Tela 15.

Causa provável: o formulário acumulou campos e atalhos ao longo dos anos
sem um dono do fluxo inteiro. Cada campo faz sentido sozinho. Juntos,
viram atrito.

Por que importa: criar atividade é a ação mais repetida do dia. Atrito
pequeno vezes trinta vezes ao dia vira o motivo de a equipe anotar prazo
fora do sistema.

### P4. Três azuis, três cinzas, três rótulos, dois focos

Sintoma, medido no inventário:

- Azul da marca `#008fd5`, azul do componente `#228be6`, azul da campanha
  `#0255c4`, na mesma tela. Tela 11.
- Cinza de texto `#202124` do Material, `#6c757d` do Bootstrap, divisor
  `#dee2e6` do Mantine. Três bibliotecas.
- Rótulo acima no cadastro, placeholder no onboarding, caixa alta à direita
  no contato. Telas 04, 07 e 12.
- Anel de foco preto no site, azul no produto. Telas 04 e 07.
- Botão em caixa baixa no site, caixa alta no produto. Campos sem grade de
  largura. Telas 22 a 24.

Causa provável: não existe fonte única. Cada time puxou a biblioteca que
tinha à mão. É a terceira restrição do briefing, com hex.

Por que importa: cada divergência é um reaprendizado pequeno para o
usuário e um custo de manutenção para o time. E sem token de foco, quem
navega por teclado perde o rastro.

---

## Slide 4 — P5 e os princípios

### P5. O funil de entrada falha em silêncio

Sintoma:

- Com bloqueador de anúncios, o botão "Continuar" fica cinza e sem
  mensagem. O formulário depende de script de terceiro. Telas 01 e 02.
- Barra de progresso sem contagem no site, stepper com rótulo no produto.
  Telas 03 e 05.
- A confirmação da OAB não tem saída para quem errou. O limite de 40
  processos aparece só no fim. Telas 08 e 10.

Causa provável: site e produto são de times diferentes, e o funil cruza a
fronteira sem dono.

Por que importa: é a primeira impressão, e é aquisição. Quem não entra não
vira cliente, e ninguém fica sabendo por quê.

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
| P5: o funil perde quem usa bloqueador | Taxa de conversão da página por navegador e extensão. Confirmar com marketing se o teste A/B está ativo | Analytics de marketing |

A regra: hipótese que custa caro corrigir se confirma antes. Hipótese que
se corrige por token segue direto para o plano da Q2.

---

## Fora do escopo da Q1

- Contatos, Financeiro e os outros módulos. Entram só como evidência de
  consistência em P4.
- As ideias de melhoria do backlog, `01-melhorias.md`. Elas são direção
  para a Parte B, não problema diagnosticado.
