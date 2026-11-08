# Padrões de UI da Fotus e da náutica para o teste do Astrea

Leitura somente. Nada foi alterado, buscado ou baixado.

**Aviso principal.** Os clones locais da Fotus param em 2026-10-29. O último fetch foi em 2026-10-30. Nenhum commit de 2026-11-06 existe neste disco, em nenhuma ref. A barra e o toast de ontem não estão aqui. Abaixo vai o que existe: a versão de 29/10 da barra, e a notificação que o módulo já usa. Felipe decide se atualiza o clone (git fetch).

Legenda: **[F]** fato lido no código. **[I]** inferência.

## 1. Barra de ações fixa no pé do formulário

**O que faz [F].** Barra `sticky` no pé do detalhe e do visualizar da venda direta. Status à esquerda (ponto colorido e rótulo). Ações à direita. Cada ação abre modal com a consequência e só executa ao confirmar.

**Estrutura [F].**
- `app-vd-barra-acao` (`:host` sticky, `bottom: 0`, `z-index: 20`)
  - `.vdp-barra-acao__status`: `__ponto` + texto
  - `.vdp-barra-acao__acoes`: `app-vd-acoes` (um `button.vdp-btn` por ação) + `ng-content`
- `app-vd-acoes` também guarda o `nz-modal` de confirmação (motivo obrigatório, opcional ou ausente).
- Entradas: `status`, `acoes`, `ocupado`. Saída: `executar`.

**Estados.**
- Padrão [F]: botões ativos, status visível.
- Salvando [F]: `ocupado` desabilita todos os botões. Não há spinner nem texto "salvando" na barra.
- Bloqueado [F]: botão com opacidade 0,5, cursor `not-allowed`, tooltip e o motivo em vermelho embaixo do botão.
- Erro e sucesso [F]: não moram na barra. Saem em notificação do ng-zorro (`notification.success('Pronto', ...)`, `notification.error('Não foi possível concluir', ...)`).
- Notificação do que acontece na tela dentro da barra: não encontrada [F]. Se a versão de 06/11 a tem, está só no remoto.

**Posição e saída [F].** Gruda no rodapé do conteúdo rolável. Vira estática ao fim da página. Em tela estreita (até 575 px) o status ocupa uma linha e as ações a de baixo. Padding direito de 72 px para não ficar sob o botão redondo fixo do FV2. A barra não some: o modal fecha, a barra fica.

**Condição de uso [F].** `sticky` só funciona com a barra como irmã do conteúdo, em bloco comum. Em grid ou flex em linha ela deixa de grudar.

**Acessibilidade.**
- [F] Botões são `button type="button"` nativos. Sem `aria-live`, sem `role` e sem `aria-*` na barra e em `vd-acoes`.
- [F] O motivo do bloqueio aparece em texto, não só em tooltip.
- [I] Foco e fechamento do modal vêm do `nz-modal`. Não foi verificado.
- [I] A barra não anuncia o resultado a leitor de tela. Isso falta.

**Tokens [F].** Sass de `_tokens.scss`: fundo `$vdp-fundo-bloco` (#fafbfc), borda `$vdp-borda-suave` (#e3e3e8), sombra com `$vdp-texto-forte` (#2a2a2a) a 8%, bloqueio `$vdp-vermelho` (#de4436), aviso #8a5a12 sobre #fff8ec. Raio 8 px no topo. Gap 10 e 16 px.

**Commits [F].**
- `db6faf0f7` feat: barra de ação no pé do detalhe e do visualizar da venda direta (2026-10-29)
- `642b0b6ab` fix: botão de ação bloqueado da venda direta aparece desligado (2026-10-29)

## 2. Toast

**Fato.** O toast de 06/11 não existe no clone. O que existe é `NzNotificationService` (ng-zorro), injetado em 10 telas do módulo `venda-direta`. Também há texto de toast montado em `venda-direta-buscas.ts` (mensagem do servidor ou a de quem chamou).

**Estrutura [F].** Chamada de serviço, sem componente próprio: `notification.success(título, texto)` e `notification.error(título, texto)`. Exemplos: "Pronto" / "A solicitação seguiu para a próxima etapa."; "Não foi possível concluir" / "Falha de comunicação. Tente de novo."

**Estados [F].** Sucesso e erro. Aviso e informação não aparecem nas telas lidas.

**Posição, saída, acessibilidade, cores.** Não verificados no código do módulo.
- [I] O ng-zorro põe a notificação no canto superior direito. Fecha sozinha e tem botão de fechar. Isso é comportamento padrão da biblioteca, não lido aqui.
- [F] As notificações globais têm SCSS em `assets/scss/components/feedback/_notifications.scss`. Não abri o arquivo.

**Commit.** Nenhum identificado para o toast de 06/11. Para a barra, ver o item 1.

## 3. Alternar tabela e cards numa lista

Há três implementações. Todas existem no disco.

### 3a. Náutica (React, Tailwind)
**O que faz [F].** Controle segmentado "Tabela / Cartões" ao lado da busca. A escolha fica por lista no navegador (`localStorage`, chave `lista-formato:<lista>`). Sem storage, vale até fechar a tela. Padrão: tabela.

**Estrutura [F].**
- `useListFormat(lista)` devolve `[formato, trocar]`.
- `ListFormatSwitch` usa `Segmented` (`role="group"`, `aria-label="Formato da lista"`, `aria-pressed` por botão).
- `RecordGrid`: `grid-cols-[repeat(auto-fill,minmax(min(100%,22rem),1fr))] gap-3`. Uma coluna no celular.
- `RecordCard` (`article`): título, `lead`, `aside`, `dl` de rótulo e valor, rodapé de ações. O cartão inteiro abre a ficha ao clique. Clique em botão, link ou input dentro dele não abre. Pelo teclado, abre o botão do título.
- `TreeTable` ganhou a troca para qualquer tabela do painel.

**Estados [F].** Selecionado: `bg-selected` com faixa interna de 3 px em `--color-active`. Hover: `brightness(0.98)`. O controle só aparece quando há itens (na lista de alunos).

**Acessibilidade [F].** `aria-pressed`, foco com anel (`FOCUS`). Não é radiogroup, e não tem navegação por seta.

**Tokens [F].** `bg-muted` no trilho, `bg-card` no ativo, `shadow-[var(--shadow-card)]`, `border-border`, `rounded-xl`, `t-label`, `t-value`.

**Commits [F].**
- `45846600` feat(escola): anexos na tela, alunos em cartoes e lista sem a linha do cabecalho (2026-11-02)
- `4fbf457d` feat(painel): toda tabela em cartoes, aluno com proximo passo e notificacao colorida (2026-11-02)
- `572f4d27` fix(painel): seletor Tabela/Cartoes na mesma linha da busca e dos filtros, na lista de alunos (2026-11-04)

### 3b. Importação (React, CSS Modules)
**Fato.** `Segmentado` é a referência citada nos outros dois projetos. É `radiogroup` com seta circulando, roving tabindex e opções só com ícone (rótulo em `.sr-only` e `title`). Selecionado é preenchimento (`--surface`) mais peso, nunca borda. Trilho `--campo`, sem borda. Foco: `outline: 2px solid var(--brand)`. A barra de visão da listagem de projetos tem Formato (inclui cartões) e Agrupar.
Commits: `e25f01b` feat(ui): adiciona primitivo Segmentado [DEV-3408] (2026-08-06). Barra de visão: `266a691` feat(projetos): a barra em duas faixas chega ao front (2026-08-31).

### 3c. Força de vendas (Angular)
**Fato.** `app-vd-modo-lista`: `radiogroup` "Formato da listagem", opções Cards e Tabela, seta circula, `tabindex` rotativo. Estado em `VendaDiretaEstadoService.modoDaPersona`, por persona. Reusa `.vdp-seg`.
Commit: `cc20b0fce` feat: cards ou tabela na listagem das cinco personas de venda direta (2026-09-16).

## O que transporta para o Astrea

**Barra de ações.**
- Levar a estrutura: status à esquerda, ações à direita, `sticky bottom: 0`. Vale como padrão do formulário de cliente e de processo.
- Acrescentar o que falta [I]: texto "Salvando…" e resultado dentro da barra, com `role="status"` e `aria-live="polite"`. O erro vai com `role="alert"`.
- Manter o bloqueio com motivo escrito embaixo do botão, e o modal só para ação com consequência.

**Toast.**
- Sem o código de 06/11, não dá para transportar o desenho. Atualizar o clone antes de copiar.
- Do que existe, vale a regra: título curto e frase de ação ("Não foi possível concluir. Tente de novo.").
- Para o Astrea [I]: toast só confirma. Erro de campo fica no campo, e erro que exige decisão fica na barra.

**Tabela e cards.**
- Preferir `Segmentado` da Importação como base: `radiogroup`, seta, foco visível. A versão da náutica é mais simples, mas menos acessível.
- Levar da náutica: memória por lista no `localStorage` com `try/catch`. Grade `auto-fill`. Cartão que abre a ficha sem roubar o clique dos botões.
- Para advogado [I]: padrão tabela em listas longas (processos, prazos). Cards em carteira de clientes.

## Fontes

- forca-de-vendas: `frontend/src/app/modules/comercial/venda-direta/componentes/vd-barra-acao/vd-barra-acao.component.{html,ts,scss}`
- forca-de-vendas: `frontend/src/app/modules/comercial/venda-direta/componentes/vd-acoes/vd-acoes.component.html`
- forca-de-vendas: `frontend/src/app/modules/comercial/venda-direta/estilos/acoes.scss`
- forca-de-vendas: `frontend/src/app/modules/comercial/venda-direta/_tokens.scss`
- forca-de-vendas: `frontend/src/app/modules/comercial/venda-direta/telas/vd-detalhe/vd-detalhe.component.ts` (notification)
- forca-de-vendas: `frontend/src/app/modules/comercial/venda-direta/componentes/vd-modo-lista/vd-modo-lista.component.{html,ts}`
- forca-de-vendas: `Docs/specs/2026-10-29-vd-revisao-leva-3.html` (RF-05)
- prototipo-venda-direta: mesmo repositório (worktree), sem commit de 06/11
- nautical-platform: `apps/admin/src/ui/RecordCard.tsx`, `apps/admin/src/ui/DashboardCards.tsx` (`Segmented`), `apps/admin/src/school/StudentList.tsx` (lidos na cópia de trabalho `np-fin-aba`, branch `fix/site-cadastro-foto-errada`; o `nautical-platform` principal não tem esses arquivos)
- csc-importacao-web-react: `src/shared/ui/segmentado/Segmentado.{tsx,module.css}`, `src/pages/projetos/BarraDeVisao.tsx`
