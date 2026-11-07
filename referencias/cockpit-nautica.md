# Cockpit da náutica: referência para a Área de trabalho do Astrea

Fato e inferência vêm separados. Linhas marcadas "Inferência" são leitura minha, não estão no código.

Aviso de premissa. O cockpit que existe no código é o **cockpit da conversa** (WhatsApp, tela Conversas do painel admin). Não é um painel com uma linha de ações de IA. O único elemento horizontal é a **trilha de etapas** do atendimento. A IA aparece como "quem conduz a conversa", com a troca Assumir / Devolver. Não achei outro cockpit em nenhuma worktree.

## 1. O que o cockpit é

Fato: é a coluna do meio da tela Conversas (lista | cockpit | conversa). Reúne em um container o contato, o estado do atendimento e a ação principal. Abaixo, a trilha de etapas e quatro abas: Dados, Pedidos, Notas, Histórico. Resolve a pergunta do atendente: quem é esse contato, quem conduz, IA ou equipe, e o que já aconteceu. É para a equipe da marina que supervisiona a IA no WhatsApp e assume quando preciso. Fato: o desenho segue o CRM do ArtCont, segundo a mensagem do commit.

## 2. Layout

Desktop >= 1280 px (xl), colunas lado a lado:

```
+-----------+--------------------+--------------------------+
| Lista     | Cockpit (26-28rem) | Conversa                 |
| 20rem     | Nome  (t-page)     | Cabeçalho: nome, fone    |
| recolhível| estado · fone · ...| Faixa "A IA está         |
|           | [Assumir] [Mais v] |   conduzindo"  [Assumir] |
|           | o--o--o--o--o      | Mensagens e eventos      |
|           | Início..Encerrado  | Aviso janela de 24 h     |
|           | Dados|Pedidos|...  | Campo de resposta        |
|           | conteúdo da aba    |                          |
+-----------+--------------------+--------------------------+
```

- Fato, ordem de leitura: nome e contexto, ação principal, trilha, abas.
- Fato, centro: o cockpit (contexto e controle). A conversa fica à direita e ocupa o resto.
- Fato, borda: lista de conversas à esquerda (recolhível). Ações destrutivas ficam no menu Mais ações.
- Fato: abaixo de 1280 px e no celular não há coluna. Um botão "Detalhes" no cabeçalho abre o mesmo cockpit em folha (DetailSheet).
- Fato: o cockpit é "um container por pergunta", com divisores de 1 px. Sem card dentro de card.
- Fato: a trilha tem 5 pontos em grade de 5 colunas, ligados por um trilho.

## 3. Ações exibidas

Todas são ações da equipe sobre a conversa. Nenhuma é uma ação executada pela IA.

| Ação | O que faz | Confirmação / desfazer |
|---|---|---|
| Assumir | Tira a conversa da IA (estado `ia` para `humano`). | Sem confirmação. Desfaz com Devolver. Enviar mensagem também assume, quando a IA conduz. |
| Devolver para a IA | Volta a condução para a IA. | Sem confirmação. Desfaz com Assumir. |
| Encerrar conversa | Fecha o atendimento. | ConfirmModal (variante danger) antes da API. Some quando já encerrada. Não vi desfazer. |
| Apagar dados do contato | Remove os dados pessoais. | ConfirmModal. Só com permissão `marina.config`. Item em tom danger. |
| Abrir pedido | Linha na aba Pedidos leva à tela do pedido. | Navegação, sem efeito colateral. |
| Nota interna | Texto só para a equipe, escolhido no campo da conversa. | Aparece na aba Notas. Não vi edição nem remoção. |

Fato: a faixa de quem conduz repete Assumir / Devolver em botão discreto (ghost). O botão cheio fica no cockpit.
Fato: a trilha e o histórico são derivados dos eventos que a tela já lia. Sem campo novo na API.

## 4. Componentes

- `ConversationCockpit`: container com seções Contato, Etapas e Detalhes. Props de callback para cada ação.
- `CockpitSteps` (interno): lista ordenada `ol` com `aria-current="step"`. Estados do ponto: `done` (check verde), `current` (anel com miolo), `skipped` (tracejado), `todo`. Cada um tem texto para leitor de tela ("feita", "etapa atual", "não aconteceu", "ainda não").
- `ConversationHandlerBar`: faixa de 44 px mínimos. Estados: IA conduzindo, equipe atendendo (com nome), encerrada. Mostra alerta operacional em `text-warning`.
- Abas internas: `DataTab` (grade de `Figure`), `OrdersTab`, `NotesTab`, `HistoryTab`. Cada lista tem `EmptyState` com texto que ensina o que aparece ali.
- Compartilhados: `Button` (variantes default, ghost, outline; tamanhos sm, icon), `Tabs inset`, `MoreMenu` (novo `placement="down"`), `DetailSheet`, `ConfirmModal`, `Figure`, `EmptyState`.
- Tokens (`ds.css`): `--color-card`, `--color-border`, `--color-success` (etapa feita), `--color-active` (etapa atual), `--color-warning`, `--color-destructive`, `--color-selected` (faixa), `--color-muted-foreground`, `--color-ring`. Tipografia: `t-page`, `t-section`, `t-item`, `t-label`, `t-answer`, `t-body`, `t-meta`. Ícones: Heroicons outline, traço 1.5.
- Valores do tema padrão: fundo `#F7F2E9`, texto `#12395E`, success `#17734B`, active `#0A3A67`. No tema escuro, active vira `#FFC247`.

## 5. Decisões registradas

Não existe spec nem plano do cockpit em `docs/specs` ou `docs/plans`. Só a mensagem do commit e comentários no código registram o porquê.

- Fato: "no modelo do CRM do ArtCont", arranjo pedido por Felipe em 06/11 (comentário no código).
- Fato: "um container por pergunta" (Felipe, 06/11). Por isso cabeçalho, trilha e abas dividem um bloco.
- Fato: a lista recolhe para a conversa e o cockpit caberem em notebook.
- Fato: o `ContextBar` antigo sai. A ação principal sai do cabeçalho e vai para o cockpit.
- Fato: a faixa de quem conduz é "o único indicador de estado da coluna da conversa".
- Fato: sem mudança de API. Etapas e responsável são calculados de estado e eventos.
- Fato: a etapa "pulada" existe de propósito. Pedido feito só com a IA pula "Com a equipe".
- Fato, verificação declarada: tsc limpo, 1400 testes do admin verdes, `detectar.py` código 0, linha de base de tipografia 22 para 18.
- Inferência: a trilha mostra "onde o caso está", não "o que a IA pode fazer".

## 6. O que transporta para o Astrea

Serve (inferência, aplicada a escritório de advocacia):
1. **Estado e responsável em destaque.** "Quem conduz agora" (IA, advogado, estagiário) com troca em um clique. Vale para casos e tarefas.
2. **Trilha horizontal derivada de eventos.** Fases do caso (consulta, contrato, petição, audiência, encerrado), com estado pulado. Sem campo novo no modelo.
3. **Uma ação principal por estado.** Um botão cheio, o resto no menu Mais ações. Reduz a escolha na tela.
4. **Abas de contexto no mesmo bloco.** Dados, Processos, Notas, Histórico. Notas internas são úteis para sigilo entre a equipe.
5. **Ações destrutivas atrás de confirmação e de permissão.** Apagar dados com permissão específica combina com LGPD e sigilo profissional.

O que não serve:
1. **Três colunas, conversa no centro.** Não tem equivalente na Área de trabalho, que é um painel de itens. Prazos, tarefas e agenda, não uma conversa.
2. **Assumir / Devolver como eixo único.** Na náutica a IA atende o cliente sozinha. Num escritório, a IA tende a rascunhar e o advogado revisa e assina. Falta ao cockpit o modelo de aprovação (rascunho, revisão, envio).

## 7. Fontes

Raiz: `nautical-platform/`. Código lido no commit `a839b6e`. Verificado também em `e49f892`.

- `apps/admin/src/ui/ConversationCockpit.tsx`
- `apps/admin/src/ui/ConversationHandlerBar.tsx`
- `apps/admin/src/ui/MoreMenu.tsx` (placement)
- `apps/admin/src/InboxPanel.tsx` (layout, folha, lista recolhível)
- `apps/admin/src/inbox.ts` (`conversationSteps`, `currentHandler`)
- `apps/admin/src/ui/conversationcockpit.test.tsx` (nomes dos casos)
- `apps/admin/src/ds.css` (tokens)
- `apps/admin/src/ui/index.tsx` (Button, Tabs, EmptyState)

Commits: `a839b6e` (feat, 06/11 15:57), `0616ee7` (merge em develop), `e49f892` (merge em main).
Não lidos: specs `docs/specs/2026-10-23-wa-paridade.*` (anteriores ao cockpit, sem menção).
