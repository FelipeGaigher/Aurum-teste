<!-- grau 1: sem spec. O plano e o contrato. -->

# Protótipo local do Kanban da Q3 — Implementation Plan

> **Para quem executa:** use a skill `executar-plano`, que substitui `superpowers:executing-plans` e tem precedencia sobre `superpowers:subagent-driven-development`. Os steps usam checkbox (`- [ ]`) para o progresso.

**Goal:** um Kanban navegável em `prototipo/kanban.html`, que abre sem rede e prova o contrato de `03-tela.md`.

**Architecture:** um arquivo HTML único, com CSS e JS embutidos. Um script Python ao lado executa as verificações estáticas e as skills instaladas. O `prototipo/README.md` explica como abrir e o que é fictício.

**Tech Stack:** HTML, CSS com `light-dark()` e `:has()`, JS sem biblioteca. Python 3.13 com `unittest` para o verificador.

## Global Constraints

Copiadas do pedido, `docs/pedidos/2026-11-07-kanban-prototipo.md`:

- Arquivo único em `prototipo/kanban.html`: CSS e JS embutidos, sem build, sem CDN, sem dependência externa.
- O arquivo abre com dois cliques, ou por `python -m http.server 8000` na raiz do repositório.
- Toda cor, raio, espaço e tipografia vem de variável CSS declarada em `:root`.
- Três camadas de token com os nomes do contrato: `--primitive-*`, depois `--color-*`, `--space-*`, `--radius` e `--font-*`.
- Nenhum hex fora do bloco de primitivos. O primitivo azul parte de `#008fd5`. Um raio só.
- `--font-sans` declara IBM Plex Sans primeiro, com fallback de sistema.
- Tema claro e escuro: segue o sistema e tem chave visível, só com CSS.
- Dez atividades fictícias, num array do JS. Processo no padrão CNJ, prazos nos próximos dez dias, dois vencidos.
- Fora do escopo: persistência, criar atividade de verdade, Agenda, Área de trabalho em lista, versão para celular.

Critérios de aceite do pedido:

1. `python ~/.claude/skills/sem-plastico/scripts/detectar.py prototipo/kanban.html` devolve 0.
2. `grep -nE "#[0-9a-fA-F]{3,8}\b" prototipo/kanban.html` só acha linhas dentro do bloco `:root` de primitivos.
3. Arrastar um card para outra coluna altera a contagem das duas colunas.
4. Tab percorre filtros, botão, cards e colunas, com foco visível em todos.
5. Em janela de 1280px e de 1920px, a página não tem rolagem horizontal.
6. O tema escuro troca pelo sistema e pela chave, sem recarregar.
7. Nenhuma dependência externa: o arquivo abre sem rede.

O verificador da Task 1 cobre os critérios 1, 2 e 7 sem navegador. O portão executa a `Verificação` pelo `cmd.exe` no Windows, onde `~` não expande. Por isso nenhum comando de `Verificação` cita a skill pelo `~`: o verificador resolve o caminho por `Path.home()`.

Os critérios 3 a 6 pedem navegador. Cada task prova os seus num navegador headless, nunca numa janela na tela do humano.

## Fontes

| Caminho | O que decide |
|---|---|
| `docs/pedidos/2026-11-07-kanban-prototipo.md` | o que vira código, os critérios de aceite e o fora do escopo |
| `03-tela.md` | o contrato da tela: cada decisão da Q1 e da Q2 visível no Kanban |
| `01-inventario-ui.md` | as cores atuais e os componentes vistos, o "antes" |
| `01-telas-observadas.md` | a tela 11 descreve a moldura a preservar; as telas 04 e 07 descrevem foco e rótulo |
| `evidencias/08-area-de-trabalho-vazia.png` | o print da tela 11 |
| `03-pesquisa-astrea.md` | as colunas do Kanban e os tipos de atividade |
| `02-plano-ds.md` | o slide 1: as camadas de token e o formato dos nomes |

## Skills

As skills moram fora do repositório. Por isso ficam fora do campo `Fontes`, que o pré-voo resolve contra a raiz.

| Caminho | O que decide |
|---|---|
| `~/.claude/skills/sem-plastico/SKILL.md` | as regras contra a cara de IA; toda task de UI lê antes do código |
| `~/.claude/skills/sem-plastico/scripts/detectar.py` | o detector que o verificador executa |
| `~/.claude/skills/sem-plastico/scripts/contraste.py` | a razão de contraste WCAG de um par de cores |
| `~/.claude/plugins/cache/claude-plugins-official/frontend-design/1.1.1/skills/frontend-design/SKILL.md` | a direção visual: paleta, tipografia e escala |
| `~/.claude/skills/portugues-tecnico/scripts/check_docs.py` | o linter de prosa que o verificador executa no `.md` |

---

### Task 1: Verificador estático do protótipo

**Papel:** escrita
**Verificação:** `python prototipo/test_verificar.py`
**Aprovação:** nenhuma

**Fontes:**
- `docs/pedidos/2026-11-07-kanban-prototipo.md` — os critérios 1, 2 e 7, que o verificador cobre

**Skills:**
- `~/.claude/skills/sem-plastico/scripts/detectar.py` — o detector executado no `.html`
- `~/.claude/skills/portugues-tecnico/scripts/check_docs.py` — o linter executado no `.md`

**Files:**
- Create: `prototipo/verificar.py`
- Test: `prototipo/test_verificar.py`

**Interfaces:**
- Consumes: nada.
- Produces: `python prototipo/verificar.py <arquivo.html|arquivo.md> [...]` — sai com 0 sem erro, 1 com erro, 2 sem argumento.
- Produces: `checar_texto(texto, nome) -> list[str]` — as três regras estáticas do `.html`.
- Produces: `checar(caminho: Path) -> list[str]` — escolhe a regra pela extensão.
- Produces: os marcadores de bloco `/* primitivos */`, `/* fim dos primitivos */`, `/* semanticos */` e `/* fim dos semanticos */`, que a Task 2 escreve no CSS.

- [x] **Step 1: Escrever o teste que falha**

Grave `prototipo/test_verificar.py` com este conteúdo:

```python
import tempfile
import unittest
from pathlib import Path

import verificar

LIMPO = """<style>
/* primitivos */
:root { --primitive-blue-500: #008fd5; }
/* fim dos primitivos */
/* semanticos */
:root { --color-action: var(--primitive-blue-500); }
/* fim dos semanticos */
.botao { background: var(--color-action); }
</style>
<svg xmlns="http://www.w3.org/2000/svg"></svg>
"""


class ChecarTexto(unittest.TestCase):
    def test_arquivo_limpo_passa(self):
        self.assertEqual(verificar.checar_texto(LIMPO, 'k.html'), [])

    def test_hex_fora_dos_primitivos_acusa_a_linha(self):
        texto = LIMPO.replace('var(--color-action); }', '#008fd5; }')
        erros = verificar.checar_texto(texto, 'k.html')
        self.assertEqual(len(erros), 1)
        self.assertIn('k.html:8: hex fora do bloco de primitivos', erros[0])

    def test_primitivo_fora_do_semantico_acusa(self):
        texto = LIMPO.replace('var(--color-action); }', 'var(--primitive-blue-500); }')
        erros = verificar.checar_texto(texto, 'k.html')
        self.assertIn('k.html:8: primitivo fora do bloco semantico', erros[0])

    def test_referencia_de_rede_acusa(self):
        texto = LIMPO + '<link href="https://fonts.example/a.css">\n'
        erros = verificar.checar_texto(texto, 'k.html')
        self.assertIn('k.html:11: referencia de rede', erros[0])

    def test_xmlns_do_svg_nao_conta_como_rede(self):
        self.assertNotIn('rede', ' '.join(verificar.checar_texto(LIMPO, 'k.html')))

    def test_bloco_sem_marcador_acusa(self):
        texto = LIMPO.replace('/* fim dos primitivos */', '')
        erros = verificar.checar_texto(texto, 'k.html')
        self.assertIn('bloco primitivos sem os marcadores', erros[0])


class Checar(unittest.TestCase):
    def test_arquivo_ausente_acusa(self):
        erros = verificar.checar(Path('nao-existe.html'))
        self.assertEqual(erros, ['nao-existe.html: arquivo nao existe.'])

    def test_extensao_fora_do_contrato_acusa(self):
        with tempfile.TemporaryDirectory() as pasta:
            caminho = Path(pasta) / 'nota.txt'
            caminho.write_text('x', encoding='utf-8')
            erros = verificar.checar(caminho)
        self.assertIn('extensao fora do contrato', erros[0])


if __name__ == '__main__':
    unittest.main()
```

- [x] **Step 2: Executar e confirmar a falha**

```bash
python prototipo/test_verificar.py
```

Esperado: `ModuleNotFoundError: No module named 'verificar'`.

- [x] **Step 3: Implementar**

Grave `prototipo/verificar.py` com este conteúdo. O rascunho passou nos oito testes acima.

```python
"""Portao do prototipo do Kanban.

Uso: python prototipo/verificar.py <arquivo.html|arquivo.md> [...]

No .html: hex so no bloco de primitivos, primitivo so no bloco semantico,
nenhuma referencia de rede, e o detector da skill sem-plastico.
No .md: o linter da skill portugues-tecnico.
"""
import os
import re
import subprocess
import sys
from pathlib import Path

SKILLS = Path.home() / '.claude' / 'skills'
DETECTOR = SKILLS / 'sem-plastico' / 'scripts' / 'detectar.py'
LINTER = SKILLS / 'portugues-tecnico' / 'scripts' / 'check_docs.py'

BLOCOS = {
    'primitivos': ('/* primitivos */', '/* fim dos primitivos */'),
    'semanticos': ('/* semanticos */', '/* fim dos semanticos */'),
}
HEX = re.compile(r'#[0-9a-fA-F]{3,8}\b')
PRIMITIVO = re.compile(r'var\(\s*--primitive-')
REDE = re.compile(r'https?://|(?:src|href)\s*=\s*["\']?//|@import', re.I)
XMLNS_SVG = 'http://www.w3.org/2000/svg'


def _linhas_do_bloco(linhas, abre, fecha):
    """Numeros das linhas entre os dois marcadores, inclusive."""
    dentro, numeros = False, set()
    for numero, linha in enumerate(linhas, 1):
        if abre in linha:
            dentro = True
        if dentro:
            numeros.add(numero)
        if fecha in linha:
            dentro = False
    return numeros


def checar_texto(texto, nome):
    """As tres regras estaticas do .html. Devolve a lista de erros."""
    linhas = texto.splitlines()
    erros, blocos = [], {}
    for bloco, (abre, fecha) in BLOCOS.items():
        if abre not in texto or fecha not in texto:
            erros.append('%s: bloco %s sem os marcadores "%s" e "%s".'
                         % (nome, bloco, abre, fecha))
        blocos[bloco] = _linhas_do_bloco(linhas, abre, fecha)
    for numero, linha in enumerate(linhas, 1):
        onde = '%s:%d' % (nome, numero)
        if HEX.search(linha) and numero not in blocos['primitivos']:
            erros.append('%s: hex fora do bloco de primitivos: %s'
                         % (onde, linha.strip()))
        if PRIMITIVO.search(linha) and numero not in blocos['semanticos']:
            erros.append('%s: primitivo fora do bloco semantico: %s'
                         % (onde, linha.strip()))
        if REDE.search(linha.replace(XMLNS_SVG, '')):
            erros.append('%s: referencia de rede: %s' % (onde, linha.strip()))
    return erros


def _executar(script, caminho):
    """Executa o script de uma skill instalada. Codigo diferente de 0 e erro."""
    if not script.is_file():
        return ['%s: script ausente. Instale a skill que o traz.' % script]
    ambiente = dict(os.environ, PYTHONIOENCODING='utf-8')
    proc = subprocess.run([sys.executable, str(script), str(caminho)],
                          capture_output=True, env=ambiente)
    saida = (proc.stdout + proc.stderr).decode('utf-8', 'replace').strip()
    if saida:
        print(saida)
    if proc.returncode == 0:
        return []
    return ['%s saiu com %d para %s.' % (script.name, proc.returncode, caminho)]


def checar(caminho):
    if not caminho.is_file():
        return ['%s: arquivo nao existe.' % caminho]
    if caminho.suffix == '.html':
        texto = caminho.read_text(encoding='utf-8')
        return checar_texto(texto, str(caminho)) + _executar(DETECTOR, caminho)
    if caminho.suffix == '.md':
        return _executar(LINTER, caminho)
    return ['%s: extensao fora do contrato. Use .html ou .md.' % caminho]


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    if not argv:
        print('uso: python prototipo/verificar.py <arquivo.html|arquivo.md> [...]')
        return 2
    erros = [erro for nome in argv for erro in checar(Path(nome))]
    for erro in erros:
        print(erro)
    print('verificar: %d erro(s)' % len(erros))
    return 1 if erros else 0


if __name__ == '__main__':
    sys.exit(main())
```

- [x] **Step 4: Executar e confirmar que passa**

```bash
python prototipo/test_verificar.py
```

Esperado: `Ran 8 tests` e `OK`.

- [x] **Step 5: Confirmar o vermelho da Task 2**

```bash
python prototipo/verificar.py prototipo/kanban.html
```

Esperado: `prototipo/kanban.html: arquivo nao existe.` e código 1. A Task 2 cria o arquivo.

- [x] **Step 6: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` e não execute `git commit`. O plano é do pai: ele marca o checkbox e commita por caminho, depois do portão.

---

### Task 2: Esqueleto, tokens em três camadas, tema e moldura

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/kanban.html`
**Aprovação:** nenhuma

**Fontes:**
- `docs/pedidos/2026-11-07-kanban-prototipo.md` — as seções Onde, Tokens e O que a tela mostra
- `03-tela.md` — a tabela do contrato e a seção Direção visual
- `02-plano-ds.md` — o slide 1: as três coleções e o formato `categoria.papel.variante`
- `01-inventario-ui.md` — os três azuis e os três cinzas de hoje, que a escala única substitui
- `01-telas-observadas.md` — a tela 11: a moldura a preservar e as chamadas comerciais a tirar
- `evidencias/08-area-de-trabalho-vazia.png` — o print da tela 11

**Skills:**
- `~/.claude/plugins/cache/claude-plugins-official/frontend-design/1.1.1/skills/frontend-design/SKILL.md` — a direção visual, a paleta e a escala tipográfica
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código, com `references/escala.md` e `references/profundidade.md`
- `~/.claude/skills/sem-plastico/scripts/contraste.py` — mede cada par de texto e fundo

**Files:**
- Create: `prototipo/kanban.html`

**Interfaces:**
- Consumes: `python prototipo/verificar.py` e os quatro marcadores de bloco da Task 1.
- Produces: o `<style>` com três blocos `:root`, nesta ordem: `/* primitivos */`, `/* semanticos */` e `/* componentes */`, cada um com o marcador `/* fim dos ... */`.
- Produces: os tokens semânticos `--color-bg-page`, `--color-bg-surface`, `--color-bg-subtle`, `--color-text-default`, `--color-text-muted`, `--color-text-danger`, `--color-text-warning`, `--color-border-default`, `--color-action`, `--color-action-text` e `--color-focus`.
- Produces: `--space-1` a `--space-6`, `--radius`, `--font-sans`, `--font-size-*` e `--font-weight-*`.
- Produces: a regra única de foco, `:focus-visible` com `outline` em `var(--color-focus)`.
- Produces: a chave de tema, um `fieldset` com os rádios `#tema-sistema`, `#tema-claro` e `#tema-escuro`.
- Produces: `<main id="conteudo">` com `<h1>Área de trabalho</h1>`, depois `<div id="ferramentas">`, `<div id="quadro">` e `<footer id="rodape-demo">`, vazios.

O pedido nomeia as camadas primitiva e semântica. A camada de componente não tem prefixo no pedido. Este plano usa `--component-*`, pelo nome da coleção Component do slide 1. Um token de componente aponta só para token semântico. Uma regra CSS usa só token semântico ou de componente, nunca primitivo.

- [x] **Step 1: Escrever a direção visual**

Leia a `frontend-design` e a `sem-plastico` antes do código. Escreva o plano de direção no seu relatório, não no HTML. Um comentário no HTML com hex derruba o verificador.

O plano cobre quatro itens:

1. Paleta de 4 a 6 cores com nome e hex. O azul parte de `#008fd5`. Um azul de ação e uma escala de cinza.
2. Tipografia: `--font-sans` com IBM Plex Sans primeiro, a escala e os pesos.
3. Layout em ASCII: cabeçalho, menu lateral, área do Kanban e rodapé da demonstração.
4. Princípios: densidade de quem olha trinta cards por dia, um raio só, sem arredondado de consumo.

Compare o plano com o default que você produziria para qualquer Kanban. Altere o que for default e registre o porquê no relatório.

- [x] **Step 2: Executar o verificador e confirmar a falha**

```bash
python prototipo/verificar.py prototipo/kanban.html
```

Esperado: `prototipo/kanban.html: arquivo nao existe.` e código 1.

- [x] **Step 3: Escrever os tokens e o tema**

O rascunho abaixo mostra a forma. Os valores de hex saem da direção do Step 1.

```css
/* primitivos */
:root {
  --primitive-blue-500: #008fd5;
  --primitive-blue-600: #0072ab;
  --primitive-gray-0: #ffffff;
  --primitive-gray-900: #1b1f24;
  --primitive-space-4: 4px;
  --primitive-radius-4: 4px;
}
/* fim dos primitivos */

/* semanticos */
:root {
  color-scheme: light dark;
  --color-bg-page: light-dark(var(--primitive-gray-0), var(--primitive-gray-900));
  --color-action: light-dark(var(--primitive-blue-600), var(--primitive-blue-500));
  --space-1: var(--primitive-space-4);
  --radius: var(--primitive-radius-4);
  --font-sans: "IBM Plex Sans", system-ui, "Segoe UI", Roboto, sans-serif;
}
:root:has(#tema-claro:checked) { color-scheme: light; }
:root:has(#tema-escuro:checked) { color-scheme: dark; }
/* fim dos semanticos */

/* componentes */
:root {
  --component-card-bg: var(--color-bg-surface);
}
/* fim dos componentes */
```

Siga estas regras:

- Cada token semântico declara o valor claro e o escuro num `light-dark()` só.
- A chave de tema é CSS puro. O rádio `#tema-sistema` vem marcado, e o tema segue o sistema.
- O texto branco sobre `#008fd5` mede 3,57:1 e falha no AA. O fundo de ação usa um degrau mais escuro: `#0072ab` mede 5,26:1.
- Meça cada par de texto e fundo, nos dois temas, com o `contraste.py`.
- Um raio só: `--radius`. A inicial do responsável e o chip usam o mesmo raio.
- Nada de entidade numérica como `&#8212;`. Ela casa a regra do hex. Escreva o caractere literal.
- Nenhum `id` só com letras de `a` a `f`, como `#face`. Ele também casa a regra do hex.

```bash
python ~/.claude/skills/sem-plastico/scripts/contraste.py "#ffffff" "#0072ab"
```

Esperado: `5.26:1  AA texto normal: passa`. Todo par de texto do protótipo passa no AA normal.

> nota: o logotipo "astrea" em texto é a exceção. Ele usa o azul da marca,
> `#008fd5`, com 3,57:1 sobre branco. O WCAG 1.4.3 isenta logotipo. O token
> do logo se chama `--color-logo`, e nenhum outro elemento o usa. Assim a
> exceção não vaza para texto comum. `--color-text-brand` sai.
> Decisão do pai na revisão 1, reversível.

- [x] **Step 4: Escrever a moldura**

A moldura é a da tela 11, sem a faixa de campanha, sem o selo e sem o botão verde.

- Cabeçalho: logo Astrea em texto, busca global e menu do usuário com o nome fictício.
- A busca global tem `<label>` associado. O placeholder nunca é o único rótulo.
- A palavra da tela é "atividade". "Tarefa" aparece só como tipo, no chip.
- O menu lateral tem os dez itens da tela 11, na ordem dela.
- "Área de trabalho" leva `aria-current="page"`. Os outros itens são `<a>` sem destino real.
- A chave de tema fica no cabeçalho, ao lado do menu do usuário.
- O cabeçalho fixo não cobre o foco: declare `scroll-padding-top` com a altura dele.
- O logo e os ícones usam `currentColor` ou token. Hex dentro de SVG derruba o verificador.

> nota: o pedido descreveu o cabeçalho sem os cinco ícones e o menu sem o
> Suporte. O contrato em `03-tela.md` pede que o usuário reconheça a casa.
> Então o cabeçalho mantém os cinco ícones da tela 11. Cada um leva
> `aria-label` e título visível ao passar o mouse. O menu mantém o item
> Suporte depois do divisor. O item "Conheça as IAs" sai. IA entra no
> padrão dos outros componentes, não como item de menu em cor própria.

O `#quadro` fica vazio nesta task. Os cards nascem na Task 3.

- [x] **Step 5: Executar o verificador e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/kanban.html
```

Esperado: `verificar: 0 erro(s)` e código 0. Avisos do detector saem na tela e não reprovam. Leia cada aviso e justifique no relatório.

- [x] **Step 6: Provar largura, tema e rede no navegador headless**

Use um navegador headless, como o Playwright MCP. Nunca abra janela na tela do humano. Sem navegador headless, registre os três critérios como não provados no relatório.

1. Abra `prototipo/kanban.html` por `file://` em 1280x800 e em 1920x1080.
2. Avalie `document.documentElement.scrollWidth <= window.innerWidth` nas duas larguras.
3. Emule `prefers-color-scheme: dark` e leia o `background-color` do `body`.
4. Volte para o tema claro e clique no rótulo do rádio `#tema-escuro`.
5. Leia o registro de rede da página.

Esperado: `true` nas duas larguras. O fundo troca pelo sistema e pela chave, sem recarregar. A rede mostra só o próprio arquivo.

- [x] **Step 7: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` e não execute `git commit`. O plano é do pai: ele marca o checkbox e commita por caminho, depois do portão.

---

### Task 3: Colunas, cards, chips e estados

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/kanban.html`
**Aprovação:** nenhuma

**Fontes:**
- `docs/pedidos/2026-11-07-kanban-prototipo.md` — as seções O que a tela mostra e Dado fictício
- `03-tela.md` — prazo fatal com cor e texto, IA no mesmo chip, número é texto, componentes do DS
- `03-pesquisa-astrea.md` — as três colunas e os quatro tipos de atividade
- `01-inventario-ui.md` — o vocabulário: atividade no lugar de tarefa

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código; card só quando o item é unidade autônoma

**Files:**
- Modify: `prototipo/kanban.html`

**Interfaces:**
- Consumes: os tokens, a regra de foco e os contêineres `#quadro` e `#rodape-demo` da Task 2.
- Produces: `const COLUNAS` — `[{status: 'a-fazer', nome: 'A fazer'}, {status: 'fazendo', nome: 'Fazendo'}, {status: 'concluido', nome: 'Concluído'}]`.
- Produces: `const ATIVIDADES` — dez objetos com `id`, `titulo`, `tipo`, `processo`, `responsavel`, `prazoEmDias`, `status` e `sugestaoIa` opcional.
- Produces: `const estado` — `{atividades, modo}`, com `modo` entre `'dados'`, `'carregando'` e `'vazio'`.
- Produces: `render() -> void` — redesenha as três colunas a partir de `estado`.
- Produces: `anunciar(texto) -> void` — escreve na região `#anuncio`, com `aria-live="polite"`.
- Produces: no DOM, `section.coluna[data-status]` com `tabindex="0"`, a contagem em `.coluna-contagem` e cada card em `article.card[data-id]`.

- [x] **Step 1: Escrever o dado fictício**

O prazo é relativo ao dia de hoje. Assim "vence hoje" e "vencido" aparecem em qualquer dia de demonstração. Os números de processo abaixo têm dígito verificador válido pelo módulo 97 do CNJ.

```js
const COLUNAS = [
  { status: 'a-fazer', nome: 'A fazer' },
  { status: 'fazendo', nome: 'Fazendo' },
  { status: 'concluido', nome: 'Concluído' },
];

const ATIVIDADES = [
  { id: 'a1', titulo: 'Protocolar contestação', tipo: 'prazo', processo: '5004213-75.2025.8.24.0023', responsavel: 'Rafael Antunes', prazoEmDias: -2, status: 'a-fazer' },
  { id: 'a2', titulo: 'Audiência de conciliação', tipo: 'audiencia', processo: '0301877-92.2024.8.24.0008', responsavel: 'Marina Couto', prazoEmDias: 0, status: 'a-fazer' },
  { id: 'a3', titulo: 'Reunião com a cliente sobre o acordo', tipo: 'evento', processo: '5012940-75.2025.8.24.0038', responsavel: 'Beatriz Lemos', prazoEmDias: 1, status: 'a-fazer' },
  { id: 'a4', titulo: 'Opor embargos de declaração', tipo: 'prazo', processo: '0007315-64.2023.8.24.0023', responsavel: 'Otávio Prado', prazoEmDias: 2, status: 'a-fazer' },
  { id: 'a5', titulo: 'Manifestar sobre o laudo pericial', tipo: 'prazo', processo: '5020066-92.2024.8.24.0045', responsavel: 'Rafael Antunes', prazoEmDias: 5, status: 'a-fazer', sugestaoIa: 'Criada pela IA a partir de uma publicação' },
  { id: 'a6', titulo: 'Juntar procuração atualizada', tipo: 'tarefa', processo: '5001789-08.2025.8.24.0008', responsavel: 'Beatriz Lemos', prazoEmDias: -1, status: 'fazendo' },
  { id: 'a7', titulo: 'Interpor recurso de apelação', tipo: 'prazo', processo: '0312054-93.2022.8.24.0038', responsavel: 'Marina Couto', prazoEmDias: 3, status: 'fazendo' },
  { id: 'a8', titulo: 'Calcular custas finais', tipo: 'tarefa', processo: '5009427-81.2024.8.24.0023', responsavel: 'Otávio Prado', prazoEmDias: 4, status: 'fazendo' },
  { id: 'a9', titulo: 'Preparar rol de testemunhas', tipo: 'tarefa', processo: '5016603-51.2025.8.24.0064', responsavel: 'Marina Couto', prazoEmDias: 8, status: 'concluido' },
  { id: 'a10', titulo: 'Apresentar contrarrazões', tipo: 'prazo', processo: '0004981-88.2023.8.24.0045', responsavel: 'Rafael Antunes', prazoEmDias: 10, status: 'concluido' },
];
```

- [x] **Step 2: Escrever o card**

O card tem cinco dados, nesta ordem visual:

1. O prazo fatal, o dado dominante. Texto e cor juntos: "Vencido há 2 dias", "Vence hoje", "Vence em 12/11".
2. O título da atividade, num `h3`.
3. O tipo em chip: Tarefa, Evento, Prazo ou Audiência.
4. O processo vinculado, como texto. Número não leva a cor de ação.
5. O responsável, com a inicial e o nome.

Siga estas regras:

- Vencido usa `--color-text-danger`. Vence hoje usa `--color-text-warning`. Os dois levam texto, nunca só cor.
- Card na coluna Concluído não leva cor de alerta no prazo.
- Dentro da coluna, os cards seguem a ordem do prazo, o mais urgente primeiro.
- Monte o DOM com `createElement` e `textContent`, nunca com `innerHTML` sobre o dado.
- O card é `article` com `tabindex="0"` e `draggable="true"`. Ele não é `button`, porque o card da IA tem botões dentro.

- [x] **Step 3: Escrever a sugestão de IA**

O card `a5` traz o chip "Sugestão da IA", no mesmo componente e na mesma cor dos outros chips. Nada de roxo à parte e nada de ícone de brilho.

- O chip traz dois botões: "Confirmar" e "Desfazer".
- Confirmar mantém o card e tira o chip.
- Desfazer tira o card do quadro e atualiza a contagem.
- Os dois chamam `anunciar()` com o resultado, como "Sugestão confirmada".

- [x] **Step 4: Escrever as colunas e os estados**

Cada coluna é `section.coluna` com `data-status`, `tabindex="0"` e `aria-labelledby` no `h2`. O `h2` traz o nome e a contagem em `.coluna-contagem`.

- Coluna sem card mostra o estado vazio: "Nenhuma atividade em Fazendo." e um convite, como "Arraste um card para cá."
- O modo `carregando` mostra cards de esqueleto e marca as colunas com `aria-busy="true"`.
- A animação do esqueleto para com `prefers-reduced-motion: reduce`.
- O modo `vazio` mostra as três colunas no estado vazio.
- O `#rodape-demo` traz um grupo de rádios rotulado "Estado da demonstração": Com dados, Carregando, Vazio.
- Trocar o rádio altera `estado.modo` e chama `render()`.

- [x] **Step 5: Executar o verificador e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/kanban.html
```

Esperado: `verificar: 0 erro(s)` e código 0.

- [x] **Step 6: Provar os estados no navegador headless**

Use um navegador headless. Nunca abra janela na tela do humano.

1. Abra o arquivo em 1280x800 e leia a contagem das três colunas.
2. Clique em Confirmar no card `a5` e depois recarregue a página.
3. Clique em Desfazer no card `a5`.
4. Marque Carregando e depois Vazio, no rodapé.
5. Avalie `document.documentElement.scrollWidth <= window.innerWidth` em 1280 e em 1920.

Esperado: A fazer 5, Fazendo 3, Concluído 2. Confirmar tira o chip. Desfazer leva A fazer a 4. Carregando mostra o esqueleto, e Vazio mostra as três colunas vazias. A largura dá `true` nas duas janelas.

- [x] **Step 7: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` e não execute `git commit`. O plano é do pai: ele marca o checkbox e commita por caminho, depois do portão.

---

### Task 4: Arrastar, teclado, filtros e painel de criar

**Papel:** analise
**Verificação:** `python prototipo/verificar.py prototipo/kanban.html`
**Aprovação:** nenhuma

**Fontes:**
- `docs/pedidos/2026-11-07-kanban-prototipo.md` — arrastar, setas do teclado, filtros e o painel sem salvar
- `03-tela.md` — rótulo fixo acima, um token de foco, o mesmo seletor nos filtros
- `01-telas-observadas.md` — as telas 04 e 07: dois estilos de foco e campo sem rótulo, o "antes"
- `01-inventario-ui.md` — o seletor nativo no meio dos componentes customizados

**Skills:**
- `~/.claude/skills/sem-plastico/SKILL.md` — leia antes do código, com `references/acessibilidade.md`

**Files:**
- Modify: `prototipo/kanban.html`

**Interfaces:**
- Consumes: `COLUNAS`, `ATIVIDADES`, `estado`, `render()`, `anunciar()`, `.coluna[data-status]` e `.card[data-id]` da Task 3.
- Produces: `moverAtividade(id, status) -> void` — altera o status, chama `render()` e devolve o foco ao card movido.
- Produces: `estado.filtros` — `{responsavel, tipo, periodo}`, cada um com o valor `'todos'` por padrão.
- Produces: `atividadesVisiveis() -> Atividade[]` — as atividades que passam nos três filtros. O `render()` passa a usar esta lista.
- Produces: `<dialog id="painel-criar">` — o painel de criar atividade, sem salvar.

- [x] **Step 1: Escrever o arrastar**

- `dragstart` no card grava o `id` no `dataTransfer`.
- `dragover` na coluna chama `preventDefault()` e marca a coluna de destino com um token.
- `drop` na coluna chama `moverAtividade(id, status)`.
- `moverAtividade` chama `anunciar()` com o destino e as duas contagens, como "Movida para Fazendo. A fazer: 4. Fazendo: 4."

- [x] **Step 2: Escrever o teclado**

- Seta para a direita no card em foco move o card para a coluna seguinte.
- Seta para a esquerda move o card para a coluna anterior.
- Na primeira e na última coluna, a seta não faz nada.
- A seta só age quando o foco está no próprio card, nunca num campo ou botão dentro dele.
- Depois do movimento, o foco fica no card, já na coluna nova.

- [x] **Step 3: Escrever os filtros e o botão**

O `#ferramentas` vem antes do `#quadro` no DOM. Assim o Tab passa por filtros, botão, colunas e cards, nesta ordem.

| Filtro | Opções |
|---|---|
| Responsável | Todos, e os quatro nomes do dado |
| Tipo | Todos, Tarefa, Evento, Prazo, Audiência |
| Período | Todo o período, Vencidas, Hoje, Próximos 7 dias |

Siga estas regras:

- Os três filtros usam o mesmo seletor: um `<select>` com `appearance: none` e os tokens do DS.
- Cada filtro tem `<label>` fixo acima. O rótulo não some quando o filtro tem valor.
- A contagem da coluna mostra os cards visíveis depois do filtro.
- O botão "Criar atividade" é o único elemento com `--color-action` de fundo.

- [x] **Step 4: Escrever o painel de criar**

O botão abre `<dialog id="painel-criar">` por `showModal()`. O painel não salva nada.

- Campos com `<label>` fixo acima: Título, Tipo, Processo, Responsável, Prazo fatal.
- Um botão "Fechar" e uma linha de texto: "O protótipo não salva atividades."
- Esc e Fechar fecham o painel. O foco volta ao botão "Criar atividade".

- [x] **Step 5: Executar o verificador e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/kanban.html
```

Esperado: `verificar: 0 erro(s)` e código 0.

- [x] **Step 6: Provar arrastar, teclado e Tab no navegador headless**

Use um navegador headless. Nunca abra janela na tela do humano.

1. Arraste o card `a2` de A fazer para Fazendo e leia as duas contagens.
2. Foque o card `a7` e pressione a seta para a direita.
3. Pressione Tab a partir do topo da página e grave a sequência de `document.activeElement`.
4. Tire uma captura de cada tipo de elemento em foco: campo, botão, coluna e card.
5. Filtre o tipo Prazo e leia as contagens.
6. Abra o painel, pressione Esc e leia o `document.activeElement`.
7. Repita a prova de largura e de tema do Step 6 da Task 2.

Esperado: A fazer vai de 5 a 4, e Fazendo vai de 3 a 4. O `a7` passa para Concluído e segue em foco. A sequência do Tab passa por filtros, botão, colunas e cards. Cada captura mostra o contorno de `--color-focus`. O filtro Prazo deixa só cards do tipo Prazo, e a contagem acompanha. O foco volta ao botão "Criar atividade". Largura e tema seguem como na Task 2.

- [x] **Step 7: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` e não execute `git commit`. O plano é do pai: ele marca o checkbox e commita por caminho, depois do portão.

---

### Task 5: README do protótipo

**Papel:** escrita
**Verificação:** `python prototipo/verificar.py prototipo/kanban.html prototipo/README.md`
**Aprovação:** nenhuma

**Fontes:**
- `docs/pedidos/2026-11-07-kanban-prototipo.md` — como abrir, o dado fictício, os critérios e o fora do escopo
- `03-tela.md` — os itens marcados `> aberto:`

**Skills:**
- `~/.claude/skills/portugues-tecnico/SKILL.md` — toda a prosa do README segue a skill

**Files:**
- Create: `prototipo/README.md`

**Interfaces:**
- Consumes: `prototipo/kanban.html` das Tasks 2 a 4, e `prototipo/verificar.py` da Task 1.
- Produces: `prototipo/README.md`.

- [ ] **Step 1: Executar o verificador e confirmar a falha**

```bash
python prototipo/verificar.py prototipo/kanban.html prototipo/README.md
```

Esperado: `prototipo/README.md: arquivo nao existe.` e código 1.

- [ ] **Step 2: Escrever o README**

Leia `prototipo/kanban.html` antes de escrever. O README descreve o que o arquivo faz, não o que o plano pediu.

O README tem cinco seções, nesta ordem:

1. Como abrir: dois cliques no arquivo, ou `python -m http.server 8000` na raiz e `http://localhost:8000/prototipo/kanban.html`.
2. O que é fictício: as dez atividades, os nomes e os processos. A sugestão de IA e o painel também.
3. O que fica fora: persistência, Agenda, Área de trabalho em lista e versão para celular.
4. O que está aberto: a família tipográfica, onde o Kanban mora no produto e a decisão difícil, todos de `03-tela.md`.
5. Como verificar: `python prototipo/test_verificar.py` e `python prototipo/verificar.py prototipo/kanban.html`.

Na seção 4, registre que IBM Plex Sans só aparece quando a fonte está instalada. Sem ela, a tela usa a fonte do sistema.

- [ ] **Step 3: Executar o verificador e confirmar que passa**

```bash
python prototipo/verificar.py prototipo/kanban.html prototipo/README.md
```

Esperado: `prototipo\README.md: 0 erro(s)` vindo do linter, `verificar: 0 erro(s)` e código 0.

- [ ] **Step 4: Entregar**

Liste na resposta os caminhos da seção Files. Não marque checkbox, não execute `git add` e não execute `git commit`. O plano é do pai: ele marca o checkbox e commita por caminho, depois do portão.

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
