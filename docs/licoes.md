# Lições do projeto

## Correções

### 2026-11-08 — Slide de banca não é documento

Felipe reprovou o deck da Questão 1: muito texto, pouco visual. O deck tinha
1.953 palavras em 5 slides, com tabelas de seis colunas e listas de sintoma,
causa e impacto. O texto do documento-fonte foi copiado para o slide.

**Por quê:** a banca assiste a uma apresentação de 30 minutos. O limite de
páginas do briefing não autoriza encher cada página.

**Regra:** cada slide mostra a evidência como imagem, com uma frase por
problema. O detalhe fica em `01-diagnostico.md`, para as perguntas da Parte B.

**Virou:** deck refeito com prints anotados, 475 palavras fora dos diagramas.

### 2026-11-08 — Print sem contexto não é evidência

Felipe reprovou as miniaturas da Questão 1. A legenda dizia "tela 20", e esse
número só existe no registro interno. Quem lê não sabe de qual tela se trata.

**Por quê:** o print só prova algo quando o leitor sabe onde ele está e o que
deve olhar nele.

**Regra:** todo print leva o nome da tela e o caminho até ela. Uma frase diz
o que a marca mostra. O número interno nunca aparece sozinho.

**Virou:** cada evidência da seção 1.1 é uma linha com print e explicação.

### 2026-11-08 — Tipo diferente de informação pede forma diferente

Felipe achou os princípios da Questão 1 iguais demais. Decisão, referência
teórica, problema e sugestão apareciam como linhas idênticas de rótulo e texto.

**Por quê:** quando tudo tem a mesma forma, o leitor precisa ler tudo para
achar a decisão.

**Regra:** cada tipo de informação tem forma própria. Referência vira tag, e a
decisão ganha destaque. Problema e sugestão ficam lado a lado.

**Virou:** os seis princípios da seção 1.2 seguem esse molde.

### 2026-11-08 — Divisão de conteúdo usa o componente de abas

Felipe reprovou o índice de botões no topo da questão. A frase dele: "isso
não é abas, são botões fora do lugar". Ele também reprovou o hover preto,
porque o produto é azul.

**Por quê:** o design system já tinha abas com linha embaixo do item ativo. O
controle improvisado parecia solto na tela.

**Regra:** quem divide conteúdo no mesmo lugar é `DS.abas`. Perguntas e
respostas seguem o padrão de duas colunas: lista à esquerda, resposta à direita.
Hover usa a cor de ação.

**Virou:** o módulo Questionários, em `prototipo/questionarios.html`, e os
hovers do design system em azul.

### 2026-11-08 — Slide de banca é claro, sem chave de tema

Felipe reprovou os decks das três questões. A estrutura mudava de um para o
outro. O tema escuro vencia o claro ao abrir. A chave "Trocar tema" ficava no canto.

**Por quê:** o deck é desenhado para o modo claro e projetado numa sala. O
tema escuro e a chave vieram da regra geral de documento HTML. Essa regra vale
para documento de leitura, não para slide.

**Regra:** deck de apresentação nasce só no modo claro, sem chave de tema. Os
decks de uma mesma entrega compartilham cabeçalho, título e rodapé.

**Virou:** os três decks sem `@media (prefers-color-scheme)` e sem a chave. A
Questão 1 ganhou o cabeçalho e o rodapé da Questão 2 e da Questão 3.
