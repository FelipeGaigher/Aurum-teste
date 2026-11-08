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

### O MCP do Figma bateu a cota

- O plano Starter do Figma limita as chamadas do MCP. Montar os seis slides
  da Q2 com variáveis e conferir por screenshot gastou a cota do dia.
- Decisão: os slides passam a nascer em HTML, um arquivo só, com as medidas
  do frame de 1920 por 1080. O Figma recebe a versão fechada, à mão ou pelo
  MCP quando a cota voltar.

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
