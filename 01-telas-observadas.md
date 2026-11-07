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

Próximas telas: Agenda e Kanban. Criar atividade com todos os campos
abertos. Detalhe de uma atividade. A troca para Processos e casos.
