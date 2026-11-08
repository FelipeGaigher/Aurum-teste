# Q2 — Design system e plano de redesign incremental

Documento-fonte da apresentação interativa. São exatamente 6 slides, o limite
do enunciado. Cada slide tem um título que responde à pergunta, uma ideia
central e pouco texto.

Legenda:

- `Apoio:` evidência para as perguntas ao vivo. Não aparece no slide.
- `> nota:` cuidado para quem apresenta. Não aparece no slide.
- `> aberto:` decisão que ainda falta.

---

## Slide 1 — Arquitetura

**Pergunta:** como o DS se organiza e o que vem primeiro?

**Título:** Primeiro os tokens semânticos, porque o legado os consome sem reescrita.

**Ideia central:** troca-se o valor, não a tela. Antigo e novo se aproximam antes de a migração chegar.

| Camada | O que é | Exemplo |
|---|---|---|
| Primitivos | Fundamentos: cor, tipo, espaço, raio | `--nectar-p-*` |
| Semânticos | Valor com papel na interface | `--nectar-s-*` |
| Componentes | Peça com propriedades e estados | Botão, campo, card de atividade |
| Padrões | Combinação com regra de uso | Filtro, lista de atividades, resposta de IA |
| Templates | Tela-modelo por módulo | Agenda, Área de trabalho, Kanban |

**Ponto de partida:** o Nectar já tem pilha nova `--nectar-p-*`, `-s-*` e `-m-*`. Os primitivos partem dela.

Apoio: 646 variáveis CSS e três sistemas de nomes (PA-17). O token novo de
marca é `#0A74D1`, e o botão medido é `#228BE6`. Três azuis na mesma tela
(PA-16). A IA tem paleta própria em roxo (PA-10).

---

## Slide 2 — Componentes flexíveis

**Pergunta:** como um componente serve módulos diferentes sem virar cópia?

**Título:** Um componente com propriedades serve cada contexto, sem cópia.

**Ideia central:** cada propriedade existe igual no código e no Figma, e combinação sem uso sai.

Exemplo: card de atividade, em auto layout.

| Propriedade | Tipo |
|---|---|
| Título | Texto |
| Mostrar prazo | Booleana |
| Mostrar processo | Booleana |
| Mostrar responsável | Booleana |
| Mostrar tags | Booleana |

**Estados:** default, hover, active, foco, disabled, erro, carregando, vazio.

Apoio: botão varia em caixa, raio e peso (PA-18). Existem seletores nativos e
customizados (PA-20). Há três padrões de rótulo (PA-21) e dois estilos de foco
(PA-22). Quatro booleanas como variantes dariam 16 cards por estado, 128 no
total. Como propriedade, o estado é a única variante.

---

## Slide 3 — Governança

**Pergunta:** quem decide componente novo, e como os squads e a Engenharia participam?

**Título:** A direção do DS decide, a Engenharia veta e os squads contribuem.

**Ideia central:** flexibilidade antes de processo. Pedido novo é o último recurso.

Ordem para qualquer necessidade:

1. Resolver com propriedade existente.
2. Compor localmente no squad.
3. Pedir componente novo: problema, onde aparece, quem mais usa.

| Papel | Quem | O que faz |
|---|---|---|
| Decide | Direção do DS | Define o que entra e mantém a fonte |
| Veta | Engenharia | Veto técnico, com justificativa, e cuida do pacote de código |
| Contribui | Squads | Propõem e constroem a partir do trabalho real |

**Fonte única:** tokens em JSON no repositório alimentam o código e as variáveis do Figma.

Apoio: componente novo entra no DS quando 2 ou mais squads precisam. Se só 1
precisa, fica local. Code Connect liga o componente do Figma ao código. O
changelog registra cada versão. Não existe comitê nem ritual novo.

---

## Slide 4 — Fases e convivência

**Pergunta:** por onde começar, com qual critério, e como novo e legado convivem?

**Título:** Tokens, moldura, configuração e, por último, os fluxos principais.

**Ideia central:** os componentes entram em produção onde o uso é menos frequente e chegam ao prazo já testados.

| Fase | O que entra | Por que nesta ordem |
|---|---|---|
| 1. Tokens | Semânticos sobre o Nectar | Aproxima o visual sem reescrever tela |
| 2. Moldura | Sidebar, navbar, filtros, botões de ação | Muda uma vez e depois fica fixa |
| 3. Configuração e Administração | Cards, tabelas, ações, modais, documentos, anexos, assinatura, aprovações, pagamentos | Menor frequência de uso |
| 4. Fluxos principais do Astrea | Agenda, Área de trabalho, Kanban e demais módulos | Chegam com tudo estruturado |

**Critério:** frequência, dor relatada, onde a migração do front já está, e risco.

**Convivência:** feature flag por escritório, com opção de voltar.

**Desde o primeiro componente:** teste com dados densos de prazo.

Apoio: 33% dos votos da planilha de pedidos tratam de prazo (PA-33). O
argumento da fase 3 é frequência, não "fluxo interno". O administrador do
escritório é cliente. Recusamos um ambiente paralelo de produção: custa mais
e cria risco de prazo desatualizado. A moldura reúne PA-01 a PA-15.

> nota: menor frequência não significa menor risco. A Administração tem
> limpeza de conta sem confirmação visível e rádios de segurança sem botão
> Salvar. Comece a fase 3 por modal e ação de confirmação.

> aberto: assinatura, aprovações e pagamentos não apareceram na varredura do
> plano de teste. Confirmar onde esses fluxos ficam antes da apresentação.
> Default: manter a lista, porque é a intenção da fase.

> aberto: meses por fase, dentro dos 12 meses. Sugestão: tokens de 1 a 3.
> Moldura de 3 a 5. Configuração de 5 a 8. Fluxos principais de 8 a 12.
> Default: ficar fora do slide e responder ao vivo.

---

## Slide 5 — Como envolver o time

**Pergunta:** como distribuir o trabalho entre os 4 designers sem tirar foco dos roadmaps?

**Título:** A divisão sai da conversa com cada designer.

**Ideia central:** não definimos a divisão agora. Ela nasce de quem cada pessoa é e do que o squad já pede.

Conversa individual, nas duas primeiras semanas:

| Tema | O que perguntar |
|---|---|
| Pessoa | Quem é e desde quando está na Aurum |
| Trabalho | Como trabalha, rotina, ferramentas |
| Direção | Foco atual e para onde quer ir |

**Contribuição:** sai do roadmap do squad. O designer entrega a tela, e o componente entra no DS nesse caminho.

Apoio: não existe tarefa extra nem frente definida antes das conversas. O
líder de cada squad combina o tempo com a direção do DS.

---

## Slide 6 — Riscos e métricas

**Pergunta:** quais são os 3 riscos, como mitigar e como medir sucesso?

**Título:** Os riscos são a moldura, o prazo e o tempo do time.

**Ideia central:** cada risco tem uma resposta concreta, e o sucesso se mede em adoção, eficiência e experiência.

| Risco | Mitigação |
|---|---|
| A moldura atinge todos de uma vez e precisa funcionar em duas tecnologias | Liberação gradual por escritório. Chamados como gatilho de reversão |
| Componente aprovado em tela fácil quebra no fluxo de prazo | Teste com dados densos desde o início |
| O roadmap consome os designers, e a vaga não é gestora | Líderes como patrocinadores. Contribuição vinda da demanda real |

| Eixo | Métricas |
|---|---|
| Adoção | % de telas com componentes do DS, % de cores vindas de token, componentes desvinculados |
| Eficiência | Tempo do design até o dev, bugs visuais abertos |
| Experiência | Chamados por módulo, tempo para criar um prazo, sucesso na tarefa, CSAT |

Apoio: o legado é AngularJS, e o menu lateral usa `ng-show`. A moldura precisa
de uma versão para cada tecnologia, com as mesmas propriedades. O limite de
chamados para reverter sai da linha de base medida antes da fase 2.

---

## Fora dos 6 slides

- O parágrafo de uso de IA fica no fim da entrega geral, como o enunciado pede.
- O kit de agentes e skills fica para as perguntas ao vivo.
