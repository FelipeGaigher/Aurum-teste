# Inventário CSS e DOM do Astrea

Medido em 2026-11-07 na conta logada do usuário, navegador Chrome, viewport 1536x674. Conta no plano de entrada: Publicações, Financeiro, Indicadores e Timesheet aparecem bloqueados com convite de upgrade. Só leitura: nenhum formulário foi enviado.

Convenção: **Fato** é valor lido do CSS computado ou do DOM. **Inferência** é leitura minha do fato.

Nomes de contatos e números de processo foram trocados por `<nome>` e `<processo>`.

## 0. Estrutura global

Fatos:
- Fonte única: `museo-sans, sans-serif`. Única exceção: `Handlee` no selo manuscrito "1 ano grátis" ao lado de Contratar.
- Texto base: 14px, peso 300, cor `rgb(32,33,36)` (= `--gray900`). Fundo da página branco.
- Título de página (H1): 24px, peso 400, mesma cor do texto, sem letter-spacing.
- Link: `rgb(34,139,230)` (= `--primary`), 14px, peso 300.
- Card (widget da Área de trabalho): fundo branco, borda 0,8px sólida `rgb(222,226,230)` (= `--gray300`), raio 8px, sem sombra.
- Menu lateral: 240px de largura, fundo branco. Item 14px, peso 500, cor `rgb(108,117,125)` (= `--gray500`), raio 8px. Hover ganha fundo cinza claro. Não existe estado ativo: em 08/11, as capturas confirmaram que o fundo só aparece no hover. "Conheça as IAs" tem fundo lilás e texto roxo.
- Itens do menu, de cima para baixo. São eles: Área de trabalho, Agenda, Contatos, Atendimentos, Processos e casos, Publicações, Financeiro, Documentos.
- Itens seguintes do menu: Indicadores, Alertas (selo vermelho com contagem), Conheça as IAs, Suporte.
- Faixa promocional no topo (amarelo claro, botão azul escuro `rgb(2,85,196)` raio 8px, 14px/700) com botão de fechar.
- Rodapé em algumas telas: "© copyright 2026 -Aurum Software- Versão 2.02".
<!-- lint-ignore: deriva-terminologica — texto literal da interface -->
- Busca global no cabeçalho: campo com placeholder "Pesquisar contato, processo ou tarefa" e ícone de lupa.
- Botão verde CONTRATAR: fundo `rgb(2,136,60)` (= `--success`), texto branco, raio 8px, caixa alta, 12px/800.
- Botão flutuante redondo azul de chat, canto inferior direito, com ponto vermelho.

Inferência: o produto tem dois níveis de botão. O nível novo tem raio 8px, caixa alta, 12px, peso 700. O nível legado (Contatos, filtro de Processos) tem raio 0 e peso 900.

### Cinco ícones do cabeçalho global

| # | Ícone | title/aria-label | O que abre |
|---|---|---|---|
| 1 | Brilhos (SVG, fundo lilás) | sem rótulo | Popover "Conheça as IAs do Astrea", texto de apresentação e botão roxo QUERO SABER MAIS |
| 2 | `+` (`fa-plus`) | Adicionar | Menu: Processo manual, Processo busca automática, Caso, Atendimento, Tarefa, Evento, Contato (com separadores entre grupos) |
| 3 | Nuvem com seta (`fa-cloud-download`) | Resultados de buscas | Navega para a tela "Resultado de buscas de processos". Abas: Buscas individuais, Buscas em lote, Vínculos. Links: VOLTAR e BUSCA DE PROCESSO AUTOMÁTICA. Estado vazio: "Você ainda não usou a busca individual de processos" |
| 4 | Relógio (`fa-clock-o`) | Cronômetro timesheet | Modal de upgrade "Dê o próximo passo na gestão do seu escritório" com DEIXAR PARA DEPOIS e CONHECER PLANOS. Fechado com "Deixar para depois" |
| 5 | Engrenagem (`fa-cog`) | Administração | Navega para "Administração do Astrea": abas Escritório, Grupo de envolvidos, Acesso, Modelos de documento, Certificado Digital, Segurança. Aba Acesso tem busca de usuário, tabela e opções de rádio |

Fato: dois dos cinco ícones (3 e 5) trocam de página em vez de abrir painel. O ícone 1 não tem `aria-label` nem `title`.

## 1. Área de trabalho

- Título: "Área de trabalho". Rota `#/main/workspace`.
- Ações do cabeçalho (H1 e ações lado a lado):
  - ADICIONAR TAREFA: fundo `rgb(34,139,230)`, texto branco, raio 8px, caixa alta, 12px/700.
  - Três botões só de ícone (etiqueta, ordenar, imprimir): fundo `rgb(241,243,244)`, ícone `rgb(108,117,125)`, raio 8px, 12px/800.
- Botão "LISTA DE TAREFAS" com seta: fundo `rgb(241,243,244)`, mesmo estilo. Abre lista: "Todas as listas", `<lista>`, `<lista>`, "Gerenciar listas", com campo "Encontre uma lista para visualizar".
- Ícone de ordenar abre menu com três opções: ordenar por prioridade, por data, alfabeticamente. Não é seletor de visão.
- Estado vazio: texto em itálico "Ainda não existem tarefas cadastradas nesta lista." (sem ilustração).
- Coluna direita, widgets com título H4. Widget "Processos e casos" (select "Últimos 30 dias", links "N não tiveram movimentação", "N tiveram movimentação"). Widget "Estatísticas" (Atendimentos ativos, Honorários a faturar, Despesas a faturar, Timesheets 30 dias, Documentos 30 dias, Históricos 30 dias), "Lembretes". Cada widget tem "Ocultar" e um `+`.
- Seções H2 de tarefas: HOJE, AMANHÃ, FUTUROS.
- Tipografia (área principal): 14px (26 ocorrências), 12px (13), 10px (4), 16px (3), 18px (2), 24px (1). Pesos 300, 500, 700, 400, 800.
- Raios: 8px (28), 4px (4), 50% (3), 2px (1).
- Componentes: botões, widgets em card, select nativo, links. Sem tabela, sem abas.

Inferência: o select nativo "Últimos 30 dias" destoa do resto, que usa botões estilizados com seta.

## 2. Agenda

- Título: "Agenda". Rota `#/main/calendar`.
- Ações do cabeçalho (à direita): botão de atualizar, botão de menu de três pontos, botão `+` azul (Adicionar). Os dois primeiros: fundo `rgb(241,243,244)`, raio 8px, 12px/700. O `+`: fundo `rgb(34,139,230)`, raio 8px.
- Menu de três pontos: "Imprimir atividades", "Exportar planilha".
- Barra de filtros com quatro botões brancos com borda, raio 8px, caixa alta, 12px/700, cor `rgb(108,117,125)`. Os botões são: seletor de visão, MINHAS ATRIBUIÇÕES, TODAS AS ATIVIDADES, etiqueta e lupa (só ícone).
- Seletor de visão, opções: **Em lista, Por dia, Por semana, Por mês**. Valor inicial: Por dia. Deixei a conta em Por dia ao final.
- MINHAS ATRIBUIÇÕES abre painel com grupos ATRIBUIÇÃO (caixas: Responsáveis, Envolvidos, Quem criou) e PESSOAS (rádio), com CANCELAR e APLICAR.
- TODAS AS ATIVIDADES abre painel. O painel tem EXIBIR (caixas: Tarefas, Eventos) e STATUS (rádio: A concluir, Concluídas, Canceladas, Todas), com CANCELAR e APLICAR.
- Cabeçalho do calendário: seletor "Hoje"/"Novembro de 2026" com seta, botão HOJE, setas anterior e próximo.

### 2.1 Por dia
- Grade de horas (19:00 a 23:00), linha "Dia todo", linha preta com ponto na hora atual. À direita, card "Nenhuma atividade" com "Nenhuma atividade encontrada. Verifique os filtros selecionados."
- Tipografia: 14px (12), 12px (8), 16px (2), 24px (1). Raios: 8px (15), 50%, 3px.

### 2.2 Em lista
- Seletor "Hoje" com data "07/11/2026". Linha com caixa de seleção e "Nenhuma atividade". Painel lateral "Tarefas sem data e a con…" com ícone de filtro e botão de recolher `»`.
- Estado vazio com ilustração: "Nenhuma atividade encontrada" / "Verifique os filtros selecionados."
- Tipografia: 12px (7), 16px (3), 14px (3), 24px (1). Raios: 8px (14), 4px.

### 2.3 Por semana
- Cabeçalho "Novembro de 2026" com fundo cinza claro no seletor. Colunas DOM a SÁB com número do dia em 24px; o dia atual é um círculo azul com número branco. Linha "Dia todo" e grade por hora.
- Tipografia: 12px (14), 14px (12), 24px (8). Raios: 8px (13), 100px (7), 50%.

### 2.4 Por mês
- Grade 7 colunas (DOM a SÁB), células com número no canto superior; o dia atual é círculo azul.
- Tipografia: 14px (36), 12px (14). Raios: 100px (35, as células de dia), 8px (13).

Vocabulário: Agenda, Atribuições, Atividades, Tarefas, Eventos, Responsáveis, Envolvidos, Imprimir, Exportar planilha, A concluir, Concluídas, Canceladas, Hoje.

Kanban na Agenda: não existe. As quatro visões são calendário ou lista.

## 3. Contatos

- Título: "Contatos" (H2, não H1). Rota `#/main/contacts`.
- Ação do cabeçalho: ADICIONAR, fundo `rgb(34,139,230)`, texto branco, raio 8px, caixa alta, 12px/800.
<!-- lint-ignore: deriva-terminologica — texto literal da interface -->
- Barra de busca com seta de filtro avançado e índice alfabético TODOS A–Z (links azuis, TODOS sublinhado). Campo "Procure por nome, apelido ou nome fantasia do seu contato", lupa, etiqueta, menu de três pontos, atualizar.
Botões `au-button--default`: fundo `rgb(241,243,244)`, raio **0**, 12px/900.
- Chips de filtro ativos com `x`: "TIPO: CLIENTE", "NOTIFICAÇÕES: TODOS", "TIPO DE NOTIFICAÇÃO: TODAS". Caixa alta, raio 2px, 10px.
- Tabela: "Mostrando N de N contato(s)". Colunas: caixa de seleção, TIPO (ícone de pessoa azul), NOME (ordenável, seta), TELEFONE, EMAIL, ETIQUETAS. Cabeçalho em caixa alta 12px peso 800/700. Nome é link azul. Vazios em itálico cinza: "Nenhum telefone", "Nenhum email".
- Tipografia: 12px (36), 14px (13), 10px (3), 24px (1). Pesos 400 (28), 300 (16), 800 (6), 700 (3). Raios: 2px (3), 50% (3), 8px (2).
- Componentes: tabela, chips, índice alfabético, busca, seleção em massa.

Inferência: a tela de Contatos é de implementação mais antiga que Agenda: raio 0, peso 900 e título H2.

## 4. Atendimentos

- Título: "Atendimentos". Rota `#/main/consulting/list/`.
- Estado vazio com ilustração. H3 "Agilize e organize seus atendimentos". Texto "Registre conversas com seus clientes, adicione documentos e crie atividades de forma descomplicada."
- Ação: ADICIONAR ATENDIMENTO (azul, branco, raio 8px, caixa alta, 12px/700). Link "Saiba mais sobre o módulo de atendimentos".
- Tipografia: 12px (4), 14px (2), 24px (1), 16px (1). Raios: 8px, 50%.
- Sem tabela, sem filtros no estado vazio.

## 5. Processos e casos

- Título: "Processos e casos". Rota `#/main/folders/`.
- Ações do cabeçalho: Imprimir relatórios, Exportar (ícone de planilha), Atualizar e Adicionar. Os três primeiros têm fundo `rgb(241,243,244)`, raio 8px, 12px/700. Adicionar (`+`, azul, raio 8px).
<!-- lint-ignore: deriva-terminologica — texto literal da interface -->
- Barra de busca: seta "Filtro Avançado", campo "Digite algo para pesquisar", lupa, etiqueta, seletor ATIVOS (opções Ativos, Encerrados, Todos). Etiqueta e ATIVOS têm raio 0, peso 900 no seletor.
- Filtro avançado (painel). Campos: ÚLTIMA MOVIMENTAÇÃO com período, RESPONSÁVEL, Tipo (Processo, Caso, Todos). Mais: Vínculo com site do tribunal (Vinculados, Não vinculados, Com falha de conexão). Mais: Grau do processo (1º Grau, 2º Grau, Superior, Supremo, Todos), "Processos importantes", CANCELAR e APLICAR.
- Faixa informativa azul clara: "Estamos buscando seus processos e movimentações no site do tribunal…" com `x`.
- Lista: "N de N processos e casos". Colunas TÍTULO, CLIENTE / PASTA, AÇÃO / FORO, ÚLT. MOV (ordenável). Cada linha tem caixa de seleção, estrela e ícone verde de sincronização. O título é preto, 14px, peso 500. O subtítulo é "Processo ativo | `<processo>`" com número sublinhado em cinza, parte e foro em duas linhas. Links por linha: "Mostrar apensos", "Etiquetas", "Editar".
- Tipografia: 14px (37), 12px (8), 24px (1). Pesos 300 (35), 500 (6), 700 (4), 900 (1). Raios: 8px (30), 50% (3).
- Componentes: lista em card com cabeçalho de colunas, barra de busca com filtro avançado, faixa de aviso, favoritar (estrela).

Kanban em Processos e casos: não achei. Nenhum seletor de visão; só filtros.

## 6. Publicações
- Título: "Publicações". Rota `#/main/clippings`.
- Estado vazio de upsell com ilustração. H3 "Receba publicações e intimações eletrônicas direto no Astrea". Texto: "Conheça outros planos para acompanhar seus processos com facilidade, recebendo alertas…".
- Ação: CONHECER PLANOS (azul, branco, raio 8px, caixa alta, 12px/700).
- Tipografia: 12px (4), 24px, 16px, 14px. Raios: 8px, 50%.

## 7. Financeiro
- Título: "Financeiro". Rota `#/main/financial/entries`.
- Mesmo padrão de upsell. H3 "Administre as movimentações financeiras do seu escritório de forma integrada". Ação: CONHECER PLANOS.
- Medidas iguais às de Publicações.

## 8. Documentos
- Título: "Documentos". Rota `#/main/documents/`.
- Estado vazio com ilustração. H3 "Crie, padronize e gerencie seus documentos". Ação: ADICIONAR DOCUMENTO com seta (azul, raio 8px, 12px/700). Link "Saiba mais sobre o módulo de documentos".
- Tipografia: 12px (4), 14px (2), 24px, 16px.

## 9. Indicadores
- Título: "Indicadores" (H1; aqui o H1 fica 8px mais acima que nas demais telas). Rota `#/main/dashboard-module`.
- Estado vazio de upsell. H2 "Acompanhe os dados mais relevantes do escritório". Ações: CONHECER PLANOS e link "Saiba mais sobre o módulo de indicadores" em 12px.
- Fato: os widgets e gráficos do módulo vêm de um micro-frontend externo (`astrea-dashboard-mfe`), não visível nesta conta.

## 10. Alertas
- Título: "Alertas" com botão de atualizar (ícone) à direita, sem fundo. Rota `#/main/alerts`.
- Abas com contagem em selo azul: Importantes (estrela), Todos 1, Andamentos, Processos, Tarefas 1, Agenda, Portal do Cliente, Integração, Outros. Aba ativa tem sublinhado azul.
- Barra de seleção em card: caixa, "Mostrando N de N alertas", "Expandir todos", ícone de ordenar.
- Card de alerta com caixa, ícone e título vermelho "Tarefa atrasada", data à direita. Segue a linha "`<data>` - `<tarefa>`", contexto em cinza (parte x parte - grau - ação), "Responsável: `<nome>`". Ações em azul caixa alta:
  VISUALIZAR TAREFA, CONCLUIR TAREFA, REAGENDAR (com seta), e DESCARTAR ALERTA à direita.
- Tipografia: 14px (17), 12px (7), 24px (1). Pesos 500 (11), 300 (10), 700 (4). Raios: 8px (2), 50% (3).
- Componentes: abas com contador, cards de alerta com ações, selo vermelho de contagem no menu.

## 11. Suporte
- Título: "Suporte" (H2). Rota `#/main/support`.
- Blocos: "Preciso de ajuda com o Astrea" com texto e botão ACESSAR A CENTRAL DE AJUDA (azul, raio 8px). "Aprenda mais sobre o Astrea" com carrossel de cards de vídeo.
- Vídeos: miniatura cinza com botão de play azul circular. A legenda fica abaixo. Legendas: "Como adicionar seus processos no Astrea", "Gerencie prazos e audiências".
  Outras legendas: "Gerenciando suas atividades e otimizando tempo com o Astrea", "Gestão financeira de ponta a ponta", "Gerenciando seus atendimentos".
- Seta de próximo, redonda, branca com sombra.
- Tipografia: 14px (7), 12px (4), 20px (2), 24px (1). Raios: 8px (13), 100% (6), 50% (4).

## 12. Kanban

Resultado: **não está disponível nesta conta**.

Fatos:
- O DOM do menu lateral contém um link "Gestão kanban" (`href="#/main/kanban"`, ícone `fa-columns`). O link fica logo depois de "Área de trabalho". Está oculto por `ng-show="canSeeKanban"` (feature flag).
- Há também um link "Workflows" (`#/main/workflow-module`) oculto por `canSeeWorflow`, e "Peças jurídicas" (`canSeeArgo`).
- Abrir `#/main/kanban` redireciona de volta para a Área de trabalho.
- Nenhuma folha de estilo carregada tem seletor com "kanban". O CSS do módulo carrega sob demanda e não chegou ao navegador.

Onde busquei sem achar visão de quadro:
- Área de trabalho. Ícone de etiqueta (filtro por etiqueta). Ícone de ordenar (prioridade, data, alfabética), ícone de impressora, seletor "Lista de tarefas". Nenhum alterna para quadro.
- Agenda: seletor de visão tem só Em lista, Por dia, Por semana, Por mês.
- Processos e casos, Atendimentos: sem seletor de visão.

Colunas e card do Kanban: não medidos. Inferência: o módulo é recurso de plano superior ou de liberação gradual, no mesmo padrão dos módulos com upsell.

## 13. Telas extras vistas

- Resultado de buscas de processos e Administração do Astrea (seção 0).
- Os cinco estados vazios (Atendimentos, Publicações, Financeiro, Documentos, Indicadores) repetem o mesmo gabarito. Ele tem ilustração, H3 centralizado, parágrafo cinza, botão azul primário, link opcional "Saiba mais sobre o módulo de …".

## 14. Resumo para o design system

### Tipografia
- Família: `museo-sans, sans-serif` em tudo (`--primary-font`, `--nectar-font-family`, `--nectar-p-font-family-base`). `Handlee` só no selo promocional.
- Pesos em uso: 300 (corpo, dominante), 400 (H1, texto de tabela), 500 (menu, subtítulos).
- Mais pesos em uso: 700 (botões), 800 e 900 (rótulos legados).
- Tokens novos: `--nectar-font-weight-light` 300, `-regular` 400, `-semibold` 500, `-bold` 700.
- Escala medida: 10, 12, 14, 16, 18, 20, 24px. Tokens: `--text-xs/sm/md/lg` 10/12/14/16 e `--heading-xs/sm/md/lg` 20/24/32/48 (legados); `--nectar-font-size-xs…xl` 10/12/14/16/20 e `heading-xs…xl` 16/20/24/32/48 (novos).
- Botões: 12px, caixa alta, espaçamento `--nectar-legacy-button-letter-spacing` .04375rem.

### Raios
- Dominante: 8px (botões, cards, itens de menu). Tokens: `--nectar-radius-md` 8px, `--nectar-s-shape-radius-element-md`.
- Outros em uso: 4px (`--nectar-radius-sm`), 2px (chips), 3px, 100px (células do mês na Agenda), 50% e 100% (círculos).
- Raio 0 em Contatos e no filtro de Processos (legado).

### Paleta real
- Primária: `--primary` `#228BE6`, `--primary100` `#DAF3FF`, `--primary900` `#1D6BB7`. Usada em botão primário, links, aba ativa, dia atual.
- Cinzas: `--gray900` `#202124` (texto), `--gray500` `#6C757D` (menu, ícones, botões secundários), `--gray300` `#DEE2E6` (bordas), `--gray100` `#F1F3F4` (fundo de botão secundário).
- Semânticas: `--success` `#02883C` (Contratar), `--danger` `#E70202` (alerta atrasado, selo), `--warning` `#FCC530`. Cada uma com variantes 100 e 900.
- Roxo da IA: `--nectar-s-color-ia-*` (base `#7E55ED`, 600 `#6840D6`).
- Banner promocional: `rgb(2,85,196)` hardcoded, sem token.
- Três sistemas de nomes coexistem: legado curto (`--primary`, `--gray*`) e `--nectar-legacy-*`. O terceiro é a pilha nova em três camadas: `--nectar-p-*` (primitivas), `--nectar-s-*` (semânticas) e `--nectar-m-*` (de uso, ex.: `--nectar-m-color-surface-action`).
- Divergência: o token novo de marca `--nectar-s-color-brand-500` aponta para `#0A74D1`, mas o botão primário medido na tela é `#228BE6` (token legado). Inferência: a migração para a pilha nova não chegou aos botões.

### Componentes repetidos em mais de um módulo
- Botão primário azul, caixa alta, raio 8px: Área de trabalho, Agenda, Contatos, Atendimentos, Processos, Publicações, Financeiro, Documentos, Indicadores, Suporte.
- Botão secundário cinza `#F1F3F4` só de ícone: Área de trabalho, Agenda, Processos, Contatos.
- Botão de filtro com seta e caixa alta: Área de trabalho (lista), Agenda (três), Processos (Ativos), Contatos.
- Painel de filtro com CANCELAR e APLICAR: Agenda, Processos.
- Estado vazio com ilustração, H3, parágrafo e botão: Atendimentos, Publicações, Financeiro, Documentos, Indicadores, Agenda (lista).
- Tabela ou lista com cabeçalho de colunas em caixa alta: Contatos, Processos, Agenda (tabelas da grade).
- Card com borda `#DEE2E6` e raio 8px: widgets da Área de trabalho, Agenda, Alertas, Processos, Suporte.
- Abas com sublinhado: Alertas, Administração, Resultado de buscas.
- Etiqueta (ícone de tag) como filtro: Área de trabalho, Agenda, Contatos, Processos.
- Selo de contagem (azul nas abas, vermelho no menu): Alertas.
- Faixa de aviso com `x`: Processos, banner global.
- Modal de upgrade com DEIXAR PARA DEPOIS e CONHECER PLANOS: ícone de timesheet.

## Screenshots salvos

Arquivos em `evidencias/chrome/`.

Telas (tela cheia, 1536x674):
- Área de trabalho: `evidencias/chrome/area-de-trabalho.jpg`
- Área de trabalho com lista de tarefas aberta: `evidencias/chrome/area-de-trabalho-lista-de-tarefas.jpg`
- Agenda por dia: `evidencias/chrome/agenda-por-dia.jpg`
- Agenda em lista: `evidencias/chrome/agenda-em-lista.jpg`
- Agenda por semana: `evidencias/chrome/agenda-por-semana.jpg`
- Agenda por mês: `evidencias/chrome/agenda-por-mes.jpg`
- Contatos: `evidencias/chrome/contatos.jpg`
- Atendimentos: `evidencias/chrome/atendimentos.jpg`
- Processos e casos: `evidencias/chrome/processos-e-casos.jpg`
- Publicações: `evidencias/chrome/publicacoes.jpg`
- Financeiro: `evidencias/chrome/financeiro.jpg`
- Documentos: `evidencias/chrome/documentos.jpg`
- Indicadores: `evidencias/chrome/indicadores.jpg`
- Alertas: `evidencias/chrome/alertas.jpg`
- Suporte: `evidencias/chrome/suporte.jpg`
- Tentativa de abrir `#/main/kanban` (redireciona para a Área de trabalho): `evidencias/chrome/kanban-redireciona-para-area-de-trabalho.jpg`

Capturas auxiliares (escala reduzida):
- Ícone brilhos: `evidencias/chrome/icone-brilhos.jpg`
- Menu Adicionar: `evidencias/chrome/menu-adicionar.jpg`
- Resultado de buscas: `evidencias/chrome/resultado-de-buscas.jpg`
- Modal de upgrade do timesheet: `evidencias/chrome/modal-upgrade-timesheet.jpg`
- Administração: `evidencias/chrome/administracao.jpg`
- Menu Ordenar da Área de trabalho: `evidencias/chrome/menu-ordenar-area-de-trabalho.jpg`
- Seletor de visão da Agenda: `evidencias/chrome/seletor-de-visao-agenda.jpg`
- Menu de três pontos da Agenda: `evidencias/chrome/menu-tres-pontos-agenda.jpg`
- Filtro Todas as atividades: `evidencias/chrome/filtro-todas-as-atividades.jpg`
- Filtro Minhas atribuições: `evidencias/chrome/filtro-minhas-atribuicoes.jpg`
- Filtro avançado de Processos: `evidencias/chrome/filtro-avancado-processos.jpg`
- Seletor Ativos de Processos: `evidencias/chrome/seletor-ativos-processos.jpg`
