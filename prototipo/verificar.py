"""Portao do prototipo do Astrea.

Uso: python prototipo/verificar.py <arquivo> [...] [--todos]
         [--base-kanban [commit]] [--sincronia] [--dados-reais lista]

No .html, .css e .js: hex e cor so no bloco de primitivos, primitivo so no
bloco semantico, nenhuma referencia de rede, e o detector da skill
sem-plastico. Os blocos sao exigidos no .css e no .html que nao usa a folha
compartilhada.
No .md: o linter da skill portugues-tecnico.

--todos: confere os .html, .css e .js de prototipo/, menos os paineis antigos.
--base-kanban: compara main e arrays do Kanban com o commit base (RF-02).
--sincronia: compara tokens e menu do Kanban com astrea.css e moldura.js.
--dados-reais: procura em prototipo/ os termos da lista (RF-13). O relatorio
traz arquivo e contagem, nunca o termo.
"""
import argparse
import os
import re
import subprocess
import sys
import unicodedata
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
REDE = re.compile(r'https?://|(?:src|href)\s*=\s*["\']?//|url\(\s*["\']?//|["\']//|@import', re.I)
XMLNS_SVG = 'http://www.w3.org/2000/svg'
COR = re.compile(r'\b(?:rgba?|hsla?)\(', re.I)
FOLHA = 'astrea.css'
BASE_KANBAN = 'a150985'
PASTA = Path(__file__).resolve().parent
FORA_DO_TODOS = {'painel-redesign.html', 'kanban-aprovado.html'}
EXTENSOES = {'.html', '.css', '.js'}


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


def checar_texto(texto, nome, exige_blocos=True):
    """As regras estaticas de .html, .css e .js. Devolve a lista de erros."""
    linhas = texto.splitlines()
    erros, blocos = [], {}
    for bloco, (abre, fecha) in BLOCOS.items():
        if exige_blocos and (abre not in texto or fecha not in texto):
            erros.append('%s: bloco %s sem os marcadores "%s" e "%s".'
                         % (nome, bloco, abre, fecha))
        blocos[bloco] = _linhas_do_bloco(linhas, abre, fecha)
    for numero, linha in enumerate(linhas, 1):
        onde = '%s:%d' % (nome, numero)
        if HEX.search(linha) and numero not in blocos['primitivos']:
            erros.append('%s: hex fora do bloco de primitivos: %s'
                         % (onde, linha.strip()))
        if COR.search(linha) and numero not in blocos['primitivos']:
            erros.append('%s: cor fora do bloco de primitivos: %s'
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
    dobrado = ''.join(c for c in sem if not unicodedata.combining(c)).casefold()
    return re.sub(r'\s+', ' ', dobrado)


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
    if not _termos(caminho):
        return ['lista de dados reais sem termo.']
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


if __name__ == '__main__':
    sys.exit(main())
