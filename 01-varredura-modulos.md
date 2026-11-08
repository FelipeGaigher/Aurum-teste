# Varredura dos módulos do Astrea

Feita em 2026-11-08 no Chrome do usuário, conta de trial já logada, só leitura. Base: `01-inventario-css-astrea.md` e `01-telas-observadas.md` (telas 11 a 25). Aqui entra só o que mudou ou o que faltava.

Nomes de parte, números de processo e e-mail foram trocados por `<nome>`, `<parte>` e `<processo>`.

Convenção: **Fato** é o que a tela mostra. **Hipótese** é leitura minha.

Capturas em `evidencias/varredura/`. A ferramenta gravou no disco, então toda tela citada tem arquivo. Lista de capturas com dado real no fim.

## 0. Plano e limites da conta

Fatos:
- Rota `#/main/plan-module/comparison-page` (menu do usuário, "Meu plano"). Texto: "Você está testando o plano Light" (Gratuito por um ano). Link "Trocar plano de teste ou ver recursos de teste utilizados".
- Light: 40 processos monitorados (com push), processos cadastrados ilimitados, 1 usuário, 1 GB de nuvem, nenhum nome para captura de publicações.
- Planos acima: Up (150 processos, 2 usuários), Smart (500, 5), Company (1.000, 10), Vip (2.000, 30). Smart vem como "Plano recomendado". Há três cobranças: anual à vista (50% off), anual até 6x (40% off), mensal (20% off).
- A tabela de recursos lista "Gestão kanban" com 2, 3, 4 e 5 quadros (quatro colunas de plano, Light fora) e "Workflows". Kanban e Workflows não fazem parte do Light.
- A faixa de processos escolhida no cadastro não aparece em nenhum lugar de "Meu plano" nem de Administração. Só o limite de 40.
- A busca automática mostra "VOCÊ POSSUI 35 CRÉDITOS AUTOMÁTICOS" com link de upgrade. Este é um segundo limite, além dos 40.

Hipótese: o limite de 40 processos monitorados e os 35 créditos de busca são dois contadores diferentes. Nenhuma tela explica a diferença.

## 1. Área de trabalho

Rota `#/main/workspace/%5B,%5D` (o sufixo é o filtro de lista). Confirmado o que o inventário traz. Novidades abaixo.

Fatos:
- Seletor "Lista de tarefas" abre campo "Encontre uma lista para visualizar" e três itens: "Todas as listas", "Lista de tarefas", "Teste tarefas 1", mais link "Gerenciar listas".
- A visão inicial é a lista "Lista de tarefas", vazia: "Ainda não existem tarefas cadastradas nesta lista." Uma tarefa atrasada existe em outra lista e só aparece em "Todas as listas". O Alertas mostra essa mesma tarefa como atrasada.
- Em "Todas as listas" a tarefa vira linha com título azul, data vermelha, contexto do processo, estrela vermelha e selo "EU". No hover aparecem ícones de pessoa, etiqueta, calendário, lápis e lixeira. Não aparecem os cabeçalhos HOJE, AMANHÃ, FUTUROS (tarefa atrasada).
- Etiqueta (ícone): campo de busca, item "Prazo" (laranja) e "Gerenciar etiquetas".
- Ordenar: "Ordenar por prioridade", "por data", "alfabeticamente".
- Seletor "Processos e casos" é nativo, com cinco opções: Últimos 90, 60, 30 e 7 dias, Hoje. Valor inicial: 30 dias. Hoje a conta mostra "3 não tiveram movimentação" e "2 tiveram movimentação" (ontem eram 4 e 0).
- Menu `+` do widget Processos e casos: Busca de processo automática, Processo, Caso.
- Menu `+` do widget Estatísticas: Atendimento, Honorário (selo "UPGRADE"), Honorário com % no êxito (UPGRADE), Despesa (UPGRADE), Timesheet (UPGRADE), Documento, Documento padrão, Link, Histórico. Em seguida o grupo "Integrações do Google": Arquivo do Google Drive, Documento padrão.
- Painel Lembretes: três blocos, "HOJE:", "AMANHÃ:", "FUTUROS: próximos 5 compromissos", todos com "Sem compromissos agendados". `+` do widget: Nova tarefa, Novo evento.
- Cada widget tem "Ocultar". Não cliquei, porque muda preferência gravada.

Padrões divergentes:
- Select nativo "Últimos 30 dias" ao lado de menus customizados.
- O mesmo menu de criação aparece em quatro lugares (Adicionar do cabeçalho, `+` de cada widget, botão da Agenda, ficha do processo), cada um com itens diferentes.

Pontos de atenção:
1. A visão inicial vazia esconde tarefa atrasada que existe em outra lista. Quem criou a tarefa acha que ela sumiu.
2. Tarefa atrasada não tem seção própria (falta "ATRASADAS" ao lado de HOJE).
3. Itens de upgrade aparecem misturados aos liberados no mesmo menu, com selo pequeno.

## 2. Agenda

Rota `#/main/calendar`. Confirmado o inventário. A visão por dia abriu em "Ontem" (a conta lembra a data da última sessão, não volta para Hoje).

Fatos:
- Etiqueta (filtro): campo de busca, "Sem etiqueta", "Audiência" (vermelho), "Prazo" (laranja), "Gerenciar etiquetas".
- Lupa: abre campo inline com placeholder "Pesquisar atividade, contato, processo ou caso".
- Botão `+` azul: menu com "Tarefa" e "Evento".
- Modal "Adicionar evento" (`Etiqueta` no topo, link "ADICIONAR ETIQUETA"). Campos na ordem:
  1. Título do evento*
  2. De* (data 07/11/2026 padrão, hora 00:00)
  3. Até* (hora 00:00, data 07/11/2026)
  4. Dia inteiro (caixa) e link "Adicionar recorrência"
  5. Endereço ou local
  6. Modalidade (seletor, vazio)
  7. Alertas internos de antecedência (selo MELHORIA, número 0 e "Hora(s) antes", desabilitados). Aviso: "Os alertas de antecedência não serão enviados de forma retroativa".
  8. Responsável* (padrão: o usuário), link "Envolver mais pessoas"
  9. Resumo para pessoas externas (selo MELHORIA), "E-mails externos", botão CONFIGURAR E-MAIL
  10. Observações
  11. Processo, caso ou atendimento
  Botões: CANCELAR e SALVAR, ambos em texto.
- Clicar CANCELAR num formulário intocado abre outro modal sobre o primeiro: "Sair do evento sem salvar? Você perderá todas as informações...", com VOLTAR AO EVENTO e SAIR MESMO ASSIM (azul). Saí por esse caminho. Nada foi gravado.
- Painel "Lembretes" não existe na Agenda. Ele só existe na Área de trabalho.
- Não revisitei as visões Em lista, Semana, Mês, nem os painéis Minhas atribuições e Todas as atividades, porque o inventário já cobre.

Padrões divergentes:
- Modal sobre modal só para descartar um formulário vazio.
- Dois selos "MELHORIA" dentro de um formulário, sem explicação do que mudou.
- Data de início e fim em ordem diferente (data-hora em "De", hora-data em "Até").

Pontos de atenção:
1. A confirmação de saída não distingue formulário vazio de formulário preenchido.
2. "Até" mostra hora antes da data, o oposto de "De".
3. Modalidade e alertas de antecedência estão vazios e desabilitados sem dizer quando liberam.

## 3. Contatos

Rota `#/main/contacts`. Confirmado o inventário.

Fatos, lista:
- Menu de três pontos: Exportar contatos, Extrair emails, Ficha resumida, Ficha completa.
- Seta "Filtro Avançado" abre painel com: Cadastrados (período), Mostrar (Todos, **Só clientes** padrão, Só contatos, Só usuários), Notificações (**Todos** padrão, Com notificações, Sem notificações), Tipo de notificações (caixas Publicações e Andamentos automáticos, ambas marcadas), Mês de Aniversário (seletor, "Qualquer Mês"), Estado (seletor, "Todos os estados"). Botões: "Cancelar" (link) e APLICAR (azul).
- O filtro padrão "Só clientes" gera os três chips da lista. A lista mostra 4 contatos, todos clientes, com "Nenhum telefone" e "Nenhum email".

Fatos, ficha (`#/main/contacts/detail/<id>/data`):
- Cabeçalho: `<nome>`, "Criado em 07/11/2026", chip "TIPO: CLIENTE", lápis e lixeira, link "Voltar".
- Oito abas, nesta ordem. Só li a rota de Cadastro, Atendimentos e Despesas:

| Aba | Rota final | O que mostra |
|---|---|---|
| Cadastro | `/data` | Foto, apelido, nascimento, estado civil, etiquetas, origem, CPF, RG, CTPS, PIS, título de eleitor, e mais abaixo. Leitura com rótulos em caixa alta à direita |
| Documentos | (rota não lida) | Título, botão ADICIONAR DOCUMENTO com seta, busca "Encontre um documento", filtro avançado, atualizar. Carrega com spinner "Carregando..." |
| Atendimentos | `/consultings` | Estado vazio com ilustração e o mesmo texto do módulo |
| Processos | (rota não lida) | Reaproveita a lista do módulo: impressora, exportar, atualizar, `+`, busca, etiqueta, ATIVOS e faixa de "Estamos buscando…" |
| Despesas | `/expenses` | Duas sub-abas: Adiantamentos e Despesas. Colunas de adiantamentos: TIPO, DATA, DESCRIÇÃO, NÚMERO DA FATURA, VALOR, SALDO DO CLIENTE |
| Honorários | | Três totais (TOTAL LANÇADO (BRUTO), TOTAL FATURADO/RECEBIDO (LÍQUIDO), TOTAL A FATURAR (LÍQUIDO)), botão ADICIONAR e tabela STATUS, VENCIMENTO, DESCRIÇÃO, CASO/CLIENTE, RESPONSÁVEL, VALOR, VALOR RECEBIDO |
| Timesheets | | Totais em minutos e reais, botão ADICIONAR, colunas STATUS, DATA, DESCRIÇÃO, CASO/CLIENTE, RESPONSÁVEL, TEMPO |
| Notificações | | Botão ADICIONAR, colunas TIPO, EMAIL, ÚLTIMO ENVIO |

Padrões divergentes:
- Honorários, Despesas e Timesheets abrem telas completas dentro da ficha, embora o módulo Financeiro e o Timesheet estejam bloqueados por upsell. O bloqueio só vale na navegação principal e nos menus de criação.
- O botão de criar muda de texto entre abas: ADICIONAR, ADICIONAR DOCUMENTO, `+`.
- A aba Processos traz o filtro do contato como chip "CONTATO <nome>". Esse filtro continua ao entrar no módulo Processos e casos depois (ver módulo 4).

Pontos de atenção:
1. O filtro "Só clientes" é padrão e invisível como filtro "de entrada". Quem cadastra um contato que não é cliente não o vê na lista.
2. Filtro de contato vaza para a lista global de processos.
3. Três abas financeiras sem função na conta.

## 4. Processos e casos

Rota `#/main/folders/%5B,,%5D`. A lista tem 5 processos hoje (eram 4). A ficha foi aberta sobre um deles.

Fatos, lista:
- Cabeçalho: Imprimir, Exportar (planilha), Atualizar, `+`.
- Menu `+`: Busca de processo automática, Processo, Caso.
- Colunas ordenáveis: TÍTULO (ícone de ordenação surge ao clicar) e ÚLT. MOV.
- Passar o mouse sobre a linha mostra à direita dois ícones: etiqueta e lápis.
- Filtro avançado: ÚLTIMA MOVIMENTAÇÃO (seletor + período), RESPONSÁVEL (busca), Tipo (Processo, Caso, **Todos** padrão), Vínculo com site do tribunal (Vinculados, Não vinculados, Com falha de conexão, caixas), Grau do processo (1º, 2º, Superior, Supremo, **Todos** padrão), caixa "Processos importantes". Botões: CANCELAR (texto) e APLICAR (azul).
- A faixa azul "Estamos buscando seus processos e movimentações no site do tribunal..." continua ativa.

Fatos, ficha (`#/main/folders/detail/<id>`):
- Cabeçalho: título `<parte>`, "Processo | `<processo>`" sublinhado, Cliente, Status ("Ativo 1º Grau" com ícone de feed verde), Responsável, Criado por. À direita: seta de voltar, estrela, etiqueta, menu de três pontos, `+`.
- Três abas: Resumo, Atividades, Histórico.
- Resumo, coluna esquerda: "Dados do Processo" (Ação, Número com COPIAR, Juízo, Link no tribunal com COPIAR, Valor da causa, Val. condenação, Distribuído em, Criado em, partes e advogados), "Últimos históricos", "Recursos e desdobramentos" (1º Grau, selo ATIVO), "Apensos".
- Resumo, coluna direita: "Próximas atividades" (Tipo de atividade* Tarefa ou Evento, Descrição da tarefa*, botão ADICIONAR TAREFA, e menu ADICIONAR), "Documentos" (estado vazio com ADICIONAR DOCUMENTOS), "Atendimentos" (vazio com ADICIONAR ATENDIMENTOS), "Honorários" (Faturado, A faturar, Total lançado, todos R$ 0,00).
- Atividades: contadores "0 ABERTA | 0 CONCLUÍDA", texto "Não há atividades em aberto neste processo." e botão ADICIONAR ATIVIDADE com seta.
- Histórico: cartão da instância ("1º Grau - Termo Circunstanciado", número, juízo, advogado réu, distribuído em, selo ATIVO, ícones de feed, vínculo e três pontos) e lista de andamentos com ícone de nuvem, data e texto.
- Menu de três pontos: Apensar outro processo a este, Apensar este processo a outro, Alterar instância atual, Desvincular do tribunal, Imprimir relatório, Editar, Encerrar, Excluir.
- Menu `+` da ficha: Tarefa, Evento, Histórico manual; Atendimento, Honorário, Honorário com % no êxito, Despesa, Timesheet (os quatro últimos com selo UPGRADE); Documento, Documento do Google Drive, Documento padrão, Documento padrão do Google Drive, Link; Recurso, Desdobramento.

Fatos, formulário "Adicionar processo" (`#/main/folders/lawsuit/add-edit/`):
Página inteira, não modal. Campos na ordem: Pasta (busca); Clientes* (busca) com Qualificação, link "Adicionar cliente"; Outros envolvidos (busca + Qualificação, lixeira), link "Adicionar envolvido"; Título*; Etiqueta (só ícone); Instância (1º Grau padrão; 2º Grau, Superior, Supremo, Outra) e Número; Juízo (Nº, Vara, Foro); Ação; Link no tribunal; Objeto; Valor da causa; Distribuído em (data); Valor da condenação; Observações; Responsável* (usuário padrão); Acesso (Público padrão, Privado, Envolvidos). Botões: "Cancelar" (link) e SALVAR. Obrigatórios: Clientes, Título, Responsável. Cancelar volta para a lista sem confirmar.

Fatos, "Adicionar caso" (`.../case/add-edit/`): mesmos campos do processo até Etiqueta, depois Descrição, Observações, Responsável*, Acesso.

Fatos, "Busca de processo automática" (`#/main/pending-search/lawsuit-form`): três rádios (Seleção de tribunal/órgão, Pelo número CNJ, Em lote pela OAB), stepper vertical de três passos (Seleção do tribunal ou órgão público, Tipo de pesquisa, Dados do processo), caixa lateral "VOCÊ POSSUI 35 CRÉDITOS AUTOMÁTICOS". Não preenchi.

Padrões divergentes:
- Três fluxos de entrada para o mesmo objeto (manual, caso, busca automática), cada um com layout diferente.
- Rótulos "Processo" e "Processo e casos" (menu) misturados. O mesmo item é "Processo", "Caso" ou "Pasta" conforme o campo.
- "Cancelar" é link no formulário de página e CANCELAR é botão no modal e no filtro.

Pontos de atenção:
1. Formulário de processo tem 17 campos em sequência única e só três são obrigatórios. Falta agrupamento e a opção de preencher só o número.
2. Ficha mistura menu de criação com `+`, e um menu de três pontos com ações destrutivas ao lado (Encerrar, Excluir) sem separação visual forte.
3. Filtro de contato persiste na lista global (ver módulo 3).

## 5. Alertas

Rota `#/main/alerts`. Há 1 alerta, tarefa atrasada.

Fatos:
- Nove abas: Importantes (estrela), Todos 1, Andamentos, Processos, Tarefas 1, Agenda, Portal do Cliente, Integração, Outros.
- Todas as abas vazias têm ilustração e frase diferente: Importantes "Você se atualizou das novidades!", Andamentos e Processos e Agenda "Parabéns! Você conferiu todos os alertas por aqui!", Portal do Cliente "Sua rotina está sendo produtiva!", Integração igual a Processos, Outros "Excelente trabalho! Você verificou todos os seus alertas!".
- Em "Todos" a barra tem "Expandir todos" e ordenar. Em "Tarefas" a barra não tem "Expandir todos". O ícone de ordenar apenas inverte a ordem.
- Marcar a caixa de seleção troca a barra para "1 alertas selecionados" e mostra botão cinza DESCARTAR ALERTAS. Ele abre diálogo "Excluir alerta. Tem certeza que deseja excluir 1 alerta? Essa ação pode levar alguns minutos..." com CANCELAR e CONFIRMAR. Cliquei no botão por engano ao procurar o menu de ordenar, e cancelei no diálogo. Nada foi gravado, o alerta continua lá.
- Ações do card: VISUALIZAR TAREFA, CONCLUIR TAREFA, REAGENDAR (seta), DESCARTAR ALERTA. Só abri VISUALIZAR TAREFA.
- VISUALIZAR TAREFA abre modal "Tarefa" (`X` no topo): caixa de conclusão, título, Data (menu), Processo (link), Número do processo, Responsável (menu), Criado por, Prioridade (Alta, ícone vermelho). Abas "Comentários" e "Histórico de alterações". Campo de comentário com clipe e Google Drive e botão COMENTAR.
- Não abri REAGENDAR, CONCLUIR TAREFA nem DESCARTAR ALERTA.

Padrões divergentes:
- O botão diz "Descartar", o diálogo diz "Excluir". A mesma ação com dois verbos.
- O modal de tarefa aberto de Alertas é o terceiro layout da tarefa (modal de edição, linha da lista, visualização).

Pontos de atenção:
1. Dois verbos para uma ação que não tem como desfazer.
2. Aviso "pode levar alguns minutos" num descarte de um item.
3. Frases de estado vazio diferentes em cada aba, sem ganho de informação.

## 6. Atendimentos

Rota `#/main/consulting/list/`. Estado vazio igual ao inventário.

Fatos, formulário (`#/main/consulting/add`, página inteira): Clientes*, link "Adicionar cliente", Assunto* ("Digite um título para o seu atendimento"), Etiqueta (só ícone), Processo, caso ou atendimento, 1º Registro do atendimento* (área de texto grande, "Insira as anotações referentes ao atendimento"). Botões "Cancelar" (link) e SALVAR. Quatro campos obrigatórios com um deles a área de texto longa. Não há Responsável nem Acesso (o processo tem).

Pontos de atenção:
1. "1º Registro" é obrigatório e ocupa metade da tela, antes de a pessoa ter o que anotar.
2. Sem Responsável e Acesso, ao contrário de processo e caso.

## 7. Documentos

Rota `#/main/documents/%5B,,%5D`. Estado vazio como no inventário.

Fatos:
- ADICIONAR DOCUMENTO (seta) abre menu com Documento, Link, Documento padrão (possivelmente mais itens abaixo da dobra; vi só três). Não abri "Documento", porque pode abrir seletor de arquivos do sistema.
- "Documento padrão" abre página `#/main/documents/standard-add-edit-step1/`: Documento* (seletor nativo "Selecione um modelo": Contrato de Honorários PF, Contrato de Honorários PJ, Procuração PF, Procuração PJ), Processo, caso ou atendimento, Cliente*, Título*, Responsável* (usuário padrão). Botões CANCELAR (caixa alta, texto) e CONTINUAR (azul). É o primeiro de pelo menos dois passos, sem indicador de passos.
- Modelos: Administração tem aba "Modelos de documento" (`#/main/admin/newDocument-model`) com lista TÍTULO, AUTOR, DATA e menu de três pontos por linha, botão ADICIONAR MODELO. Os quatro modelos têm data 07/11/2026 e autor vazio. Não abri o editor.

Padrões divergentes:
- Seletor de modelo é nativo.
- Aqui "CANCELAR" é botão em caixa alta, enquanto em processos é link "Cancelar".

Pontos de atenção:
1. Wizard de dois passos sem indicador.
2. Os modelos moram em Administração, longe de Documentos.
3. Autor vazio nos quatro modelos padrão.

## 8. Publicações, Financeiro, Indicadores

Rotas `#/main/clippings`, `#/main/financial/entries`, `#/main/dashboard-module`.

Fatos:
- Os três mostram apenas upsell com um botão CONHECER PLANOS. Nenhum tem submenu, aba ou rota extra. No DOM do menu não há filhos para eles.
- Financeiro: "Administre as movimentações financeiras do seu escritório de forma integrada". Indicadores tem o link "Saiba mais sobre o módulo de indicadores".
- Não cliquei em CONHECER PLANOS.

Pontos de atenção:
1. Três itens do menu levam só a upsell. São 3 de 12 itens do menu sem função.
2. As abas de Financeiro dentro da ficha de contato mostram dados vazios em vez do bloqueio.

## 9. Suporte e "Conheça as IAs"

Rotas `#/main/support` e `#/main/hub-ia`.

Fatos, Suporte: ACESSAR A CENTRAL DE AJUDA e carrossel com seis vídeos (inclui "Gerenciando seus documentos", que o inventário não tinha).

Fatos, Conheça as IAs: título "Conheça as IAs do Astrea". Cinco abas (`/hub-ia/<nome>`): Resumo, Tratamento de publicações, Tradução do juridiquês, Criação de peças, Priorização de andamentos. Resumo mostra quatro cartões com selos de plano (Company e Vip; Smart, Company e Vip; Up a Vip; Light a Vip) e ACESSAR DETALHES. Cada aba de IA tem texto, lista de benefícios, vídeo, e caixa "A IA não está disponível no seu plano atual" com CONHECER PLANOS. Também existe `#/main/draft/documents` ("Criação de peças", selo IA), com botão ATIVAR CORTESIAS GRATUITAS. Não cliquei.

Pontos de atenção:
1. Cada cartão de IA traz de dois a cinco selos de plano, o que dificulta ver se a IA vale para o plano atual.
2. Seção que aparece no menu como destaque roxo mas, no trial, só vende.

## 10. Cabeçalho

Fatos:
- Os cinco ícones batem com o inventário. Ícone 1 abre popover "Conheça as IAs do Astrea" com QUERO SABER MAIS.
- Busca global: ao digitar "teste" abre lista de sugestões com "Tarefa `<título>`" e linha "Mostrar mais resultados" em fonte serifada (outro estilo da interface, que usa museo-sans) com ícone "QQ".
- Menu do usuário: Meu perfil, Meu plano, Sair. Não abri Meu perfil nem Sair.
- Administração (`#/main/admin/...`) tem seis abas:

| Aba | Rota | Conteúdo |
|---|---|---|
| Escritório | `/office` | Dados do escritório (lápis), dados de faturamento (impostos PCC e IRRF), próxima fatura, tipo de serviço, "Manutenção de conta" com LIMPEZA DE CONTA e LIMPAR DADOS DO FINANCEIRO. Não toquei |
| Grupo de envolvidos | `/teams` | Upsell (precisa de outro plano) |
| Acesso | `/access/` | Busca de usuário, tabela NOME/EMAIL, ADMIN, HONORÁRIOS, STATUS (um usuário), link "Mostrar apenas usuários ativos", rádio "Permissão para excluir processos e atendimentos" (Somente quem criou, Todos que possuem acesso) |
| Modelos de documento | `/newDocument-model` | Ver módulo 7 |
| Certificado Digital | `/certificates` | Oferta de certificado com Certisign (30% off), ADICIONAR CERTIFICADO |
| Segurança | `/security` | Autenticação em dois fatores: rádio "Obrigatório para todos" (aviso que desloga todos) ou "Opcional" (padrão) |

Padrões divergentes:
- Rádios de Acesso e Segurança parecem gravar ao clicar, sem botão Salvar. Não testei para não alterar.
- Admin tem três upsells e duas ações de destruição da conta na mesma tela.

Pontos de atenção:
1. Ação de limpar a conta fica ao lado de dados cadastrais, sem confirmação visível antes do clique.
2. Rádios que mudam a segurança sem botão de salvar.
3. "Mostrar mais resultados" na busca usa fonte e ícone fora do padrão.

## 11. Módulos ocultos

Fatos:
- No menu há links ocultos: Gestão kanban (`#/main/kanban`), Workflows (`#/main/workflow-module`), Criação de peças (`#/main/draft/documents`), Peças jurídicas (`#/main/argo/start`), Jurisprudência (`#/main/jurisprudence/start-conversation`), Migração (`#/main/migration-preview`). Acesso por hash: kanban, workflow-module, argo/start e jurisprudence/start-conversation voltam à Área de trabalho. `draft/documents` abre (ver módulo 9). Migração não foi testado.
- A tabela de planos confirma por texto que Kanban e Workflows não estão no Light.
- Hipótese: no Light nunca haverá Kanban. O quadro do protótipo precisa de outra fonte de referência (o onboarding promete "Quadros Kanban por etapa", tela 06).

## Resumo

| Módulo | Profundidade alcançada | O que ficou sem ver e por quê |
|---|---|---|
| Área de trabalho | Alta: listas, etiqueta, ordenar, três menus `+`, Lembretes | "Ocultar" dos widgets (grava preferência); formulário de tarefa (já na tela 14) |
| Agenda | Média: filtros, etiqueta, lupa, formulário de evento | Visões e painéis de filtro (cobertos no inventário); seletor Modalidade; Imprimir/Exportar |
| Contatos | Alta: filtro avançado, menu, oito abas | Ordenação por nome; Ficha resumida/completa (geram arquivo); editar contato |
| Processos e casos | Alta: lista, filtro avançado, ficha com três abas, três formulários | Preenchimento da busca automática; Recurso e Desdobramento; Apensar; Histórico manual |
| Alertas | Média: nove abas, seleção, modal de tarefa | REAGENDAR (proibido), CONCLUIR e DESCARTAR; abas vazias além do que já vi |
| Atendimentos | Alta: vazio e formulário | Lista com registros e ficha do atendimento (conta sem dados) |
| Documentos | Média: vazio, menu, documento padrão passo 1, modelos | Item Documento (abre seletor de arquivos), passo 2 do documento padrão, editor de modelo |
| Publicações, Financeiro, Indicadores | Alta para o que existe | Nada além de upsell; CONHECER PLANOS não clicado |
| Suporte e IAs | Média: Suporte, Resumo e uma aba de IA | Três abas de IA restantes; vídeos |
| Cabeçalho | Alta: cinco ícones, busca, menu do usuário, Administração seis abas | Meu perfil; Cronômetro (modal de upgrade, já visto); Adicionar > Contato |
| Plano e módulos ocultos | Alta | Migração, Meu perfil |

## Capturas com dado real

Arquivos em `evidencias/varredura/`. Contêm nome de parte ou número de processo:
- `contatos-lista.jpg`, `contato-ficha-cadastro.jpg`
- `processos-lista.jpg`, `processos-lista-filtrada-por-contato.jpg`, `processos-filtro-avancado.jpg`, `processos-lista-ordenada-titulo.jpg`
- `processo-ficha-resumo.jpg`, `processo-ficha-atividades.jpg`, `processo-ficha-historico.jpg`
- `alertas-todos.jpg`, `alertas-selecionado.jpg`, `alertas-descartar-confirmacao.jpg`, `alerta-visualizar-tarefa.jpg`
- `area-de-trabalho-todas-as-listas.jpg`

Contêm o e-mail do próprio usuário: `admin-acesso.jpg`, `admin-escritorio.jpg`.

Sem captura: as abas de Documentos, Atendimentos, Despesas, Honorários, Timesheets e Notificações da ficha de contato (vistas só em tela), e os menus `+` de Estatísticas e do processo, de Alertas e do Cabeçalho.
