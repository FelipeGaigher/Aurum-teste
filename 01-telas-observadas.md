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
  validação em tempo real.
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
  mais antes do produto. Em onboarding de cinco passos, custa atenção. Hipótese de corte, a validar com taxa de abandono por passo.
- Os quatro itens listados são a promessa pública da gestão de atividades.
  Vale conferir, tela a tela, se o produto cumpre cada um. Em especial a
  "visão geral de produtividade da equipe".
- Botões em caixa alta aqui, em caixa baixa no cadastro do site. Mais uma
  divergência de padrão na mesma jornada.

## Produto logado

Sem tela ainda. Próximas: Área de Trabalho, Agenda, Kanban, criar
atividade com todos os campos abertos, e a navegação entre módulos.
