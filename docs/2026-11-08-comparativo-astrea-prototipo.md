# Comparativo por fluxo: Astrea hoje e protótipo

Data: 08/11/2026. Fontes: a varredura em `docs/2026-11-08-varredura-astrea.md` e a leitura do código em `prototipo/`.
A evidência do protótipo cita arquivo e linha. A do Astrea cita a tela e a rota.

<!-- lint-ignore-bloco: deriva-terminologica — o documento cita os rótulos literais do Astrea e do protótipo -->

Convenção de clique: parte da tela aberta, na visão padrão, sem item selecionado. Digitar não conta.

Resumo honesto em três linhas:

- O protótipo ganha em filtro, visão, painel ao lado, seção de prazo e consistência de volta e de criação.
- O Astrea já copia o número com 1 clique em Processos e na ficha. O ganho do protótipo nesse ponto é só na Área de trabalho.
- Em quatro caminhos o protótipo perdeu cliques para o Astrea. A seção "O que ainda falta" lista cada um.

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
| Copiar a partir da Área de trabalho | 2. Abrir a tarefa e clicar no número do modal | 1. Botão de copiar ao lado do número, na linha e no card | Um clique a menos, sem modal | `componentes.js:1536-1557`, `1595`, `1627` |
| Copiar a partir da lista de processos | 1. O número na linha copia ao clicar, com tooltip "Copiar" | 2. Selecionar a linha e copiar no painel. A tabela não copia | Piorou: um clique a mais | `processos.html:393-402`, `456-461` |
| Copiar na ficha do processo | 1. Número do cabeçalho e "Copiar" no bloco de dados | 1. Cabeçalho, "Dados do processo" e card do grau | Igual | `processos.html:754`, `906`, `953` |
| Copiar a partir de um alerta | 2. "Visualizar tarefa" e o número no modal | 2. Selecionar o alerta e copiar no painel. O card não copia | Igual | `alertas.html:229-245` |
| Copiar a partir de atendimento ou documento | Não verificado no Astrea | 1 no card. Na tabela não há botão | Copiar só no modo cards | `atendimentos.html:417-430`, `documentos.html:433-448` |
| Saber que copiou | Tooltip "Copiar" antes do clique | Tooltip troca para "Número copiado" e anuncia em `role="status"` | Confirmação visível e acessível | `componentes.js:1539-1556` |

O Astrea já tem o padrão de copiar ao clicar. O protótipo leva o número para a linha da atividade, onde ele faltava.

## 3. Ir da atividade ao processo

| O que o usuário quer fazer | Astrea hoje (cliques, onde) | Protótipo (cliques, onde) | O que melhorou | Evidência |
|---|---|---|---|---|
| Abrir o processo de uma tarefa atrasada | 1. Link do título do processo na linha | 1. "Abrir processo" no card ou no hover da linha | Igual em cliques. O rótulo diz a ação | `area-de-trabalho.html:288-291` |
| Abrir o processo de uma tarefa no prazo | 1. Mesmo link na linha | 2. Selecionar e clicar "Abrir processo" no painel | Piorou: o número é texto, e o link só vale para atrasada | `area-de-trabalho.html:404-430` |
| Abrir o processo na visão Kanban | Não existe visão Kanban | Sem caminho. Não há painel nem link | Lacuna nova | `area-de-trabalho.html:615` |
| Abrir o processo a partir de um alerta | 2. "Visualizar tarefa" e o link no modal | 3. "Abrir atividade" leva à Área de trabalho sem a atividade aberta | Piorou: um clique a mais e perda do contexto | `alertas.html:249` |
| Abrir o processo a partir de um atendimento | 1. Link do processo no item da lista | 2 pelo painel, 1 pela ficha. A tabela mostra o número sem link | Piorou na lista | `atendimentos.html:379-420`, `500-505`, `733` |
| Abrir o processo a partir da Agenda | Não verificado: a Agenda da conta mostrou zero atividades | Sem caminho em nenhuma visão | Lacuna | `agenda.html:276-298` |

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
| Filtrar a Agenda | "Minhas atribuições", "Todas as atividades", etiqueta e lupa | Só busca por título, número ou responsável | Piorou: sem filtro de pessoa e de tipo | `agenda.html:216-271` |
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
| Usar o painel em tela estreita | Não se aplica | Até 1100 px o painel some. Na Área de trabalho não há alternativa | Lacuna em notebook pequeno | `astrea.css:1812` |

## 8. Criar sem sair da tela

| O que o usuário quer fazer | Astrea hoje (cliques, onde) | Protótipo (cliques, onde) | O que melhorou | Evidência |
|---|---|---|---|---|
| Criar atividade na Área de trabalho | 1. "Adicionar tarefa" abre modal sobre a lista | 1. "Adicionar atividade" abre painel lateral de uma camada | Tipo explícito, lista pré-preenchida, aviso de data passada no painel | `componentes.js:2493-2645` |
| Criar atividade na ficha do processo | 2. "+" e "Tarefa", ou "Adicionar" em Próximas atividades | 2. "Adicionar" e confirmar no painel. O processo vem implícito | Igual em cliques | `processos.html:824-859` |
| Criar atividade pela lista de processos ou pelo atendimento | Pelo atendimento: 1 no "+" de Tarefas e eventos | 1, mas o painel global abre com o campo Processo vazio | Piorou: o usuário redigita o processo | `processos.html:462-465`; `atendimentos.html:819`; `componentes.js:2519` |
| Criar atendimento | Não verificado: o formulário não foi aberto | 1. Painel lateral, sem sair da lista | Contexto mantido | `atendimentos.html:232-337` |
| Criar contato | 1. Página inteira | 1. Página inteira com barra de ações fixa | Igual no fluxo. Só a barra muda | `contatos.html:954-1006` |
| Criar etiqueta no cadastro | Não verificado | Painel lateral, com a etiqueta já selecionada ao voltar | Sem trocar de tela | `contatos.html:866` |
| Agir no item sem abrir | Hover com cinco ícones sem rótulo | Concluir e Adiar 1 dia com "Desfazer". Ícones com tooltip | Ação reversível, com nome | `area-de-trabalho.html:256`, `278-293` |

## 9. Notificações

| O que o usuário quer fazer | Astrea hoje (cliques, onde) | Protótipo (cliques, onde) | O que melhorou | Evidência |
|---|---|---|---|---|
| Saber que há pendência | Badge vermelho no item Alertas do menu | Sino com contagem na navbar | O sinal fica no lugar que o usuário procura | `moldura.js:217-250` |
| Ler as pendências sem sair da tela | Não existe. Alertas é página própria | 1. Painel à direita, com filtro por módulo e grupos Para fazer e Avisos | Leitura sem trocar de tela | `componentes.js:2323-2387` |
| Ir da notificação ao processo | Alerta: 2 cliques via modal da tarefa | Sem caminho direto. O item leva à lista ou à Área de trabalho, sem id | Piorou: o destino é genérico | `dados.js:107-121`, `154` |
| Tratar o alerta | Visualizar, Concluir, Reagendar e Descartar | Visualizar, Concluir, Reagendar com três prazos e Descartar com confirmação | "Desfazer" depois de agir | `alertas.html:117-155`, `339-355` |
| Marcar como lido | Descartar alerta, um por um | "Marcar avisos como lidos" em lote. Não há leitura individual | Lote ganho, individual ausente | `componentes.js:2386` |

## O que ainda falta

Onde o protótipo não melhorou ou piorou, com a correção proposta:

1. Atividade no prazo: o título do processo deixou de ser link. Proposta: o número leva à ficha, e o botão ao lado copia.
2. Alertas: "Abrir atividade" leva à Área de trabalho sem a atividade. Proposta: abrir a ficha do processo ou selecionar a atividade.
3. Notificações: nenhum destino abre a ficha do processo. Proposta: o item leva ao registro com id.
4. Lista de processos: a tabela perdeu o copiar com 1 clique, que o Astrea já tem. Proposta: botão de copiar na coluna Número.
5. Lista de atendimentos: o processo virou texto. Proposta: link na coluna Processo.
6. Agenda: perdeu os filtros de pessoa e de tipo. Itens de Semana e Mês não abrem nada. Não há caminho ao processo.
7. Painel global de nova atividade: não traz o processo de onde foi aberto.
8. Documentos: o protótipo não abre arquivo nem mostra prévia. A ficha do processo mostra sempre o estado vazio.
9. Kanban da Área de trabalho: sem painel e sem link ao processo.
10. Tela até 1100 px: o painel ao lado some, e a Área de trabalho fica sem detalhe.
11. Busca global: o campo existe, mas não busca. O Astrea busca contato, processo e tarefa.
12. Copiar só aparece no modo cards em Atendimentos, Documentos e Contatos. A tabela não copia.

Ficaram sem verificação no Astrea a lista de Documentos com itens e os formulários de processo e de atendimento. O destino dos links de Estatísticas também.

## Ligação com as questões

Os cinco problemas vêm de `01-diagnostico.md`. Os achados abaixo vêm da varredura de hoje.

| Problema da Q1 | Achado que sustenta | Seção |
|---|---|---|
| P1. O prazo não domina as telas que existem para ele | A Área de trabalho só marca atraso pela cor da data. A Agenda abriu em "Ontem" e não mostrou as duas tarefas da conta. Alertas já sabe que a tarefa está atrasada | 1, 5 |
| P2. Sem hierarquia de nomes, a mesma atividade em quatro lugares | A mesma tarefa aparece na Área de trabalho, no modal, em Alertas e na ficha do processo. O botão diz "Adicionar tarefa" num lugar e "Tarefa" ou "Evento" em outro | 3, 8 |
| P3. Criar uma atividade interrompe quem cria | Criar tarefa abre modal que cobre a lista. Contato e processo abrem página inteira. O protótipo resolve a atividade em painel, mas ainda não liga o processo de origem | 8 |
| P4. Três azuis, três cinzas, três jeitos de criar | Criar aparece como "Adicionar tarefa", "Adicionar", "+" sem rótulo e "Adicionar documento" com seta. Voltar aparece em três formas. A lista de processos tem quatro ícones sem rótulo | 6, 8 |
| P5. A moldura compete com o trabalho | O cabeçalho tem cinco ícones, selo "1 ano grátis" e "Contratar". "Conheça as IAs" tem fundo lilás. Não há sino: o único sinal de pendência é o badge do menu | 9 |

Duas ressalvas para a Q1:

- A faixa de campanha com contador não apareceu na sessão de hoje. A evidência de P5 depende das capturas anteriores.
- Os números de Estatísticas aparecem como link na árvore de acessibilidade. A frase "sem ação por trás" precisa de teste antes de ir ao slide.

A Q3 usa a Área de trabalho. As seções 1, 2, 7 e 8 sustentam a tela e os componentes `linhaAtividade`, `cardAtividade`, `painelDetalhe` e `painelCriarAtividade`.

<!-- lint-ignore-fim -->
