# Escopo da entrega: atividade prática Astrea

Prazo: 08/11/2026, às 16h. Entrega por um único link com acesso de visualização.
Este arquivo guarda o que Felipe pediu. O detalhe do app mora na spec e no plano.

| Documento | Conteúdo |
|---|---|
| `00-briefing.md` | Enunciado da Aurum e limite de páginas |
| `docs/specs/2026-11-08-astrea-navegavel.html` | Spec aprovada do app navegável |
| `docs/plans/2026-11-08-astrea-navegavel.md` | Plano do app, com 23 tasks e o progresso |

## O que entra

### Questão 1, até 5 páginas

- Os 5 problemas, com evidência e por que importam.
- Princípios ligados às 10 heurísticas de Nielsen e às leis de Gestalt.
- Cada princípio mostra a aplicação no dia a dia do especialista.
- O que validar, como validar e como analisar os dados coletados.
- A planilha de pedidos dos clientes entra como evidência.

### Questão 2, até 6 páginas

- Apresentação interativa no lugar dos slides antigos.
- Arquitetura do design system e componentes flexíveis, com propriedade booleana e de texto.
- Componentes no Figma com variações: default, hover, active, erro.
- Fases: tokens, componentes fixos, telas de configuração, demais componentes, fluxos principais.
- Componentes fixos: sidebar, navbar, filtros e botões de ação.
- Demais componentes: cards, tabelas, ações, documentos, anexos, assinatura, aprovações, pagamentos, modais.
- Time: conversa com cada pessoa sobre quem é, tempo de Aurum, rotina, ferramentas, foco e direção.
- 3 riscos, mitigação e métricas.

### Questão 3, 1 tela e até 3 páginas

- Uma tela em alta fidelidade no Figma. Felipe replica se a tela nascer fora dele.
- De 3 a 5 componentes com estados e propriedades.
- Um trade-off difícil e o porquê.
- O fluxo é escolhido e refeito. O Kanban sozinho não responde à questão.
- Tela adotada por default: Área de trabalho. Falta a confirmação de Felipe.

### App navegável

- Kanban no topo do menu, como está hoje, com os módulos abaixo.
- Os módulos seguem o fluxo real do Astrea e recebem só melhoria de usabilidade e padrão.
- O time da Aurum revisa a plataforma inteira por esse app.
- Entra o que reorganiza, padroniza ou destaca dado que já existe.
- Fica fora o que exige dado, serviço ou permissão nova.

### Padrão lista e detalhe ao lado, pedido de 08/11 às 15h33

- Em toda tela com tabela ou cards, clicar no item mostra o detalhe ao lado. O painel fica no fluxo, é redimensionável e tem ‹ › e ×.
- Referências: Cotação da Fotus e Náutica. A peça mora no DS: `painelDetalhe` e `divisorRedimensionavel`.
- O Kanban fica de fora.

### Design system completo

- Estados: default, hover, active, disabled e error.
- Peças: botões, toasts, tags, filtros, navbar, sidebar e sidebar recolhida.

### Pontos de atenção

- Toda observação de Felipe sobre o Astrea entra em `01-pontos-de-atencao.md` na hora.
- O catálogo tem 97 pontos, de PA-01 a PA-97.

### Documentação, pedido de 08/11 às 12h55

- As três questões, bem documentadas.
- O Kanban do protótipo mostra o cenário do redesign em produção. As fases do quadro seguem a Q2: tokens, moldura, configuração e administração, fluxos principais.
- Um documento com os ajustes na plataforma como um todo. Ele cobre fluxos alterados e recursos sem efeito visual, mas com peso no dia a dia. Exemplos: leitura em tabela ou cards, sidebar que colapsa, busca na navbar, economia de espaço. Arquivo: `05-ajustes-plataforma.html`.
- Toda a documentação do processo de desenvolvimento. Arquivo: `04-processo.html`, com `04-processo.md` como diário.

### Figma como formato da entrega, pedido de 08/11 às 14h15

- A Aurum exige documentar e apresentar no Figma. O arquivo do Figma vira a porta de entrada. O `index.html` segue como link único e aponta para ele.
- Felipe paga o plano Professional do time onde o arquivo mora. Isso libera a cota do MCP e o limite de três páginas.
- O arquivo ganha capa com miniatura e uma página por bloco. Os blocos: briefing, Questão 1, Questão 2, Questão 3, design system, protótipo e extras.
- A página de briefing resume a demanda, o que organizar, os times, o desenvolvimento e o processo. Ela lista todos os links da entrega.
- Plano: `docs/plans/2026-11-08-figma-entrega.md`.

### Fechamento

- Parágrafo de uso de IA no fim da entrega.
- Link único em `index.html`, publicado no GitHub Pages.
- Arquivo do Figma aberto a quem tiver o link.

## Alinhamento com o enunciado

Fonte: documento da Aurum, relido em 08/11 às 12h55.

| O enunciado pede | Onde fica | Situação |
|---|---|---|
| Q1: 5 problemas com evidência, princípios, o que validar, até 5 páginas | `01-slides-q1.html`, `01-diagnostico.md` | Pronto |
| Q2: arquitetura, governança, fases, time, riscos e métricas, até 6 páginas | Deck de 6 slides, `02-plano-ds.md` | Pronto |
| Q3: tela em alta fidelidade no Figma | Área de trabalho do protótipo, importada para o Figma, nó `26-2` | Pronto |
| Documentar e apresentar no Figma | Arquivo reorganizado por páginas, com briefing e links | Em andamento, depende do upgrade do plano |
| Q3: 3 a 5 componentes com estados | `design-system.html` e `03-slides-q3.html` | Pronto; captura do DS no Figma em conversão |
| Q3: uma decisão difícil | `03-tela.md` | Pronto |
| Parágrafo de uso de IA | `04-uso-de-ia.md`, fim de `index.html` | Pronto |
| Um único link com visualização | `index.html` no GitHub Pages | Publicado às 14h09 |
| Parte B, 30 minutos de apresentação | Deck da Q2, protótipo navegável, `04-processo.html` | Pronto |

O enunciado diz que a Aurum prototipa no Figma. A tela da Q3 precisa existir lá, não só no protótipo.

## Ordem de corte, se o tempo apertar

1. Q3: moldura, Área de trabalho e componentes dela.
2. Q1 e Q2 fechadas.
3. Figma e link único.
4. Agenda e Contatos.
5. Demais módulos e design system completo.

## Regras fixas

- Dado real de parte ou de processo nunca entra no repositório, que é público.
- Dado do protótipo é sempre fictício.
- No Astrea, a varredura só lê. Não salva, não exclui e não contrata.
- Protótipo não mostra controle nativo de formulário.
- Não se abre modal sobre modal.
- Push e reescrita de histórico só com autorização explícita.

## Decisões em aberto

| Decisão | Default |
|---|---|
| Incluir as 5 imagens com dado real na limpeza do histórico, publicar e ligar o Pages | Autorizado por Felipe às 14h05. Histórico limpo, `main` publicado e Pages no ar às 14h11 |
| Confirmar a Área de trabalho como tela da Q3 | Seguiu com ela; entregue |
| Levar a tela ao Figma, com a cota do MCP esgotada | Resolvido às 13h27: `generate_figma_design` passou pela cota, e a Área de trabalho está no arquivo, nó `24-2` |
| Localizar assinatura, aprovações e pagamentos no produto | Manter na fase 3 da Q2 |
| Marcação preta no print de Processos | Nenhuma alteração |

### Pasta no Google Drive como caixa de resposta, pedido de 08/11 às 15h20

A plataforma do teste exige uma pasta no Google Drive com as respostas e
os arquivos de apoio. O compartilhamento é "todos com o link podem ver".
A pasta reúne um Leia-me com todos os links e cinco PDFs. Os PDFs são as
três questões, o processo e os ajustes na plataforma. O Figma e o protótipo entram como
link. Os PDFs saem de `slides/` e das páginas HTML, sem a chave de tema.

### Rodada de melhorias na revisão ao vivo, pedido de 08/11 entre 15h e 16h30

Felipe pediu estas melhorias enquanto revisava o protótipo.

- Lista e detalhe ao lado: a seção acima já cobre o padrão. Ele vale em Contatos, Área de trabalho (Lista e Cards), Processos, Atendimentos, Alertas, Documentos e Resultados de buscas.
- Agenda: grade de horas na visão por semana e busca por título, processo ou responsável. A grade rola por dentro e não estoura a tela.
- Cores: hover azul-claro e divisórias azuis, por token (`--color-bg-hover`, `--color-border-accent`). As fichas de processo, contato e atendimento ganham contêineres.
- Correção: o menu de ações dentro de tabela com rolagem saía do quadro e criava barras. O DS agora posiciona o menu em relação à tela.
- Resumo do caso nos processos, gerado pela IA do Astrea, com atores, local e data. Aparece no painel e na ficha. Em andamento.
- Modo cards em Atendimentos, igual ao de Contatos. Em andamento.
