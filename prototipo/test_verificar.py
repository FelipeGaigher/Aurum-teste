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


if __name__ == '__main__':
    unittest.main()
