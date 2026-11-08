---
name: astrea-ds
description: Use ao criar ou revisar tela, componente ou documento do Astrea, para seguir o design system e rodar os portões.
---

# Astrea DS

Kit de regras do design system do Astrea. Leia antes de criar qualquer tela.

## 1. Regras do design system

- Declare tokens só nos blocos de primitivos e semânticos de `prototipo/astrea.css`.
- Escreva zero hex fora desses blocos. Use sempre o token.
- Mantenha os mesmos blocos em `prototipo/kanban.html`. O Kanban espelha o CSS.
- Esconda todo controle nativo de formulário. Seletor, data, caixa e rádio nascem componentizados, com teclado e ARIA.
- Garanta contraste AA em texto e em estados.
- Nunca abra modal sobre modal.
- Crie um componente novo só se dois consumidores o usam.

## 2. Padrões de tela já adotados

Confira `prototipo/design-system.html` e copie a página aprovada mais recente.

- Barra de filtros: uma linha só. O botão primário fica à direita, alinhado aos filtros.
- Muitos filtros vão para "Filtro avançado", em painel lateral.
- Ordem fixa do lado direito: alternância de visão, contagem, ações, primária por último.
- Abra o detalhe de toda tabela e card em painel ao lado. O Kanban fica de fora.
- Seção de lista: faixa que abre e fecha, com tag de status. Nunca pinte o fundo para indicar status.
- Item e subitens ficam no mesmo contêiner. O subitem fica um tom abaixo do item.
- Caminho de volta: trilha com seta, embaixo do título. Não use chevron solto no meio da tela.
- Notificações: sino com contagem na navbar e painel à direita.
- Ações de painel: botões redondos de ícone, com dica.
- Card: três níveis de hierarquia e botão de copiar o número do processo.
- Toda atividade leva link ao processo.

## 3. Portões

Rode da raiz do repositório.

- `python prototipo/test_verificar.py`
- `python prototipo/verificar.py --todos --base-kanban --sincronia`
- `node scripts/verificar-app.js` (cobre RF-01 a RF-15)
- `python ~/.claude/skills/sem-plastico/scripts/detectar.py <arquivos>`
- `python ~/.claude/skills/portugues-tecnico/scripts/check_docs.py <docs>`

Código diferente de 0 bloqueia o commit. Corrija a causa, não o portão.

## 4. Como usar a skill

1. Leia esta skill e `prototipo/design-system.html` antes de criar tela.
2. Copie a página aprovada mais recente. Não parta do zero.
3. Rode os portões da seção 3 antes do commit.
4. Registre cada correção do humano em `docs/licoes.md`.

Vale para agente e para designer.

## 5. Fontes

- `prototipo/design-system.html`
- `docs/2026-11-08-comparativo-astrea-prototipo.md`
- `04-processo.html`
