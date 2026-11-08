# Arquivo do Figma como entrega — plano

Pedido de Felipe em 08/11 às 14h15. A Aurum exige documentar e apresentar no
Figma. O arquivo `pV95zDdtjirM8i3pDcOcuG` vira a porta de entrada da entrega,
com todos os links. Escopo em `docs/2026-11-08-escopo-entrega.md`.

## Restrições

- A cota do MCP no plano Starter está esgotada. O paywall aponta para o time
  "Felipe's Starter team", id `1558888538243403947`. É esse time que recebe o
  upgrade, com assento Full para Felipe. Hoje o assento dele lá é View.
- Até o upgrade, nenhuma task que escreve no Figma executa. As que preparam
  conteúdo fora dele executam agora.
- O prazo da Parte A é 16h. Antes dele entram só as Tasks 1, 2, 3, 4 e 8.
  As Tasks 5, 6 e 7 ficam para depois do envio do link.
- Dado real de parte ou processo nunca entra no arquivo. Os prints da pasta
  `evidencias/` já passaram pela limpeza.

## Estado atual do arquivo

| Página hoje | Conteúdo | Destino |
|---|---|---|
| Questão 1 | Frame com os 5 slides em PNG, auto layout vertical | Página `02 Questão 1` |
| Questão 2 | 6 frames nativos de 07/11 e 7 PNG do deck final | PNG na `03 Questão 2`; nativos na `07 Extras` |
| Questão 3 e extras | Área de trabalho `26-2`, design system `28-2`, prints do cadastro bloqueado, nó antigo `24-2` | `04 Questão 3`, `05 Design system`, `07 Extras` |

## Páginas do arquivo

| Ordem | Página | Fonte |
|---|---|---|
| 00 | Capa, com a miniatura do arquivo | Título, vaga, data, nome, link único |
| 01 | Briefing | `00-briefing.md`, `01-pontos-de-atencao.md`, `02-plano-ds.md`, `04-processo.html`, lista de links abaixo |
| 02 | Questão 1 | `slides/q1-*.png`, link de `01-diagnostico.md` |
| 03 | Questão 2 | `slides/q2-*.png`, link do artifact interativo e de `02-plano-ds.md` |
| 04 | Questão 3 | Nó `26-2`, `slides/q3-*.png`, link de `03-tela.md` |
| 05 | Design system | Nó `28-2` e componentes com variantes, de `prototipo/design-system.html` |
| 06 | Protótipo | Capturas das páginas principais, com link para cada uma no Pages |
| 07 | Extras | Prints do cadastro bloqueado, frames nativos da Q2, nó `24-2` |

## Links a compartilhar

Todos entram na página de briefing e na capa. Os do Figma apontam para nó.

| O quê | Link |
|---|---|
| Link único | https://felipegaigher.github.io/Aurum-teste/ |
| Protótipo, Área de trabalho | https://felipegaigher.github.io/Aurum-teste/prototipo/area-de-trabalho.html |
| Protótipo, Kanban do redesign | https://felipegaigher.github.io/Aurum-teste/prototipo/kanban.html |
| Protótipo, design system | https://felipegaigher.github.io/Aurum-teste/prototipo/design-system.html |
| Slides da Q1 | https://felipegaigher.github.io/Aurum-teste/01-slides-q1.html |
| Apresentação interativa da Q2 | https://claude.ai/artifact/59bdPZCtBBMUU6F6FL9Kgs |
| Slides da Q3 | https://felipegaigher.github.io/Aurum-teste/03-slides-q3.html |
| Processo de desenvolvimento | https://felipegaigher.github.io/Aurum-teste/04-processo.html |
| Ajustes na plataforma | https://felipegaigher.github.io/Aurum-teste/05-ajustes-plataforma.html |
| Repositório | https://github.com/FelipeGaigher/Aurum-teste |
| Diagnóstico da Q1 | https://github.com/FelipeGaigher/Aurum-teste/blob/main/01-diagnostico.md |
| Pontos de atenção | https://github.com/FelipeGaigher/Aurum-teste/blob/main/01-pontos-de-atencao.md |
| Plano do design system | https://github.com/FelipeGaigher/Aurum-teste/blob/main/02-plano-ds.md |
| Decisão difícil da Q3 | https://github.com/FelipeGaigher/Aurum-teste/blob/main/03-tela.md |

## Tasks

### Task 1: Conteúdo do briefing fora do Figma

**Papel:** escrita
**Verificação:** `python ~/.claude/skills/portugues-tecnico/scripts/check_docs.py referencias/figma-briefing.md`
**Aprovação:** nenhuma
**Fontes:** `00-briefing.md`, `01-diagnostico.md`, `02-plano-ds.md`, `04-processo.md`

Escreve `referencias/figma-briefing.md` com os seis blocos da página de
briefing, cada um com até 80 palavras. Os blocos: a demanda, o que organizar,
os times, o desenvolvimento, o processo e os links. Esse texto entra no Figma na Task 4
sem reescrita. Executa agora, sem MCP.

- [x] Step 1: Escrever o arquivo
- [x] Step 2: Executar o linter e corrigir
- [x] Step 3: Entregar

### Task 2: Estrutura de páginas

**Papel:** escrita
**Verificação:** `get_metadata` sem nó lista as oito páginas na ordem da tabela
**Aprovação:** nenhuma
**Fontes:** tabela "Páginas do arquivo"

Cria as páginas que faltam, renomeia as atuais e move cada nó para a página
de destino. Nenhum nó é apagado.

- [ ] Step 1: Criar e renomear as páginas
- [ ] Step 2: Mover os nós
- [ ] Step 3: Verificar pelo `get_metadata`

### Task 3: Capa e miniatura

**Papel:** escrita
**Verificação:** `get_screenshot` da capa; a miniatura do arquivo mostra a capa
**Aprovação:** nenhuma
**Fontes:** `index.html`, tokens de `prototipo/astrea.css`

Frame de 1920 por 1080 na página `00 Capa`, com o visual do protótipo.
Mostra título da atividade, nome, data, os três blocos da entrega e o link único.
Marcado como miniatura do arquivo.

- [ ] Step 1: Montar o frame
- [ ] Step 2: Definir como miniatura
- [ ] Step 3: Verificar pela captura

### Task 4: Página de briefing com os links

**Papel:** escrita
**Verificação:** `get_screenshot` da página; cada link abre no destino certo
**Aprovação:** nenhuma
**Fontes:** `referencias/figma-briefing.md`, tabela "Links a compartilhar"

Um frame por bloco, em auto layout, com o texto da Task 1. Os links entram
como hyperlink no texto. Os links de nó do Figma apontam para as páginas 02 a
05.

- [ ] Step 1: Montar os seis frames
- [ ] Step 2: Aplicar os hyperlinks
- [ ] Step 3: Verificar pela captura e pelos links

### Task 5: Questões 1, 2 e 3 nas páginas próprias

**Papel:** escrita
**Verificação:** `get_screenshot` das três páginas
**Aprovação:** nenhuma
**Fontes:** `slides/`, nó `26-2`

Cada página mostra os slides em linha, na ordem, com o nome do slide acima.
A Q3 traz a Área de trabalho à esquerda e os três slides à direita. Os PNG
já estão no arquivo. Se algum slide mudou depois da importação, o PNG novo
entra pelo Chrome, como em 08/11 de manhã.

- [ ] Step 1: Organizar as três páginas
- [ ] Step 2: Verificar se os PNG batem com `slides/`
- [ ] Step 3: Verificar pela captura

### Task 6: Design system com componentes de verdade

**Papel:** escrita
**Verificação:** `get_metadata` da página mostra os component sets com variantes
**Aprovação:** nenhuma
**Fontes:** `prototipo/design-system.html`, `prototipo/astrea.css`, skill `figma-generate-library`

Variáveis de cor, espaço e raio a partir de `astrea.css`. Component sets de
botão, tag, toast, filtro, campo, navbar e sidebar. Cada um tem as variantes
default, hover, active, disabled e error. As propriedades booleanas e de texto
seguem o que a Q2 promete. O nó `28-2` fica como referência visual.

- [ ] Step 1: Variáveis
- [ ] Step 2: Component sets
- [ ] Step 3: Verificar pelo `get_metadata`

### Task 7: Protótipo no Figma

**Papel:** escrita
**Verificação:** `get_screenshot` da página
**Aprovação:** nenhuma
**Fontes:** `scripts/capturar-figma.js`, `prototipo/README.md`

Importa Kanban, Agenda, Contatos e Processos pelo `capturar-figma.js`, em
linha, cada um com o link da página no Pages. A Área de trabalho já está lá.

- [ ] Step 1: Importar as quatro páginas
- [ ] Step 2: Links para o Pages
- [ ] Step 3: Verificar pela captura

### Task 8: index.html e compartilhamento

**Papel:** escrita
**Verificação:** `node scripts/verificar-app.js` e abertura do Figma em janela anônima
**Aprovação:** exige — `git push origin main`
**Fontes:** `index.html`

O link do arquivo do Figma entra no topo do `index.html`, antes da tabela.
Felipe muda o compartilhamento para "qualquer pessoa com o link pode ver" e
verifica em janela anônima. Depois, commit e push.

- [ ] Step 1: Link no `index.html`
- [ ] Step 2: Compartilhamento, por Felipe
- [ ] Step 3: Commit e push
