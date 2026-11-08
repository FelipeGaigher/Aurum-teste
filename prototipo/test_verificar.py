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

    def test_url_protocol_relative_em_css_acusa(self):
        texto = LIMPO + '<style>@font-face { src: url(//cdn.example/a.woff2); }</style>\n'
        erros = verificar.checar_texto(texto, 'k.html')
        self.assertIn('k.html:11: referencia de rede', erros[0])

    def test_string_js_protocol_relative_acusa(self):
        texto = LIMPO + '<script>fetch("//api.example/x");</script>\n'
        erros = verificar.checar_texto(texto, 'k.html')
        self.assertIn('k.html:11: referencia de rede', erros[0])


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


if __name__ == '__main__':
    unittest.main()
