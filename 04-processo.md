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
- O enunciado pede telefone no cadastro, mas o formulário pede e-mail. Outro
  achado de consistência entre o que a empresa escreve e o que o produto faz.

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

### Pesquisa do produto

- Enquanto o trial não abria, um subagente pesquisou o Astrea em fontes
  públicas. Site da Aurum, central de ajuda, lojas de app e avaliações. O
  resultado vai em `03-pesquisa-astrea.md`. Ele segue útil para a Q3 mesmo
  com o acesso recuperado.
