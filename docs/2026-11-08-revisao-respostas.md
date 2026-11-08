# Revisão das respostas depois da varredura e das rodadas de 08/11

Data: 08/11/2026, 17h45. Documento de trabalho. Ele não altera nenhum arquivo de resposta.

Fontes lidas: `00-briefing.md`, `01-diagnostico.md`, `02-plano-ds.md`, `03-tela.md`, `04-uso-de-ia.md`, `prototipo/questionarios.html`.
Também: a varredura, o comparativo, o escopo, `04-processo.html`, `prototipo/design-system.html` e `prototipo/componentes.js`.

A lista de perguntas segue os 12 `h2` de `prototipo/questionarios.html`.

Legenda da coluna de evidência: `VAR` é `docs/2026-11-08-varredura-astrea.md`. `CMP` é `docs/2026-11-08-comparativo-astrea-prototipo.md`.

<!-- lint-ignore-bloco: deriva-terminologica — o documento cita rótulos literais do Astrea, do protótipo e das respostas -->

## Números contados no código

Cada número saiu de um comando, não de outro documento.

| O que | Número | Como contei |
|---|---|---|
| Peças documentadas no DS | 58: 9 fundamentos e 49 componentes | `[data-ds]` em `design-system.html` renderizado no Chrome headless |
| Componentes por grupo | Ações 7, Formulário 11, Feedback 8, Dados 11, Navegação 12 | `[data-ds]` dentro de cada `h2[id^="titulo-"]` |
| Células de estado | 210, nas 49 peças | `[data-estado]` |
| Nomes de estado distintos | 11 | default, hover, active, foco, disabled, carregando, erro, vazio, selecionado, sem-destaque, oculto |
| Estados ausentes com motivo escrito | 185 | `[data-ausente]` |
| Funções exportadas em `window.DS` | 47 | `Object.keys(window.DS)` |
| Páginas do protótipo | 17 em uso, 14 no menu | `prototipo/*.html` menos `painel-redesign.html`, resto do dia 07 |
| Commits de 08/11 desde 12h | 123, até `dc29bb2` às 17h41 | `git log --since="2026-11-08 12:00" --oneline \| wc -l` |

Duas peças do DS existem no código sem seção no `design-system.html`: `botaoCopiar` e `painelCriarAtividade`.
O script de contagem fica fora do repositório. Ele roda no Chrome do sistema, porque o Chromium do Playwright 1.65 não está instalado.

## Achados que valem para todas as respostas

1. **As horas das rodadas estão erradas.** `04-processo.html:203-206` e o escopo, linhas 139, 150, 165 e 178, dizem 15h a 21h. O `git log` mostra outra coisa:

   | Rodada | Texto atual | Commits reais |
   |---|---|---|
   | Primeira | 15h a 16h30 | 14h47 a 15h53 |
   | Segunda | 16h30 a 18h | 15h59 a 16h12 |
   | Terceira | 18h a 19h30, `main` às 18h40 | 16h22 a 16h51, `1e09261` às 16h43 |
   | Quarta | 19h30 a 21h | 16h57 a 17h20 |

   A banca lê o `04-processo.html`. Hora no futuro tira a credibilidade do resto.
2. **A captura da Área de trabalho não está velha.** O commit `dc29bb2`, às 17h41, refez as três capturas em 1920. A última mudança em `area-de-trabalho.html` é `627445b`, às 17h12. Confirme no navegador antes de refazer.
3. **`03-componentes.html` é do dia 07.** O título diz "componentes do Kanban". A Q3 hoje é a Área de trabalho.
4. **O deck da Q1 tem 8 slides.** O enunciado pede até 5 páginas (`00-briefing.md:47`). O `01-diagnostico.md` ainda descreve 5 slides.
5. **A fonte em markdown ficou para trás.** `01-diagnostico.md` é de 12h02, `02-plano-ds.md` de 11h58 e `04-uso-de-ia.md` de 07h05. O deck da Q1 mudou às 16h29.
6. **O escopo contradiz o comparativo.** O escopo, linha 193, lista "documentos na ficha do processo" como aberto. O commit `acd359a` fechou o item, e o comparativo, linha 137, registra.

---

## Questão 1, pergunta 1: os 5 problemas, com evidência e por que importam

### O que a resposta diz hoje

Cinco problemas, cada um com sintoma, evidência em print, causa provável e por que importa.
P1 é o prazo sem destaque. P2 é a falta de hierarquia de nomes. P3 é o atrito ao criar.
P4 é a inconsistência visual. P5 é a moldura que compete com o trabalho (`questionarios.html:25-63`).

### O que mudou ou se confirmou

| Problema | Confirmou | Ressalva | Evidência |
|---|---|---|---|
| P1 | A Área de trabalho só marca atraso pela cor da data. Não há seção "Atrasadas" | Alertas já mostra "Tarefa atrasada". A ressalva atual continua certa | VAR 34, 50, 194; CMP seção 1 |
| P1 | A Agenda abriu em "Ontem". As duas tarefas datadas da conta não apareceram | O sumiço se repetiu, mas a causa segue sem prova | VAR 70-71 |
| P2 | A mesma tarefa aparece na Área de trabalho, no modal, em Alertas e na ficha | O protótipo tirou Alertas do menu, mas a página continua | CMP "Ligação com as questões"; commit `0a23ba7` |
| P3 | Criar tarefa abre modal sobre a lista. Contato abre página inteira | Criar pelo menu Adicionar, fora da Agenda, fecha o painel sem aviso no protótipo | VAR 49; CMP seção 8; `04-processo.html:280` |
| P4 | Criar aparece em quatro formas. Voltar aparece em três | As cores não foram medidas de novo hoje | CMP seções 6 e 8 |
| P5 | Cinco ícones, selo "1 ano grátis" e "Contratar" no cabeçalho. "Conheça as IAs" com fundo lilás | A faixa de campanha não apareceu hoje | VAR 15-21, 19 |
| P5 | Os números de Estatísticas aparecem como link | Sem `href` na árvore de acessibilidade. A varredura não testou o destino | VAR 55, 233 |

O Astrea já copia o número com 1 clique na lista de processos e na ficha (VAR 146, 169). Nenhum problema atual afirma o contrário. O texto revisado precisa manter essa precisão.

### Texto proposto

Troque só as linhas abaixo. O resto da resposta continua válido.

P1, novo item de sintoma:

> Na varredura de 08/11, a Agenda abriu em "Ontem". As duas tarefas datadas da conta não apareceram com os filtros padrão.

P1, evidência nova:

> A linha da Área de trabalho marca atraso só pela cor da data. Não existe seção de atrasadas.

P2, ressalva nova:

> O número do processo já copia com 1 clique na lista de processos e na ficha. O problema é a linha da atividade, que não mostra o número.

P5, item da faixa, com ressalva:

> Faixa de campanha com contador regressivo, vista nas capturas de 07/11. Ela não apareceu na sessão de 08/11. A faixa é campanha, e campanha tem data.

P5, item das estatísticas, com ressalva:

> Estatísticas em azul de link. Na árvore de acessibilidade elas são link sem destino. Ninguém testou o clique ainda.

### Decisão de Felipe

| Decisão | Recomendação | Default |
|---|---|---|
| Manter "sem ação por trás" no P5 | Testar o clique no trial antes de enviar. Sem teste, use a frase "link sem destino na árvore de acessibilidade" | Frase com ressalva |
| Manter a faixa de campanha no P5 | Manter, com a data da captura. A faixa é evidência de 07/11, e o print existe | Manter com data |
| Acrescentar o sumiço da Agenda no P1 | Acrescentar. É a segunda vez que a tarefa não aparece | Acrescentar |

---

## Questão 1, pergunta 2: princípios de design do redesign

### O que a resposta diz hoje

Seis princípios, cada um com heurística de Nielsen, lei de Gestalt, decisão e um par "hoje no Astrea" e "sugestão".
Os três primeiros: o prazo primeiro; uma palavra, um lugar; a moldura é a âncora.
Os três últimos: todo erro tem saída; densidade; mesmo padrão para tudo, inclusive a IA (`questionarios.html:69-79`).

### O que mudou ou se confirmou

Os seis princípios valem. O protótipo agora prova cada um com código.

| Princípio | O protótipo aplicou | Evidência |
|---|---|---|
| O prazo primeiro | Seções Atrasadas, Hoje e Próximos, com faixa que abre e fecha | CMP seção 1; `area-de-trabalho.html:152-165` |
| Uma palavra, um lugar | "Adicionar atividade" em todo módulo. Um caminho de volta, pela trilha | CMP seções 6 e 8; `moldura.js:287-291` |
| A moldura é a âncora | Busca à direita, item ativo marcado, chamadas comerciais no rodapé do menu | `moldura.js:333-371`, `404-408` |
| Todo erro tem saída | Aviso de data passada no próprio painel. Concluir e Adiar com "Desfazer" | CMP seção 8; `componentes.js:2493-2645` |
| Densidade | Número do processo na linha, com copiar. Cards, Lista ou Kanban | CMP seções 2 e 5 |
| IA no mesmo padrão | O atalho "IA" usa o mesmo estilo dos outros atalhos | `astrea.css:501-505` |

Ressalva honesta: "mostrar o número na linha, com botão de copiar" é ganho só na linha da atividade. Na lista de processos e na ficha, o Astrea já faz o mesmo (CMP seção 2).

Ressalva da Gestalt: o protótipo removeu a linha de estatísticas (reversão do PA-39). O princípio de densidade não depende dela.

### Texto proposto

No par de densidade, troque a linha "hoje no Astrea":

> O número do processo não aparece na linha da atividade. Na lista de processos, ele já copia com 1 clique (PA-38).

No fim da seção, acrescente:

> O protótipo navegável aplica os seis princípios em 17 páginas. Cada página usa a mesma moldura e as mesmas peças do design system.

### Decisão de Felipe

Nenhuma. A mudança só corrige a precisão.

---

## Questão 1, pergunta 3: o que validar antes de seguir, e como

### O que a resposta diz hoje

Uma tabela de sete hipóteses, com o que a planilha já responde, como confirmar e as fontes.
Depois, as quatro fontes de análise e os limites da planilha. A regra: o que custa caro corrigir se confirma antes (`questionarios.html:83-109`).

### O que mudou ou se confirmou

- A varredura de 08/11 é desk research no produto em produção, só de leitura. Ela já respondeu parte das hipóteses.
- P1, sumiço da tarefa: a Agenda abriu em "Ontem", e as duas tarefas não apareceram (VAR 70-71). A hipótese de data ganha peso. Ainda falta a prova.
- P1, Alertas: Alertas já marca "Tarefa atrasada" (VAR 194). Falta saber quem abre Alertas antes da Área de trabalho.
- P2: a mesma tarefa aparece em quatro lugares, e o botão muda de nome (CMP, ligação com P2).
- P5: a faixa sumiu nesta sessão. Isso vira uma pergunta nova para o marketing: a faixa é fixa ou sazonal?
- Novo item a validar: o destino dos links de Estatísticas (VAR 233).
- O comparativo conta cliques por fluxo. Clique é medida de esforço, não de sucesso. Ele não substitui o teste com usuário.

### Texto proposto

Linha nova na tabela de hipóteses, logo depois de P1:

| Hipótese | A planilha já responde? | Como confirmar | Fontes |
|---|---|---|---|
| P1: a tarefa salva some porque a Agenda abre fora de hoje | Não | Em 08/11, a Agenda abriu em "Ontem" e não mostrou as duas tarefas. Repetir com data de hoje e filtro em "Todas" | Varredura, teste no trial, chamado |

Troque a célula de P5 em "Como confirmar":

> Perguntar ao marketing se a faixa é fixa ou sazonal. Ela não apareceu em 08/11. Conversão de "Contratar" e de "1 ano grátis" contra o custo em CSAT. Teste do ícone de nuvem

Parágrafo novo antes de "Como analisar os dados coletados":

> A varredura de 08/11 já fez a primeira rodada de desk research. Ela percorreu 12 módulos e a moldura em produção, só com leitura. O comparativo contou os cliques de 48 tarefas nos dois lados. Clique mede esforço. O sucesso na tarefa só a entrevista e o analytics confirmam.

Confira os números antes de colar. Os 12 módulos vêm das seções da varredura. As 48 tarefas são as linhas das nove tabelas do comparativo.

### Decisão de Felipe

| Decisão | Recomendação | Default |
|---|---|---|
| Citar a varredura como desk research já feita | Citar. Ela mostra método e reduz o que falta validar. Deixe claro que clique não é sucesso | Citar com a ressalva |

---

## Questão 2, pergunta 1: arquitetura do DS

### O que a resposta diz hoje

Primeiro os tokens semânticos, porque o legado os consome sem reescrita. Cinco camadas: primitivos, semânticos, componentes, padrões e templates.
O card de atividade mostra a propriedade booleana no lugar da variante. Oito estados: default, hover, active, foco, disabled, erro, carregando e vazio (`questionarios.html:122-141`).

### O que mudou ou se confirmou

- O DS do protótipo tem 49 componentes em cinco grupos, com 210 células de estado e 185 ausências explicadas.
- Os estados reais são 11. Os três a mais são selecionado, sem-destaque e oculto. A resposta cita 8.
- O card de atividade confirma o exemplo da resposta. As variações "Sem processo e responsável" e "Sem prazo e sem tags" são booleanas, não variantes.
- Cada peça lista os estados que não tem, com o motivo. A resposta ainda não diz isso.

### Texto proposto

Troque o parágrafo de estados:

> **Estados:** default, hover, active, foco, disabled, erro, carregando e vazio são a matriz base. Três peças pedem mais: selecionado, sem-destaque e oculto. Cada peça mostra só os estados que tem e escreve por que os outros faltam.

Parágrafo novo no fim:

> O protótipo já tem essa arquitetura: 9 fundamentos e 49 componentes em cinco grupos. São 210 estados desenhados e 185 ausências explicadas. Nenhuma cor da tela fica fora de token.

### Decisão de Felipe

Ver a decisão da pergunta 3 desta questão. Ela decide se o protótipo entra como prova.

---

## Questão 2, pergunta 2: governança

### O que a resposta diz hoje

A direção do DS decide, a Engenharia veta e os squads contribuem. Antes do pedido novo: propriedade existente e composição local.
Tokens em JSON alimentam o código e o Figma. Componente entra no DS quando 2 ou mais squads precisam (`questionarios.html:145-157`).

### O que mudou ou se confirmou

As rodadas de hoje mostram a regra dos 2 consumidores em ação:

- `botaoCopiar` nasceu como cópia local em várias páginas. Foi para o DS quando quatro páginas passaram a usar a mesma função. São Processos, Atendimentos, Documentos e Agenda (CMP, linha 137; commit `acd359a`).
- `painelDetalhe` e `divisorRedimensionavel` nasceram com Contatos como primeiro consumidor. Hoje servem sete telas (escopo, linha 143).
- `cardRegistro` substituiu três cards de Contatos, Atendimentos e Documentos (escopo, linha 155).

A ressalva: `botaoCopiar` e `painelCriarAtividade` ainda não têm seção no `design-system.html`. A regra pede que o DS documente o que exporta.

### Texto proposto

Parágrafo novo no fim:

> No protótipo, a regra rodou três vezes em um dia. O botão de copiar nasceu local e foi para o DS quando a quarta página o usou. O painel de detalhe nasceu em Contatos e hoje serve sete telas.

### Decisão de Felipe

| Decisão | Recomendação | Default |
|---|---|---|
| Documentar `botaoCopiar` e `painelCriarAtividade` no DS antes do envio | Documentar. Sem isso, o exemplo da governança tem um furo que a banca pode abrir | Documentar |

---

## Questão 2, pergunta 3: plano em fases

### O que a resposta diz hoje

Quatro fases: tokens, moldura, configuração e administração, fluxos principais. O critério é frequência, dor, migração do front e risco.
A convivência é feature flag por escritório, com volta. A fase 3 começa por modal de confirmação (`questionarios.html:161-173`).

### O que mudou ou se confirmou

- O Kanban do protótipo mostra as quatro fases como quadro de trabalho (Task 9b, `04-processo.html:199`).
- O protótipo já fez as fases 1 e 2 em HTML: tokens semânticos e moldura única em 17 páginas.
- O protótipo não prova a convivência com o legado. Ele não tem feature flag nem tela legada ao lado.
- A ordem do protótipo foi outra: a Área de trabalho, da fase 4, veio antes da Administração, da fase 3. A Q3 pedia essa tela.

### Texto proposto

Parágrafo novo depois da tabela:

> O protótipo executou as fases 1 e 2 em HTML: tokens semânticos e uma moldura para 17 páginas. Ele não prova a convivência com o legado. Essa prova só existe atrás da flag, em produção.

### Decisão de Felipe

| Decisão | Recomendação | Default |
|---|---|---|
| Chamar o protótipo de "fase 1 já executada" | Não. Use "fases 1 e 2 em protótipo". Fase executada, para a banca, quer dizer em produção | "Em protótipo" |

---

## Questão 2, pergunta 4: envolver o time

### O que a resposta diz hoje

A divisão sai da conversa individual com cada designer: pessoa, trabalho e direção. A contribuição vem do roadmap do squad.
O líder de cada squad combina o tempo com a direção do DS (`questionarios.html:178-185`).

### O que mudou ou se confirmou

Nada nesta pergunta depende da varredura ou do protótipo. O protótipo foi feito por uma pessoa com IA, não pelo time.

### Texto proposto

Sem mudança.

### Decisão de Felipe

Nenhuma.

---

## Questão 2, pergunta 5: riscos e métricas

### O que a resposta diz hoje

Três riscos. A moldura atinge todos de uma vez. O componente quebra no fluxo de prazo. O roadmap consome os designers.
Métricas em três eixos: adoção, eficiência e experiência. O limite de reversão sai da linha de base (`questionarios.html:189-201`).

### O que mudou ou se confirmou

- O comparativo trouxe uma métrica que a resposta não tem: cliques por tarefa-chave, nos dois lados.
- A lacuna abaixo de 1100px confirma o segundo risco. Uma peça aprovada em tela larga some em notebook pequeno (`astrea.css:1818`).

### Texto proposto

Na linha de Experiência, acrescente:

> cliques por tarefa-chave, contados no Astrea e na tela nova antes do beta

Frase nova abaixo da tabela de riscos:

> O protótipo já mostrou o segundo risco. O painel ao lado some abaixo de 1100px, e a Área de trabalho fica sem detalhe.

### Decisão de Felipe

Nenhuma. As duas mudanças só acrescentam.

---

## Questão 3, pergunta 1: tela em alta fidelidade

### O que a resposta diz hoje

A Área de trabalho, no protótipo e no Figma, nó 26-2. Uma tabela "hoje × nova tela" com seis linhas.
Entre elas: todas as listas na abertura, seções Atrasadas e Hoje, e "três ícones" no cabeçalho (`questionarios.html:214-223`).

### O que mudou ou se confirmou

- **"Três ícones" está errado.** O cabeçalho do protótipo tem cinco atalhos: IA, Adicionar, Cronômetro bloqueado, tema e Notificações (`moldura.js:341-363`). O Astrea também tem cinco (VAR 17). A nuvem e a engrenagem saíram. O tema e o sino entraram.
- A tela mudou depois do nó 26-2. Ganhou painel de detalhe ao lado e as visões Cards, Lista e Kanban (CMP seções 5 e 7).
- Ganhou também filtros, número com copiar e "Abrir processo" (CMP seções 1, 2 e 3).
- O nó 26-2 do Figma é anterior a essas rodadas. A captura em PNG de 17h41 é atual. O frame no Figma não é.
- Lacuna: abaixo de 1100px o painel some, sem alternativa (CMP seção 7).

### Texto proposto

Troque a linha do cabeçalho e acrescente as duas de baixo:

| Hoje | Na nova tela | Origem |
|---|---|---|
| Título na página, busca no centro, cinco ícones. Sem sino | Título e trilha no cabeçalho, busca à direita. Sino com contagem | M14 a M16 |
| Detalhe em modal, que cobre a lista | Painel ao lado, redimensionável. Anterior e próximo | Lista e detalhe |
| Copiar o número exige abrir a tarefa: 2 cliques | Número na linha, com copiar: 1 clique | PA-38 |

### Decisão de Felipe

| Decisão | Recomendação | Default |
|---|---|---|
| Recapturar a tela no Figma, nó novo no lugar do 26-2 | Recapturar. A banca abre o Figma primeiro, e o frame não mostra o painel nem as visões | Recapturar |

---

## Questão 3, pergunta 2: componentes com estados

### O que a resposta diz hoje

Cinco componentes: linha de atividade, chip de prazo, seletor, chip de filtro e estado vazio. Cada um com propriedades, estados e onde mais aparece.
O seletor é botão com `aria-haspopup="listbox"`, nunca `select` nativo (`questionarios.html:227-236`).

### O que mudou ou se confirmou

Os estados escritos na resposta divergem do DS renderizado:

| Componente | A resposta diz | O DS mostra | Divergência |
|---|---|---|---|
| Linha de atividade | default, hover, foco, selecionada, carregando | default, hover, foco, carregando. Active consta como ausente | A linha selecionada existe na tela, em azul-claro, mas falta no DS |
| Chip de prazo | um por estado: vencido, hoje, próximo, concluído | default e as variações Vencido, Vence hoje, Concluída | Próximo é o default. Coerente, com outro nome |
| Seletor | default, hover, foco, aberto, disabled, erro | os 8 da matriz base | Aberto se chama active. Carregando e vazio a mais |
| Chip de filtro | default, hover, foco, aplicado, disabled | os mesmos 5, mais Marcado e Com contagem | Coerente |
| Estado vazio | sem dado, por filtro, carregando | default, Com filtro e Sem ação | Carregando consta como ausente |

O painel de detalhe virou a peça que mais muda a tela. Ele tem 5 estados no DS: default, foco, carregando, vazio e oculto.

### Texto proposto

Troque a tabela de estados pelas linhas abaixo:

> Linha de atividade | default, hover, foco, selecionada, carregando

> Chip de prazo | próximo (default), vence hoje, vencido, concluído. Cor e texto, nunca só cor

> Seletor | default, hover, aberto, foco, disabled, erro, carregando, vazio

> Chip de filtro | default, hover, foco, aplicado, disabled

> Estado vazio | sem dado, por filtro. O carregando mora no skeleton

Para a linha de atividade, o DS precisa ganhar o estado selecionada antes. Sem isso, a resposta promete o que a página não mostra.

### Decisão de Felipe

| Decisão | Recomendação | Default |
|---|---|---|
| Trocar o estado vazio pelo painel de detalhe entre os cinco | Manter os cinco. O painel serve outra pergunta, a do trade-off. O limite de 3 páginas já está cheio | Manter os cinco |
| Corrigir o DS ou a resposta | Corrigir o DS na linha de atividade. Corrigir a resposta no estado vazio | Os dois, como acima |

---

## Questão 3, pergunta 3: uma decisão difícil

### O que a resposta diz hoje

A tela abre em todas as listas, com Atrasadas acima de Hoje, e o prazo domina a linha. O custo é reaprender a tela mais aberta.
A redução: seletor no mesmo lugar, moldura fixa, chip com texto e feature flag. O que não escolhi: a abertura de hoje (`questionarios.html:240-247`).

### O que mudou ou se confirmou

- A varredura confirma a premissa. O Astrea abre em "Todas as listas", mas marca atraso só pela cor (VAR 32, 50).
- Atenção: a varredura diz que o filtro padrão hoje é "Todas as listas" (VAR 32). O PA-31 diz que a lista inicial esconde tarefa de outra lista. Se a conta de 08/11 abriu em todas, o argumento "a atividade de outra lista não aparece" perde força.
- Surgiram dois trade-offs com evidência nova:
  - **Painel ao lado no lugar do modal.** Ganho: a lista fica visível e o detalhe navega entre itens. Custo: abaixo de 1100px o painel some (CMP seção 7).
  - **A linha de estatísticas saiu**, por decisão de Felipe, revertendo o PA-39. Ganho: as seções já dizem o mesmo. Custo: quem lia o número perde o resumo.

### Texto proposto

Se o trade-off atual fica, troque a frase do PA-31:

> Hoje a lista da Área de trabalho marca o atraso só pela cor da data. O vencido não tem seção (PA-32).

Se o trade-off passa a ser o painel ao lado, use este texto:

> O detalhe da atividade abre ao lado da lista, não em modal. A lista continua visível, e o detalhe navega entre itens sem fechar. O custo é a tela estreita. Abaixo de 1100px o painel não cabe, e a Área de trabalho fica sem detalhe. Escolhi assim mesmo. Quem controla prazo compara uma atividade com a seguinte, e o modal esconde a seguinte. Para a tela estreita, o painel vai abrir por cima, como em Alertas. O que não escolhi: o modal de hoje, que cobre a lista a cada clique.

### Decisão de Felipe

| Decisão | Recomendação | Default |
|---|---|---|
| Qual trade-off contar | Manter a abertura por atraso. Ela liga a P1 e a primeira restrição do briefing. Guarde o painel para a Parte B | Abertura por atraso |
| Conferir o filtro padrão do Astrea | Abrir a Área de trabalho do trial e anotar o filtro de abertura. Se for "Todas as listas", tirar o PA-31 do argumento | Tirar o PA-31 |

---

## Uso de IA

### O que a resposta diz hoje

Claude Code como par de trabalho, MCP do Figma enquanto a cota permitiu, Playwright e Claude in Chrome depois.
A IA não escreveu a estratégia. Na Q3, executou o plano com subagentes, e outro agente revisou cada task. Duas skills guardaram o padrão (`questionarios.html:251`).

### O que mudou ou se confirmou

- `04-uso-de-ia.md` diverge da versão HTML. Ele ainda diz "plano de cinco tasks" e "protótipo navegável do Kanban".
- O dia 08/11 trouxe fatos novos. O plano teve 23 tasks e a 9b. Até sete agentes rodaram em paralelo (`04-processo.html:196-200`).
- Um revisor em opus julgou cada onda (`04-processo.html:279`).
- A varredura usou o Claude in Chrome só para leitura: texto da página, árvore de acessibilidade e captura (VAR 10).
- A IA também achou as próprias regressões. O comparativo apontou quatro caminhos piores no protótipo, e a quarta rodada fechou os quatro (CMP, linha 14).

### Texto proposto

> Usei o Claude Code como par de trabalho durante toda a atividade. O MCP do Figma ficou ligado enquanto a cota permitiu. Depois, os decks viraram PNG pelo Playwright e entraram no Figma pelo Claude in Chrome. A IA não escreveu a estratégia. Ela recebeu as minhas decisões em conversa e as transformou em documento-fonte, que eu iterei linha a linha. O protótipo saiu de uma spec e de um plano de 23 tasks. Até sete subagentes trabalharam em paralelo, e um revisor em outro modelo julgou cada onda antes do commit. Em 08/11 foram 123 commits depois do meio-dia. A IA também percorreu o Astrea em produção, só com leitura, e comparou cada fluxo com o protótipo. O comparativo achou quatro caminhos em que o protótipo perdia cliques, e eu mandei corrigir os quatro. Duas skills minhas guardaram o padrão: uma de português técnico e uma contra a cara de IA. A direção visual, os cinco problemas e o trade-off foram decisões minhas.

### Decisão de Felipe

| Decisão | Recomendação | Default |
|---|---|---|
| Citar o número de commits | Citar, com a hora. Mostra ritmo. Atualize o número no envio | Citar |

---

## Onde atualizar

A ordem segue a dependência. A fonte muda primeiro, e o derivado vem depois.

| Ordem | Arquivo | O que muda | Deriva de |
|---|---|---|---|
| 1 | `docs/2026-11-08-escopo-entrega.md` | Horas reais das quatro rodadas. Tirar "documentos na ficha" dos abertos | `git log` |
| 2 | `04-processo.md` e `04-processo.html` | Horas reais da linha do tempo e das rodadas | Escopo e `git log` |
| 3 | `prototipo/design-system.html` | Estado selecionada na linha de atividade. Seções de `botaoCopiar` e `painelCriarAtividade` | `componentes.js` |
| 4 | `01-diagnostico.md` | P1, P2, P5, par de densidade e a linha nova de validação. Estrutura de 5 páginas | Varredura e comparativo |
| 5 | `02-plano-ds.md` | Estados, prova do protótipo, governança, fases e métrica de cliques | `design-system.html` e comparativo |
| 6 | `03-tela.md` | Cabeçalho com cinco atalhos, linhas novas, estados, PA-31 e PA-39 revertido | `moldura.js`, DS e varredura |
| 7 | `04-uso-de-ia.md` | O parágrafo novo | `04-processo.html` |
| 8 | `prototipo/questionarios.html` | As 12 respostas, a partir dos md dos passos 4 a 7 | Os quatro md |
| 9 | `01-slides-q1.html` | Ressalvas do P5 e corte para 5 páginas | `01-diagnostico.md` |
| 10 | `02-slides-q2.html` | Estados, prova do protótipo e slide da IA | `02-plano-ds.md` e `04-uso-de-ia.md` |
| 11 | `03-slides-q3.html` | Linha 197: o número agora é link, não "texto". Estados dos cinco componentes | `03-tela.md` e DS |
| 12 | `03-componentes.html` | Refazer para a Área de trabalho, ou tirar da entrega. Hoje mostra o Kanban de 07/11 | DS |
| 13 | `prototipo/capturas/area-de-trabalho-1920.png` | Só se a tela mudar depois de 17h41. A captura de `dc29bb2` está atual | `area-de-trabalho.html` |
| 14 | Figma, nós 26-2 e 28-2 | Recapturar a tela e o DS | Protótipo e DS |
| 15 | PDFs da pasta do Google Drive | Exportar de novo | Decks e páginas HTML |

O passo 3 vem antes do 6 e do 11. A resposta da Q3 não pode prometer um estado que o DS não mostra.

<!-- lint-ignore-fim -->
