# O que fiz na atividade prática do Astrea

Texto de apresentação da entrega. Serve para o Leia-me da pasta, para a abertura da Parte B e para quem pergunta "o que você entregou". Fontes: `00-briefing.md`, `index.html`, `04-processo.md` e `docs/2026-11-08-comparativo-astrea-prototipo.md`.

## O pedido e a entrega, lado a lado

| A Aurum pediu | Entreguei | Onde |
|---|---|---|
| Q1: 5 problemas com evidência, princípios e o que validar, até 5 páginas | 5 slides, o diagnóstico-fonte e um catálogo de 97 pontos de atenção | `01-slides-q1.html`, `01-diagnostico.md`, `01-pontos-de-atencao.md` |
| Q2: arquitetura do DS, governança, fases, time, riscos e métricas, até 6 páginas | 6 slides, o plano-fonte e os 6 meses do redesign dentro do Kanban | `02-slides-q2.html`, `02-plano-ds.md`, `prototipo/kanban.html` |
| Q3: uma tela em alta fidelidade no Figma, 3 a 5 componentes, um trade-off, até 3 páginas | A Área de trabalho no Figma e no protótipo, 4 componentes com estados, a decisão escrita | `03-slides-q3.html`, `03-tela.md`, `prototipo/design-system.html` |
| Parágrafo de uso de IA | Um parágrafo, com as ferramentas, as etapas e o destino de cada resultado | `04-uso-de-ia.md`, fim de `index.html` |
| Um único link com visualização | O hub no GitHub Pages, que aponta para o Figma, o protótipo e os documentos | `index.html` |
| Apresentar no Figma | Arquivo com oito páginas: capa, briefing, uma por questão, design system, protótipo e extras | Figma |

Fui além do pedido em três frentes. Um protótipo navegável do Astrea inteiro. Um documento com os ajustes de usabilidade de toda a plataforma. E o registro do processo, dia a dia, com os números reais.

## Questão 1: diagnóstico

Entrei no trial, percorri o produto e li o CSS do Astrea logado. Cada observação virou um ponto de atenção catalogado, com evidência, heurística, severidade e destino. O catálogo fechou com 97 pontos.

Desses, escolhi cinco problemas para a gestão de atividades. A régua foi o prazo, porque 136 dos 407 votos da planilha pedem destaque de prazo.

1. O prazo não domina as telas que existem para ele.
2. Sem hierarquia de nomes, a mesma atividade aparece em quatro lugares.
3. Criar uma atividade interrompe quem cria.
4. Três azuis, três cinzas, quatro jeitos de criar.
5. A moldura compete com o trabalho.

Cada princípio de design traz a heurística de Nielsen, a lei de Gestalt e a aplicação no dia a dia. A parte de validação separa hipótese cara de hipótese barata. A cara se confirma antes, com quatro fontes: pedido, chamado, analytics e entrevista.

## Questão 2: design system e plano

A leitura do CSS mudou a resposta. Das 646 variáveis do produto, 609 têm o prefixo do Nectar, o design system legado da Aurum. Por isso a primeira camada é de tokens semânticos sobre o Nectar. O legado consome o token como variável CSS, sem reescrita.

As decisões, uma por slide:

- Componente com propriedades booleanas e de texto serve cada contexto, sem cópia.
- Uma fonte só, em JSON. O Figma lê a fonte, ele não é a fonte.
- A direção do DS decide, a Engenharia veta com motivo e os squads contribuem a partir do roadmap.
- Fases: tokens, moldura, configuração e administração, fluxos principais. A moldura fica fixa primeiro. O redesign fecha em 6 meses. Nos meses 7 a 12 entram o onboarding do novo layout e o desligamento do legado. A IA chega a todos os fluxos.
- A divisão entre os quatro designers sai de uma conversa individual, por perfil, não por squad.
- Três riscos com mitigação e métricas de adoção, eficiência e experiência.

Os 6 primeiros meses do plano existem como Kanban dentro do protótipo. São 8 histórias e 23 subtarefas em 12 sprints quinzenais. A coluna é a situação no fluxo. A fase é tag e filtro. O quadro abre na sprint 2, com as três histórias da fase 1 em andamento.

## Questão 3: a Área de trabalho

Escolhi a tela que o escritório abre todo dia, e não o Kanban. A planilha de pedidos cobre só ela.

A tela nova abre em todas as listas, com Atrasadas acima de Hoje. O prazo é o dado dominante da linha, em cor e texto. Prazos, audiências e eventos saem do widget de lembretes e entram nas seções. O detalhe abre num painel ao lado, redimensionável, e a lista continua visível.

Quatro componentes nasceram dela e já servem outros módulos: tabela, chip de prazo, card de atividade e painel de detalhe. Cada estado tem célula própria no design system.

O trade-off: mudar a abertura da tela mais usada, contra a restrição de evitar curva brusca. Mudei assim mesmo. O escritório não perde prazo por não achar a lista. Perde por não ver a data. O custo cai com o filtro gravado, a moldura igual e a feature flag com volta por um ciclo.

## O protótipo navegável

O protótipo é o Astrea inteiro, em 17 páginas, com o visual atual do produto. Roda local, sem build e sem rede. Todo dado é fictício.

O que ele mostra:

- A moldura única: cabeçalho, menu lateral, busca e ações no mesmo lugar em toda página.
- Os módulos no fluxo real do Astrea, com melhoria só de padrão e usabilidade.
- O Kanban com o plano do redesign, no topo do menu.
- O design system com 9 fundamentos e 49 componentes. São 211 estados desenhados e 185 ausências explicadas.
- As três questões respondidas dentro do próprio protótipo, com "Como pensei" em cada resposta.

Uma regra de corte guiou tudo. Entra o que reorganiza, padroniza ou destaca dado que já existe. Fica fora o que exige dado, serviço ou permissão nova.

## Melhorias de usabilidade na plataforma inteira

Estas mudanças não aparecem num slide, mas pesam no dia a dia. Todas estão em `05-ajustes-plataforma.html`, com o ponto de atenção de origem.

**Ver mais com menos esforço**

- Toda tabela e todo card abrem o detalhe ao lado, sem modal e sem trocar de tela.
- Tabela ou cards, à escolha, em Contatos, Atendimentos e Documentos. A escolha fica gravada.
- Seções de lista com faixa que abre e fecha e contagem na tag.
- Campo vazio some da leitura do contato, com "Mostrar todos".
- Resumo do caso, gerado pela IA do Astrea, no painel e na ficha do processo.
- Menu lateral que recolhe para ícones, com a escolha gravada.

**Chegar mais rápido**

- Número do processo na linha da atividade, com copiar em 1 clique. No Astrea são 2.
- Caminho para o processo em todo lugar: atividade, alerta, atendimento, documento e notificação.
- Busca do cabeçalho que leva aos resultados e já filtra pelo termo.
- Filtros numa linha só. Os muitos vão para o Filtro avançado, com chips removíveis.
- Filtro e visão lembrados ao voltar de um processo.
- Agenda abre sempre em Hoje, com grade de horas e prioridades por prazo ao lado.

**Um padrão só**

- Um caminho de volta: trilha com seta embaixo do título, em toda página de segundo nível.
- Sino de notificações na navbar, com painel à direita. Alertas sai do menu.
- Criar atividade em painel de uma camada. Sem modal sobre modal.
- Item ativo marcado no menu. Botão é botão, link é link, número é texto.
- A IA usa as mesmas cores e peças do resto. Sem paleta roxa à parte.
- Nenhum controle nativo de formulário. Seletor, data, caixa e rádio com teclado e ARIA.

Para provar o ganho, a IA percorreu o Astrea em produção, só com leitura. O comparativo conta os cliques de 48 tarefas em 9 fluxos, nos dois lados. Onde o protótipo perdia, corrigi. Ficaram abertos a prévia de documento, o painel em tela estreita e o filtro de etiqueta da Agenda.

## Como foi feito: ferramentas, etapas e o que fiz com o resultado

A Aurum pede o registro de quais ferramentas usei, em quais etapas e o que fiz com o resultado. A tabela responde às três perguntas, etapa por etapa. O diário completo, com data e hora, está em `04-processo.md`.

| Etapa | Ferramenta | O que a IA fez | O que fiz com o resultado |
|---|---|---|---|
| Leitura do produto | Claude in Chrome, no trial logado | Leu o CSS e as telas: 646 variáveis, 609 do Nectar. Catalogou cada ponto que eu apontava | Decidi seguir o visual atual do Astrea e escolhi os 5 problemas entre os 97 pontos |
| Fontes públicas | Subagente do Claude Code | Leu site, central de ajuda, lojas de app e avaliações | Usei como base da Q3 enquanto o trial não abria |
| Q1 e Q2 | Claude Code | Transformou minhas decisões em documento-fonte e em slides HTML | Iterei linha a linha. Troquei a paleta e o título que o modelo propôs |
| Protótipo | Claude Code com spec, plano de 23 tasks e até 7 subagentes em paralelo | Construiu as 17 páginas e o design system, uma task por subagente | Revisei ao vivo, tela por tela, e pedi as correções em quatro rodadas |
| Portões | Scripts do repositório e skills | Barraram cor fora do token, dado real, cara de IA e frase longa. Um revisor em contexto limpo julgou cada onda | Só o que passou foi para o commit |
| Figma | MCP do Figma, Playwright e Claude in Chrome | Levou os decks e as 12 telas ao arquivo, mesmo com a cota do MCP esgotada | Paguei o plano, organizei as oito páginas e conferi cada quadro |
| Varredura | Claude Code, só com leitura | Percorreu o Astrea em produção e contou os cliques de 48 tarefas em 9 fluxos | Mandei corrigir os quatro caminhos em que o protótipo perdia |
| Texto | Linter de português técnico | Acusou frase longa, voz passiva e sinônimo rotativo | Corrigi cada frase antes de publicar |

Dois dias, 07 e 08 de novembro, e 199 commits. As regras do design system viraram uma skill no repositório, `skills/astrea-ds`. É o modelo que a Q2 propõe: regra escrita uma vez, lida por toda ferramenta que gera tela.

A IA foi par, não autora. Os cinco problemas, a direção visual, o trade-off e o escopo foram decisões minhas. As correções ao vivo, rodada por rodada, também.
