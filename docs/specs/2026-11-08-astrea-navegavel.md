<!-- gerado de docs/specs/2026-11-08-astrea-navegavel.html
     sha256 da fonte: d878c611936e9362
     em: 2026-11-08T12:03
     NAO ESCREVA NESTE ARQUIVO. Altere o HTML e regenere. -->

# Astrea navegável com design system — contrato de máquina

## Objetivo

O protótipo em `prototipo/` passa a ser a plataforma inteira. O Kanban fica no topo do menu, e os módulos seguem o fluxo do Astrea. Um design system completo sustenta as telas.

## Restrições globais

- O alvo é a pasta `prototipo/`, mais `scripts/verificar-app.js`. O Figma fica fora.
- O protótipo não tem build e abre com dois cliques, por `file://`.
- Script usa tag `script` clássica. `type="module"` falha em `file://`.
- Toda tela usa apenas as peças do design system.
- Tokens, moldura e componentes moram em `astrea.css`, `moldura.js` e `componentes.js`.
- O Kanban mantém cópia própria de tokens e moldura. O verificador compara a cópia com os compartilhados.
- Fluxo, ordem de campos e nomes dos módulos seguem o Astrea.
- Entra o que reorganiza, padroniza ou destaca dado que já existe.
- Fica fora o que exige dado, serviço ou permissão nova.
- Ponto com destino `Validar` ou `Backlog` só entra com decisão na seção Decisões da spec HTML.
- Só entra tela com registro em `01-varredura-modulos.md` ou `01-inventario-css-astrea.md`.
- Dado do protótipo é sempre fictício. Reaproveite os do array `ATIVIDADES`.
- A lista de nomes reais mora fora do repositório. O script recebe o caminho por argumento e nunca copia o conteúdo.
- Cor literal só existe no bloco de primitivos. Vale para hex, `rgb` e `hsl`.
- Id de elemento não pode ter só letras de A a F, como `#add`. O verificador lê como hex.
- Controle de formulário não tem elemento nativo visível. Seletor, data, caixa e rádio têm teclado e ARIA.
- Criar atividade é um painel lateral único, sem modal sobre modal.
- Atividade é o termo geral, com os tipos tarefa, prazo, audiência e evento.
- Agente de GUI nunca abre janela visível. Use Playwright sem janela, canal `chrome`.
- O push não entra em nenhuma task.
- Caminho absoluto de máquina não entra em código nem em documento.

## Requisitos funcionais

### RF-01 — Navegação pelo menu

Cada item do menu abre a própria página, sem erro no console.

### RF-02 — Kanban preservado

No Kanban, `main` e os arrays `HISTORIAS` e `ATIVIDADES` ficam iguais ao commit `a150985`. As exceções são `h1` e `#rodape-demo`.

### RF-03 — Moldura estável

Em 1440px, cabeçalho e menu têm a mesma posição e o mesmo tamanho em todas as páginas.

### RF-04 — Item ativo

O item do módulo atual tem `aria-current="page"` e fundo diferente, sem o cursor sobre ele.

### RF-05 — Preferências persistem

Tema e menu recolhido persistem ao trocar de página, incluindo o Kanban.

### RF-06 — Design system completo

A página do design system mostra cada componente da tabela abaixo, com os estados declarados.

| Grupo | Peças |
|---|---|
| Fundamentos | Cor, tipografia, espaço, raio, sombra, foco, ícones, densidade, tema claro e escuro |
| Ações | Botão primário, secundário, texto, ícone e destrutivo; grupo de botões; menu de ações |
| Formulário | Campo, área de texto, busca, seletor, seletor múltiplo, seletor de pessoas, data, período, caixa, rádio, chave |
| Feedback | Toast, faixa de aviso, diálogo, tooltip, progresso, skeleton, estado vazio, upsell |
| Dados | Tag, chip de filtro, chip de prazo, selo, avatar, tabela, linha de atividade, card de atividade, card de contato, paginação |
| Navegação | Navbar, sidebar expandida e recolhida, abas, trilha, barra de filtros, painel lateral, barra de ações, stepper |

A matriz completa é default, hover, active, foco, disabled, erro, carregando e vazio. Cada componente mostra só os estados que existem para ele. A página declara o motivo das ausências.

| Componente | Propriedades |
|---|---|
| Card de atividade | `mostrarPrazo`, `mostrarProcesso`, `mostrarResponsavel`, `mostrarTags`, `titulo`, `tipo`, `estadoPrazo` |
| Linha de atividade | `mostrarProcesso`, `copiarNumero`, `responsavel`, `acoes`, `densidade` |
| Botão | `variante`, `tamanho`, `iconeEsquerda`, `iconeDireita`, `rotulo`, `carregando` |
| Campo | `rotulo`, `ajuda`, `obrigatorio`, `icone`, `largura`, `erro` |
| Item do menu | `icone`, `rotulo`, `selo`, `ativo`, `recolhido` |
| Toast | `tipo`, `mensagem`, `acao`, `fechar` |

### RF-07 — Sem controle nativo

Nenhuma página nova tem `select` ou `input` de data, caixa e rádio visível.

### RF-08 — Área de trabalho

A seção Atrasadas fica acima de Hoje. Os prazos ficam na área principal. O chip tem texto e cor. O filtro continua ao voltar. O número tem copiar.

### RF-09 — Agenda

A Agenda abre em Hoje, mostra a grade no estado vazio e o mês inteiro em 1440 por 900.

### RF-10 — Criar atividade

O painel abre uma camada só. Formulário vazio fecha sem confirmar. Data passada mostra aviso no próprio painel.

### RF-11 — Contatos

A lista alterna tabela e cards, com a escolha lembrada. A leitura não mostra campo vazio. A barra de ações fica fixa. A etiqueta nasce sem sair da página.

### RF-12 — Teclado e contraste

O teclado alcança todo controle. O painel fecha com Esc e o foco volta à origem. Texto e fundo passam no AA nos dois temas.

### RF-13 — Sem dado real

Nenhum arquivo em `prototipo/` contém nome de parte ou número de processo do trial.

### RF-14 — Portões estáticos

`verificar.py` e `detectar.py` passam em todos os arquivos novos, com cor só no bloco de primitivos.

### RF-15 — Sem rolagem lateral

Em 1024px e 700px nenhuma página tem rolagem horizontal fora de quadro e tabela.

## Defeitos conhecidos do protótipo

- `prototipo/verificar.py` rejeita `.css` e `.js`, e exige blocos de token em todo `.html`. Amplie antes da primeira página nova.
- Os itens do menu do Kanban usam `href="#"`. Aponte cada um para a página real.
- O rodapé do Kanban tem cinco rádios nativos, e não seis. Troque os cinco pelo rádio do design system.
- `scripts/capturar-kanban.js` usa `page.check` nos rádios nativos. Altere junto com o rodapé.
- O campo `#criar-prazo` do Kanban é `input type="date"`. RF-07 vale só para página nova, e o campo fica.
- O repositório não tem `node_modules`. O Playwright precisa de instalação antes do primeiro teste de navegador.

## Fontes

| Caminho | O que decide |
|---|---|
| `00-briefing.md` | enunciado e limites de cada questão |
| `01-pontos-de-atencao.md` | catálogo de 97 pontos, com princípio, severidade e destino |
| `01-varredura-modulos.md` | rotas, campos e fluxos de cada módulo, em 08/11 |
| `01-melhorias.md` | backlog M1 a M18 |
| `01-telas-observadas.md` | registro das telas 01 a 25 |
| `01-inventario-css-astrea.md` | módulos, CSS, tokens e componentes repetidos |
| `01-inventario-ui.md` | cores, componentes e vocabulário |
| `01-diagnostico.md` | cinco problemas, princípios e a Q1 |
| `01-pedidos-clientes.md` | compilado da planilha: 80 sugestões e 407 votos sobre a Área de trabalho |
| `02-plano-ds.md` | arquitetura, governança e fases do DS |
| `03-tela.md` | contrato da tela da Q3 e direção visual |
| `03-componentes.html` | cinco componentes com estados, a alinhar com o protótipo |
| `03-pesquisa-astrea.md` | levantamento do produto em fontes públicas |
| `prototipo/kanban.html` | tokens, moldura e quadro atuais |
| `prototipo/verificar.py` | portão estático do protótipo |
| `referencias/nectar-tokens.json` | os 609 tokens do Nectar |
| `referencias/fontes-ux.md` | fontes de UX, Nielsen e Gestalt |
| `referencias/padroes-fotus-nautica.md` | barra de ações, tabela e cards |
| `referencias/cockpit-nautica.md` | linha horizontal de leitura |
| `referencias/modal-tarefa-crm.png` | referência do seletor de participantes |
| `evidencias/` | prints das telas e capturas pelo Chrome |

## Critérios de aceite

- `python prototipo/test_verificar.py` sai com código 0.
- `python prototipo/verificar.py --todos --base-kanban --sincronia` sai com código 0. Cobre RF-02 e RF-14.
- `python prototipo/verificar.py --dados-reais <lista>` sai com código 0. Cobre RF-13 e nunca imprime termo da lista.
- `node scripts/verificar-app.js` sai com código 0. Cobre RF-01, RF-03 a RF-12 e RF-15.
- Lista com termo plantado em arquivo de teste gera achado. Lista limpa não gera achado.

RF-13 é critério negativo sobre conteúdo. Hoje a opção `--dados-reais` não existe, e o comando sai com código 1. A lista medida em 08/11 tem zero ocorrência em `prototipo/`, então nenhuma task precisa limpar arquivo.
