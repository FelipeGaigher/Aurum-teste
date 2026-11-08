# Protótipo do Kanban da Q3

Este protótipo mostra o Kanban de atividades do Astrea. Ele funciona local, sem rede e sem build. Não precisa de instalação.

## 1. Como abrir

Dê dois cliques no arquivo `prototipo/kanban.html`. O arquivo abre no navegador.

Você também pode abrir pelo servidor local. Na raiz do repositório, execute:

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000/prototipo/kanban.html` no navegador.

## 2. O que é fictício

Tudo o que aparece no protótipo é fictício. Isso vale para os dados, os nomes e os processos.

- As dez atividades do array `ATIVIDADES`, dentro de `prototipo/kanban.html`.
- Os nomes dos responsáveis e o nome no menu do usuário.
- Os números de processo. Eles seguem o padrão CNJ, mas não são reais.
- Os prazos. Eles caem nos próximos dez dias, e dois estão vencidos.
- A sugestão de IA no card "Manifestar sobre o laudo pericial".
- O painel "Criar atividade". Ele não salva nada.

## 3. O que fica fora

Estes itens não entram no protótipo:

- Persistência. Ao recarregar a página, o quadro volta ao dado fictício.
- Criar atividade de verdade. O painel abre, mas não salva.
- Agenda. O item do menu existe, mas não leva a nenhuma tela.
- Área de trabalho em lista. Só a visão de Kanban existe.
- Versão para celular.

## 4. O que está aberto

Três pontos de `03-tela.md` seguem em aberto.

- A família tipográfica. As candidatas são IBM Plex Sans, Source Sans 3 e Inter Tight.
- Onde o Kanban mora no produto. Falta confirmar no trial onde ele fica e como ele é hoje.
- A decisão difícil. Escolha entre manter a moldura atual ou pôr o prazo fatal como dado dominante.

O `--font-sans` declara IBM Plex Sans primeiro. O protótipo não carrega a fonte pela rede. Ela só aparece quando estiver instalada na máquina. Sem ela, a tela usa a fonte do sistema.

## 5. Como verificar

Execute os dois comandos a partir da raiz do repositório:

```bash
python prototipo/test_verificar.py
python prototipo/verificar.py prototipo/kanban.html
```

O primeiro comando testa o verificador. O segundo verifica o arquivo do protótipo. Os dois terminam com código 0 quando passam.

O verificador não abre o navegador. Arrastar, teclado, tema e largura exigem prova num navegador headless.
