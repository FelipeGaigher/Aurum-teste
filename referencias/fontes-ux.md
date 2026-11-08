# Fontes de UX para as cinco decisões

Levantamento feito em 2026-11-07. Marcação: [verificado] = página aberta e lida. [não aberto] = só apareceu em busca ou o arquivo não pôde ser lido.

## 1. Criar etiqueta sem sair do fluxo (modal ou painel lateral)

- **Modal & Nonmodal Dialogs: When (& When Not) to Use Them** [verificado]. Therese Fessenden, Nielsen Norman Group, 2017. https://www.nngroup.com/articles/modal-nonmodal-dialog/
  Modal interrompe, adiciona carga cognitiva e custa tempo para retomar a tarefa. Serve a ações críticas ou irreversíveis. Não serve a decisão que precisa de outra informação na tela.
- **Data Tables: Four Major User Tasks** [verificado]. Page Laubheimer, Nielsen Norman Group, 2022. https://www.nngroup.com/articles/data-tables/
  Para ver, editar ou adicionar um registro, o modal esconde as linhas vizinhas que o usuário consulta. Painel lateral não modal é geralmente preferível.
<!-- lint-ignore: frase-longa — título em inglês e URL contam como palavras -->
- **Modal vs. Separate Page: UX Decision Tree** [verificado]. Vitaly Friedman, Smashing Magazine, 2026. https://shop.smashingmagazine.com/2026/03/modal-separate-page-ux-decision-tree/
  A maior vantagem do modal é manter o contexto da tela de origem, inclusive o que o usuário já digitou. Para tarefas longas em várias etapas, a página própria serve melhor.
- **The cost of interrupted work: more speed and stress** [não aberto]. Gloria Mark, Daniela Gudith, Ulrich Klocke, CHI 2008. https://www.ics.uci.edu/~gmark/chi08-mark.pdf
  O resumo da busca diz que trabalho interrompido gera mais estresse, frustração e esforço. O PDF não pôde ser lido aqui.

Lacuna: não achei fonte aberta com taxa de abandono de formulário por navegação para outra tela. O argumento de abandono fica sem número citável.

## 2. Largura do campo e grade de larguras

- **Form Field Usability: Matching User Expectations** [verificado]. Jamie Holst, Baymard Institute, 2010. https://baymard.com/blog/form-field-usability-matching-user-expectations
  A largura deve refletir o tamanho esperado da entrada, não o layout da página. Campos de tamanho fixo recebem largura exata. Campos de média normal (nome, e-mail) dividem uma largura padrão. Campos atípicos (CEP) recebem largura própria.
- **Text input** [verificado]. GOV.UK Design System, Government Digital Service. https://design-system.service.gov.uk/components/text-input/
  Use largura fixa para conteúdo de tamanho conhecido, como CEP ou telefone. As classes seguem uma escala fixa (width-20, 10, 5, 4, 3, 2). Larguras fluidas existem para o restante.

Duas fontes bastam e se complementam: Baymard dá a regra, GOV.UK dá a escala de larguras pronta.

## 3. Botão de ação primária em formulário longo

- **Primary & Secondary Actions in Web Forms** [verificado]. Luke Wroblewski, 2007. https://www.lukew.com/ff/entry.asp?571
  No teste, os três melhores desenhos alinham Enviar e Cancelar à esquerda, sob campos alinhados à esquerda. O pior fez seis participantes clicarem em Cancelar por engano e custou cerca de seis segundos.
- **Button** [verificado]. GOV.UK Design System. https://design-system.service.gov.uk/components/button/
  Alinhe o botão primário à borda esquerda do formulário.
- **Question pages** [verificado]. GOV.UK Design System. https://design-system.service.gov.uk/patterns/question-pages/
  O botão Continuar fica alinhado à esquerda para o usuário não perdê-lo.

Lacuna: não achei estudo rigoroso sobre barra de ações fixa no rodapé. A busca devolveu só guias de design system e blogs sem estudo citável. Não use essas fontes como prova. A decisão de barra fixa precisa de teste próprio ou deve ser apresentada como julgamento de design.

## 4. Toast e notificação de status

- **Indicators, Validations, and Notifications** [verificado]. Kim Flaherty, Nielsen Norman Group, 2024. https://www.nngroup.com/articles/indicators-validations-notifications/
  Toast é um popup pequeno que some em poucos segundos e serve a avisos passivos. É má escolha para erro: uma usuária perdeu a mensagem que sumiu em cinco segundos e esperou cinco minutos.
- **Defining "Toast" Messages** [verificado]. Adrian Roselli, 2020, atualizado em 2026. https://adrianroselli.com/2020/01/defining-toast-messages.html
  Toast que some sozinho esbarra no WCAG 2.2.1 se o usuário não pode estender o tempo. Use `status` ou `log` (polite) ou `alert` (assertive). A região viva precisa existir quando a página carrega. Informação importante pede região persistente. É posição do autor, não norma.
- **Understanding SC 4.1.3: Status Messages** [verificado]. W3C WAI, WCAG 2.2. https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html
  Mensagem de status deve ser anunciada por tecnologia assistiva sem receber foco.
- **ARIA22: Using role=status** [verificado]. W3C WAI, WCAG 2.2. https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22
  `role="status"` implica `aria-live="polite"`. Declare `aria-atomic="true"` de forma explícita.

Lacuna: não achei estudo controlado sobre duração ideal. Os valores de 5 a 10 segundos vêm de design systems de fornecedores e divergem entre si. Não os cite como estudo.

## 5. Tabela versus cards

- **Data Tables: Four Major User Tasks** [verificado]. Page Laubheimer, Nielsen Norman Group, 2022. https://www.nngroup.com/articles/data-tables/
  Tabela serve a conjuntos grandes e multivariados e permite comparar valores adjacentes sem apoiar-se na memória. Cabeçalho congelado, zebra e destaque ao passar o mouse ajudam a manter o lugar.
- **Cards: UI-Component Definition** [verificado]. Page Laubheimer, Nielsen Norman Group, 2016. https://www.nngroup.com/articles/cards-component/
  Cards funcionam para itens heterogêneos e navegação exploratória. Lista serve a busca por item específico e comparação, pela posição previsível.
- **Card View vs. List View (vídeo)** [verificado]. Megan Chan, Nielsen Norman Group, 2025. https://www.nngroup.com/videos/card-view-vs-list-view/
  Lista serve a conteúdo que se ordena e usa bem o espaço. Cards servem quando o apelo visual importa e itens relacionados se agrupam.

Nota: o artigo de tabelas não trata de cards. A frase de que cards exigem reorientação espacial veio de um resumo de busca, não de leitura do texto. Não a cite como afirmação do artigo.
