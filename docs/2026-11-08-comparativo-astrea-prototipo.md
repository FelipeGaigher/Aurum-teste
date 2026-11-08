# Comparativo por fluxo: Astrea hoje e protótipo

Data: 08/11/2026. Fontes: a varredura em `docs/2026-11-08-varredura-astrea.md` e a leitura do código em `prototipo/`.
A evidência do protótipo cita arquivo e linha. A do Astrea cita a tela e a rota.

<!-- lint-ignore-bloco: deriva-terminologica — o documento cita os rótulos literais do Astrea e do protótipo -->

Convenção de clique: parte da tela aberta, na visão padrão, sem item selecionado. Digitar não conta.

Resumo honesto em quatro linhas:

- O protótipo ganha em filtro, visão, painel ao lado, seção de prazo e consistência de volta e de criação.
- O Astrea já copia o número com 1 clique em Processos e na ficha. Ali o protótipo agora é igual, não melhor.
- A varredura achou quatro caminhos em que o protótipo perdia cliques. As correções da noite de 08/11 fecharam os quatro.
- Seguem abertos a prévia de documento e o painel em tela estreita. A seção "O que ainda falta" lista cada um.

## 1. Informação essencial acima da dobra

| O que o usuário quer fazer | Astrea hoje (cliques, onde) | Protótipo (cliques, onde) | O que melhorou | Evidência |
|---|---|---|---|---|
| Ver prazo, tipo e processo de uma atividade na lista | 0. A linha mostra título, data vermelha se atrasada, título do processo, estrela e iniciais | 0. A linha mostra chip de prazo com texto, tipo, número do processo, avatar e nome | Prazo com texto e cor, tipo explícito, número visível | `componentes.js:1575-1600` `DS.linhaAtividade`; Astrea `#/main/workspace` |
| Ver o que está atrasado ao abrir | 0, mas só pela cor da data. Não há seção | 0. Seções Atrasadas, Hoje e Próximos, com faixa que abre e fecha | O atraso ganha lugar próprio no topo | `area-de-trabalho.html:152-165`, `598-607` |
| Ler os dados-chave de um processo | 0. Cabeçalho com número, cliente, status, responsável e criador | 0. Número CNJ em tamanho de título, cliente, status, responsável, valor da causa e distribuição | Número em destaque e dois dados a mais no topo | `processos.html:754`; Astrea `#/main/folders/detail/<id>` |
| Entender o caso sem ler o histórico | Não existe na ficha | 0. "Resumo do caso" no painel e na ficha | Leitura rápida do caso | `processos.html:263-285`. O texto é fictício e depende de IA do Astrea |
| Ver telefone, e-mail e processo de um contato | 2 ou mais. A ficha abre em Cadastro, com 24 rótulos quase todos vazios | 1. O painel mostra telefone, e-mail, processo ligado e contagem de documentos | Campo vazio sai da leitura | `contatos.html:433-461`; Astrea `#/main/contacts/detail/<id>/data` |

## 2. Copiar o número do processo

| O que o usuário quer fazer | Astrea hoje (cliques, onde) | Protótipo (cliques, onde) | O que melhorou | Evidência |
|---|---|---|---|---|
| Copiar a partir da Área de trabalho | 2. Abrir a tarefa e clicar no número do modal | 1. Botão de copiar ao lado do número, na linha e no card, em Lista, Cards e Kanban | Um clique a menos, sem modal | `componentes.js:1536-1557`, `1604-1605`, `1636-1637` |
| Copiar a partir da lista de processos | 1. O número na linha copia ao clicar, com tooltip "Copiar" | 1. Botão de copiar ao lado do número, na coluna Número | Igual. A varredura achou a regressão, e a correção a fechou | `processos.html:312-315`, `414` |
| Copiar na ficha do processo | 1. Número do cabeçalho e "Copiar" no bloco de dados | 1. Cabeçalho, "Dados do processo" e card do grau | Igual | `processos.html:770`, `922`, `969` |
| Copiar a partir de um alerta | 2. "Visualizar tarefa" e o número no modal | 2. Selecionar o alerta e copiar no painel. O card não copia | Igual | `alertas.html:230-245`, `271` |
| Copiar a partir de atendimento ou documento | Não verificado no Astrea | 1 na tabela e no card | Copiar nos dois modos | `atendimentos.html:236-240`, `395`, `436`; `documentos.html:441-452`, `476` |
| Saber que copiou | Tooltip "Copiar" antes do clique | Tooltip troca para "Número copiado" e anuncia em `role="status"` | Confirmação visível e acessível | `componentes.js:1539-1556` |

O Astrea já tem o padrão de copiar ao clicar. O protótipo iguala esse padrão nas tabelas e leva o número para a linha da atividade.

## 3. Ir da atividade ao processo

| O que o usuário quer fazer | Astrea hoje (cliques, onde) | Protótipo (cliques, onde) | O que melhorou | Evidência |
|---|---|---|---|---|
| Abrir o processo de uma tarefa atrasada | 1. Link do título do processo na linha | 1. O número leva à ficha. "Abrir processo" fica no card e no hover da linha | Igual em cliques. O rótulo diz a ação | `area-de-trabalho.html:295-297`, `524`; `componentes.js:1560-1567` |
| Abrir o processo de uma tarefa no prazo | 1. Mesmo link na linha | 1. O número é link na linha e no card | Igual | `area-de-trabalho.html:524`, `537`; `componentes.js:1604`, `1636` |
| Abrir o processo na visão Kanban | Não existe visão Kanban | 1. O número do card é link. O card abre o painel de detalhe ao lado | Visão nova, com o mesmo caminho da Lista | `area-de-trabalho.html:533-553`, `579` |
| Abrir o processo a partir de um alerta | 2. "Visualizar tarefa" e o link no modal | 1. "Abrir processo" no card e no painel. "Abrir atividade" abre a Área de trabalho com a atividade escolhida | Um clique a menos, sem modal | `alertas.html:257-263`, `370`; `area-de-trabalho.html:621-634` |
| Abrir o processo a partir de um atendimento | 1. Link do processo no item da lista | 1. Link na tabela, no painel e na ficha, com copiar ao lado | Igual | `atendimentos.html:236-240`, `395`, `517` |
| Abrir o processo a partir da Agenda | Não verificado: a Agenda da conta mostrou zero atividades | 1 pelo número nas visões em linha. Na Semana e no Mês, 2: o item abre o detalhe, e o detalhe traz "Abrir processo" | Caminho em todas as visões | `agenda.html:372-377`, `398-407`, `681-696` |

## 4. Documentos no contexto

| O que o usuário quer fazer | Astrea hoje (cliques, onde) | Protótipo (cliques, onde) | O que melhorou | Evidência |
|---|---|---|---|---|
| Ver documentos do processo | 0. Bloco "Documentos" na coluna direita da ficha | 0. Mesmo bloco, na mesma posição | Igual. O protótipo mostra sempre o estado vazio | `processos.html:913-921` |
| Adicionar documento ao processo | 2. "Adicionar documentos" e o tipo | Não funciona. O botão avisa que fica fora do protótipo | Sem ganho demonstrável | `processos.html:792` |
| Achar um documento no módulo | Não verificado: a conta não tem documento | Busca por nome, processo ou contato, filtro de tipo, tabela ou cards, painel ao lado | Busca e filtro na própria barra | `documentos.html:239-304` |
| Criar documento a partir de modelo | Menu com cinco tipos, incluindo Google | "Documento padrão" em dois passos, com stepper. "Modelos de documento" fica na barra | Atalho para modelos e passos visíveis | `documentos.html:135-235` |
| Abrir ou ver a prévia do arquivo | Não verificado | Não existe. "Baixar" só avisa | Lacuna do protótipo | `documentos.html:389-392` |
| Ver documentos do contato | Aba "Documentos" na ficha | Contagem no painel e aba "Documentos (N)" com tabela | Contagem visível antes de abrir a ficha | `contatos.html:653-706` |

## 5. Filtros e visões

| O que o usuário quer fazer | Astrea hoje (cliques, onde) | Protótipo (cliques, onde) | O que melhorou | Evidência |
|---|---|---|---|---|
| Filtrar tarefas por pessoa, período ou situação | Não existe na barra. Só "Todas as listas" | 2 por filtro. Lista, Responsável, Período e Situação, com rótulo | Filtros pedidos pelos clientes, lembrados ao voltar | `area-de-trabalho.html:186-208`, `246` |
| Trocar a visão das tarefas | Só lista | 1. Cards, Lista ou Kanban, lembrado | Três leituras do mesmo dado | `area-de-trabalho.html:177`, `319` |
| Trocar a visão de contatos, atendimentos e documentos | Só tabela ou lista | 1. Tabela ou Cards | Leitura por card com número e responsável | `contatos.html:253-283`, `atendimentos.html:588` |
| Filtrar processos | Seta de filtro avançado, busca, etiqueta e "Ativos" | Busca, Tipo e "Filtro avançado · N" em painel, com chips removíveis | Filtro ativo fica visível e removível | `processos.html:500-602` |
| Ver todos os contatos | A lista abre filtrada em "Tipo: Cliente" | A lista abre em Todos | Nada fica escondido na abertura | `contatos.html:312-318` |
| Filtrar a Agenda | "Minhas atribuições", "Todas as atividades", etiqueta e lupa | 2 por filtro. Responsável e Tipo, lembrados ao voltar, mais a busca por título, número ou responsável | Igual em pessoa e tipo. Falta o filtro de etiqueta | `agenda.html:333-363`, `844-852` |
| Ver o dia na Agenda | Abriu em "Ontem". As duas tarefas da conta não apareceram | Abre sempre em Hoje, com "Prioridades por prazo" ao lado | Abertura previsível e prazo ao lado da grade | `agenda.html:206-226`, `477-499` |

## 6. Voltar

| O que o usuário quer fazer | Astrea hoje (cliques, onde) | Protótipo (cliques, onde) | O que melhorou | Evidência |
|---|---|---|---|---|
| Voltar da ficha para a lista | 1, em três formas. "Voltar" no canto direito do contato, link "Voltar" no atendimento, seta no processo | 1. Trilha com seta e nome do módulo, embaixo do título, em toda página de segundo nível | Um caminho de volta, sempre no mesmo lugar | `moldura.js:287-291`; `componentes.js:2175` |
| Voltar sem perder a lista | A ficha é página nova. A lista some | O painel ao lado mantém a lista. A ficha só abre quando pedida | Menos idas e voltas | Seção 7 |
| Fechar uma camada com Esc | Esc fecha o modal da tarefa | Esc fecha painel modal e menu. O painel ao lado não fecha com Esc | Igual | `componentes.js:2286-2296` |

## 7. Painel de detalhe ao lado

| O que o usuário quer fazer | Astrea hoje (cliques, onde) | Protótipo (cliques, onde) | O que melhorou | Evidência |
|---|---|---|---|---|
| Ver o detalhe de uma tarefa | 1. Modal sobre a lista, que cobre a lista | 1. Painel ao lado, redimensionável, com anterior, próximo e esconder | A lista continua visível. Navega entre itens sem fechar | `componentes.js:1880-1950`; `area-de-trabalho.html:441-513` |
| Ver o detalhe de contato, atendimento ou processo | 1. Página nova | 1. Painel ao lado. "Abrir ficha" leva à página | Leitura rápida sem trocar de tela | `contatos.html:472-520`, `atendimentos.html:607-668`, `processos.html:633-686` |
| Usar o painel em tela estreita | Não se aplica | Até 1100 px o painel some. Na Área de trabalho não há alternativa | Lacuna em notebook pequeno | `astrea.css:1818` |

## 8. Criar sem sair da tela

| O que o usuário quer fazer | Astrea hoje (cliques, onde) | Protótipo (cliques, onde) | O que melhorou | Evidência |
|---|---|---|---|---|
| Criar atividade na Área de trabalho | 1. "Adicionar tarefa" abre modal sobre a lista | 1. "Adicionar atividade" abre painel lateral de uma camada | Tipo explícito, lista pré-preenchida, aviso de data passada no painel | `componentes.js:2493-2645` |
| Criar atividade na ficha do processo | 2. "+" e "Tarefa", ou "Adicionar" em Próximas atividades | 2. "Adicionar" e confirmar no painel. O processo vem implícito | Igual em cliques | `processos.html:824-859` |
| Criar atividade pela lista de processos ou pelo atendimento | Pelo atendimento: 1 no "+" de Tarefas e eventos | 1. O painel global abre com o campo Processo preenchido | Igual em cliques, sem redigitar o processo | `processos.html:481`; `atendimentos.html:833`; `componentes.js:2643-2649` |
| Criar atendimento | Não verificado: o formulário não foi aberto | 1. Painel lateral, sem sair da lista | Contexto mantido | `atendimentos.html:232-337` |
| Criar contato | 1. Página inteira | 1. Página inteira com barra de ações fixa | Igual no fluxo. Só a barra muda | `contatos.html:954-1006` |
| Criar etiqueta no cadastro | Não verificado | Painel lateral, com a etiqueta já selecionada ao voltar | Sem trocar de tela | `contatos.html:866` |
| Agir no item sem abrir | Hover com cinco ícones sem rótulo | Concluir e Adiar 1 dia com "Desfazer". Ícones com tooltip | Ação reversível, com nome | `area-de-trabalho.html:256`, `278-293` |

## 9. Notificações

| O que o usuário quer fazer | Astrea hoje (cliques, onde) | Protótipo (cliques, onde) | O que melhorou | Evidência |
|---|---|---|---|---|
| Saber que há pendência | Badge vermelho no item Alertas do menu | Sino com contagem na navbar | O sinal fica no lugar que o usuário procura | `moldura.js:217-250` |
| Ler as pendências sem sair da tela | Não existe. Alertas é página própria | 1. Painel à direita, com filtro por módulo e grupos Para fazer e Avisos | Leitura sem trocar de tela | `componentes.js:2323-2387` |
| Ir da notificação ao processo | Alerta: 2 cliques via modal da tarefa | 1. O item leva ao registro com id: ficha do processo, ficha do contato ou atividade escolhida | Um clique a menos, sem modal | `dados.js:104-112`, `119-131`, `164` |
| Tratar o alerta | Visualizar, Concluir, Reagendar e Descartar | Visualizar, Concluir, Reagendar com três prazos e Descartar com confirmação | "Desfazer" depois de agir | `alertas.html:117-155`, `339-355` |
| Marcar como lido | Descartar alerta, um por um | "Marcar avisos como lidos" em lote. Não há leitura individual | Lote ganho, individual ausente | `componentes.js:2386` |

## O que ainda falta

Onde o protótipo ainda não melhorou, com a correção proposta:

1. Documentos: o protótipo não abre arquivo nem mostra prévia. "Baixar" só avisa (`documentos.html:390-391`). Proposta: prévia no painel ao lado.
2. Tela até 1100 px: o painel ao lado some, e a Área de trabalho fica sem detalhe (`astrea.css:1818`). Proposta: o painel abre por cima, como em Alertas.
3. Agenda: não há filtro de etiqueta, que o Astrea tem.

Ficaram sem verificação no Astrea a lista de Documentos com itens e os formulários de processo e de atendimento. O destino dos links de Estatísticas também.

## Correções depois da varredura, 08/11 à noite

A lista anterior tinha 12 itens. Dez fecharam, e os números abaixo seguem essa lista.

- 1 e 9. Na Área de trabalho, o número leva à ficha em Lista, Cards e Kanban, com copiar ao lado. O Kanban ganhou o painel de detalhe.
- 2. Em Alertas, "Abrir atividade" abre a Área de trabalho com a atividade escolhida. O card ganhou "Abrir processo".
- 3. As notificações levam ao registro com id, por `urlDoProcesso`, `urlDaAtividade` e `urlDoContato`.
- 4, 5 e 12. A tabela de Processos copia o número com 1 clique. Atendimentos e Documentos mostram o processo como link, com copiar.
- 6. A Agenda ganhou os filtros Responsável e Tipo. Todo item abre o detalhe ao lado, com "Abrir processo".
- 7. `DS.painelCriarAtividade` aceita `processo`. Processos e Atendimentos passam o número.
- 11. A busca do cabeçalho leva a `buscas.html?q=`, e a página filtra processo, contato e atividade (`moldura.js:252-263`, `buscas.html:41-77`).
- DS: `botaoCopiar` saiu exportado. No painel estreito, rótulo e valor empilham por `@container` (`astrea.css:1793`).

Os itens 8 e 10 seguem abertos e voltaram como 1 a 3 da lista acima.

- Depois: a ficha do processo lista os documentos ligados ao número (`processos.html`). Processos, Atendimentos, Documentos e Agenda usam `DS.botaoCopiar`, sem cópia local.

## Ligação com as questões

Os cinco problemas vêm de `01-diagnostico.md`. Os achados abaixo vêm da varredura de hoje.

| Problema da Q1 | Achado que sustenta | Seção |
|---|---|---|
| P1. O prazo não domina as telas que existem para ele | A Área de trabalho só marca atraso pela cor da data. A Agenda abriu em "Ontem" e não mostrou as duas tarefas da conta. Alertas já sabe que a tarefa está atrasada | 1, 5 |
| P2. Sem hierarquia de nomes, a mesma atividade em quatro lugares | A mesma tarefa aparece na Área de trabalho, no modal, em Alertas e na ficha do processo. O botão diz "Adicionar tarefa" num lugar e "Tarefa" ou "Evento" em outro | 3, 8 |
| P3. Criar uma atividade interrompe quem cria | Criar tarefa abre modal que cobre a lista. Contato e processo abrem página inteira. O protótipo resolve a atividade em painel, com o processo de origem preenchido | 8 |
| P4. Três azuis, três cinzas, três jeitos de criar | Criar aparece como "Adicionar tarefa", "Adicionar", "+" sem rótulo e "Adicionar documento" com seta. Voltar aparece em três formas. A lista de processos tem quatro ícones sem rótulo | 6, 8 |
| P5. A moldura compete com o trabalho | O cabeçalho tem cinco ícones, selo "1 ano grátis" e "Contratar". "Conheça as IAs" tem fundo lilás. Não há sino: o único sinal de pendência é o badge do menu | 9 |

Duas ressalvas para a Q1:

- A faixa de campanha com contador não apareceu na sessão de hoje. A evidência de P5 depende das capturas anteriores.
- Os números de Estatísticas aparecem como link na árvore de acessibilidade. A frase "sem ação por trás" precisa de teste antes de ir ao slide.

A Q3 usa a Área de trabalho. As seções 1, 2, 7 e 8 sustentam a tela e os componentes `linhaAtividade`, `cardAtividade`, `painelDetalhe` e `painelCriarAtividade`.

<!-- lint-ignore-fim -->
