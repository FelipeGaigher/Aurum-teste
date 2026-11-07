# Telas observadas no Astrea

Registro bruto, uma entrada por tela, na ordem em que apareceram. Serve de
evidência para o diagnóstico da Q1 e de referência para a tela da Q3.

Cada entrada separa o que a tela mostra (fato) do que a gente conclui
(hipótese). Hipótese só vira problema na Q1 depois de confirmada em outra
tela ou em outra fonte.

Os prints ficam em `evidencias/`, numerados na mesma ordem.

## Cadastro do trial

### 01 e 02. Formulário de nome e e-mail, com bloqueador ligado

Prints: `01-cadastro-bloqueado-network.png`, `02-cadastro-bloqueado-console.png`.

Fato:

- Nome e e-mail preenchidos, botão "Continuar" cinza e sem ação.
- Nenhuma mensagem na tela. Nenhum campo marcado como inválido.
- Console com dezenas de erros da ferramenta de consentimento AdOpt
  recusando o script de teste A/B. Network com dois scripts bloqueados por
  extensão.

Hipótese:

- O estado do botão depende de script de terceiro. Quando o script não
  carrega, o formulário morre em silêncio. Usuário com bloqueador não entra
  e não sabe por quê.
- Severidade alta para um funil de aquisição. Vale confirmar quantos
  visitantes usam bloqueador, com o time de marketing.

### 03. Pergunta do celular

Print: `03-cadastro-celular.png`.

Fato:

- Quarto passo do cadastro, depois de nome, e-mail e faixa de processos.
  O enunciado da vaga cita o telefone como campo do cadastro. Ele existe,
  só vem depois do e-mail.
- Barra de progresso sem rótulo e sem contagem de passos.
- Texto de apoio com emoji: "Usaremos seu número apenas para te ajudar
  durante o teste do Astrea. 🙂".
- Coluna esquerda com a oferta "Novembro Black": contador regressivo e três
  lotes de desconto. Tudo dentro do fluxo de criar conta de teste.
- Botão primário azul `#0096d6`, campo com raio de 8px, fonte Open Sans.

Hipótese:

- A barra sem contagem não diz quanto falta. Em quatro passos, dizer
  "passo 3 de 4" custa nada e reduz abandono.
- Contador e lote de desconto dentro do cadastro de trial são pressão de
  urgência. A pessoa ainda nem viu o produto. Padrão escuro leve. Confirmar
  com o time se é teste A/B ou padrão permanente.
- Emoji no texto de apoio é escolha de tom. Para advogado em dia de prazo,
  pode soar leve demais. Hipótese fraca, depende de entrevista com usuário.

### 04. Senha

Print: `04-cadastro-senha.png`.

Fato:

- Último passo. Cinco regras de senha em chips verdes, cada uma com
  marca de check conforme a regra é atendida.
- Título com emoji: "Falta pouco para começar a usar o Astrea! 😊".
- Botão "Voltar" com anel de foco preto, padrão do navegador, diferente
  da cor da marca.
- Botão primário "Iniciar teste grátis".

Hipótese:

- Os chips de regra de senha são um bom padrão: feedback imediato, sem
  mensagem de erro depois do envio. Vale levar para o DS como componente de
  regra de campo com feedback em tempo real.
- O anel de foco padrão do navegador indica que não há token de foco. Se
  o produto logado repetir isso, vira item de acessibilidade na Q1.

## Onboarding dentro do produto

### 05. Definir objetivo

Print: `05-onboarding-objetivo.png`. URL `astrea.net.br/#/main/workspace/`.

Fato:

- Primeira tela depois do cadastro. Stepper de cinco passos, com rótulo em
  cada um: Criar conta, Definir objetivo, Buscar processos, Confirmar
  informações, Convidar usuário. Passo concluído em verde com check.
- Pergunta "O que você quer alcançar com o Astrea?" e quatro opções em
  cartão. Controlar financeiro, Organizar processos e prazos, Gerenciar
  tarefas do escritório, Acompanhar publicações. Ícone em caixa cinza à
  esquerda de cada opção.
- Botão "Continuar" em caixa alta, cinza, desabilitado até escolher.
- Tipografia diferente da do cadastro do site. Cor de progresso verde, e
  não o azul do site.
- Escolha feita para o teste: Gerenciar tarefas do escritório, que é o
  recorte do enunciado.

Hipótese:

- Dois padrões de progresso em sequência: barra azul sem rótulo no site,
  stepper verde com rótulo no produto. Mesma jornada, duas linguagens. É o
  primeiro sinal concreto da fronteira entre times de que o briefing fala.
- O stepper com rótulo é o padrão melhor dos dois. Candidato a padrão
  único de progresso no DS.
- A escolha de objetivo sugere personalização do onboarding. Vale ver se a
  tela inicial muda de acordo com a opção. Se não muda, a pergunta é
  levantamento de marketing disfarçado de personalização.

### 06. Objetivo definido

Print: não guardado. A imagem veio no chat sem arquivo. Recapturar.

Fato:

- Tela de confirmação depois de escolher o objetivo. Ilustração de alvo e
  título "Objetivo definido!". Abaixo, a frase "O Astrea tem tudo o que
  você precisa para gerenciar tarefas do escritório". O objetivo em azul.
- Caixa "No Astrea você conta com:" e quatro itens com check azul. Quadros
  Kanban por etapa. Lembretes automáticos de prazos. Delegação de tarefas
  com controle de responsáveis. Visão geral de produtividade da equipe.
- Botão "Continuar" azul, em caixa alta, largura total. Link "Voltar à tela
  anterior" em caixa alta, cinza.
- O stepper continua em "Definir objetivo". A confirmação é uma tela a
  mais dentro do mesmo passo.

Hipótese:

- Tela que só confirma e lista promessas, sem ação do usuário, é um passo a
  mais antes do produto. Em onboarding de cinco passos, custa atenção. Hipótese de corte, a verificar com taxa de abandono por passo.
- Os quatro itens listados são a promessa pública da gestão de atividades.
  Vale verificar, tela a tela, se o produto cumpre cada um. Em especial a
  "visão geral de produtividade da equipe".
- Botões em caixa alta aqui, em caixa baixa no cadastro do site. Mais uma
  divergência de padrão na mesma jornada.

### 07. Buscar processos pela OAB

Print: `06-onboarding-buscar-processos.png`.

Fato:

- Terceiro passo do stepper. Cartão à esquerda com o título "Todos os seus
  processos no Astrea com apenas um clique". Dentro dele, campo de OAB,
  seletor de estado e botão "Buscar processos" em caixa alta.
- Os dois campos não têm rótulo visível. O valor ocupa o lugar do rótulo.
- Link "Por que informar a OAB?" com seta, dentro do cartão. À direita, a
  mesma pergunta já respondida, aberta, com três itens de check azul.
- Caixa cinza com escudo: "Este dado é protegido e usado somente para
  localizar processos públicos nos tribunais".
- Caixa "Dica: quem busca processos com a OAB começa a gerenciar
  processos 2x mais rápido". Sem fonte do número.
- Seletor de estado com anel de foco azul, cor da marca. No site, o anel
  era preto, padrão do navegador.

Hipótese:

- A explicação em dobro é sintoma de teste A/B ou de dois times mexendo na
  mesma tela. Um dos dois blocos sobra.
- Campo sem rótulo quebra quando preenchido: o usuário perde o nome do
  campo. Em formulário de duas entradas custa pouco, mas o padrão se repete
  no produto e vira item de acessibilidade.
- Dois estilos de foco na mesma jornada confirmam a ausência de token de
  foco. Entra na lista de verificação do produto logado.
- "2x mais rápido" sem fonte é copy de marketing dentro do produto. Vale
  perguntar ao time se o dado existe.

### 08. Confirmar informações

Print: não guardado. A imagem veio no chat sem arquivo. Recapturar.

Fato:

- Quarto passo. Título "Encontramos os processos! Este é o seu cadastro?".
- Cartão azul-claro com check, nome do advogado titular da OAB, inscrição
  58628, UF SC e tipo ADVOGADO. Botão "Confirmar" em caixa alta.
- Sem opção visível de "não sou eu" ou de corrigir a OAB. Só confirmar.
- O título diz que encontrou processos, mas não mostra quantos.

Hipótese:

- Quem errou a OAB não tem saída nessa tela além do botão voltar do
  navegador. Falta o caminho de erro.
- "Encontramos os processos" sem número é promessa sem prova. Mostrar a
  contagem aqui aumentaria a confiança antes de confirmar.
- A tela exibe dado público de terceiro, nome e inscrição, para qualquer
  OAB digitada. É assim que o registro da OAB funciona, mas vale registrar.

### 09. Convidar usuário

Print: não guardado. A imagem veio no chat sem arquivo. Recapturar.

Fato:

- Quinto e último passo. Título "Faça fluir a colaboração em equipe".
  Texto de apoio fala em compartilhar "atendimentos, tarefas, agendas e
  vitórias".
- Um campo de e-mail, sem rótulo visível, com placeholder "E-mail". Botão
  "Enviar convite" em caixa alta. Link "Continuar sem convidar" em cinza.
- Nota: "Você pode convidar mais usuários e configurar as permissões de
  acesso de cada usuário na página de Administração".

Hipótese:

- Convidar antes de ver o produto é cedo. A pessoa ainda não sabe o que
  vai mostrar ao colega. Hipótese de mover o convite para dentro do
  produto, depois da primeira atividade criada.
- O campo sem rótulo repete o padrão da tela 07.

### 10. Tudo pronto

Print: `07-onboarding-tudo-pronto.png`.

Fato:

- Título "Tudo pronto! Sua conta está configurada." com ilustração de
  check azul.
- Dois cartões de texto. O primeiro retoma o objetivo escolhido: "O Astrea
  é perfeito para gerenciar tarefas. Quadros Kanban e lembretes
  automáticos". O segundo informa o limite do trial: até 40 processos
  vinculados ao tribunal.
- Botão único "Abrir tarefas", em caixa alta. O destino muda conforme o
  objetivo escolhido na tela 05.
- O stepper ainda mostra "Convidar usuário" sem check, embora a tela diga
  que tudo está pronto.

Hipótese:

- A personalização existe. O objetivo da tela 05 muda o texto e o destino
  de entrada. A hipótese de "levantamento disfarçado" cai. Resta ver se a
  tela inicial do produto também muda.
- Stepper incompleto em tela de conclusão é bug visual pequeno, mas na
  última tela do funil. Quem pulou o convite vê um passo em aberto.
- O limite de 40 processos aparece só aqui, no fim. Quem tem mil
  processos descobre o teto depois de buscar pela OAB. Vale avisar antes.

## Produto logado

### 11. Área de trabalho, estado vazio

Print: `08-area-de-trabalho-vazia.png`. Primeira tela depois do onboarding,
destino do botão "Abrir tarefas".

Fato, moldura:

- Faixa de marketing "Novembro Black" no topo do produto logado. Tem
  contador "Termina em 2 dias", botão "Quero aproveitar" e um X.
<!-- lint-ignore: deriva-terminologica — "Pesquisar" é o texto literal do campo -->
- Cabeçalho: logo, busca global com o texto "Pesquisar contato, processo
  ou tarefa", e cinco ícones sem rótulo. IA em destaque, mais, nuvem,
  relógio, engrenagem. À direita, nome do usuário, selo "1 ano grátis" e
  botão verde "Contratar". Três chamadas comerciais na mesma linha.
- Menu lateral com dez itens e ícone. Área de trabalho, Agenda, Contatos,
  Atendimentos, Processos e casos. Publicações, Financeiro, Documentos,
  Indicadores, Alertas. Abaixo de um divisor, "Conheça as IAs" em roxo
  com fundo lilás, e Suporte.
- Não existe item "Kanban" no menu. Ele deve ser uma visão dentro de
  Área de trabalho ou de Agenda. A confirmar.

Fato, conteúdo:

- Título "Área de trabalho". Estado vazio com o título "Comece adicionando
  suas tarefas" e uma caixa cinza com quatro passos numerados. Abaixo,
  botão primário "Adicionar primeira tarefa" em caixa alta e link "Saiba
  mais".
- Coluna direita com três widgets, cada um com "Ocultar" e um botão de
  mais. Processos e casos tem seletor nativo "Últimos 30 dias" e duas
  linhas: "4 não tiveram movimentação", "0 tiveram movimentação".
  Estatísticas tem seis números em azul. Lembretes mostra "HOJE".
- A OAB trouxe 4 processos. O número que faltava na tela 08 está aqui.
- O produto fala "tarefa". O enunciado e o menu falam "atividade" e
  "Agenda". Dois nomes para o mesmo objeto, a confirmar na criação.

Hipótese:

- A moldura já carrega três chamadas comerciais e uma faixa de campanha.
  Para quem vive no produto o dia inteiro, é ruído permanente. Entra como
  problema de hierarquia na Q1.
- IA com cor própria, roxo, e ícone de brilho. O briefing pede que IA
  nasça no mesmo padrão. Aqui ela nasce com paleta à parte.
- Azul usado para link, para número de estatística e para botão. Quando
  tudo é azul, nada parece clicável. Problema de affordance.
- Seletor nativo do navegador ao lado de componentes customizados. Sinal
  de componente faltando na biblioteca.
- Cores de botão, divisor e fundo batem com a paleta padrão do Mantine
  (`#228be6`, `#dee2e6`, `#f1f3f4`). Inferência: o front novo usa Mantine
  sem tema próprio. Se confirmar, o token semântico entra por cima do tema
  do Mantine, e o custo cai.

### 12. Contato, detalhe

Print: `09-contato-detalhe.png`. URL `#/main/contacts/detail/<id>/data`.

Fato:

- Cabeçalho do registro: nome, "Criado em" e chip "TIPO: CLIENTE" em caixa
  alta. Ícones de lápis e lixeira sem rótulo. Link "Voltar" no canto.
- Oito abas: Cadastro, Documentos, Atendimentos, Processos, Despesas,
  Honorários, Timesheets, Notificações.
- Formulário em leitura: rótulos em caixa alta, alinhados à direita, e
  valor à esquerda da coluna seguinte. Quase todos os campos vazios e
  mostrados mesmo assim: nascimento, estado civil, CPF, RG, CTPS, PIS,
  título de eleitor.
- Foto de perfil como círculo cinza com ícone de câmera.

Hipótese:

- Tela de leitura que mostra vinte campos vazios é formulário disfarçado.
  Quem lê quer o que existe. Campo vazio vira ruído e empurra o conteúdo
  real para baixo.
- Rótulo em caixa alta alinhado à direita é o terceiro padrão de rótulo
  do produto. Os outros dois: rótulo acima e placeholder.
- Felipe aponta esta tela como candidata a melhoria. Entra no backlog.

### 13. Agenda, estado vazio

Print: `11-agenda-vazia.png`. URL `#/main/calendar`.

Fato:

- Ilustração grande no centro e título "Gerencie todas as atividades do
  seu escritório". Texto de apoio, botão "Adicionar atividade" com seta
  de menu e link "Saiba mais".
- Aqui a palavra é "atividade". Na Área de trabalho era "tarefa".
- Nenhum calendário visível no estado vazio. A grade só aparece depois
  da primeira atividade, nas telas 17 a 20.

Hipótese:

- Estado vazio que esconde a estrutura da tela não ensina a tela. Mostrar
  a grade vazia com o convite dentro dela orienta melhor.
- Felipe propõe: calendário já visível, lista de prioridades por prazo a
  vencer, filtros de dia, semana e mês. Entra no backlog.

### 14. Modal adicionar tarefa

Print: `12-modal-adicionar-tarefa.png`.

Fato:

- Título "Adicionar tarefa", link "Adicionar etiqueta" em caixa alta no
  canto. Seis campos. Descrição da tarefa, obrigatório, em área de texto.
  Data, com calendário e link "Adicionar recorrência". Lista de tarefas,
  obrigatório. Processo, caso ou atendimento, por busca. Responsável,
  obrigatório, por busca, com link "Envolver mais pessoas". Prioridade,
  obrigatório, Baixa por padrão.
- Rótulos acima dos campos. Asterisco vermelho nos obrigatórios. Botões
  "Cancelar" e "Salvar" como texto em caixa alta.
- O botão da Agenda diz "atividade" e o modal diz "tarefa". Tarefa é um
  dos tipos de atividade, segundo o levantamento público.
- A descrição é o único campo de texto. Não existe título separado.

Hipótese:

- Descrição como único texto livre vira título longo no card. Separar
  título curto de descrição ajuda o Kanban.
- Felipe propõe etiquetas sugeridas a partir do histórico de descrições.
  Entra no backlog como padrão de IA.
- Quatro campos obrigatórios para uma tarefa simples é atrito. Lista de
  tarefas obrigatória com um só valor padrão é o caso mais claro.

### 15. Data no passado

Prints: `13-modal-data-passada.png`, `15-dialogo-data-no-passado.png`.

Fato:

- O campo Data aceita 01/10/2026, anterior ao dia do teste. Ao salvar,
  abre o diálogo "Data no passado. A data selecionada já passou. Você
  deseja continuar mesmo assim?", com Cancelar e Continuar.

Hipótese:

- O produto permite registrar atividade retroativa, com confirmação. O
  padrão é defensável: escritório registra o que já fez. O que falta é o
  motivo no próprio diálogo e a opção de já marcar como concluída.
- Felipe pergunta se pode começar antes e qual a prioridade dessa
  informação. Resposta a buscar com suporte: quantas atividades nascem
  com data passada e por quê.

### 16. Envolver mais pessoas

Print: `14-modal-envolver-pessoas.png`.

Fato:

- Popover sobre o modal, com busca "Encontre alguém", lista "Pessoas" com
  caixa de seleção e botão "Confirmar" em caixa alta. Um só usuário no
  trial.
- A Lista de tarefas aceitou "Teste tarefas 1" e o processo ligou a um
  caso real da OAB consultada.

Hipótese:

- Popover dentro de modal é camada sobre camada. Um seletor de pessoas
  com chips no próprio campo resolve sem a segunda camada.
- Felipe propõe reaproveitar o componente de participantes que ele já
  tem, com avatares e um botão de mais. Referência em
  `referencias/modal-tarefa-crm.png`.

### 17 a 20. Agenda com visões

Prints: `16-agenda-por-dia.png`, `17-agenda-em-lista.png`,
`18-agenda-por-semana.png`, `19-agenda-por-mes.png`.

Fato:

- Depois da primeira tarefa, a Agenda ganha barra de filtros em caixa
  alta. Visão com quatro opções: Por dia, Em lista, Por semana, Por mês.
  Depois Minhas atribuições, Todas as atividades, etiqueta e busca.
  Ícones de atualizar, menu e mais no canto.
- Por dia: grade de horas a partir das 19h, linha do horário atual, e
  painel "Nenhuma atividade" à direita. A tarefa criada não aparece.
- Em lista: linha "Nenhuma atividade" com caixa de seleção e ilustração
  de busca vazia. Painel lateral "Tarefas sem data e a con..." truncado.
- Por semana e por mês: grade com células altas, fonte grande, sete dias
  por linha. O mês mostra duas semanas por tela de 1920 por 960.
- Toast verde "A tarefa foi adicionada" no canto inferior esquerdo.

Hipótese:

- A tarefa foi salva e não aparece em nenhuma visão do dia. Ou o filtro
  "Minhas atribuições" esconde, ou a data retroativa a tirou da tela.
  Bug ou confusão de filtro, a confirmar.
- Densidade baixa: a grade do mês cabe duas semanas por tela. Quem
  precisa ver o mês para planejar prazo não vê o mês. Felipe aponta
  fonte e células grandes demais. Entra no backlog como densidade.
- Quatro visões em um seletor, mais uma lista sem data num painel
  lateral truncado. A informação de prazo está espalhada.

### Pendente

Kanban: ainda não encontrado no menu nem na Agenda. Buscar no seletor
de visão da Agenda ou na Área de trabalho com tarefas.
