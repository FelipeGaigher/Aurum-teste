# Q2 — Design system e plano de redesign incremental

Documento-fonte de `02-slides-q2.html`. São 6 slides, o limite do
enunciado. O parágrafo de uso de IA fecha o `index.html`. Cada slide tem um
título que responde à pergunta, uma ideia central e pouco texto.

Legenda:

- `Apoio:` evidência para as perguntas ao vivo. Não aparece no slide.
- `> nota:` cuidado para quem apresenta. Não aparece no slide.
- `> aberto:` decisão que ainda falta.

Regra de vocabulário: as peças do protótipo contam como "fases 1 e 2 em
protótipo". Nunca como "fase 1 já executada". Para a banca, fase executada
quer dizer fase em produção.

---

## Slide 1 — Arquitetura

**Pergunta:** como organizar fundamentos, tokens, componentes e padrões, e o que vem primeiro?

**Título:** Primeiro os tokens semânticos. Depois, os componentes.

**Ideia central:** uma fonte só, que o front novo e o legado consomem do mesmo lugar.

| Camada | O que é | Exemplo |
|---|---|---|
| Templates | Tela-modelo por módulo | Agenda, Área de Trabalho, Kanban |
| Padrões | Combinação com regra de uso | Lista de atividades, formulário de prazo, estado vazio |
| Componentes | Peça com comportamento e estados | Card de atividade, filtro de prazo, seletor de responsável |
| Tokens semânticos | Valor com papel na interface. Vêm primeiro | `color.bg.surface`, `color.text.danger`, `space.4` |
| Tokens primitivos | Valor bruto, sem significado | `blue.600`, `space.16` |

**Decisão:** tokens semânticos antes de qualquer componente. O legado consome o token como variável CSS, sem reescrita.

**Ordem de construção:** tokens semânticos, moldura, componentes da gestão de atividades, padrões e templates, padrões para IA.

**Estados:** default, hover, active, foco, disabled, erro, carregando e vazio são a matriz base.
Algumas peças pedem mais três: selecionado, sem-destaque e oculto.
Cada peça mostra só os estados que tem e escreve por que os outros faltam.

**No protótipo:** 9 fundamentos e 49 componentes em cinco grupos.
São 211 estados desenhados e 185 ausências explicadas. Nenhuma cor da tela fica fora de token.

Apoio: 646 variáveis CSS e três sistemas de nomes (PA-17). O token novo de
marca é `#0A74D1`, e o botão medido é `#228BE6`. Três azuis na mesma tela
(PA-16). A IA tem paleta própria em roxo (PA-10).

Apoio: os grupos do DS são Ações 7, Formulário 11, Feedback 8, Dados 11 e
Navegação 12. A contagem sai de `[data-ds]` e `[data-estado]` no
`prototipo/design-system.html` renderizado. O `grep` no arquivo devolve 0,
porque o JavaScript monta as peças.

> nota: a revisão de 08/11 contou 210 estados. O commit `97811ad`
> acrescentou o estado selecionado da linha de atividade. Hoje são 211.

---

## Slide 2 — Governança, primeira parte

**Pergunta:** como o Figma e o código se mantêm alinhados?

**Título:** Uma fonte só. O Figma lê a fonte, ele não é a fonte.

**Ideia central:** os tokens em JSON, no padrão DTCG, alimentam o legado, o código novo, o Figma e os agentes.

| Saída | Caminho | Quem consome |
|---|---|---|
| Variáveis CSS | Style Dictionary | Telas legadas, sem reescrita |
| Pacote de componentes em TS | Style Dictionary | Telas novas |
| Biblioteca Figma Astrea DS | API de variáveis do Figma | Designers dos quatro squads |
| Agentes do kit | `skills/astrea-ds` | Telas e features geradas com IA |

**Decisão:** uma biblioteca, Astrea DS, para todos os squads. As parciais de hoje saem. Nenhum squad publica componente próprio.

**No Figma:** três coleções. Primitives sem modo, Semantic com claro e escuro, Component sem modo.
Cada variável tem escopo, e o Figma bloqueia o uso errado.

Apoio: o código tem um DS legado, com 609 variáveis de prefixo
`nectar-legacy`, lidas no produto em 07/11. Os primitivos nascem dele,
renomeados. Code Connect liga cada componente do Figma ao pacote.

---

## Slide 3 — Governança, segunda parte

**Pergunta:** quem decide componente novo, e como os squads e a Engenharia participam?

**Título:** Quem decide, quem contribui, quem veta.

**Ideia central:** a direção do DS decide, a Engenharia veta e os squads contribuem. Ninguém se reporta à direção.

| Papel | Quem | O que faz |
|---|---|---|
| Patrocina | Líderes dos squads | Garantem o tempo dos designers e a prioridade no roadmap |
| Decide | Direção do DS | Define o que entra, mantém a fonte, lidera o redesign |
| Veta | Ponto técnico de front | Veto técnico com justificativa. Mantém o pacote de código |
| Contribui | Designers dos squads | Propõem a partir do roadmap |

Como um componente novo entra:

1. O designer abre um pedido: problema, onde aparece, quem mais usa.
2. Triagem semanal de 30 minutos, com a direção do DS e o ponto técnico.
3. Dois ou mais squads usam: entra no DS. Só um usa: fica local.
4. A direção decide. A Engenharia veta por motivo técnico.
5. Versão nova do pacote, com changelog.

**No protótipo:** a regra funcionou três vezes em um dia.
O botão de copiar nasceu local e foi para o DS quando a quarta página o usou.
O painel de detalhe nasceu em Contatos e hoje serve sete telas.
Um card de registro substituiu três cards parecidos.

**Decisão:** o kit de IA é parte do DS. O padrão se mantém por ferramenta, não por cobrança.

Apoio: o botão de copiar serve Processos, Atendimentos, Documentos e Agenda
(commit `acd359a`). O `cardRegistro` substituiu os cards de Contatos,
Atendimentos e Documentos.

> aberto: `botaoCopiar` e `painelCriarAtividade` existem no código sem seção
> no `design-system.html`. A banca pode abrir esse furo. Default: documentar
> as duas peças antes do envio.

---

## Slide 4 — Fases e convivência

**Pergunta:** por onde começar, com qual critério, e como novo e legado convivem?

**Título:** A moldura fica fixa primeiro. O conteúdo migra depois.

| Fase | Período | O que entra | Entrega |
|---|---|---|---|
| 1 | Semanas 1 a 6 | Inventário, linha de base das métricas e tokens semânticos sobre o Nectar; o legado ganha a pele por token | Legado e novo com a mesma pele |
| 2 | Meses 2 e 3 | Moldura única: cabeçalho, menu lateral, ações e filtros, com os componentes principais | A âncora que não muda mais |
| 3 | Meses 3 e 4 | Configuração e administração, as primeiras telas novas, atrás de feature flag | Primeira tela nova em produção |
| 4 | Meses 4 a 6 | Fluxos principais, a começar pela gestão de atividades com grupo beta. Demais módulos no ritmo da migração. Primeiras funcionalidades com IA | O DS cobre o produto |
| 5 | Meses 7 a 9 | Onboarding do novo layout: tour por módulo e "o que mudou" por tela. Flags desligadas. Telas legadas e bibliotecas parciais aposentadas. Tela estreita | Legado desligado, sem chamado de "onde ficou" |
| 6 | Meses 10 a 12 | IA em todos os fluxos, nos padrões do DS: sugerir, confirmar, desfazer e errar. DS em regime: versão 1.0, changelog, auditoria trimestral e segunda rodada de entrevistas | DS como produto, IA no mesmo padrão |

**Critério:** frequência de uso × dor relatada × onde a migração do front já acontece.
Configuração e administração estreiam a flag, porque errar ali custa pouco.

**Horizonte:** o redesign fecha em 6 meses, e o briefing dá 12. O segundo semestre
é onboarding do novo layout, legado desligado e IA em todos os fluxos.

**Decisão:** o que é moldura fica fixo. O que é conteúdo migra.

**Decisão:** nenhuma mudança chega ao fluxo de prazo sem feature flag. Flag desligada desfaz em minutos.

**Fases 1 e 2 em protótipo:** o protótipo antecipa em HTML o inventário do Astrea.
Também antecipa os tokens semânticos e uma moldura única para 17 páginas.
Discovery e linha de base ficam para o time.
O protótipo não prova a convivência com o legado. Essa prova só existe atrás da flag.

Apoio: 33% dos votos da planilha de pedidos tratam de prazo (PA-33). A
moldura reúne PA-01 a PA-15. As 17 páginas são `prototipo/*.html` menos
`painel-redesign.html`. Uma tela é toda nova ou toda legada.

> nota: o protótipo seguiu outra ordem. A Área de trabalho veio antes da
> Administração, porque a Q3 pedia essa tela.

---

## Slide 5 — Como envolver o time

**Pergunta:** como distribuir o trabalho entre os 4 designers sem tirar o foco dos roadmaps?

**Título:** A contribuição sai do roadmap, não de tarefa extra.

**Decisão:** a divisão do trabalho não se define agora. Ela sai do discovery.

Fluxo: discovery de duas semanas, mapa de perfil, frente de cada um, componente no DS.

| Eixo do mapa | O que medir |
|---|---|
| Onde o trabalho pesa | Produto, marketing e aquisição, ou perto do código |
| Maturidade no Figma | Variáveis, componentes, bibliotecas |
| Uso de IA | Nenhum, pontual, diário |
| Dor principal | O que o roadmap dele pede e trava |

| Perfil | Frente natural no DS |
|---|---|
| Perto do código | Code Connect, Storybook, revisão do pacote |
| Forte em Figma | Estrutura da biblioteca, variantes, auditoria |
| Perto do marketing | Tokens de marca e a ponte com o marketing |
| Perto do usuário | Padrões de UX writing, pesquisa nos fluxos |

Apoio: não existe tarefa extra nem ritual novo. O líder de cada squad
combina o tempo no discovery.

> nota: o protótipo foi feito por uma pessoa com IA, não pelo time. Ele não
> prova nada sobre esta pergunta.

---

## Slide 6 — Riscos e métricas

**Pergunta:** quais são os 3 riscos, como mitigar e como medir sucesso?

**Título:** Três riscos, e o que prova que está dando certo.

| Risco | Mitigação |
|---|---|
| O DS vira projeto paralelo que ninguém adota | Construir a partir das telas do roadmap. Kit de skills e agentes no repositório |
| Ruptura visual para quem vive no produto | Moldura fixa primeiro, feature flag, grupo beta, chamados por módulo |
| O roadmap toma o tempo dos designers | Líderes como patrocinadores. A métrica de eficiência prova ou derruba a tese |

No protótipo, o padrão já se mantém por ferramenta:

| Portão | O que barra |
|---|---|
| `verificar.py` | Cor fora do bloco de primitivos, primitivo fora do semântico, Kanban fora de sincronia (`--sincronia`) |
| `verificar-app.js` | RF-01 a RF-15 no navegador: moldura, telas, teclado, contraste AA, controle nativo visível |
| `detectar.py` | A cara de IA: grid de cards iguais, ícone em caixinha, gradiente |
| Revisão ao vivo | Quatro rodadas. Cada correção está registrada em `04-processo.html` |

| Eixo | Métricas |
|---|---|
| Adoção | % de telas com componentes do DS, % de cores vindas de token, componentes desvinculados |
| Eficiência | Tempo do design até o dev, bugs visuais abertos |
| Experiência | Chamados por módulo, tempo para criar um prazo, sucesso na tarefa, CSAT, cliques por tarefa-chave |

**Cliques por tarefa-chave:** contados no Astrea e na tela nova, antes do beta.

**Ruptura em tela pequena:** abaixo de 1100px, o painel ao lado some. A Área de trabalho fica sem detalhe.

Apoio: a regra dos 1100px está em `prototipo/astrea.css:1818`. A linha de
base das três frentes sai nas semanas 1 e 2.

> nota: `verificar-app.js` mede RF-01, RF-03 a RF-12 e RF-15. O
> `verificar.py` cobre RF-02, RF-13 e RF-14, os portões estáticos.
