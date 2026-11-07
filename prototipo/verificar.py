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
REDE = re.compile(r'https?://|(?:src|href)\s*=\s*["\']?//|url\(\s*["\']?//|["\']//|@import', re.I)
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
