<!-- lint-ignore: deriva-terminologica — pesquisa aqui é levantamento de fontes, não a ação de buscar -->
# Pesquisa pública: gestão de atividades no Astrea (Questão 3)

Data do levantamento: 2026-11-07. Só leitura de páginas públicas. Sem conta, sem formulário.
Legenda: **[F]** fato com fonte. **[I]** inferência minha.

## O que é a gestão de atividades no Astrea

- **[F]** O Astrea é o produto da Aurum para advogados autônomos e escritórios pequenos e médios. Planos: Light, Up, Smart, Company, Vip. https://www.aurum.com.br/astrea/planos-e-precos/
- **[F]** Agenda: mostra atividades do dia, da semana, do mês ou em lista. https://www.aurum.com.br/blog/agenda-para-advogados
- **[F]** A agenda agrupa atividades em quatro tipos: tarefas (sem dia definido), eventos (com horário), prazos e audiências. Prazos e audiências aparecem como exclusivos dos planos Company e Vip. Mesma fonte.
- **[F]** Área de trabalho: lista as tarefas pendentes ordenadas por urgência ("escala de urgência"). https://www.aurum.com.br/blog/sistema-de-gestao-de-escritorio-de-advocacia
- **[F]** Kanban: painel com cards que representam tarefas, prazos e compromissos. Três colunas descritas: A fazer, Fazendo, Concluído. Sem custo extra nos planos pagos. https://www.aurum.com.br/blog/gestao-kanban-astrea/
- **[F]** O texto da Aurum chama o Kanban de "espelho da agenda". Ele complementa a agenda e o controle de prazos, não os substitui. Mesma fonte.
- **[F]** O Astrea permite vários quadros Kanban. Mesma fonte. A página de planos lista limites de 2, 3, 4 e 5 quadros, sem mapear número a plano. https://www.aurum.com.br/astrea/planos-e-precos/
- **[I]** Mapeamento provável: Up 2, Smart 3, Company 4, Vip 5. Não confirmado.
- **[F]** Relação entre as telas: a página de tarefas diz que prazo, publicação e tarefa ficam conectados. Se o prazo muda, a tarefa acompanha. https://www.aurum.com.br/astrea/gestao-de-tarefas/
- **[I]** Modelo mental: uma só base de atividades, com três visões. Agenda por tempo, Área de trabalho por urgência, Kanban por estágio. As fontes não afirmam isso com estas palavras.
- **[F]** Visão de equipe: agenda unificada mostra a carga de cada colaborador. O gráfico de atividades por equipe só existe em Company e Vip. https://aurum.com.br/astrea/gestao-de-equipe/
- **[F]** Workflows (marcado "NOVO"): sequência de tarefas, prazos e responsáveis, configurada uma vez e reutilizada. https://www.aurum.com.br/astrea/gestao-de-tarefas/
- **[F]** A IA lê uma publicação e sugere o "prazo fatal" e tarefas vinculadas. O usuário revisa e confirma. Mesma fonte.

## A atividade como objeto

| Campo | Estado | Fonte ou nota |
|---|---|---|
| Tipo (tarefa, evento, prazo, audiência) | [F] | https://www.aurum.com.br/blog/agenda-para-advogados |
| Status (a concluir, concluída, cancelada) | [F] | idem |
| Status alternativo (feito, não feito, atrasado, cancelado) | [F] | https://www.aurum.com.br/blog/sistema-de-gestao-de-escritorio-de-advocacia. Os dois artigos divergem. |
| Responsável, criador, envolvidos ("atribuição") | [F] | agenda-para-advogados |
| Etiquetas definidas pelo usuário | [F] | agenda-para-advogados |
| Comentários e anexos (histórico) | [F] | agenda-para-advogados |
| Processo vinculado | [F] | Prazo é lançado a partir da publicação e vinculado ao processo (sistema-de-gestao). App: da tela do processo se cria tarefa, evento ou prazo. https://www.aurum.com.br/blog/app-astrea |
| Cliente | [F] | Usado como filtro (sistema-de-gestao). |
| Data, hora de início e fim, descrição | [F] | sistema-de-gestao, para eventos. |
| Prazo fatal | [F] parcial | Só citado como sugestão da IA a partir de publicação (gestao-de-tarefas). Não aparece como campo nomeado. |
| Prioridade | [I] | Nenhuma fonte cita. A ordenação por urgência na Área de trabalho sugere um critério, talvez a data. |
| Recorrência | [I] | Não citada. Existem "atividades pré-definidas" e Workflows, que cobrem rotina repetida. |
| Lembrete | [I] | Alertas automáticos existem (gestao-de-tarefas, astrea-e-bom). Não se sabe se há campo de lembrete por atividade. |
| Equipe responsável | [F] | Tarefa pode ser delegada a usuários ou equipes (sistema-de-gestao). |

## Padrões de interface descritos ou visíveis

- **[F]** Troca de visão por um clique: dia, semana, mês, lista. (agenda-para-advogados)
- **[F]** Filtros da agenda: atribuição (responsável, criador, envolvidos), pessoas, tipo e status, etiquetas. (agenda-para-advogados)
- **[F]** Filtros por categoria: tipo, responsável, intervalo de datas, cliente. (sistema-de-gestao)
- **[F]** Fluxo de publicação: o usuário lê a publicação e cadastra o processo. Depois agenda o prazo e atribui o responsável, sem sair da aba de publicações. Depoimento em https://www.aurum.com.br/astrea/gestao-de-tarefas/
- **[F]** Alertas: aviso quando tarefa é concluída e quando há atraso. Push, alerta no sistema e e-mail. (gestao-de-equipe, astrea-e-bom)
- **[F]** App: a agenda é a primeira tela e mostra a semana. Dá para ver agenda pessoal e do escritório, criar, excluir, concluir e compartilhar atividades, anexar documento. https://www.aurum.com.br/blog/app-astrea
- **[F]** Sincronia com Google Agenda, Outlook e Apple, espelhada nos dois lados. (agenda-para-advogados)
- **[F]** Cores de status, posição do prazo fatal, estados vazios e navegação lateral: nenhuma fonte descreve. Ver Lacunas.
- **[I]** O Kanban usa "A fazer / Fazendo / Concluído", sem coluna de "Atrasado" ou "Cancelado" citada. Os status da agenda têm quatro valores. Isso sugere que o card perde informação ao virar coluna.

Screenshots públicos (não baixados). O alt vem vazio em todos; a descrição abaixo é a seção onde a imagem aparece, ou seja, inferência.

```
https://www.aurum.com.br/images/features/gestao-de-tarefas/card-2-opt.webp   (seção Gestão Kanban)
https://www.aurum.com.br/images/features/gestao-de-tarefas/card-1-opt.webp   (seção Workflows)
https://www.aurum.com.br/images/features/gestao-de-tarefas/card-3-opt.webp   (atividades pré-definidas)
https://www.aurum.com.br/images/features/gestao-de-tarefas/card-4-opt.webp   (publicações convertidas em prazos)
https://www.aurum.com.br/images/features/gestao-de-tarefas/card-5-opt.webp   (padronização e organização de tarefas)
https://www.aurum.com.br/images/features/gestao-de-processos/card-03-opt.webp (seção "agenda conectada a cada etapa do processo")
https://www.aurum.com.br/images/features/gestao-de-processos/card-02-opt.webp (seção de IA, andamentos destacados)
https://www.aurum.com.br/images/features/gestao-de-processos/card-01-opt.webp (após o tour interativo de processos)
https://www.aurum.com.br/images/features/gestao-de-equipe/card-2-opt.webp    (seção de carga de trabalho, provável agenda do time)
https://www.aurum.com.br/images/features/gestao-de-equipe/card-3-opt.webp    (seção de avisos de conclusão e atraso)
https://www.aurum.com.br/images/features/gestao-de-equipe/card-1-opt.webp    (após a demonstração interativa)
https://www.aurum.com.br/blog/wp-content/uploads/2026/02/gesta-kanban-astrea.jpg (imagem de destaque do post de Kanban; conteúdo não verificado)
```

As URLs `/images/features/...` vêm de caminhos relativos lidos pelo extrator; o domínio é o da página de origem. Não abri nenhuma para confirmar que é captura de tela. As páginas de funcionalidades também citam "demonstração interativa" (tour), sem URL extraída.

## Identidade visual pública

Fonte: CSS do site `aurum.com.br` (Next.js), 9 arquivos em `/_next/static/css/`. Contagem por ocorrência de valor hex. O CSS é do site de marketing. Não é a interface logada do Astrea.

### Aurum (empresa) e site

- **[F]** Fontes: Open Sans no corpo, pesos 300 a 700. Ubuntu em títulos e navegação, via `--font-ubuntu`. Poppins em pesos 400 e 800, uso menor. Pesos mais frequentes no CSS: 600, 400, 700.
- **[F]** Variáveis de tema globais: `--background: #ffffff`, `--foreground: #171717`.
- **[F]** Cores recorrentes: `#353844` (texto secundário), `#031c35` (títulos de planos), `#1c1e2f`, `#26283f` (escuros), `#dee2e6`, `#dadde4`, `#f8f8f8` (neutros), `#8a8fa2`, `#5e6273` (cinzas).
- **[F]** Roxo `#4c3da5` (fundo claro `#e6e8f9`, `#f1f2ff`) nos botões do Aurum Summit (evento).
- **[F]** Vermelho `#e85c5c` para preço riscado.
- **[F]** Banners de campanha usam `#0b1652` (azul-marinho), `#007dff`, `#fbffa5`, `#a800a7`, `#86b4f8`.

### Astrea (produto), pelo que o site mostra

- **[F]** Azul é a cor do Astrea na navegação: botão "Acessar Astrea" com borda e texto `#307acb`; outro estado com `#008fd5`. `#008fd5` é a cor mais frequente do CSS (56 ocorrências), em links e destaques. Fundo claro `#e7f4fe`.
- **[F]** Verde `#0db14b` / `#0bb14b` é do Themis (botão da navegação do Themis). Também marca a aba ativa na seção de funcionalidades, e `#e7f6ec` é o seu fundo claro.
- **[I]** Azul = Astrea, verde = Themis, na navegação do site. O Astrea logado pode usar outra paleta; não verifiquei.
- **[F]** Tom de marca, no texto das páginas: direto, voltado à rotina e ao medo de perder prazo. Exemplo: "Abandone as planilhas e os lembretes soltos". Os blogs usam linguagem promocional e emoji. https://www.aurum.com.br/blog/astrea-e-bom/
- **[I]** Estilo do site: fundo branco, azul como cor de ação, tipografia humanista sem serifa. Cantos pouco arredondados, botões com `border-radius: 4px`.

## Dores recorrentes de usuários

Base pequena e dispersa. Nenhum item refere-se ao Kanban. Só 10 avaliações de uma página do B2B Stack foram lidas (todas de 17/08/2023), mais trechos de busca.

1. Layout difícil de ler, segundo uma advogada. https://www.b2bstack.com.br/product/astrea/avaliacoes?page=2
2. Atraso na captura de andamentos e publicações, em alguns sistemas de tribunal (eproc, Projudi). Mesma fonte.
3. Erros de busca que impediram cadastrar alguns processos. Mesma fonte.
4. Suporte por chat lento. Mesma fonte.
5. Aba financeira difícil de usar. Mesma fonte.
6. Pedido de agenda com mais funções, no app também. https://www.b2bstack.com.br/product/astrea/avaliacoes (via resultado de busca; página não aberta)
7. Lentidão e travamentos ocasionais, e pouca customização de perfis de usuário. Mesma fonte (via busca).
8. App lento, e dono não consegue cancelar lançamentos de ex-funcionário. https://apps.apple.com/br/app/astrea-software-jur%C3%ADdico/id1498206479 (avaliação "Arrependido")
9. App sem módulo de anotações por processo; pedido de interface mais intuitiva. Mesma fonte (avaliação de 03/04/2024).
10. Duplicidade e falta de sincronismo em agenda, eventos, tarefas e prazos. Reclame Aqui, via resumo da busca. Página retornou 403 ao acesso direto. https://www.reclameaqui.com.br/aurum/decepcao-com-o-astrea-promessa-comercial-nao-cumpre-a-realidade-suporte-ruim-e-limitacoes-graves-na-plataforma_ZLyD4iACrsk48yYh/

Observação do mesmo resumo de busca. A resposta da Aurum cita limite de 5 quadros, 1 padrão e 4 personalizáveis, e 9 colunas por quadro. Não verifiquei na página; tratar como dado a confirmar.

## Lacunas

- Central de ajuda do Astrea: não localizei. A busca não retornou domínio de ajuda e `ajuda.astrea.net.br` não resolve. Sem passo a passo oficial de telas.
- Google Play: a listagem não apareceu nas buscas. A página da App Store não expôs URLs de screenshots (só pixel de 1x1).
- Reclame Aqui: a página da reclamação recusou acesso automatizado (HTTP 403), URL na seção de dores. B2B Stack página 1: erro de conexão; só a página 2 foi lida. Capterra: sem resultado do Astrea.
- YouTube: não consultei.
- Campos de um card do Kanban, filtros do Kanban, se as colunas são personalizáveis: o post oficial não diz.
- Como o card mostra prazo fatal, atraso, responsável, processo e etiqueta.
- Cores de status, estados vazios, navegação lateral, densidade da lista.
- Se a Área de trabalho tem filtros e se aceita ação em massa.
- Comportamento de arrastar entre colunas, e o que muda no status da atividade ao mover o card. É a pergunta central para o redesenho.
- Limites de quadros e colunas por plano, e se Agenda e Área de trabalho variam por plano.
- Paleta e componentes da interface logada (o CSS lido é do site de marketing).

## Fontes

Lidas:
- https://www.aurum.com.br
- https://www.aurum.com.br/astrea/
- https://www.aurum.com.br/astrea/gestao-de-tarefas/
- https://www.aurum.com.br/astrea/gestao-de-processos/
- https://aurum.com.br/astrea/gestao-de-equipe/
- https://www.aurum.com.br/astrea/planos-e-precos/
- https://www.aurum.com.br/blog/gestao-kanban-astrea/
- https://www.aurum.com.br/blog/agenda-para-advogados
- https://www.aurum.com.br/blog/sistema-de-gestao-de-escritorio-de-advocacia
- https://www.aurum.com.br/blog/app-astrea
- https://www.aurum.com.br/blog/astrea-e-bom/
- https://www.aurum.com.br/_next/static/css/ (9 arquivos, referenciados em /astrea/)
- https://apps.apple.com/br/app/astrea-software-jur%C3%ADdico/id1498206479
- https://www.b2bstack.com.br/product/astrea/avaliacoes?page=2

Só resumo de busca ou falha:
- https://www.b2bstack.com.br/product/astrea/avaliacoes (erro de conexão)
- https://www.reclameaqui.com.br/aurum/decepcao-com-o-astrea-promessa-comercial-nao-cumpre-a-realidade-suporte-ruim-e-limitacoes-graves-na-plataforma_ZLyD4iACrsk48yYh/ (403)
- https://ajuda.astrea.net.br (não resolve)
