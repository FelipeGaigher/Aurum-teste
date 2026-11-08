<!-- gerado de docs/specs/2026-11-08-astrea-navegavel.html
     sha256 da fonte: d878c611936e9362
     em: 2026-11-08T12:03
     NAO ESCREVA NESTE ARQUIVO. Altere o HTML e regenere. -->

# Astrea navegável com design system — Implementation Plan

> **Para quem executa:** use a skill `executar-plano`, que substitui `superpowers:executing-plans` e tem precedencia sobre `superpowers:subagent-driven-development`. Os steps usam checkbox (`- [ ]`) para o progresso.

**Goal:** transformar `prototipo/` na plataforma inteira, com Kanban no topo do menu e design system completo.

**Architecture:** cada módulo é uma página em `prototipo/`. A folha `astrea.css` guarda tokens e estilos. `moldura.js` monta cabeçalho e menu. `componentes.js` expõe as peças em `window.DS`. `dados.js` guarda os dados fictícios. O Kanban fica com cópia própria de tokens e moldura.

**Tech Stack:** HTML, CSS e JavaScript sem build. Python 3 com `unittest` no portão estático. Node com Playwright, canal `chrome`, sem janela, no portão de navegador.

## Global Constraints

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

Regras de execução deste plano:

- Só a Task 9 altera `prototipo/kanban.html`. Até ela, os números de linha citados valem.
- `prototipo/verificar.py` executa o `detectar.py` da skill `sem-plastico` em todo `.html`, `.css` e `.js`.
- Toda task de UI lê `~/.claude/skills/sem-plastico/SKILL.md` antes do código.

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

---

### Task 1: Portão estático para arquivo compartilhado, base do Kanban e dado real

**Papel:** analise
**Verificação:** `python prototipo/test_verificar.py`
**Aprovação:** nenhuma

**Fontes:**
- `prototipo/verificar.py` — o portão que esta task amplia

**Files:**
- Modify: `prototipo/verificar.py`
- Test: `prototipo/test_verificar.py`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: nada.
- Produces: `python prototipo/verificar.py <arquivo> [...] [--todos] [--base-kanban [commit]] [--sincronia] [--dados-reais lista]` — sai com 0 sem erro, 1 com erro, 2 sem argumento.
- Produces: `checar_texto(texto, nome, exige_blocos=True) -> list[str]`.
- Produces: `comparar_kanban(atual, base) -> list[str]` — RF-02.
- Produces: `comparar_moldura(kanban, css, moldura) -> list[str]` — tokens e menu.
- Produces: `buscar_dados_reais(lista: Path, pasta: Path) -> list[str]` — RF-13.
- Produces: `arquivos_do_todos(pasta: Path) -> list[Path]`.

- [x] **Step 1: Escrever o teste que falha**

Acrescente este conteúdo em `prototipo/test_verificar.py`, antes do bloco `if __name__`.

```python
FOLHA_LIMPA = """/* primitivos */
:root { --primitive-blue-500: #008fd5; --primitive-sombra: rgba(0, 0, 0, 0.4); }
/* fim dos primitivos */
/* semanticos */
:root { --color-action: var(--primitive-blue-500); }
/* fim dos semanticos */
.botao { background: var(--color-action); }
"""

KANBAN_BASE = """<main id="conteudo">
    <div class="titulo-pagina">
      <h1>Gestão kanban</h1>
      <button id="criar-atividade">Adicionar</button>
    </div>
    <div id="quadro"></div>
    <footer id="rodape-demo">
      <label><input type="radio"> Vazio</label>
    </footer>
  </main>
<script>
const ATIVIDADES = [
  { id: 'a1' },
];
const HISTORIAS = [
  { id: 'h1' },
];
</script>
"""


class ArquivoCompartilhado(unittest.TestCase):
    def test_folha_limpa_passa(self):
        self.assertEqual(verificar.checar_texto(FOLHA_LIMPA, 'a.css'), [])

    def test_folha_sem_marcador_acusa(self):
        erros = verificar.checar_texto('.a { color: red; }\n', 'a.css')
        self.assertIn('bloco primitivos sem os marcadores', erros[0])

    def test_rgba_fora_dos_primitivos_acusa(self):
        texto = FOLHA_LIMPA + '.b { color: rgba(0, 0, 0, 0.5); }\n'
        erros = verificar.checar_texto(texto, 'a.css')
        self.assertIn('a.css:8: cor fora do bloco de primitivos', erros[0])

    def test_js_nao_exige_blocos_e_acusa_hex(self):
        erros = verificar.checar_texto("x.style.color = '#008fd5';\n", 'a.js', False)
        self.assertEqual(len(erros), 1)
        self.assertIn('a.js:1: hex fora do bloco de primitivos', erros[0])

    def test_pagina_com_a_folha_nao_exige_blocos(self):
        with tempfile.TemporaryDirectory() as pasta:
            caminho = Path(pasta) / 'agenda.html'
            caminho.write_text('<link rel="stylesheet" href="astrea.css">\n', encoding='utf-8')
            erros = verificar.checar(caminho)
        self.assertEqual(erros, [])

    def test_pagina_sem_a_folha_exige_blocos(self):
        with tempfile.TemporaryDirectory() as pasta:
            caminho = Path(pasta) / 'solta.html'
            caminho.write_text('<p>x</p>\n', encoding='utf-8')
            erros = verificar.checar(caminho)
        self.assertIn('bloco primitivos sem os marcadores', erros[0])

    def test_todos_ignora_o_painel_antigo(self):
        with tempfile.TemporaryDirectory() as pasta:
            raiz = Path(pasta)
            for nome in ('painel-redesign.html', 'agenda.html', 'astrea.css', 'nota.md'):
                (raiz / nome).write_text('x', encoding='utf-8')
            nomes = [p.name for p in verificar.arquivos_do_todos(raiz)]
        self.assertEqual(nomes, ['agenda.html', 'astrea.css'])


class CompararKanban(unittest.TestCase):
    def test_igual_passa(self):
        self.assertEqual(verificar.comparar_kanban(KANBAN_BASE, KANBAN_BASE), [])

    def test_h1_e_rodape_sao_excecoes(self):
        atual = KANBAN_BASE.replace('      <h1>Gestão kanban</h1>\n', '')
        atual = atual.replace('<input type="radio"> Vazio', '<button role="radio">Vazio</button>')
        self.assertEqual(verificar.comparar_kanban(atual, KANBAN_BASE), [])

    def test_alterar_o_main_acusa(self):
        atual = KANBAN_BASE.replace('id="quadro"', 'id="outro"')
        self.assertEqual(verificar.comparar_kanban(atual, KANBAN_BASE),
                         ['kanban: main difere do commit base.'])

    def test_alterar_o_array_acusa(self):
        atual = KANBAN_BASE.replace("{ id: 'a1' }", "{ id: 'a2' }")
        self.assertEqual(verificar.comparar_kanban(atual, KANBAN_BASE),
                         ['kanban: ATIVIDADES difere do commit base.'])

    def test_fim_de_linha_nao_conta(self):
        atual = KANBAN_BASE.replace('\n', '\r\n')
        self.assertEqual(verificar.comparar_kanban(atual, KANBAN_BASE), [])


class CompararMoldura(unittest.TestCase):
    KANBAN = FOLHA_LIMPA + """<nav class="menu-lateral" id="menu-principal">
      <li><a href="agenda.html">
        <svg class="icone"><path d="M1 1"/></svg>
        <span class="rotulo">Agenda</span></a></li>
    </nav>"""
    MOLDURA = "{ rotulo: 'Agenda', pagina: 'agenda.html', icone: 'M1 1' },\n"

    def test_igual_passa(self):
        self.assertEqual(verificar.comparar_moldura(self.KANBAN, FOLHA_LIMPA, self.MOLDURA), [])

    def test_token_diferente_acusa(self):
        css = FOLHA_LIMPA.replace('#008fd5', '#008fd6')
        self.assertEqual(verificar.comparar_moldura(self.KANBAN, css, self.MOLDURA),
                         ['kanban: bloco primitivos difere de astrea.css.'])

    def test_menu_diferente_acusa(self):
        moldura = self.MOLDURA.replace('Agenda', 'Calendario')
        self.assertEqual(verificar.comparar_moldura(self.KANBAN, FOLHA_LIMPA, moldura),
                         ['kanban: menu difere de moldura.js.'])


class DadosReais(unittest.TestCase):
    def _executar(self, termos, conteudo):
        with tempfile.TemporaryDirectory() as pasta:
            raiz = Path(pasta)
            lista = raiz / 'lista.txt'
            lista.write_text(termos, encoding='utf-8')
            alvo = raiz / 'prototipo'
            alvo.mkdir()
            (alvo / 'dados.js').write_text(conteudo, encoding='utf-8')
            return verificar.buscar_dados_reais(lista, alvo)

    def test_sem_ocorrencia_passa(self):
        self.assertEqual(self._executar('Nome Plantado\n', 'Rafael Antunes\n'), [])

    def test_ocorrencia_acusa_sem_copiar_o_termo(self):
        erros = self._executar('Nome Plantado\n', 'cliente NOME PLANTADO aqui\n')
        self.assertEqual(erros, ['dados.js: 1 ocorrencia(s) da lista.'])
        self.assertNotIn('plantado', erros[0].lower())

    def test_acento_nao_esconde_o_termo(self):
        self.assertEqual(len(self._executar('Joao Plantado\n', 'João Plantado\n')), 1)

    def test_numero_com_pontuacao_acusa(self):
        self.assertEqual(len(self._executar('12345678\n', 'n. 1234-56.78\n')), 1)

    def test_linha_vazia_e_comentario_nao_contam(self):
        self.assertEqual(self._executar('\n# nota\n', 'nota qualquer\n'), [])
```

- [x] **Step 2: Executar e confirmar a falha**

```bash
python prototipo/test_verificar.py
```

Esperado: `FAILED`, com `AttributeError` em `comparar_kanban` e nas funções novas.

- [x] **Step 3: Implementar**

Acrescente `__pycache__/` e `node_modules/` ao `.gitignore`.

Em `prototipo/verificar.py`, importe `argparse` e `unicodedata`. Acrescente estas constantes depois de `XMLNS_SVG`:

```python
COR = re.compile(r'\b(?:rgba?|hsla?)\(', re.I)
FOLHA = 'astrea.css'
BASE_KANBAN = 'a150985'
PASTA = Path(__file__).resolve().parent
FORA_DO_TODOS = {'painel-redesign.html', 'kanban-aprovado.html'}
EXTENSOES = {'.html', '.css', '.js'}
```

Altere `checar_texto` e `checar`:

```python
def checar_texto(texto, nome, exige_blocos=True):
    """As regras estaticas de .html, .css e .js. Devolve a lista de erros."""
    # no laco dos blocos:
    #     if exige_blocos and (abre not in texto or fecha not in texto):
    # no laco das linhas, antes da regra de PRIMITIVO:
    #     if COR.search(linha) and numero not in blocos['primitivos']:
    #         erros.append('%s: cor fora do bloco de primitivos: %s'
    #                      % (onde, linha.strip()))


def _exige_blocos(caminho, texto):
    """A folha compartilhada e o .html com tokens proprios trazem os blocos."""
    if caminho.suffix == '.js':
        return False
    return caminho.suffix == '.css' or FOLHA not in texto


def checar(caminho):
    if not caminho.is_file():
        return ['%s: arquivo nao existe.' % caminho]
    if caminho.suffix in EXTENSOES:
        texto = caminho.read_text(encoding='utf-8')
        exige = _exige_blocos(caminho, texto)
        return (checar_texto(texto, str(caminho), exige)
                + _executar(DETECTOR, caminho))
    if caminho.suffix == '.md':
        return _executar(LINTER, caminho)
    return ['%s: extensao fora do contrato. Use .html, .css, .js ou .md.' % caminho]
```

Troque `main` por este bloco. O rascunho passou nos 30 testes contra o Kanban real.

```python
def _lf(texto):
    return texto.replace('\r\n', '\n')


def _trecho_main(html):
    achou = re.search(r'<main id="conteudo">(.*?)</main>', _lf(html), re.S)
    if not achou:
        return None
    corpo = re.sub(r'[ \t]*<h1\b.*?</h1>\n?', '', achou.group(1), flags=re.S)
    return re.sub(r'[ \t]*<footer id="rodape-demo">.*?</footer>\n?', '', corpo,
                  flags=re.S)


def _array_js(html, nome):
    achou = re.search(r'const %s = \[.*?\n\];' % nome, _lf(html), re.S)
    return achou.group(0) if achou else None


def comparar_kanban(atual, base):
    """RF-02: main e os arrays iguais ao commit base."""
    erros = []
    if _trecho_main(atual) != _trecho_main(base):
        erros.append('kanban: main difere do commit base.')
    for nome in ('HISTORIAS', 'ATIVIDADES'):
        if _array_js(atual, nome) != _array_js(base, nome):
            erros.append('kanban: %s difere do commit base.' % nome)
    return erros


def _bloco(texto, nome):
    abre, fecha = BLOCOS[nome]
    limpo = _lf(texto)
    if abre not in limpo or fecha not in limpo:
        return None
    return limpo[limpo.index(abre):limpo.index(fecha)]


def _menu_do_kanban(html):
    achou = re.search(r'<nav class="menu-lateral".*?</nav>', html, re.S)
    if not achou:
        return []
    return re.findall(r'<a href="([^"]+)"[^>]*>\s*<svg.*?</svg>\s*'
                      r'<span class="rotulo">([^<]+)</span>', achou.group(0), re.S)


def _menu_da_moldura(js):
    pares = re.findall(r"rotulo:\s*'([^']+)',\s*pagina:\s*'([^']+)'", js)
    return [(pagina, rotulo) for rotulo, pagina in pares]


def comparar_moldura(kanban, css, moldura):
    """Tokens e menu do Kanban iguais aos arquivos compartilhados."""
    erros = []
    for nome in BLOCOS:
        if _bloco(kanban, nome) != _bloco(css, nome):
            erros.append('kanban: bloco %s difere de astrea.css.' % nome)
    if _menu_do_kanban(kanban) != _menu_da_moldura(moldura):
        erros.append('kanban: menu difere de moldura.js.')
    return erros


def _dobrar(texto):
    sem = unicodedata.normalize('NFD', texto)
    return ''.join(c for c in sem if not unicodedata.combining(c)).casefold()


def _termos(lista):
    linhas = (l.strip() for l in lista.read_text(encoding='utf-8-sig').splitlines())
    return [l for l in linhas if l and not l.startswith('#')]


def _ocorrencias(termo, texto, compacto):
    achados = texto.count(_dobrar(termo))
    digitos = re.sub(r'\D', '', termo)
    if len(digitos) >= 7:
        achados = max(achados, compacto.count(digitos))
    return achados


def buscar_dados_reais(lista, pasta):
    """RF-13. O relatorio traz arquivo e contagem, nunca o termo."""
    termos = _termos(lista)
    erros = []
    for arquivo in sorted(p for p in pasta.rglob('*') if p.is_file()):
        texto = _dobrar(arquivo.read_bytes().decode('utf-8', 'replace'))
        compacto = re.sub(r'[.\-/\s]', '', texto)
        total = sum(_ocorrencias(t, texto, compacto) for t in termos)
        if total:
            erros.append('%s: %d ocorrencia(s) da lista.' % (arquivo.name, total))
    return erros


def arquivos_do_todos(pasta):
    return sorted(p for p in pasta.iterdir() if p.suffix in EXTENSOES
                  and p.name not in FORA_DO_TODOS)


def _git_show(commit, relativo):
    proc = subprocess.run(['git', 'show', '%s:%s' % (commit, relativo)],
                          cwd=str(PASTA.parent), capture_output=True)
    return proc.stdout.decode('utf-8') if proc.returncode == 0 else None


def _erros_da_base(commit):
    base = _git_show(commit, 'prototipo/kanban.html')
    if base is None:
        return ['commit %s sem prototipo/kanban.html.' % commit]
    atual = (PASTA / 'kanban.html').read_text(encoding='utf-8')
    return comparar_kanban(atual, base)


def _erros_da_sincronia():
    leitura = [(PASTA / n).read_text(encoding='utf-8')
               for n in ('kanban.html', 'astrea.css', 'moldura.js')]
    return comparar_moldura(*leitura)


def _erros_dos_dados(lista):
    caminho = Path(lista)
    if not caminho.is_file():
        return ['lista de dados reais nao encontrada.']
    return buscar_dados_reais(caminho, PASTA)


def _argumentos(argv):
    leitor = argparse.ArgumentParser(add_help=False)
    leitor.add_argument('arquivos', nargs='*')
    leitor.add_argument('--todos', action='store_true')
    leitor.add_argument('--base-kanban', nargs='?', const=BASE_KANBAN)
    leitor.add_argument('--sincronia', action='store_true')
    leitor.add_argument('--dados-reais')
    return leitor.parse_args(argv)


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    if not argv:
        print('uso: python prototipo/verificar.py <arquivo> [...] [--todos] '
              '[--base-kanban [commit]] [--sincronia] [--dados-reais lista]')
        return 2
    args = _argumentos(argv)
    nomes = [Path(n) for n in args.arquivos]
    if args.todos:
        nomes += arquivos_do_todos(PASTA)
    erros = [erro for nome in nomes for erro in checar(nome)]
    if args.base_kanban:
        erros += _erros_da_base(args.base_kanban)
    if args.sincronia:
        erros += _erros_da_sincronia()
    if args.dados_reais:
        erros += _erros_dos_dados(args.dados_reais)
    for erro in erros:
        print(erro)
    print('verificar: %d erro(s)' % len(erros))
    return 1 if erros else 0
```

Atualize a docstring do módulo com as opções novas. Esperado: `checar` aceita as quatro extensões.

- [x] **Step 4: Executar e confirmar que passa**

```bash
python prototipo/test_verificar.py
python prototipo/verificar.py prototipo/kanban.html --base-kanban
```

Esperado: `Ran 30 tests`, `OK`, e `verificar: 0 erro(s)` no segundo comando.

- [x] **Step 5: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 2: Portão de navegador

**Papel:** analise
**Verificação:** `node scripts/verificar-app.js --fumaca`
**Aprovação:** nenhuma

**Fontes:**
- `scripts/capturar-kanban.js` — o modelo de Playwright sem janela, canal `chrome`
- `docs/specs/2026-11-08-astrea-navegavel.md` — os RF que o script executa

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `scripts/verificar-app.js`

**Interfaces:**
- Consumes: nada.
- Produces: `node scripts/verificar-app.js [--rf RF-01,RF-03] [--paginas a.html,b.html] [--exceto a.html] [--grupos acoes,dados] [--lista] [--fumaca]` — sai com 0 sem falha e 1 com falha.
- Produces: o contrato de seletores da tabela abaixo. As tasks de tela seguem esse contrato.

- [x] **Step 1: Instalar o Playwright**

```bash
npm i -D playwright
```

Esperado: `package.json` e `package-lock.json` novos. O navegador é o Chrome da máquina, então nenhum browser é baixado.

- [x] **Step 2: Escrever o script**

Copie o arranque de `scripts/capturar-kanban.js`. Carregue o Playwright só depois de tratar `--lista`.

```js
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ channel: 'chrome' });
```

Regras do script:

- Abra cada página por `file:///`, com o caminho de `prototipo/`.
- Registre todo `console.error` e `pageerror` como falha do RF em curso.
- Imprima uma linha `RF-NN ok` ou `RF-NN FALHOU: <motivo>` por requisito.
- `--paginas` restringe só RF-07, RF-12 e RF-15. RF-01, RF-03, RF-04 e RF-05 usam a lista inteira.
- `--exceto` tira a página de todos os RF.
- `--grupos` restringe RF-06.
- `--fumaca` abre `kanban.html` e sai com 0 quando a página carrega sem erro.

Lista de páginas, nesta constante:

```js
const PAGINAS = ['kanban.html', 'design-system.html', 'area-de-trabalho.html', 'agenda.html',
  'contatos.html', 'atendimentos.html', 'processos.html', 'publicacoes.html', 'financeiro.html',
  'documentos.html', 'indicadores.html', 'alertas.html', 'suporte.html', 'ias.html',
  'administracao.html', 'buscas.html'];
```

Contrato de seletores:

| RF | O que o script executa |
|---|---|
| RF-01 | Em cada `.menu-lateral a`, clica, verifica o nome do arquivo no `href`, exige `h1` e zero erro no console |
| RF-03 | Em 1440 por 900, compara `boundingBox` de `.cabecalho` e `.menu-lateral` entre todas as páginas |
| RF-04 | Afasta o cursor, exige um `.menu-lateral a[aria-current="page"]` e `background-color` diferente de item inativo. Em `administracao.html`, exige `[aria-current="page"]` no menu do usuário e não mede o fundo |
| RF-05 | Clica `#alternar-tema` e `#recolher-menu`, visita as outras páginas e verifica `html[data-tema]` e `body[data-menu="recolhido"]` |
| RF-06 | Em `design-system.html`, exige `[data-ds="<id>"]` de cada peça do catálogo. Para cada estado, exige `[data-estado]` ou `[data-ausente]` com motivo |
| RF-07 | Em cada página, menos `kanban.html`, conta visíveis em `select`, `input[type=date]`, `input[type=checkbox]`, `input[type=radio]` e exige zero |
| RF-08 | Em `area-de-trabalho.html`, exige `[data-secao="atrasadas"]` acima de `[data-secao="hoje"]`. Exige `[data-area-principal] [data-tipo="prazo"]` e `.chip-prazo` com texto e cor própria. Altera `[data-filtro="situacao"]`, abre `processos.html`, volta e verifica o valor. Exige `[data-acao="copiar-numero"]` |
| RF-09 | Em `agenda.html`, exige `[data-agenda-data]` igual à data de hoje. Em `agenda.html?estado=vazio`, exige `.grade-agenda` visível. Em `[data-visao="mes"]`, exige a última linha da grade até 900px |
| RF-10 | Em `agenda.html`, clica `[data-acao="criar-atividade"]` e exige um `[role="dialog"]` visível. `[data-acao="fechar-painel"]` fecha sem nova camada. Com data passada no `[data-campo="data"]`, exige `[data-aviso="data-passada"]` dentro do painel e uma camada |
| RF-11 | Em `contatos.html`, alterna `[data-visao="cards"]`, recarrega e verifica a escolha. Em `contatos.html?ficha=1`, exige zero `[data-campo-leitura=""]` visível. Em `contatos.html?adicionar=1`, exige `.barra-acoes` com `position` `sticky` ou `fixed`. Cria etiqueta em `[data-acao="nova-etiqueta"]` e exige a etiqueta selecionada, com a URL igual |
| RF-12 | Em cada página, percorre com Tab e exige foco em todo controle visível sem `tabindex="-1"`. Abre cada `[data-abre-painel]`, fecha com Esc e exige o foco na origem. Mede o contraste dos textos visíveis nos dois temas, AA 4.5 e 3.0 para texto grande |
| RF-15 | Em 1024 e 700 de largura, exige `documentElement.scrollWidth` menor ou igual a `clientWidth` |

Catálogo de RF-06, com o grupo como chave:

```js
const CATALOGO = {
  fundamentos: ['cor', 'tipografia', 'espaco', 'raio', 'sombra', 'foco', 'icones', 'densidade', 'tema'],
  acoes: ['botao-primario', 'botao-secundario', 'botao-texto', 'botao-icone', 'botao-destrutivo',
    'grupo-botoes', 'menu-acoes'],
  formulario: ['campo', 'area-texto', 'busca', 'seletor', 'seletor-multiplo', 'seletor-pessoas',
    'data', 'periodo', 'caixa', 'radio', 'chave'],
  feedback: ['toast', 'faixa-aviso', 'dialogo', 'tooltip', 'progresso', 'skeleton', 'estado-vazio', 'upsell'],
  dados: ['tag', 'chip-filtro', 'chip-prazo', 'selo', 'avatar', 'tabela', 'linha-atividade',
    'card-atividade', 'card-contato', 'paginacao'],
  navegacao: ['navbar', 'sidebar-expandida', 'sidebar-recolhida', 'abas', 'trilha', 'barra-filtros',
    'painel-lateral', 'barra-acoes', 'stepper'],
};
const ESTADOS = ['default', 'hover', 'active', 'foco', 'disabled', 'erro', 'carregando', 'vazio'];
```

O grupo `fundamentos` exige só o `[data-ds]`. Esperado: `node scripts/verificar-app.js --lista` imprime os 12 RF de navegador.

- [x] **Step 3: Confirmar o estado vermelho**

```bash
node scripts/verificar-app.js --rf RF-01
```

Esperado: `RF-01 FALHOU`, porque as páginas ainda não existem.

- [x] **Step 4: Executar e confirmar que passa**

```bash
node scripts/verificar-app.js --fumaca
```

Esperado: código 0, sem janela visível.

- [x] **Step 5: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 3: Tokens em `astrea.css`

**Papel:** escrita
**Verificação:** `python prototipo/verificar.py prototipo/astrea.css`
**Aprovação:** nenhuma

**Fontes:**
- `02-plano-ds.md` — as camadas de token
- `01-pontos-de-atencao.md` — PA-16, PA-17 e PA-22
- `01-inventario-css-astrea.md` — seção 14, paleta real

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código
- `~/.claude/skills/sem-plastico/scripts/contraste.py` — mede cada par novo de texto e fundo

**Files:**
- Create: `prototipo/astrea.css`

**Interfaces:**
- Consumes: `python prototipo/verificar.py` da Task 1.
- Produces: `prototipo/astrea.css` com os blocos `/* primitivos */`, `/* semanticos */` e `/* componentes */`.
- Produces: os tokens novos `--color-text-success`, `--color-bg-danger`, `--color-bg-warning` e `--density-row`.

- [x] **Step 1: Copiar os tokens sem abrir o Kanban**

```bash
sed -n '8,258p' prototipo/kanban.html > prototipo/astrea.css
```

Esperado: o arquivo começa em `/* primitivos */` e termina em `/* fim dos componentes */`.

- [x] **Step 2: Acrescentar os tokens novos**

Preserve todo nome existente. O Kanban consome esses nomes na Task 9.

| Token | Uso |
|---|---|
| `--primitive-success-900`, `#02883c` | sucesso, da seção 14 do inventário |
| `--color-text-success` | texto de sucesso nos dois temas |
| `--color-bg-danger`, `--color-bg-warning` | fundo do chip de prazo nos dois temas |
| `--density-row`, `--density-row-compact` | altura de linha por densidade |

Meça cada par com `contraste.py` e registre a razão em comentário no primitivo. Esperado: todo par com 4.5 ou mais.

- [x] **Step 3: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/astrea.css
```

Esperado: `verificar: 0 erro(s)`.

- [x] **Step 4: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 4: Moldura, cascas das páginas e dados fictícios

**Papel:** analise
**Verificação:** `python prototipo/verificar.py --todos && node scripts/verificar-app.js --rf RF-01,RF-03,RF-04,RF-05,RF-07,RF-15 --exceto kanban.html`
**Aprovação:** nenhuma

**Fontes:**
- `01-varredura-modulos.md` — seção 10, cabeçalho e menu do usuário
- `01-pontos-de-atencao.md` — PA-01 a PA-15
- `01-melhorias.md` — M14 a M17
- `01-inventario-css-astrea.md` — seção 0, ícones do cabeçalho

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/astrea.css`
- Create: `prototipo/moldura.js`
- Create: `prototipo/dados.js`
- Create: `prototipo/design-system.html`
- Create: `prototipo/area-de-trabalho.html`
- Create: `prototipo/agenda.html`
- Create: `prototipo/contatos.html`
- Create: `prototipo/atendimentos.html`
- Create: `prototipo/processos.html`
- Create: `prototipo/publicacoes.html`
- Create: `prototipo/financeiro.html`
- Create: `prototipo/documentos.html`
- Create: `prototipo/indicadores.html`
- Create: `prototipo/alertas.html`
- Create: `prototipo/suporte.html`
- Create: `prototipo/ias.html`
- Create: `prototipo/administracao.html`
- Create: `prototipo/buscas.html`

**Interfaces:**
- Consumes: `astrea.css` da Task 3 e o contrato de seletores da Task 2.
- Produces: `window.Moldura = { MENU, montar() }`. Cada item do `MENU` traz `rotulo`, `pagina` e `icone`, nesta ordem e na mesma linha.
- Produces: as classes `.cabecalho`, `.menu-lateral`, `.corpo`, `#alternar-tema` e `#recolher-menu`.
- Produces: as chaves `astrea-tema` e `astrea-menu` no `localStorage`.
- Produces: `window.DADOS = { ATIVIDADES, CONTATOS, PROCESSOS, RESPONSAVEIS }`.

- [x] **Step 1: Confirmar o estado vermelho**

```bash
node scripts/verificar-app.js --rf RF-01 --exceto kanban.html
```

Esperado: `RF-01 FALHOU`.

- [x] **Step 2: Copiar a base e os dados do Kanban por trecho**

```bash
sed -n '260,544p' prototipo/kanban.html >> prototipo/astrea.css
sed -n '1465,1476p' prototipo/kanban.html > prototipo/dados.js
sed -n '1400,1447p' prototipo/kanban.html > prototipo/moldura.js
```

Esperado: `astrea.css` ganha reset, `.cabecalho` e `.menu-lateral`. `dados.js` ganha o array `ATIVIDADES`. `moldura.js` ganha a lógica de tema e de recolher.

Em `dados.js`, derive `RESPONSAVEIS`, `PROCESSOS` e `CONTATOS` dos valores do array. Clientes de `CONTATOS` são nomes fictícios novos.

- [x] **Step 3: Implementar a moldura**

| Área | Conteúdo |
|---|---|
| Esquerda | Logo, botão de recolher, trilha e `h1` com o título da página |
| Direita | Busca global, IA, Adicionar, Cronômetro, tema e usuário |
| Menu do usuário | Meu perfil, Meu plano, Administração, Sair |
| Menu lateral | Grupo "Especialista UX/UI" com "Gestão kanban" e "Design system", depois os módulos |
| Rodapé do menu | Dias restantes do teste, 1 ano grátis e Contratar, em uma linha |

A ordem dos módulos é esta:

1. Área de trabalho
2. Agenda
3. Contatos
4. Atendimentos
5. Processos e casos
6. Publicações
7. Financeiro
8. Documentos
9. Indicadores
10. Alertas
11. Suporte
12. Conheça as IAs

Regras:

- `moldura.js` não depende de `componentes.js`.
- Aplique o tema no carregamento do script, antes da primeira pintura. Inclua `moldura.js` no `head`.
- Preserve as chaves `astrea-tema` e `astrea-menu` do trecho copiado no Step 2.
- O item ativo sai de `body[data-pagina]`, com `aria-current="page"`, fundo e cor.
- Cronômetro mostra o bloqueio antes do clique, com selo e tooltip (PA-07).
- IA usa as cores e as peças do restante da moldura (PA-10).
- Administração sai dos atalhos e fica no menu do usuário (PA-06).
- Meu perfil e Sair ficam com `aria-disabled="true"`, sem destino. Meu plano abre `administracao.html#plano`.
- A página `buscas.html` marca o item "Processos e casos" como ativo, com trilha.
- Em `administracao.html`, o item Administração do menu do usuário leva o `aria-current`.
- O menu Adicionar usa uma lista única de itens, com os de upgrade em grupo próprio no fim (PA-24, PA-26).

- [x] **Step 4: Criar as cascas**

Cada página nova segue este molde. Títulos e nomes vêm do catálogo do menu.

```html
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Agenda, Astrea: protótipo</title>
<link rel="stylesheet" href="astrea.css">
<script src="moldura.js"></script>
</head>
<body data-pagina="agenda.html" data-titulo="Agenda">
<div class="corpo">
  <main id="conteudo">
    <p>Esta tela entra numa próxima onda.</p>
  </main>
</div>
</body>
</html>
```

Esperado: 15 páginas novas, cada uma com um item de menu ou destino no menu do usuário.

- [x] **Step 5: Executar e confirmar que passa**

```bash
python prototipo/verificar.py --todos
node scripts/verificar-app.js --rf RF-01,RF-03,RF-04,RF-05,RF-07,RF-15 --exceto kanban.html
```

Esperado: `verificar: 0 erro(s)` e os seis RF com `ok`. RF-05 prova que o `localStorage` persiste entre arquivos em `file://`.

- [x] **Step 6: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 5: Design system: fundamentos e ações

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/astrea.css prototipo/componentes.js prototipo/design-system.html && node scripts/verificar-app.js --rf RF-06 --grupos fundamentos,acoes`
**Aprovação:** nenhuma

**Fontes:**
- `02-plano-ds.md` — propriedades e estados
- `01-pontos-de-atencao.md` — PA-16 a PA-19
- `03-componentes.html` — cinco componentes com estados, a alinhar

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código, com `references/escala.md`

**Files:**
- Modify: `prototipo/astrea.css`
- Create: `prototipo/componentes.js`
- Modify: `prototipo/design-system.html`

**Interfaces:**
- Consumes: `astrea.css` e a casca `design-system.html` da Task 4.
- Produces: `window.DS.botao({ variante, tamanho, iconeEsquerda, iconeDireita, rotulo, carregando }) -> HTMLElement`.
- Produces: `window.DS.grupoBotoes(itens) -> HTMLElement` e `window.DS.menuAcoes({ rotulo, itens }) -> HTMLElement`.
- Produces: a marcação `[data-ds="<id>"]`, `[data-estado="<estado>"]` e `[data-ausente="<estado>"]` da página.

- [x] **Step 1: Confirmar o estado vermelho**

```bash
node scripts/verificar-app.js --rf RF-06 --grupos fundamentos,acoes
```

Esperado: `RF-06 FALHOU`.

- [x] **Step 2: Implementar**

- Crie `window.DS` em `componentes.js`, sem dependência da moldura.
- Inclua `componentes.js` depois de `moldura.js` na página do design system.
- Mostre cada estado com `data-estado` e a classe que força o visual, como `.is-hover`.
- Declare cada ausência com `data-ausente` e o motivo em uma frase.
- Variantes do botão: `primario`, `secundario`, `texto`, `icone`, `destrutivo`.
- "Cancelar" é sempre `secundario` ou `texto`, nunca link (PA-19).
- Separe os itens destrutivos do menu de ações em grupo próprio.
- Mostre os tokens ao lado de cada fundamento, com nome e valor.

Esperado: seções `Fundamentos` e `Ações` completas em `design-system.html`.

- [x] **Step 3: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/astrea.css prototipo/componentes.js prototipo/design-system.html
node scripts/verificar-app.js --rf RF-06 --grupos fundamentos,acoes
```

Esperado: `verificar: 0 erro(s)` e `RF-06 ok`.

- [x] **Step 4: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 6: Design system: formulário

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/astrea.css prototipo/componentes.js prototipo/design-system.html && node scripts/verificar-app.js --rf RF-06,RF-07,RF-12 --grupos formulario --paginas design-system.html`
**Aprovação:** nenhuma

**Fontes:**
- `02-plano-ds.md` — propriedades e estados
- `01-pontos-de-atencao.md` — PA-20, PA-21 e PA-58
- `referencias/modal-tarefa-crm.png` — referência do seletor de pessoas

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código, com `references/acessibilidade.md`

**Files:**
- Modify: `prototipo/astrea.css`
- Modify: `prototipo/componentes.js`
- Modify: `prototipo/design-system.html`

**Interfaces:**
- Consumes: `window.DS` da Task 5.
- Produces: `window.DS.campo({ rotulo, ajuda, obrigatorio, icone, largura, erro }) -> HTMLElement`.
- Produces: `DS.areaTexto`, `DS.busca`, `DS.seletor`, `DS.seletorMultiplo`, `DS.seletorPessoas`, `DS.data`, `DS.periodo`, `DS.caixa`, `DS.radio`, `DS.chave`.
- Produces: `DS.seletor({ id, opcoes, valor, aoEscolher }) -> HTMLElement`, com o valor atual em `data-valor` na raiz.
- Produces: `DS.data(...)` com `input` de texto `dd/mm/aaaa` e `data-campo="data"` quando a tela pedir.

- [x] **Step 1: Confirmar o estado vermelho**

```bash
node scripts/verificar-app.js --rf RF-06 --grupos formulario
```

Esperado: `RF-06 FALHOU`.

- [x] **Step 2: Implementar**

- Rótulo fixo acima do campo em toda peça (PA-21).
- Seletor segue o padrão ARIA de listbox: setas, Enter, Esc e digitação.
- Caixa, rádio e chave são `button` com `role` e `aria-checked`. O grupo de rádio usa tabindex móvel.
- Data é `input` de texto com máscara, mais calendário próprio. Nunca use `type="date"`.
- Seletor de pessoas traz avatar e botão de mais, no próprio campo, sem popover (PA-58).
- Larguras do campo: `p`, `m`, `g` e `total`, por token (PA-67).

Esperado: seção `Formulário` completa, sem controle nativo visível.

- [x] **Step 3: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/astrea.css prototipo/componentes.js prototipo/design-system.html
node scripts/verificar-app.js --rf RF-06,RF-07,RF-12 --grupos formulario --paginas design-system.html
```

Esperado: `verificar: 0 erro(s)` e os três RF com `ok`.

- [x] **Step 4: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 7: Design system: feedback e dados

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/astrea.css prototipo/componentes.js prototipo/design-system.html && node scripts/verificar-app.js --rf RF-06,RF-07,RF-12 --grupos feedback,dados --paginas design-system.html`
**Aprovação:** nenhuma

**Fontes:**
- `02-plano-ds.md` — card de atividade e propriedades
- `01-pontos-de-atencao.md` — PA-27 a PA-30 e PA-34
- `referencias/padroes-fotus-nautica.md` — tabela e cards
- `03-componentes.html` — cinco componentes com estados, a alinhar

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código, com `references/profundidade.md`

**Files:**
- Modify: `prototipo/astrea.css`
- Modify: `prototipo/componentes.js`
- Modify: `prototipo/design-system.html`

**Interfaces:**
- Consumes: `window.DS` das Tasks 5 e 6.
- Produces: `DS.toast({ tipo, mensagem, acao, fechar })`, `DS.faixaAviso`, `DS.dialogo`, `DS.tooltip`, `DS.progresso`, `DS.skeleton`, `DS.estadoVazio`, `DS.upsell`.
- Produces: `DS.cardAtividade({ mostrarPrazo, mostrarProcesso, mostrarResponsavel, mostrarTags, titulo, tipo, estadoPrazo })`.
- Produces: `DS.linhaAtividade({ mostrarProcesso, copiarNumero, responsavel, acoes, densidade })`.
- Produces: `DS.chipPrazo`, `DS.chipFiltro`, `DS.tag`, `DS.selo`, `DS.avatar`, `DS.tabela`, `DS.cardContato`, `DS.paginacao`.
- Produces: a classe `.chip-prazo`, com texto e cor por estado.

- [x] **Step 1: Confirmar o estado vermelho**

```bash
node scripts/verificar-app.js --rf RF-06 --grupos feedback,dados
```

Esperado: `RF-06 FALHOU`.

- [x] **Step 2: Implementar**

- Chip de prazo com texto e cor: vencido, hoje e próximos (PA-34).
- Número do processo é texto, nunca link azul (PA-11). O copiar é botão de ícone com rótulo.
- `DS.upsell` é a peça única de bloqueio, com um botão "Conhecer planos".
- `DS.estadoVazio` recebe título, texto e ação.
- Diálogo nunca abre sobre outra camada (PA-27).
- Toast só avisa o que acontece fora da tela (PA-30).

Esperado: seções `Feedback` e `Dados` completas.

- [x] **Step 3: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/astrea.css prototipo/componentes.js prototipo/design-system.html
node scripts/verificar-app.js --rf RF-06,RF-07,RF-12 --grupos feedback,dados --paginas design-system.html
```

Esperado: `verificar: 0 erro(s)` e os três RF com `ok`.

- [x] **Step 4: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 8: Design system: navegação e fechamento da página

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/astrea.css prototipo/componentes.js prototipo/design-system.html && node scripts/verificar-app.js --rf RF-06,RF-07,RF-12,RF-15 --paginas design-system.html`
**Aprovação:** nenhuma

**Fontes:**
- `02-plano-ds.md` — propriedades e estados
- `01-pontos-de-atencao.md` — PA-24 a PA-28
- `referencias/padroes-fotus-nautica.md` — barra de ações

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/astrea.css`
- Modify: `prototipo/componentes.js`
- Modify: `prototipo/design-system.html`

**Interfaces:**
- Consumes: `window.DS` das Tasks 5 a 7 e `window.Moldura` da Task 4.
- Produces: `DS.abas`, `DS.trilha`, `DS.barraFiltros`, `DS.painelLateral`, `DS.barraAcoes`, `DS.stepper`.
- Produces: `DS.painelLateral({ titulo, corpo, rodape, aoFechar }) -> { abrir(origem), fechar() }`, com `role="dialog"`, Esc e retorno do foco.
- Produces: a classe `.barra-acoes`, fixa no fim do formulário.
- Produces: o atributo `data-abre-painel`, obrigatório em todo gatilho de painel lateral. RF-12 lê esse atributo.

- [ ] **Step 1: Confirmar o estado vermelho**

```bash
node scripts/verificar-app.js --rf RF-06
```

Esperado: `RF-06 FALHOU`, no grupo `navegacao`.

- [ ] **Step 2: Implementar**

- Navbar e sidebar aparecem como miniatura, com a mesma classe da moldura.
- Item do menu documenta `icone`, `rotulo`, `selo`, `ativo` e `recolhido`.
- O painel lateral é a única camada. Conteúdo novo troca dentro dele.
- A barra de ações mostra estado: salvando, salvo e erro (PA-30).
- O stepper é único para passos e progresso (PA-28).

Esperado: a página do design system completa, nos seis grupos.

- [ ] **Step 3: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/astrea.css prototipo/componentes.js prototipo/design-system.html
node scripts/verificar-app.js --rf RF-06,RF-07,RF-12,RF-15 --paginas design-system.html
```

Esperado: `verificar: 0 erro(s)` e os quatro RF com `ok`.

- [ ] **Step 4: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 9: Kanban com a moldura nova

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/kanban.html --base-kanban --sincronia && node scripts/verificar-app.js --rf RF-01,RF-03,RF-04,RF-05,RF-12,RF-15 --paginas kanban.html`
**Aprovação:** nenhuma

**Fontes:**
- `prototipo/kanban.html` — leia só os trechos da tabela abaixo
- `01-pontos-de-atencao.md` — PA-01 a PA-15

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/kanban.html`
- Modify: `scripts/capturar-kanban.js`

**Interfaces:**
- Consumes: `astrea.css` e `moldura.js` da Task 4, `.radio` da Task 6.
- Produces: `kanban.html` com tokens e menu iguais aos compartilhados.
- Produces: `CAPTURAS_DESTINO`, variável opcional que troca a pasta de `capturar-kanban.js`.

**Aviso:** RF-02 proíbe alterar `main` fora de `h1` e `#rodape-demo`, e os arrays `HISTORIAS` e `ATIVIDADES`.

- [x] **Step 1: Confirmar o estado vermelho**

```bash
python prototipo/verificar.py --sincronia
```

Esperado: `kanban: bloco primitivos difere de astrea.css.`

- [x] **Step 2: Implementar por trecho**

| Linhas | O que fazer |
|---|---|
| 8 a 204 | Troque pelos blocos de primitivos e semânticos de `astrea.css`, sem alterar um byte |
| 206 a 258 | Mantenha. Acrescente só o token de componente novo que a moldura usar |
| 318 a 544 | Troque o CSS de cabeçalho e menu pelo trecho equivalente de `astrea.css` |
| 1169 a 1267 | Troque pelo HTML que `moldura.js` gera, com `#alternar-tema` e `#recolher-menu` |
| 1271 | Tire o `h1` do `main`. O título sobe ao cabeçalho |
| 1310 a 1322 | Troque os cinco rádios nativos pelo rádio do design system |
| 1111 a 1132 | Ajuste o responsivo ao cabeçalho novo. Em 700px, nenhuma rolagem lateral |
| 1400 a 1447 | Mantenha tema e recolher, com as chaves `astrea-tema` e `astrea-menu` |
| 2517 a 2524 | Troque o evento `change` por clique nos rádios novos |

Regras:

- O HTML da moldura é estático neste arquivo. Não carregue `moldura.js`, `componentes.js` nem `astrea.css`.
- Extraia o HTML com o Playwright em `design-system.html`. Use `document.querySelector('.cabecalho').outerHTML`.
- Cada `href` do menu aponta para a página real. O item "Gestão kanban" leva `aria-current="page"`.
- Mantenha a marcação do link em duas linhas, com `svg` e depois `span.rotulo`. A sincronia lê esse formato.
- O rádio novo é `button` com `role="radio"`, `aria-checked`, `data-grupo` e `data-valor`.

Em `scripts/capturar-kanban.js`, troque o `page.check` por este clique:

```js
await page.click(`[role="radio"][data-grupo="conjunto"][data-valor="${c.conjunto}"]`);
```

Use `process.env.CAPTURAS_DESTINO` como destino, quando existir. Esperado: `capturar-kanban.js` segue funcional.

- [x] **Step 3: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/kanban.html --base-kanban --sincronia
node scripts/verificar-app.js --rf RF-01,RF-03,RF-04,RF-05,RF-12,RF-15 --paginas kanban.html
CAPTURAS_DESTINO="$TEMP/capturas-kanban" node scripts/capturar-kanban.js
```

Esperado: `verificar: 0 erro(s)`, os seis RF com `ok` e três PNG fora do repositório.

- [x] **Step 4: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 10: Área de trabalho: estrutura e prazos

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/area-de-trabalho.html && node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas area-de-trabalho.html`
**Aprovação:** nenhuma

**Fontes:**
- `01-varredura-modulos.md` — seção 1, Área de trabalho
- `01-pontos-de-atencao.md` — PA-31 a PA-40
- `01-pedidos-clientes.md` — votos por tema
- `referencias/cockpit-nautica.md` — linha horizontal de leitura

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/area-de-trabalho.html`

**Interfaces:**
- Consumes: `window.DS`, `window.Moldura` e `window.DADOS`.
- Produces: `[data-area-principal]`, `[data-secao="atrasadas"]`, `[data-secao="hoje"]`, `[data-secao="proximos"]` e `[data-tipo]`.

- [ ] **Step 1: Confirmar o estado vermelho**

```bash
node scripts/verificar-app.js --rf RF-08
```

Esperado: `RF-08 FALHOU`.

- [ ] **Step 2: Implementar**

- Abra em todas as listas (PA-31).
- Seção "Atrasadas" acima de "Hoje", depois próximos (PA-32).
- Prazos, audiências e eventos ficam na área principal (PA-33, PA-53).
- Cada linha usa `DS.linhaAtividade` e `DS.chipPrazo`.
- Ações da linha aparecem no foco e no hover, com tooltip (PA-40).
- Widgets viram linha horizontal de leitura (PA-39).
- O menu de criar usa a lista única da moldura (PA-24).

Esperado: a tela substitui a casca, com dados de `DADOS.ATIVIDADES`.

- [ ] **Step 3: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/area-de-trabalho.html
node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas area-de-trabalho.html
```

Esperado: `verificar: 0 erro(s)` e os três RF com `ok`.

- [ ] **Step 4: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 11: Área de trabalho: filtros e número do processo

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/area-de-trabalho.html && node scripts/verificar-app.js --rf RF-07,RF-08,RF-12,RF-15 --paginas area-de-trabalho.html`
**Aprovação:** nenhuma

**Fontes:**
- `01-varredura-modulos.md` — seção 1, Área de trabalho
- `01-pontos-de-atencao.md` — PA-35 a PA-38
- `01-pedidos-clientes.md` — filtro e copiar número

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/area-de-trabalho.html`

**Interfaces:**
- Consumes: as seções da Task 10.
- Produces: `[data-filtro="situacao"]`, um `DS.seletor` com o valor em `data-valor`.
- Produces: `[data-acao="copiar-numero"]` e a chave `astrea-filtro-area` no `localStorage`.

- [ ] **Step 1: Implementar**

- Barra de filtros com minhas, delegadas, período e situação (PA-35, PA-36).
- Grave a escolha em `astrea-filtro-area` e restaure ao abrir a página (PA-37).
- O número do processo aparece na linha, com botão de copiar (PA-38).
- O filtro não usa `select` nativo (RF-07).

Esperado: filtrar reduz as linhas das três seções.

- [ ] **Step 2: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/area-de-trabalho.html
node scripts/verificar-app.js --rf RF-07,RF-08,RF-12,RF-15 --paginas area-de-trabalho.html
```

Esperado: `verificar: 0 erro(s)` e os quatro RF com `ok`.

- [ ] **Step 3: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 12: Agenda: visões e estado vazio

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/agenda.html && node scripts/verificar-app.js --rf RF-07,RF-09,RF-12,RF-15 --paginas agenda.html`
**Aprovação:** nenhuma

**Fontes:**
- `01-varredura-modulos.md` — seção 2, Agenda
- `01-pontos-de-atencao.md` — PA-46 a PA-53
- `01-telas-observadas.md` — telas 13 e 17 a 20
- `01-inventario-css-astrea.md` — seção 2, visões da Agenda

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/agenda.html`

**Interfaces:**
- Consumes: `window.DS` e `window.DADOS`.
- Produces: `[data-agenda-data]`, com a data em `AAAA-MM-DD`, `.grade-agenda`, `[data-visao="lista|dia|semana|mes"]` e o parâmetro `?estado=vazio`.

- [ ] **Step 1: Confirmar o estado vermelho**

```bash
node scripts/verificar-app.js --rf RF-09
```

Esperado: `RF-09 FALHOU`.

- [ ] **Step 2: Implementar**

- Quatro visões: lista, dia, semana e mês.
- Abra sempre em Hoje, sem lembrar a última sessão (PA-49).
- Mostre a grade no estado vazio, com texto de ajuda (PA-46).
- Mês inteiro em 1440 por 900, pelo token de densidade compacta (PA-47).
- Lista de prioridades por prazo ao lado da grade (PA-48).
- Não crie o painel de criar aqui. Ele nasce na Task 13.

Esperado: as quatro visões trocam sem recarregar.

- [ ] **Step 3: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/agenda.html
node scripts/verificar-app.js --rf RF-07,RF-09,RF-12,RF-15 --paginas agenda.html
```

Esperado: `verificar: 0 erro(s)` e os quatro RF com `ok`.

- [ ] **Step 4: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 13: Criar atividade em painel único

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/agenda.html prototipo/componentes.js prototipo/moldura.js && node scripts/verificar-app.js --rf RF-07,RF-10,RF-12 --paginas agenda.html`
**Aprovação:** nenhuma

**Fontes:**
- `01-varredura-modulos.md` — seção 2, modal de evento
- `01-telas-observadas.md` — telas 14 a 16
- `01-pontos-de-atencao.md` — PA-54 a PA-60
- `01-melhorias.md` — M5 e M6

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/componentes.js`
- Modify: `prototipo/moldura.js`
- Modify: `prototipo/agenda.html`
- Modify: `prototipo/astrea.css`

**Interfaces:**
- Consumes: `DS.painelLateral`, `DS.seletorPessoas` e `DS.data`.
- Produces: `DS.painelCriarAtividade({ tipo }) -> { abrir(origem) }`.
- Produces: `[data-acao="criar-atividade"]`, `[data-acao="fechar-painel"]`, `[data-campo="data"]` e `[data-aviso="data-passada"]`.

- [ ] **Step 1: Confirmar o estado vermelho**

```bash
node scripts/verificar-app.js --rf RF-10
```

Esperado: `RF-10 FALHOU`.

- [ ] **Step 2: Implementar**

- Os tipos são tarefa, prazo, audiência e evento.
- Campos na ordem do Astrea. Lista de tarefas vem preenchida (PA-54).
- Prioridade segue "Baixa", porque PA-55 aguarda dado.
- Sem título separado da descrição (PA-56, Backlog).
- Data passada mostra aviso no painel, com "Salvar como concluída" (PA-57).
- Pessoas entram no próprio campo (PA-58).
- Formulário vazio fecha sem confirmar. Com dado, a confirmação fica dentro do painel (PA-59).
- O item Tarefa e o item Evento do menu Adicionar abrem este painel.

Esperado: uma camada visível em qualquer caminho do formulário.

- [ ] **Step 3: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/agenda.html prototipo/componentes.js prototipo/moldura.js
node scripts/verificar-app.js --rf RF-07,RF-10,RF-12 --paginas agenda.html
```

Esperado: `verificar: 0 erro(s)` e os três RF com `ok`.

- [ ] **Step 4: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 14: Contatos: lista

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/contatos.html && node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas contatos.html`
**Aprovação:** nenhuma

**Fontes:**
- `01-varredura-modulos.md` — seção 3, Contatos
- `01-pontos-de-atencao.md` — PA-61 a PA-71
- `01-telas-observadas.md` — tela 21
- `referencias/padroes-fotus-nautica.md` — tabela e cards

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/contatos.html`

**Interfaces:**
- Consumes: `DS.tabela`, `DS.cardContato`, `DS.barraFiltros` e `DADOS.CONTATOS`.
- Produces: `[data-visao="tabela|cards"]` e a chave `astrea-contatos-visao`.

- [ ] **Step 1: Implementar**

- Abra em todos os contatos, com o filtro visível (PA-62).
- Alterne tabela e cards, com a escolha lembrada (PA-64).
- Filtro de A a Z aparece só com mais de 20 contatos (PA-65).
- Célula vazia mostra traço (PA-66).
- Filtro avançado na ordem do Astrea, com a barra de filtros do DS.

Esperado: a lista substitui a casca.

- [ ] **Step 2: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/contatos.html
node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas contatos.html
```

Esperado: `verificar: 0 erro(s)` e os três RF com `ok`.

- [ ] **Step 3: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 15: Contatos: ficha e adicionar

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/contatos.html && node scripts/verificar-app.js --rf RF-07,RF-11,RF-12,RF-15 --paginas contatos.html`
**Aprovação:** nenhuma

**Fontes:**
- `01-varredura-modulos.md` — seção 3, ficha com oito abas
- `01-pontos-de-atencao.md` — PA-61 a PA-71
- `01-telas-observadas.md` — telas 12 e 22 a 25
- `01-melhorias.md` — M1 e M10 a M12

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/contatos.html`

**Interfaces:**
- Consumes: a lista da Task 14, `DS.abas`, `DS.upsell`, `DS.painelLateral` e `.barra-acoes`.
- Produces: `?ficha=1`, `?adicionar=1`, `[data-campo-leitura]` e `[data-acao="nova-etiqueta"]`.

- [ ] **Step 1: Confirmar o estado vermelho**

```bash
node scripts/verificar-app.js --rf RF-11
```

Esperado: `RF-11 FALHOU`.

- [ ] **Step 2: Implementar**

- Oito abas na ordem do Astrea.
- Leitura esconde campo vazio, com "Mostrar todos" (PA-61).
- Filtro do contato fica restrito à aba (PA-63).
- Honorários, Despesas e Timesheets usam `DS.upsell` (PA-71).
- Larguras de campo por token (PA-67).
- `.barra-acoes` fixa no adicionar (PA-68).
- Nova etiqueta abre painel lateral e volta selecionada (PA-69).
- Documentação segue só com o número (PA-70, Backlog).

Esperado: os dois modos abrem por parâmetro na mesma página.

- [ ] **Step 3: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/contatos.html
node scripts/verificar-app.js --rf RF-07,RF-11,RF-12,RF-15 --paginas contatos.html
```

Esperado: `verificar: 0 erro(s)` e os quatro RF com `ok`.

- [ ] **Step 4: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 16: Processos e casos: lista, filtro e ficha

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/processos.html && node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas processos.html`
**Aprovação:** nenhuma

**Fontes:**
- `01-varredura-modulos.md` — seção 4, lista e ficha
- `01-pontos-de-atencao.md` — PA-72 a PA-77
- `01-melhorias.md` — M18

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/processos.html`

**Interfaces:**
- Consumes: `DS.tabela`, `DS.barraFiltros`, `DS.abas`, `DS.menuAcoes` e `DADOS.PROCESSOS`.
- Produces: `?ficha=1` em `processos.html` e o link "Resultados de buscas" para `buscas.html`.

- [ ] **Step 1: Implementar**

- Duas ações com rótulo: "Adicionar processo" e "Exportar", com Imprimir e Planilha no menu (PA-72).
- Atualizar fica ao lado da contagem da lista.
- Filtro avançado na barra do DS, com chips (PA-73).
- Ficha com três abas: Resumo, Atividades e Histórico.
- Encerrar e Excluir em grupo destrutivo separado (PA-76).
- Rótulos de processo, caso e pasta seguem o Astrea (PA-77 aguarda dado).
- Link "Resultados de buscas", com texto, ao lado das ações (PA-05).

Esperado: lista e ficha na mesma página.

- [ ] **Step 2: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/processos.html
node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas processos.html
```

Esperado: `verificar: 0 erro(s)` e os três RF com `ok`.

- [ ] **Step 3: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 17: Processos e casos: adicionar e busca automática

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/processos.html && node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas processos.html`
**Aprovação:** nenhuma

**Fontes:**
- `01-varredura-modulos.md` — seção 4, formulários
- `01-pontos-de-atencao.md` — PA-74 e PA-75

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/processos.html`

**Interfaces:**
- Consumes: a lista da Task 16, `DS.campo`, `DS.stepper` e `.barra-acoes`.
- Produces: `?adicionar=processo`, `?adicionar=caso` e `?adicionar=busca` em `processos.html`.

- [ ] **Step 1: Implementar**

- Processo com os 17 campos na ordem do Astrea, em seções (PA-74).
- Caso e busca automática usam o mesmo molde de formulário (PA-75).
- Busca automática com três rádios do DS e stepper de três passos.
- "Cancelar" volta para a lista sem confirmar, como no Astrea.

Esperado: os três formulários abrem por parâmetro.

- [ ] **Step 2: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/processos.html
node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas processos.html
```

Esperado: `verificar: 0 erro(s)` e os três RF com `ok`.

- [ ] **Step 3: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 18: Alertas

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/alertas.html && node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas alertas.html`
**Aprovação:** nenhuma

**Fontes:**
- `01-varredura-modulos.md` — seção 5, Alertas
- `01-pontos-de-atencao.md` — PA-78 a PA-81

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/alertas.html`

**Interfaces:**
- Consumes: `DS.abas`, `DS.estadoVazio`, `DS.dialogo` e `DADOS.ATIVIDADES`.
- Produces: `prototipo/alertas.html` completa.

- [ ] **Step 1: Implementar**

- Nove abas na ordem do Astrea.
- Card com Visualizar, Concluir, Reagendar e Descartar.
- Um verbo só no botão e no diálogo: Descartar (PA-78).
- Texto proporcional ao efeito, sem "pode levar alguns minutos" (PA-79).
- Estado vazio único em todas as abas (PA-80).
- A mesma barra em todas as abas, com "Expandir todos" (PA-81).

Esperado: as nove abas trocam sem recarregar.

- [ ] **Step 2: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/alertas.html
node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas alertas.html
```

Esperado: `verificar: 0 erro(s)` e os três RF com `ok`.

- [ ] **Step 3: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 19: Atendimentos e Documentos

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/atendimentos.html prototipo/documentos.html && node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas atendimentos.html,documentos.html`
**Aprovação:** nenhuma

**Fontes:**
- `01-varredura-modulos.md` — seções 6 e 7
- `01-pontos-de-atencao.md` — PA-83 a PA-87

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/atendimentos.html`
- Modify: `prototipo/documentos.html`

**Interfaces:**
- Consumes: `DS.estadoVazio`, `DS.campo`, `DS.stepper` e `.barra-acoes`.
- Produces: `?adicionar=1` nas duas páginas.

- [ ] **Step 1: Implementar**

- Atendimentos: estado vazio e adicionar, com os campos do Astrea.
- "1º Registro" é área menor, que cresce com o texto (PA-83).
- Sem Responsável nem Acesso, porque PA-84 aguarda dado.
- Documentos: estado vazio e documento padrão com stepper (PA-85).
- Atalho para os modelos em Documentos (PA-86).
- Autor vazio mostra "Modelo do Astrea" (PA-87).

Esperado: os dois módulos substituem as cascas.

- [ ] **Step 2: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/atendimentos.html prototipo/documentos.html
node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas atendimentos.html,documentos.html
```

Esperado: `verificar: 0 erro(s)` e os três RF com `ok`.

- [ ] **Step 3: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 20: Administração

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/administracao.html && node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas administracao.html`
**Aprovação:** nenhuma

**Fontes:**
- `01-varredura-modulos.md` — seções 0 e 10
- `01-pontos-de-atencao.md` — PA-88 a PA-91

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/administracao.html`

**Interfaces:**
- Consumes: `DS.abas`, `DS.tabela`, `DS.radio`, `DS.dialogo`, `DS.upsell` e `.barra-acoes`.
- Produces: `administracao.html#plano`, destino de "Meu plano".

- [ ] **Step 1: Implementar**

- Seis abas na ordem do Astrea.
- Limpar a conta fica em zona separada, com confirmação (PA-88).
- Rádios de segurança seguem como no Astrea, porque PA-89 aguarda dado.
- Seção "Meu plano" explica os 40 monitorados e os 35 créditos (PA-90).
- Grupo de envolvidos usa `DS.upsell`.

Esperado: as seis abas trocam sem recarregar.

- [ ] **Step 2: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/administracao.html
node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas administracao.html
```

Esperado: `verificar: 0 erro(s)` e os três RF com `ok`.

- [ ] **Step 3: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 21: Suporte e Resultados de buscas

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/suporte.html prototipo/buscas.html && node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas suporte.html,buscas.html`
**Aprovação:** nenhuma

**Fontes:**
- `01-varredura-modulos.md` — seção 9, Suporte
- `01-inventario-css-astrea.md` — seção 0, ícone 3, e seção 11, Suporte
- `01-pontos-de-atencao.md` — PA-05 e PA-91

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/suporte.html`
- Modify: `prototipo/buscas.html`

**Interfaces:**
- Consumes: `DS.abas`, `DS.estadoVazio` e `DS.trilha`.
- Produces: as duas páginas completas.

- [ ] **Step 1: Implementar**

- Suporte: acesso à central de ajuda e seis vídeos em lista.
- Buscas: três abas, Buscas individuais, Buscas em lote e Vínculos.
- Buscas mostra trilha a partir de "Processos e casos".
- Estado vazio único nas três abas.

Esperado: as duas páginas substituem as cascas.

- [ ] **Step 2: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/suporte.html prototipo/buscas.html
node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas suporte.html,buscas.html
```

Esperado: `verificar: 0 erro(s)` e os três RF com `ok`.

- [ ] **Step 3: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 22: Módulos de upsell

**Papel:** escrita
**Verificação:** `python prototipo/verificar.py prototipo/publicacoes.html prototipo/financeiro.html prototipo/indicadores.html prototipo/ias.html && node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas publicacoes.html,financeiro.html,indicadores.html,ias.html`
**Aprovação:** nenhuma

**Fontes:**
- `01-varredura-modulos.md` — seções 8 e 9
- `01-pontos-de-atencao.md` — PA-13 e PA-71

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código

**Files:**
- Modify: `prototipo/publicacoes.html`
- Modify: `prototipo/financeiro.html`
- Modify: `prototipo/indicadores.html`
- Modify: `prototipo/ias.html`

**Interfaces:**
- Consumes: `DS.upsell` da Task 7.
- Produces: as quatro páginas completas.

- [ ] **Step 1: Implementar**

- Use `DS.upsell` nas quatro páginas, com o texto do módulo na varredura.
- Conheça as IAs usa as mesmas peças e cores, sem roxo próprio (PA-10).
- Cada cartão de IA diz só se vale no plano atual (PA-91).

Esperado: quatro páginas com a mesma peça de bloqueio.

- [ ] **Step 2: Executar e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/publicacoes.html prototipo/financeiro.html prototipo/indicadores.html prototipo/ias.html
node scripts/verificar-app.js --rf RF-07,RF-12,RF-15 --paginas publicacoes.html,financeiro.html,indicadores.html,ias.html
```

Esperado: `verificar: 0 erro(s)` e os três RF com `ok`.

- [ ] **Step 3: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

### Task 23: Fechamento e documentação

**Papel:** analise
**Verificação:** `python prototipo/test_verificar.py && python prototipo/verificar.py prototipo/README.md --todos --base-kanban --sincronia --dados-reais %TEMP%/claude/c2141aa86b014b2c/e1d32a69-043f-4e72-8a1b-7df17e0a7083/scratchpad/dados-reais.txt && node scripts/verificar-app.js`
**Aprovação:** nenhuma

**Fontes:**
- `docs/specs/2026-11-08-astrea-navegavel.md` — os critérios de aceite

**Files:**
- Modify: `prototipo/README.md`
- Modify: `README.md`
- Modify: `index.html`

**Interfaces:**
- Consumes: todas as páginas das Tasks 4 a 22.
- Produces: a suíte inteira verde, com RF-01 a RF-15.

**Aviso:** a lista de nomes reais fica fora do repositório. Nunca copie, imprima ou cite um termo dela.

- [ ] **Step 1: Atualizar a documentação**

- `prototipo/README.md`: descreva as páginas, os arquivos compartilhados e os dois portões.
- `README.md`: atualize a linha de `prototipo/` e a de `scripts/`.
- `index.html`: acrescente os links do app e do design system, depois do link do Kanban.

Esperado: nenhum documento diz que a Agenda não leva a nenhuma tela.

- [ ] **Step 2: Executar a suíte inteira**

```bash
python prototipo/test_verificar.py
python prototipo/verificar.py prototipo/README.md --todos --base-kanban --sincronia
python prototipo/verificar.py --dados-reais "$TEMP/claude/c2141aa86b014b2c/e1d32a69-043f-4e72-8a1b-7df17e0a7083/scratchpad/dados-reais.txt"
node scripts/verificar-app.js
```

Esperado: `OK`, `verificar: 0 erro(s)` nos dois comandos, e os 12 RF de navegador com `ok`.

Falha em tela de task anterior volta como correção nesta task, com `> nota:` no plano.

- [ ] **Step 3: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` nem `git commit`.

---

## Self-Review

- [ ] Todo `### Task N` usa a palavra inglesa `Task`.
- [ ] Toda task tem `Papel`: `busca`, `escrita` ou `analise`.
- [ ] Toda task tem `Verificação` com um comando.
- [ ] Toda task tem `Aprovação`: `nenhuma`, ou `exige — <a acao exata>`.
- [ ] Task marcada `exige` e a que PRODUZ o efeito externo ao executar. Task
      que so altera codigo executado depois pelo humano escreve `nenhuma`.
- [ ] O comando de `Verificação` executa a partir da raiz do repositorio.
- [ ] Toda task tem `Fontes`, com caminho ou com a palavra `nenhuma`.
- [ ] Todo caminho de `Fontes` existe no disco.
- [ ] Todo caminho no comando de `Verificação` existe no disco, ou nasce em
      `Files` de alguma task.
- [ ] Todo item de `Files` tem prefixo `Create`, `Test`, `Modify` ou `Delete`.
- [ ] Todo passo tem comando e resultado esperado.
- [ ] Todo bloco de teste esta inteiro, sem reticencia.
- [ ] Todo bloco de codigo usa cerca, nunca indentacao de quatro espacos.
- [ ] Toda task tem `Interfaces`, com `Consumes` e `Produces`.
- [ ] Nenhuma task depende de arquivo que nenhuma task anterior criou.
