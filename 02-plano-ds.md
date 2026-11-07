# Q2 — Design system e plano de redesign incremental

Documento-fonte dos 6 slides. Cada seção vira um slide. O texto aqui é o que
a gente itera; o Figma recebe a versão fechada.

Legenda:

- `> decisão:` algo que já fechamos na conversa.
- `> aberto:` algo que ainda depende de você.

---

## Slide 1 — Tese e arquitetura

### A tese em uma frase

Um design system usado por pessoas e por IA. Designer, dev e feature de IA
geram interface a partir da mesma fonte.

Por que essa tese: o briefing diz que IA vai entrar nos fluxos e precisa nascer
dentro dos mesmos padrões. Um DS que só vive no Figma não resolve isso. Um DS
que vive em repositório, com tokens, componentes, skills e agentes, resolve.

### As camadas

| Camada | O que é | Exemplo |
|---|---|---|
| Tokens primitivos | Valores brutos, sem significado | `blue.600`, `space.16` |
| Tokens semânticos | Valores com papel na interface | `color.bg.surface`, `color.text.danger`, `space.4` |
| Componentes | Peças com comportamento | Botão, campo, tabela, chip de prazo |
| Padrões | Combinações com regra de uso | Lista de atividades, filtro, formulário de prazo, estado vazio |
| Templates | Telas-modelo por módulo | Agenda, Área de Trabalho, Kanban |

### O que vem primeiro: tokens semânticos

> decisão: tokens semânticos antes de qualquer componente.

O motivo é a convivência. O código legado consegue consumir token semântico
como variável CSS sem ser reescrito. Troca-se o valor, não o componente. Assim
tela antiga e tela nova se aproximam no visual antes de a migração do front
chegar nelas.

### No Figma

Três coleções de variáveis:

| Coleção | Conteúdo | Modos |
|---|---|---|
| Primitives | Escalas de cor, espaço, tipografia, raio | Nenhum |
| Semantic | Papéis da interface, apontam para Primitives | Claro, escuro, densidade |
| Component | Valores específicos de componente, apontam para Semantic | Nenhum |

Nomes no formato `categoria.papel.variante`: `color.bg.surface`,
`color.text.danger`, `space.4`.

---

## Slide 2 — Governança

### Estrutura

> decisão: você no centro, alinhado direto com os líderes dos squads. Sem time
> novo. A Engenharia participa pelo repositório do DS.

| Papel | Quem | Responsabilidade |
|---|---|---|
| Direção do DS | A vaga | Decide o que entra, mantém a fonte, lidera o redesign |
| Patrocínio | Líderes dos squads | Garantem o tempo dos designers e a prioridade no roadmap |
| Contribuição | Os 4 designers | Propõem e constroem a partir do trabalho real do squad |
| Ponto técnico | Um dev de front por indicação da Engenharia | Mantém o pacote de código e tem veto técnico |

### Como um componente novo entra

1. O designer abre um pedido com template: problema, onde aparece, quem mais usa.
2. Triagem semanal, 30 min, você e o ponto técnico.
3. **Regra:** 2 ou mais squads usam, entra no DS. Só 1 usa, fica local no squad.
4. Você decide. A Engenharia pode vetar por motivo técnico, com justificativa.
5. Versão nova do pacote com changelog.

### Figma e código alinhados

A fonte única é um JSON de tokens no repositório, no padrão DTCG.

| Peça | Papel |
|---|---|
| JSON de tokens (DTCG) | Fonte única. Muda aqui, muda em todo lugar |
| Style Dictionary | Gera CSS, TS e o que mais o front precisar |
| Sync de variáveis | O mesmo JSON alimenta as variáveis do Figma |
| Code Connect | Liga cada componente do Figma ao código |
| Storybook | Documentação viva dos componentes |
| Changelog por versão | Registro do que mudou, para designer e dev |

### Os agentes e skills

> decisão: o kit de IA é parte do DS, não um extra.

| Item | O que faz | Quem usa |
|---|---|---|
| Skill `astrea-ds` | Regras, tokens e componentes. Qualquer agente que gera tela consulta ela | Designer, dev, feature de IA |
| Agente revisor | Avisa frame sem variável e componente desvinculado (detach) | Designer, antes de entregar |
| Skill de UX writing | Tom, termos jurídicos, microcopy padrão | Designer, dev, feature de IA |

O modelo é o de toolkit compartilhado: melhoria vira pull request, todo mundo
puxa, todo mundo anda igual. O padrão se mantém por ferramenta, não por
cobrança.

---

## Slide 3 — Fases e convivência

### As fases

| Período | O que acontece | Entrega |
|---|---|---|
| Mês 1 | Inventário de componentes e variações. Discovery com os 4 designers. Linha de base das métricas. Leitura dos dados de suporte | Mapa do que existe e do time |
| Meses 2–3 | Tokens semânticos. Atualização visual do legado só por token: cor, tipografia, espaçamento, foco acessível | Legado e novo com a mesma pele |
| Meses 3–6 | Componentes principais. Piloto na gestão de atividades, atrás de feature flag, com grupo beta | Primeira tela nova em produção |
| Meses 6–12 | Outros módulos no ritmo da migração do front. Padrões de IA | DS cobre o produto |

### Critério de priorização

Frequência de uso × dor relatada × onde a migração do front já está acontecendo.

Pegar carona na migração custa menos: a tela já vai ser reescrita, então
nasce no padrão novo sem trabalho dobrado.

### Regras de convivência

> decisão: o que é moldura fica fixo; o que é conteúdo migra.

1. A moldura unifica primeiro: cabeçalho, menu lateral, botões de ação,
   filtros. Depois de padronizados, **não mudam mais**. São a âncora que o
   usuário reconhece ao cruzar de uma tela nova para uma legada.
2. Nunca misturar padrão novo e antigo na mesma tela.
3. Cor, tipografia e fluxos principais mudam o mínimo. O novo se adapta ao
   que existe, não o contrário.
4. Toda mudança é avisada dentro do produto, com changelog.

---

## Slide 4 — Como envolver o time

### Primeiro: entender como cada um trabalha

> decisão: a divisão do trabalho não se define agora. Ela sai do discovery.

Nas duas primeiras semanas, uma conversa individual com cada designer:

| Pergunta | O que ela revela |
|---|---|
| Como é o seu fluxo hoje, do pedido à entrega? | Onde o DS encaixa sem atrapalhar |
| O que o roadmap do seu squad pede nos próximos 3 meses? | Quais componentes nascem do trabalho real |
| Como você usa o Figma? Variáveis, componentes, bibliotecas? | Maturidade técnica e o que ensinar |
| Usa IA no dia a dia? Como? | Quem já está pronto para o kit de agentes |
| O que mais te frustra no produto hoje? | Dor que vira prioridade |

A divisão de responsabilidades nasce desse mapa. Cada um fica com o que o
próprio roadmap já pede e com o que ele faz melhor.

### Como o trabalho acontece

- **Construção conjunta no fluxo.** O ponto de atenção aparece na demanda
  real do squad. A gente senta junto, decide, constrói. Sem ritual novo com
  nome próprio.
- **A contribuição sai do roadmap, não de tarefa extra.** O designer entrega
  a tela do squad. No caminho, o componente entra no DS.
- **O kit de IA baixa o custo de seguir o padrão.** Seguir o DS vira o
  caminho mais rápido. É isso que faz o time adotar sem você ser gestor.

> aberto: percentual de tempo combinado com os líderes. Sugestão: nenhum
> número fixo no slide. Dizer que o tempo é acordado por squad no discovery.

---

## Slide 5 — Riscos e métricas

### Os 3 riscos

| Risco | Mitigação |
|---|---|
| **O DS vira projeto paralelo que ninguém adota** | Construir a partir de telas do roadmap. Modelo de toolkit: skills e agentes no repositório, melhoria vira pull request, todo mundo puxa. O padrão se mantém por ferramenta |
| **Ruptura visual para quem vive no produto o dia todo** | Moldura fixa primeiro (sidebar, ações, filtros). Cor, tipografia e fluxos principais mudam o mínimo. Feature flag e grupo beta na primeira tela nova. Acompanhar chamados de suporte por módulo |
| **O roadmap dos squads toma o tempo dos designers** | Líderes como patrocinadores. A tese: com skills e agentes o tempo de produção cai, e o DS devolve mais tempo do que toma. A métrica de eficiência prova ou derruba isso |

### Métricas

| Eixo | Métrica | Fonte |
|---|---|---|
| Adoção | % de telas com componentes do DS | Inventário trimestral |
| Adoção | % de cores vindas de token no código | Lint no CI |
| Adoção | Componentes desvinculados (detach) | Figma Library Analytics |
| Eficiência | Tempo do design até o dev | Ferramenta de gestão do squad |
| Eficiência | Bugs visuais abertos | Backlog |
| Experiência | Chamados de suporte por módulo | Suporte |
| Experiência | Tempo para criar um prazo | Analytics do produto |
| Experiência | Sucesso na tarefa e CSAT nos fluxos principais | Pesquisa recorrente |

---

## Slide 6 — Uso de IA (parágrafo obrigatório)

> aberto: escrever no fim, quando as três questões estiverem prontas.

A ideia: o parágrafo mostra o próprio kit de agentes como prova do que a Q2
propõe. Ferramentas usadas, em quais etapas, o que foi feito com o resultado.

---

## Fora do escopo da Q2

- Marketing e criativos. Vale uma linha só, se couber: os tokens de marca
  alimentam produto e marketing da mesma fonte.
- Seleção de pessoas. Os 4 designers já estão no cargo.
