# Pontos de atenção do Astrea

Catálogo único do que atrapalha o uso do sistema. As fontes são os prints
comentados por Felipe, o registro de telas e o inventário. Somam-se a varredura
de 08/11 e a planilha de pedidos. Ponto novo entra aqui na hora em que aparece.

Este arquivo é a base do diagnóstico da Q1, do design system e do protótipo.
Os cinco problemas da Q1 são o recorte deste catálogo para a gestão de
atividades.

## Legenda

**Sev.** é a severidade de Nielsen, de 0 a 4. É julgamento nosso até a
validação com dados.

| Nota | Significado |
|---|---|
| 1 | Cosmético |
| 2 | Menor |
| 3 | Maior, prioridade alta |
| 4 | Catástrofe de uso |

**Heurísticas de Nielsen**, coluna `Princípio`:

| Código | Heurística |
|---|---|
| N1 | Visibilidade do estado do sistema |
| N2 | Correspondência com o mundo real |
| N3 | Controle e liberdade |
| N4 | Consistência e padrões |
| N5 | Prevenção de erros |
| N6 | Reconhecimento em vez de memória |
| N7 | Flexibilidade e eficiência |
| N8 | Estética e design minimalista |
| N9 | Ajuda para corrigir erros |
| N10 | Ajuda e documentação |

**Gestalt**, mesma coluna: `G-sim` similaridade, `G-prox` proximidade, `G-fig`
figura e fundo, `G-reg` região comum, `G-cont` continuidade.

**Destino** diz o que acontece com o ponto:

- `Protótipo`: corrigido no app navegável.
- `Validar`: depende de dado antes de propor mudança.
- `Backlog`: exige dado, serviço ou permissão nova, ou está fora do recorte.

As referências `M` apontam para `01-melhorias.md`. `V§` aponta para a seção de
`01-varredura-modulos.md`. `T` aponta para a tela em `01-telas-observadas.md`.

## Moldura: cabeçalho e menu

| ID | Ponto de atenção | Evidência | Princípio | Sev. | Melhoria | Destino |
|---|---|---|---|---|---|---|
| PA-01 | O menu lateral não marca o módulo atual. A pessoa clica em Alertas, a tela muda e o menu fica igual. O fundo cinza só aparece no hover | Print de Felipe em Alertas e em Processos. Captura de Contatos com o cursor sobre o item. Captura da Área de trabalho sem destaque | N1, G-sim | 3 | Item ativo com fundo, cor e `aria-current`, em todos os módulos | Protótipo |
| PA-02 | O título da página ocupa uma linha própria e não existe trilha. No segundo nível só há o link "Voltar" | Print de Felipe em Processos. T12 | N1, N8 | 2 | M14. Título no cabeçalho. Trilha a partir do segundo nível | Protótipo |
| PA-03 | A busca global fica separada das ações, no centro do cabeçalho | Print de Felipe | G-prox | 2 | M15. Busca à direita, junto das ações | Protótipo |
| PA-04 | Cinco ícones sem rótulo no cabeçalho. O ícone de IA não tem `aria-label` nem `title` | Inventário, seção 0 | N6, N4 | 3 | M16. Três ícones, com tooltip e rótulo acessível | Protótipo |
| PA-05 | A nuvem significa "Resultados de buscas". Felipe, especialista, leu como salvar na nuvem | Print de Felipe. Inventário, seção 0 | N2, N6 | 3 | M16. Mover para Processos e casos, com texto | Validar |
| PA-06 | Dois ícones trocam de página e três abrem painel. O mesmo tipo de controle tem efeitos diferentes | Inventário, seção 0 | N4 | 2 | M16. Administração no menu do usuário | Protótipo |
| PA-07 | O Cronômetro abre um modal de upgrade sem avisar antes | Inventário, seção 0 | N1, N2 | 2 | Marcar o recurso bloqueado antes do clique | Protótipo |
| PA-08 | "Contratar" e o selo "1 ano grátis" ocupam espaço nobre. O selo usa a fonte Handlee, a única fora do padrão | Print de Felipe. Inventário, seção 0 | N8, G-fig | 2 | M17. Uma linha no rodapé do menu, com os dias restantes | Validar |
| PA-09 | A faixa de campanha entra na moldura, com terceiro azul e contador | T11 | N8, G-fig | 2 | Tirar da moldura. Medir cliques e conversão | Validar |
| PA-10 | A IA tem paleta e destaque próprios, em roxo, e o item vende recurso que o plano não tem | T11. V§9 | N4, G-sim | 2 | IA nos mesmos componentes e cores | Protótipo |
| PA-11 | O mesmo azul serve para link, número e botão. Tudo parece clicável | T11. Inventário UI | N4, G-sim | 3 | Número é texto, link é link, botão é botão | Protótipo |
| PA-12 | O menu lateral não recolhe e ocupa 240px fixos | Prints de Felipe. Inventário, seção 0 | N7 | 2 | Menu recolhível, com a escolha lembrada | Protótipo |
| PA-13 | Três dos doze itens do menu levam só a upsell | V§8 | N8, N2 | 2 | Upsell padronizado. Avaliar ocultar por plano | Validar |
| PA-14 | O onboarding promete quadros Kanban, e o plano de teste não tem esse recurso | T06, T10. V§0 e V§11 | N2 | 3 | Prometer só o que o plano entrega | Backlog |
| PA-15 | A sugestão "Mostrar mais resultados" da busca usa fonte serifada e ícone fora do padrão | V§10 | N4 | 1 | Componente único de lista de sugestões | Protótipo |

## Padrões transversais

| ID | Ponto de atenção | Evidência | Princípio | Sev. | Melhoria | Destino |
|---|---|---|---|---|---|---|
| PA-16 | Três azuis na mesma tela e cinzas de três origens | Inventário UI | N4 | 3 | Um azul de ação e uma escala de cinza, por token | Protótipo |
| PA-17 | 646 variáveis CSS e três sistemas de nomes. O token novo de marca não chegou aos botões | Inventário CSS, seção 14 | N4 | 3 | Tokens semânticos sobre o Nectar | Protótipo |
| PA-18 | Botão varia em caixa, raio e peso. Existem nível novo e nível legado | Inventário CSS, seção 0 | N4, G-sim | 3 | Botão único do DS, com variantes | Protótipo |
| PA-19 | "Cancelar" é link em formulário de página e botão em modal e filtro | V§4 e V§7 | N4 | 2 | Um padrão de ação secundária | Protótipo |
| PA-20 | Seletor nativo convive com menus customizados | T11. V§1 e V§7 | N4 | 2 | Seletor único do DS, com teclado e ARIA | Protótipo |
| PA-21 | Três padrões de rótulo: acima, à direita em caixa alta, e só placeholder | T07, T12, T14 | N4, G-prox | 3 | Rótulo fixo acima do campo | Protótipo |
| PA-22 | Dois estilos de foco, azul e preto | T04, T07 | N4, N1 | 2 | Um token de foco em todo controle | Protótipo |
| PA-23 | Tarefa e atividade se misturam. Tarefa, evento e prazo são tipos diferentes | T13, T14. Planilha. V§4 | N2, N4 | 3 | Atividade como termo geral, com tipos. Confirmar com o Suporte | Validar |
| PA-24 | O menu de criar aparece em quatro lugares, com itens diferentes | V§1 | N4 | 3 | Uma fonte de itens e rótulo em cada botão | Protótipo |
| PA-25 | O botão de criar muda de texto entre abas do mesmo registro | V§3 | N4 | 2 | Sempre "Adicionar" e o objeto | Protótipo |
| PA-26 | Itens com selo "UPGRADE" ficam misturados aos liberados | V§1 e V§4 | N8, G-prox | 2 | Grupo próprio no fim do menu | Protótipo |
| PA-27 | Modal sobre modal e popover sobre modal | T16. V§2 | N3, N8 | 3 | Painel único, sem segunda camada | Protótipo |
| PA-28 | Barra de progresso e stepper diferentes para a mesma função | Inventário UI | N4 | 2 | Stepper único do DS | Protótipo |
| PA-29 | Selos "MELHORIA" dentro de formulários, sem explicação | V§2 | N2, N8 | 1 | Retirar, ou explicar em uma linha | Protótipo |
| PA-30 | Sucesso só por toast, longe de onde a pessoa olha | T17 a T20 | N1 | 2 | M11. Estado na barra de ações. Toast só fora da tela | Protótipo |

## Área de trabalho

| ID | Ponto de atenção | Evidência | Princípio | Sev. | Melhoria | Destino |
|---|---|---|---|---|---|---|
| PA-31 | Abre em uma só lista, vazia, e esconde tarefa atrasada de outra lista. Quem criou acha que sumiu | V§1. ASTP-I-1136 | N1, N5 | 4 | Abrir em todas as listas | Protótipo |
| PA-32 | Prazo vencido sem seção própria. Faltam "Atrasadas" e o dia em destaque | V§1. ASTP-I-915. ASTP-I-2149 | N1 | 4 | Seção "Atrasadas" acima de "Hoje" | Protótipo |
| PA-33 | Prazos e audiências ficam num canto, em "Lembretes", abaixo das estatísticas | 136 votos, 33% do total. ASTP-I-639, 43 votos | N1, G-fig | 4 | Prazos, audiências e eventos na área principal | Protótipo |
| PA-34 | Data sem hierarquia e sem distinguir vencido, hoje e próximos | ASTP-I-79. ASTP-I-219. ASTP-I-1735 | N1, G-sim | 3 | Chip de prazo com texto e cor | Protótipo |
| PA-35 | Minhas tarefas e delegadas ficam misturadas | Tag Filtro, 63 votos. ASTP-I-393 | N7, G-reg | 3 | Filtro minhas, delegadas, período e situação | Protótipo |
| PA-36 | Concluídas ficam difíceis de consultar | ASTP-I-752, 29 votos | N7, N1 | 3 | Filtro de situação | Protótipo |
| PA-37 | Perde o filtro ao entrar e voltar de um processo | ASTS-I-596. ASTS-I-625 | N6, N3 | 3 | Manter o último filtro | Protótipo |
| PA-38 | O número do processo não aparece na linha | ASTP-I-707. ASTS-I-666 | N6, N7 | 2 | Número com botão de copiar | Protótipo |
| PA-39 | Widgets na coluna direita competem com a lista. Estatísticas em azul sem ação clara | T11. M2 | N8, G-fig | 2 | M2. Linha de leitura horizontal | Protótipo |
| PA-40 | Ações da linha só aparecem no hover e não têm rótulo | V§1 | N6 | 2 | Ações visíveis no foco, com tooltip | Protótipo |
| PA-41 | Carregar mais tarefas exige carregar todas, e fica lento | ASTP-I-108 | N7, N1 | 2 | Paginação incremental | Backlog |
| PA-42 | Comentário novo não aparece na listagem | Tag Comentários, 20 votos | N1 | 2 | Indicador de não lido. Exige estado novo | Backlog |
| PA-43 | Sem ordenação manual nem por processo | Tag Ordenação, 33 votos | N7 | 2 | Ordem manual. Exige dado novo | Backlog |
| PA-44 | Sem visão de quadro por etapa | ASTP-I-127, 18 votos | N7 | 2 | Kanban como visão alternativa | Backlog |
| PA-45 | Área de trabalho não personalizável além de ocultar widget | Tag Personalizar, 37 votos | N7 | 2 | Escolher e ordenar blocos | Backlog |

## Agenda

| ID | Ponto de atenção | Evidência | Princípio | Sev. | Melhoria | Destino |
|---|---|---|---|---|---|---|
| PA-46 | O estado vazio esconde a grade e não ensina a tela | T13 | N6, N10 | 2 | M3. Grade visível no estado vazio | Protótipo |
| PA-47 | O mês mostra duas semanas por tela | T17 a T20 | N8, N7 | 3 | M7. Modo compacto com o mês inteiro | Protótipo |
| PA-48 | A informação de prazo se espalha em quatro visões e um painel truncado | T17 a T20 | N1, G-reg | 3 | M3. Lista de prioridades por prazo | Protótipo |
| PA-49 | A visão por dia reabre na data da última sessão, e não em Hoje | V§2 | N1, N5 | 3 | Abrir sempre em Hoje | Protótipo |
| PA-50 | Tarefa salva não aparece. A causa provável é filtro ou data retroativa | T17 a T20. M8 | N1 | 3 | Repetir o teste no produto real | Validar |
| PA-51 | "De" mostra data e hora. "Até" mostra hora e data | V§2 | N4, G-cont | 2 | Mesma ordem nos dois | Protótipo |
| PA-52 | Campos vazios e desabilitados sem dizer quando liberam | V§2 | N1, N10 | 2 | Texto de ajuda no campo | Protótipo |
| PA-53 | Eventos não aparecem junto das tarefas na Área de trabalho | ASTS-I-90. ASTS-I-702 | N6 | 3 | Ver PA-33 | Protótipo |

## Criar atividade

| ID | Ponto de atenção | Evidência | Princípio | Sev. | Melhoria | Destino |
|---|---|---|---|---|---|---|
| PA-54 | Quatro obrigatórios para uma tarefa simples. "Lista de tarefas" é obrigatória com um só valor | T14 | N7, N5 | 3 | M4. Lista preenchida por padrão | Protótipo |
| PA-55 | Prioridade nasce "Baixa", inclusive em prazo processual | T14 | N5 | 3 | Revisar o padrão por tipo | Validar |
| PA-56 | Sem título separado da descrição | T14 | N8 | 2 | M4. Exige campo novo | Backlog |
| PA-57 | Data no passado abre um segundo diálogo | T15 | N3, N5 | 2 | M5. Aviso no próprio painel, com "Salvar como concluída" | Protótipo |
| PA-58 | "Envolver mais pessoas" abre popover dentro do modal | T16 | N3, N8 | 3 | M6. Seletor de pessoas no campo | Protótipo |
| PA-59 | Cancelar formulário vazio pede confirmação em outro modal | V§2 | N3, N8 | 3 | Confirmar só com dado preenchido | Protótipo |
| PA-60 | Tarefa tem três layouts: modal de edição, linha e visualização | V§5 | N4 | 2 | Um painel de atividade | Protótipo |

## Contatos

| ID | Ponto de atenção | Evidência | Princípio | Sev. | Melhoria | Destino |
|---|---|---|---|---|---|---|
| PA-61 | Leitura mostra cerca de vinte campos vazios | T12 | N8 | 3 | M1. Esconder vazio, com "Mostrar todos" | Protótipo |
| PA-62 | Filtro "Só clientes" vem ligado. Contato que não é cliente não aparece | V§3 | N1, N5 | 4 | Abrir em todos, com o filtro visível | Protótipo |
| PA-63 | O filtro do contato vaza para a lista global de processos | V§3 e V§4 | N5, N3 | 3 | Filtro restrito à aba | Protótipo |
| PA-64 | Só existe visão em tabela | T21 | N7 | 1 | M9. Tabela ou cards, com a escolha lembrada | Protótipo |
| PA-65 | Filtro de A a Z ocupa uma linha inteira, mesmo com poucos contatos | T21 | N8 | 1 | Mostrar só a partir de um volume | Protótipo |
| PA-66 | "Nenhum telefone" se repete em cada linha | T21 | N8 | 1 | Traço na célula vazia | Protótipo |
| PA-67 | Largura dos campos sem grade | T22 a T25 | G-cont, N4 | 2 | M10. Larguras por token | Protótipo |
| PA-68 | Salvar fica no fim de página longa, sem alinhar aos campos | T22 a T25 | N1, G-cont | 2 | M11. Barra de ações fixa | Protótipo |
| PA-69 | Criar etiqueta tira a pessoa do cadastro | T22 | N3, N6 | 3 | M12. Painel lateral, com a etiqueta selecionada ao voltar | Protótipo |
| PA-70 | Documentação aceita o número e não aceita o arquivo | T25 | N2 | 2 | M13. Exige serviço novo | Backlog |
| PA-71 | Abas financeiras abrem vazias, embora o módulo esteja bloqueado | V§3 e V§8 | N4, N1 | 2 | Mesmo estado de upsell | Protótipo |

## Processos e casos

| ID | Ponto de atenção | Evidência | Princípio | Sev. | Melhoria | Destino |
|---|---|---|---|---|---|---|
| PA-72 | Quatro ações soltas na página: imprimir, exportar, atualizar e adicionar | Print de Felipe. V§4 | N8, G-prox | 2 | M18. Duas ações, com rótulo | Protótipo |
| PA-73 | Filtro avançado mistura rádios, caixas e seletores, com raio e peso legados | Print de Felipe. Inventário CSS | N4 | 2 | Barra de filtros do DS, com chips | Protótipo |
| PA-74 | Formulário com 17 campos em sequência única, três obrigatórios | V§4 | N8, G-reg | 3 | Agrupar em seções, na mesma ordem | Protótipo |
| PA-75 | Três formas de entrada para o mesmo objeto, cada uma com layout próprio | V§4 | N4 | 2 | Mesmo molde de formulário | Protótipo |
| PA-76 | Encerrar e Excluir ficam no menu junto de ações comuns | V§4 | N5 | 3 | Grupo destrutivo separado | Protótipo |
| PA-77 | Processo, caso e pasta se misturam nos rótulos | V§4 | N2, N4 | 2 | Glossário. Confirmar com o Suporte | Validar |

## Alertas

| ID | Ponto de atenção | Evidência | Princípio | Sev. | Melhoria | Destino |
|---|---|---|---|---|---|---|
| PA-78 | O botão diz "Descartar" e o diálogo diz "Excluir" | V§5 | N2, N4 | 3 | Um verbo | Protótipo |
| PA-79 | Aviso "pode levar alguns minutos" no descarte de um item | V§5 | N1 | 2 | Texto proporcional ao efeito | Protótipo |
| PA-80 | Frases diferentes de estado vazio em cada aba | V§5 | N4, N8 | 1 | Estado vazio único | Protótipo |
| PA-81 | "Expandir todos" existe em uma aba e falta em outra | V§5 | N4 | 2 | Mesma barra em todas | Protótipo |
| PA-82 | Prazos e audiências misturados às demais abas | ASTP-I-813 | N1, G-reg | 3 | Aba de prazos | Backlog |

## Atendimentos e Documentos

| ID | Ponto de atenção | Evidência | Princípio | Sev. | Melhoria | Destino |
|---|---|---|---|---|---|---|
| PA-83 | "1º Registro" é obrigatório e ocupa metade da tela | V§6 | N7, N8 | 2 | Área menor, que cresce com o texto | Protótipo |
| PA-84 | Atendimento não tem Responsável nem Acesso. Processo tem | V§6 | N4 | 2 | Confirmar se é regra de negócio | Validar |
| PA-85 | Documento padrão tem dois passos, sem indicador | V§7 | N1 | 2 | Stepper do DS | Protótipo |
| PA-86 | Modelos moram em Administração, longe de Documentos | V§7 | N6 | 2 | Atalho em Documentos | Protótipo |
| PA-87 | Autor vazio nos quatro modelos padrão | V§7 | N8 | 1 | Traço, ou "Modelo do Astrea" | Protótipo |

## Administração e conta

| ID | Ponto de atenção | Evidência | Princípio | Sev. | Melhoria | Destino |
|---|---|---|---|---|---|---|
| PA-88 | Limpar a conta fica ao lado de dados cadastrais | V§10 | N5 | 4 | Zona separada, com confirmação | Protótipo |
| PA-89 | Rádios de segurança parecem gravar ao clicar, sem Salvar | V§10 | N1, N5 | 3 | Barra de ações. Confirmar no produto | Validar |
| PA-90 | 40 monitorados e 35 créditos são dois limites, sem explicação | V§0 | N2, N10 | 2 | Explicar os dois em "Meu plano" | Protótipo |
| PA-91 | Cartões de IA têm de dois a cinco selos de plano | V§9 | N8 | 2 | Dizer só se vale no plano atual | Protótipo |
| PA-92 | A faixa de processos do cadastro não aparece em lugar nenhum | V§0 | N1 | 1 | Confirmar se define algo | Validar |

## Cadastro e onboarding

Fora do recorte da Q1, decisão de 07/11. Fica para a Parte B.

| ID | Ponto de atenção | Evidência | Princípio | Sev. | Melhoria | Destino |
|---|---|---|---|---|---|---|
| PA-93 | Com bloqueador de anúncio, "Continuar" fica cinza e sem mensagem | T01, T02 | N9, N1 | 4 | Formulário independente de script de terceiro | Backlog |
| PA-94 | Sem opção de corrigir a OAB na confirmação | T08 | N3, N9 | 2 | Ação "Não sou eu" | Backlog |
| PA-95 | O limite de 40 processos aparece só no fim | T10 | N5, N1 | 2 | Avisar antes da busca | Backlog |
| PA-96 | Stepper com passo em aberto na tela de conclusão | T10 | N1 | 1 | Corrigir o estado | Backlog |
| PA-97 | Campo sem rótulo visível depois de preenchido | T07 | N6 | 2 | Ver PA-21 | Backlog |

## Pendências de validação

| Ponto | Como validar | Com quem |
|---|---|---|
| PA-05, PA-06 | Analytics de clique por ícone e teste do ícone | Produto |
| PA-08, PA-09 | Conversão do selo, do botão e da faixa, contra CSAT | Marketing |
| PA-13 | Quantas contas clicam em módulo sem acesso | Produto |
| PA-23, PA-77 | Termos usados nos chamados e teste de cinco segundos | Suporte |
| PA-50 | Repetir com data de hoje e filtro "Todas" | Teste no trial |
| PA-55 | Prioridade escolhida por tipo de atividade | Produto |
| PA-84 | Regra de negócio do atendimento | Produto |
| PA-89 | Mudar a opção em conta de teste | Teste no trial |
| PA-92 | Uso da faixa pelo time comercial | Comercial |

A planilha de pedidos cobre só a Área de trabalho. Vem de quem escolheu pedir,
e parte dos pedidos é antiga. Cada ponto que usa a planilha precisa de
conferência no produto atual.
