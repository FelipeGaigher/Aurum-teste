# Processo de desenvolvimento do teste

Diário do que aconteceu enquanto a atividade era feita. Serve de fonte para
o parágrafo de uso de IA e para a conversa da Parte B. Uma entrada por fato,
com data. O que foi entregue fica no commit, não aqui.

## 2026-11-07

### O trial não abria

- O formulário em `aurum.com.br/experimente-o-astrea/` deixava o botão
  "Continuar" cinza, sem mensagem, depois de nome e e-mail preenchidos.
- Causa, pelo console e pelo Network. As extensões uBlock e AdGuard barraram
  `oaiq.min.js` e `fbevents.js`. A ferramenta de consentimento AdOpt recusou
  o script de teste A/B enquanto o banner de cookies não era aceito. O botão
  depende desses scripts.
- Solução: janela anônima, sem extensão, aceitar o banner. O cadastro seguiu
  para a pergunta "Quantos processos você acompanha?".
- Achado para a Q1: o funil de entrada depende de script de terceiro e não
  tem estado de erro. Com bloqueador, o usuário vê um botão morto e nenhuma
  pista. Evidência: os prints na página Extra do Figma.
- Consequência para a Q3: o acesso ao produto voltou. A tela escolhida pode
  partir do Astrea real, e não só de material público.
- O enunciado cita telefone no cadastro e a primeira tela pede e-mail. O
  telefone existe, no quarto passo. A divergência é de ordem, não de campo.
  Registro corrigido depois de ver o passo seguinte.
- As telas do cadastro e, depois, do produto ficam em
  `01-telas-observadas.md`, com os prints em `evidencias/`.

### Os slides passam a nascer em HTML

- Montar os seis slides da Q2 direto no Figma foi lento. Cada slide pedia
  variáveis e conferência por screenshot.
- Decisão: os slides nascem em HTML, um arquivo só, com as medidas do frame
  de 1920 por 1080. Eles viram PNG e entram no Figma fechados.

### Direção visual

- A primeira paleta proposta pelo modelo, creme com serifa e terracota, é a
  cara padrão de deck gerado por IA. Trocada por papel branco, tinta azul de
  caneta e vermelho só no carimbo de decisão. Raio único de 4px. Número só
  onde a ordem é real.
- A tese "um DS usado por pessoas e por IA" era interpretação e saiu do
  título do slide 1. O título passou a responder a pergunta da banca ao pé
  da letra.

### Estrutura da Q2

- Cada slide traz no cabeçalho o item e a pergunta literal do enunciado. O
  título é a resposta em uma frase. A governança ocupa dois slides: um para
  Figma e código alinhados, outro para quem decide, contribui e veta.
- Quatro fluxogramas. Slide 1, as camadas. Slide 2, a fonte única e seus
  consumidores. Slide 3, a estrutura do time. Slide 5, do discovery ao
  componente.

### Leitura do produto pelo Claude in Chrome

- Com o trial aberto no Chrome de Felipe, o snippet de console rodou no
  produto logado. Achado: 646 variáveis CSS, 609 com prefixo
  `--nectar-legacy-`. A Aurum tem um DS legado em código, o Nectar.
- Fonte real: `museo-sans`, peso 300 no corpo. Primário `#228BE6`. Raio 8.
- A hipótese do Mantine caiu. Os valores coincidem, a origem não.
- Decisão de Felipe no mesmo dia: o protótipo segue o visual atual do
  Astrea. Logo, navbar e sidebar iguais, sem tema escuro, raio 8. A
  direção visual própria do protótipo foi descartada.
- Decisão de Felipe: cadastro, onboarding e Contatos saem da Q1. A Q1 fica
  só na gestão de atividades. O resto vive no backlog para a Parte B.
- Um subagente varre o produto inteiro pelo Chrome, só leitura, e grava
  `01-inventario-css-astrea.md` e `referencias/nectar-tokens.json`.

### Pesquisa do produto

- Enquanto o trial não abria, um subagente pesquisou o Astrea em fontes
  públicas. Site da Aurum, central de ajuda, lojas de app e avaliações. O
  resultado vai em `03-pesquisa-astrea.md`. Ele segue útil para a Q3 mesmo
  com o acesso recuperado.

### Os slides da Q3 e a exportação sem o MCP

- A Q3 tinha protótipo, página de componentes e documento-fonte, mas não
  tinha slides. O deck nasceu em `03-slides-q3.html`, no molde das
  Questões 1 e 2: um frame da tela e três páginas.
- Os componentes aparecem ao vivo no slide, com os tokens do protótipo,
  e não como imagem. O slide da decisão difícil mostra o mesmo card nas
  duas ordens, título primeiro e prazo primeiro, lado a lado.
- Caminho para o Figma sem o MCP: `scripts/exportar-slides.js` abre cada
  deck no Chrome da máquina, pelo Playwright. Cada frame vira um PNG de
  1920 por 1080 em `slides/`. O Figma recebe os 16 PNG por arrastar.
- As fontes Fraunces e Geist não estão instaladas na máquina. O script
  injeta o Google Fonts só na hora da exportação. O HTML continua sem CDN,
  e aberto direto no navegador cai em Georgia e Segoe UI.
- O Playwright do MCP já estava no cache do npx, mas o navegador que ele
  pedia não. A saída foi o canal `chrome`, que usa o Chrome instalado.
- Divergência achada: `03-componentes.html` ainda usa corpo 14px e
  controle 40px. O protótipo commitado usa 13px e 36px. O deck da Q3
  seguiu o protótipo, que é a tela. A página de componentes fica para
  alinhar.
- Dois terminais trabalharam no mesmo repositório ao mesmo tempo. O
  Kanban mudou duas vezes durante a montagem do deck. A captura da tela
  foi refeita depois do último commit. Regra que ficou: capturar só com a
  árvore limpa.

### O plano dentro do Kanban, corrigido duas vezes

- Dezoito cards era demais. Viraram oito histórias com subtarefas, como
  no Jira da Fotus: a história é o card, a entrega é a subtarefa.
- Primeira versão errou a estrutura: as colunas eram as fases, e cada
  card dizia "fazendo" ou "a fazer" num canto. Felipe apontou: coluna de
  Kanban é situação, não fase. As colunas voltaram a ser A fazer, Fazendo
  e Concluído, as mesmas do escritório. A fase virou tag no card e filtro.
- O detalhe da história ganhou tags com rótulo e valor. As subtarefas
  foram para uma coluna ao lado, em acordeão fechado, para caber sem
  rolar.
- Felipe pediu o protótipo responsivo. No tablet, as colunas ganham
  largura fixa e o quadro rola na horizontal com encaixe. No celular, o
  menu fica só com ícones, o cabeçalho enxuga e cabe uma coluna por tela.
- Felipe pediu o board como o da Fotus no Jira, com sete colunas e
  rolagem lateral. As colunas: Backlog, Pesquisa, Desenvolvimento,
  Validação, Impedimento e ajustes, Pronto para deploy e Em produção. E
  uma lista de sprints: o quadro abre na sprint atual, a 2 de 24, e o
  filtro lista todas. Fora da sprint, a história não aparece, como no Jira.
- Felipe pediu tema escuro de volta. O Astrea não tem um, então a paleta
  é proposta. Superfície mais clara que a página, ação em azul claro com
  texto escuro, vencido e hoje em tons claros. Cada par medido no AA com o
  `contraste.py` da skill. Segue o sistema e a chave do cabeçalho vence.
- Dois retoques de Felipe no detalhe. A seta do acordeão alinhada ao
  título da subtarefa, em grade de três colunas. O clique fora do diálogo
  fecha e devolve o foco ao quadro.
- Felipe pediu um botão na subtarefa para ver ou concluir. O botão Ver
  abre a subtarefa num painel por cima da história, com trilha, tags,
  deveres e equipes. Concluir marca feita e atualiza o card e o detalhe.
  Reabrir desfaz. O foco volta ao Ver da mesma subtarefa ao fechar.
- Felipe barrou o painel sobre painel: "não se faz modal sobre modal". O
  botão Ver saiu. As ações da subtarefa ficaram no card aberto, em três
  ícones: olho, check e balão. O olho troca a vista do mesmo painel para
  a subtarefa inteira, com volta à história, como o Jira faz. O check
  conclui e reabre. O balão abre o campo de comentário, em memória.
- Um bug meu no caminho: `display: grid` na classe vencia o atributo
  `hidden`, e o campo de comentário aparecia antes da hora. Regra global
  `[hidden] { display: none !important; }` resolveu.
- Felipe pediu o item do Kanban num grupo "Especialista UX/UI" no topo do
  menu, como os grupos da Náutica. E a sidebar abraçando o conteúdo. A
  largura caiu de 260px para 200px, a do item "Processos e casos" com
  8px de folga. A 192px o item quebrava em duas linhas.

### O plano conferido contra as questões

- Felipe perguntou se o plano do Kanban estava de acordo com as questões.
  Comparei histórias e subtarefas com os slides 1, 4, 5 e 6 da Q2. E com
  os cinco problemas da Q1. Fases, ordem de construção e mitigações batiam.
  Sete divergências, aplicadas com o ok dele:
- Dono por squad contrariava a decisão de que a divisão sai do discovery.
  As frentes transversais passaram a dono por perfil do mapa: forte em
  Figma, perto do código, perto do usuário. O squad só fica quando a
  entrega é o módulo do próprio roadmap.
- A Q1 pedia validação de hipóteses antes de seguir e a fase 1 não a
  tinha. Subtarefa nova na história 1. O P3 da Q1, criar atividade sem
  interromper, não tinha entrega. Subtarefa nova na história 6.
- O aviso dentro do produto entrou no piloto. Os líderes entraram no
  discovery, acordando o tempo. Os agentes gerador e de handoff entraram
  na entrega de Code Connect. O relatório trimestral ganhou a sprint 6.

## 2026-11-08

### Os decks entraram no Figma pelo Chrome

- No dia seguinte os PNG entraram pelo Claude in Chrome, com o arquivo do
  Figma aberto na aba.
- O Figma na web não tem campo de arquivo no DOM. O diálogo nativo de
  "Place image" não dá para operar. A saída foi criar um campo de arquivo
  na página e preencher pela extensão. Depois, um evento de drop sintético
  no canvas, com os mesmos arquivos. O Figma aceitou e criou as imagens.
- Baixar os PNG de um servidor local falhou de dentro da página. O
  navegador barra a rede local a partir de site público. Por isso os
  bytes entram pela extensão, nunca pela rede.
- Os cinco slides da Questão 1 viraram um frame com auto layout vertical.
  Os sete da Questão 2 entraram abaixo dos seis frames nativos de ontem,
  numa linha. A banca vê os dois, e a escolha de apagar os nativos é de
  Felipe.
- O arquivo tinha três páginas. A Questão 3 ficou na página Extra,
  renomeada para "Questão 3 e extras", à direita dos prints do cadastro
  bloqueado.

### O documento único de entrega

- O enunciado pede um link só. O `index.html` da raiz é esse link, servido
  pelo GitHub Pages. Ele aponta para cada frame do Figma, para o protótipo
  e para o repositório, e traz o parágrafo de IA.
- Um subagente escreveu o documento a partir dos arquivos-fonte, no visual
  dos decks. Os links do Figma entraram depois, com o id de cada frame.
- Pendências para o link funcionar: enviar os commits ao GitHub e ligar o
  Pages na branch main. O compartilhamento do Figma ainda está restrito ao
  time, e precisa virar "qualquer pessoa com o link pode ver".

### O Figma vira a porta de entrada

- Às 14h15 Felipe decidiu pagar o plano do Figma. A Aurum exige documentar
  e apresentar lá, e o arquivo precisa reunir todos os links da entrega.
- Antes do arquivo novo, o trabalho seguiu fora do Figma: plano das oito
  páginas em `docs/plans/2026-11-08-figma-entrega.md` e texto do briefing
  em `referencias/figma-briefing.md`.
- Felipe criou o arquivo novo no time "Felipe Gaigher" às 14h20. O arquivo
  antigo fica como está.
- O arquivo novo nasceu com oito páginas: capa, briefing, uma por questão,
  design system, protótipo e extras. Os 16 PNG dos decks e os dois prints
  do cadastro entraram pelo `upload_assets`, com `curl`. A capa e o
  briefing nasceram pelo `use_figma`, em Fraunces e Geist, com os links
  como hyperlink no texto.
- A API de plugin não define miniatura nem renomeia o arquivo. Os dois
  ficam manuais, no menu de contexto da capa.
- O `capturar-figma.js` não encerra depois do envio: a promessa do
  `captureForDesign` fica pendente. A captura chega ao Figma, mas o
  processo segue vivo e trava o próximo passo de um script sequencial.
  Duas capturas em fila ficaram paradas por dez minutos por isso. Regra:
  uma captura por processo, em paralelo, com `timeout`.
- Felipe pediu a página do protótipo dividida por fluxo, e não por tela.
  Os estados entram pela URL do protótipo: `?criar=prazo`, `?ficha=`,
  `?adicionar`. Dez capturas em paralelo, cada uma com porta própria.
- Às 16h40 o ajuste fino do protótipo fechou. As doze telas do Figma
  foram capturadas de novo. São os dez estados da página Protótipo, a
  Área de trabalho da Questão 3 e o design system. A captura entra como
  nó novo. Cada quadro antigo foi apagado, e o novo assumiu a posição e
  o nome dele. As seções cresceram para caber a ficha do
  processo e o cadastro, que ficaram mais altos.
- Felipe reprovou os prints anotados do deck da Questão 1: "parece um
  paint". O deck foi refeito no molde da Questão 2. Um problema por
  slide, texto à esquerda e evidência desenhada à direita. Dois números
  do brief saíram por não existirem nas fontes.
