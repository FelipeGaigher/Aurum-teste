# Backlog de melhorias

Ideias de melhoria levantadas enquanto o produto é percorrido. Cada uma
aponta a tela de origem no registro e a questão que ela alimenta. E diz o
que falta para virar proposta. Ideia aqui não é promessa: ela entra na Q1 como
direção, na Q3 como tela, ou fica fora.

| Nº | Tela de origem | Ideia | Alimenta | O que falta |
|---|---|---|---|---|
| M1 | 12, Contato | Em modo de leitura, esconder campo vazio e oferecer "mostrar todos". Um padrão de rótulo só, acima do campo | Q1, consistência e hierarquia | Confirmar com suporte se alguém usa o vazio como lembrete do que falta preencher |
| M2 | 11, Área de trabalho | Levar os widgets da coluna direita para o centro, numa linha horizontal de leitura, no modelo do cockpit da náutica. Um painel mostra as ações que a IA faz naquele contexto, com confirmar e desfazer | Q2, padrão de IA; Q3, se a tela escolhida mudar | Ler `referencias/cockpit-nautica.md` e decidir quais ações de IA fazem sentido para prazo e processo |
| M3 | 13, Agenda vazia | Mostrar a grade do calendário já no estado vazio, com uma lista de prioridades por prazo a vencer ao lado. Filtros de dia, semana e mês visíveis, no modelo das referências do umClique | Q1, estado vazio; Q3, visão de agenda | Decidir se a lista de prioridades é a mesma coisa que o Kanban ordenado por prazo |
| M4 | 14, Modal tarefa | Etiquetas sugeridas a partir do histórico de descrições do escritório. Título curto separado da descrição. Menos campos obrigatórios | Q2, padrão de IA no mesmo componente; Q3, componente de chip | Confirmar que existe histórico suficiente por escritório e como a sugestão aparece sem virar ruído |
| M5 | 15, Data no passado | Manter a data retroativa, mas o diálogo pergunta o motivo em uma linha e oferece "salvar como concluída" | Q1, usabilidade | Perguntar ao suporte quantas atividades nascem com data passada e por quê |
| M6 | 16, Envolver pessoas | Trocar o popover por um seletor de participantes com avatar e botão de mais, no próprio campo. Componente que Felipe já tem no Figma | Q3, componente do DS | Reproduzir o componente com os tokens do Astrea. Link do Figma guardado abaixo |
| M7 | 17 a 20, Agenda | Densidade: fonte menor, células menores, o mês inteiro visível numa tela. Um modo compacto por token de densidade | Q2, coleção Semantic com modo de densidade; Q1, visão de contexto | Medir quantas semanas cabem hoje e quantas caberiam no modo compacto |
| M8 | 17 a 20, Agenda | A tarefa salva não aparece em nenhuma visão. Verificar se é o filtro "Minhas atribuições" ou a data retroativa | Q1, bug ou confusão de filtro | Repetir o teste com data de hoje e com o filtro em "Todas" |

## Referências externas

- `referencias/umclique-agenda-dia.webp`, `-semana.webp`, `-mes.webp`:
  calendário com mini calendário lateral e três visões. Referência de
  densidade e de filtro, não de identidade.
- `referencias/modal-tarefa-crm.png`: modal de tarefa com participantes
  em avatar, status e tipo por ícone, prioridade, recorrência e checklist.
  Referência para M4 e M6.
- `referencias/cockpit-nautica.md`: resumo do cockpit do projeto da
  náutica, lido pelo subagente. Referência para M2.
- Componente de participantes no Figma de Felipe:
  https://www.figma.com/design/Dj3NTWhdNP3qRlBUXPTvjr/Untitled?node-id=24-111152
  A cota do MCP do Figma está esgotada hoje. Ler quando voltar.

## Como uma ideia vira proposta

1. A tela de origem está no registro, com fato e hipótese.
2. A ideia responde a um dos cinco problemas da Q1 ou a uma linha do
   contrato da Q3.
3. O que falta está respondido, ou marcado como hipótese na
   própria Q1, como item a verificar.
