# Varredura do Astrea em produção

Data: 08/11/2026. Conta de teste no plano gratuito. A varredura só leu as telas.
Nenhuma ação gravou dado. Os formulários abertos fecharam com Esc ou com a troca de rota.

Dado real não entra aqui. Nome de pessoa vira [cliente] ou [advogado]. Número de processo vira [nº CNJ].

<!-- lint-ignore-bloco: deriva-terminologica — o documento cita os rótulos literais do Astrea -->

Fonte de cada linha: texto da página (`get_page_text`), árvore de acessibilidade (`read_page`) e captura de tela.
A contagem de cliques parte da tela citada, com o menu lateral já visível.

## Moldura, presente em toda tela

- Cabeçalho, da esquerda para a direita: logo, busca global, cinco ícones e o nome do usuário.
- O campo da busca diz "Pesquisar contato, processo ou tarefa".
- Os cinco ícones: IA, Adicionar, Resultados de buscas (nuvem), Cronômetro timesheet e Administração (engrenagem).
- Depois do nome: selo "1 ano grátis" e botão verde "Contratar".
- A faixa de campanha com contador não apareceu nesta sessão.
- Menu lateral: Área de trabalho, Agenda, Contatos, Atendimentos, Processos e casos, Publicações, Financeiro, Documentos, Indicadores e Alertas.
- Alertas traz um badge vermelho com a contagem. Abaixo ficam "Conheça as IAs", com fundo lilás, e Suporte.
- O "Adicionar" global abre um menu: Processo manual, Processo busca automática, Caso, Atendimento, Tarefa, Evento e Contato.
- Não existe sino de notificações. O único sinal de pendência é o badge do item Alertas.

## Área de trabalho

Rota `#/main/workspace`.

| Item | O que existe |
|---|---|
| Ações do cabeçalho | "Adicionar tarefa" (primário), etiqueta, ordenar e imprimir |
| Filtro | "Todas as listas", um menu único. Não há filtro por pessoa, período ou situação na barra |
| Visões | Só lista. Não há alternância para cards ou quadro |
| Linha da tarefa | Título, data em vermelho quando atrasada, título do processo como link, prioridade em estrela, iniciais do responsável, etiqueta |
| Ações no hover | Cinco ícones sem rótulo: responsável, etiqueta, data, editar e excluir |
| Coluna direita | Três widgets: Processos e casos (período e duas contagens), Estatísticas (seis números) e Lembretes (Hoje, Amanhã, Futuros) |
| Detalhe | Modal "Tarefa" sobre a lista |

O modal da tarefa mostra, de cima para baixo: título, data, processo (link), número do processo, responsável, criador e prioridade.
Abaixo vêm as abas Comentários e Histórico de alterações. O cabeçalho do modal tem cinco ícones: lista, etiqueta, WhatsApp, editar e mais.

O número do processo no modal copia ao clicar. O tooltip "Copiar" aparece no hover.

| Ação-chave | Cliques | Caminho |
|---|---|---|
| Ir da tarefa ao processo | 1 | Link do título do processo na linha |
| Copiar o número do processo | 2 | Abrir a tarefa, clicar no número dentro do modal |
| Ver o detalhe da tarefa | 1 | Clicar no título; abre modal e esconde a lista |
| Criar tarefa | 1 | "Adicionar tarefa", abre modal |
| Ver prazo atrasado | 0 | Data em vermelho na linha. Não existe seção "Atrasadas" |

Observações:

- A linha não mostra o número do processo. Quem precisa do número abre o modal.
- Os números de Estatísticas aparecem como link na árvore de acessibilidade, sem `href`. A varredura não testou o destino.
- Os widgets do Processos e casos levam à lista filtrada por movimentação.

## Agenda

Rota `#/main/calendar`.

| Item | O que existe |
|---|---|
| Ações do cabeçalho | Atualizar, menu de três pontos e "+" azul. O "+" abre Tarefa ou Evento |
| Filtros | "Minhas atribuições", "Todas as atividades", etiqueta e busca por ícone de lupa |
| Visões | Em lista, Por dia, Por semana e Por mês, num menu "Por dia" |
| Grade | Grade de horas à esquerda. Painel "Nenhuma atividade" à direita |
| Navegação de data | Seletor de data, "Hoje" e setas |

- A Agenda abriu em "Ontem", e não em Hoje.
- A conta tem duas tarefas datadas. Nenhuma apareceu na visão por dia com os filtros padrão.
- Criar atividade: 2 cliques ("+" e o tipo). O botão não tem rótulo.

## Contatos

### Lista

Rota `#/main/contacts`.

- Ações: "Adicionar" e um ícone sem rótulo ao lado.
- Filtro de A a Z com 26 letras, mesmo com cinco contatos.
- Busca: "Procure por nome, apelido ou nome fantasia do seu contato".
- Chips de filtro: "Tipo: Cliente", "Notificações: Todos" e "Tipo de notificação: Todas". A lista abre já filtrada por Cliente.
- Colunas, na ordem: caixa de seleção, tipo, nome, telefone, e-mail e etiquetas.
- Célula vazia mostra "Nenhum telefone" ou "Nenhum email" por extenso.
- Visões: só tabela.

### Ficha do contato

Rota `#/main/contacts/detail/<id>/data`, uma página nova.

- Topo: nome, data de criação, tag "Tipo: Cliente". Editar e excluir em ícone. "Voltar" como link de texto no canto direito.
- Abas: Cadastro, Documentos, Atendimentos, Processos, Despesas, Honorários, Timesheets e Notificações.
- Acima da dobra, na aba Cadastro: foto vazia, apelido, nascimento, estado civil e etiquetas.
- Todos os campos aparecem, vazios ou não. A aba lista 24 rótulos, quase todos sem valor.
- Telefone, e-mail e processos do contato não aparecem acima da dobra.

### Adicionar contato

Rota `#/main/contacts/add-edit-merge/...`, página inteira.

- Pessoa física ou jurídica em rádio. Três abas: Informações pessoais, Informações complementares e Documentação.
- Campos: nome obrigatório, etiquetas, perfil (Cliente ou Contato), apelido, telefone com tipo, e-mail com tipo, site e endereço.
- Cada grupo repetível tem "Adicionar telefone", "Adicionar email" e assim por diante.
- Rodapé: "Cancelar" como link e "Salvar".
- Criar contato tira o usuário da lista: 1 clique para abrir, página nova.

## Atendimentos

### Lista

Rota `#/main/consulting/list/`.

- Ações: "Voltar", "Adicionar" e um ícone sem rótulo.
- Busca: "Digite um assunto ou cliente". Filtro de situação "Em andamento".
- O item mostra, na ordem: data e assunto, situação, título do processo (link), cliente e área.
- Depois vem o último registro, com iniciais, data e hora.
- O título do processo leva à ficha do processo em 1 clique.
- Visões: só lista.

### Ficha do atendimento

Rota `#/main/consulting/notes/<id>`, página nova.

- Topo: assunto, data de início, situação, processo (link), responsável e área.
- Centro: linha do tempo de registros, como um chat, e campo de anotação com "Salvar" no rodapé.
- Coluna direita: envolvidos, Honorários, Timesheets, Documentos (com contagem) e Tarefas e eventos. Cada bloco tem "+".
- Criar tarefa ou documento a partir do atendimento: 1 clique no "+" do bloco.
- Volta: link "Voltar" e ícone de marcador ao lado do título.

## Processos e casos

### Lista

Rota `#/main/folders/[,,]`.

| Item | O que existe |
|---|---|
| Ações do cabeçalho | Imprimir, Exportar planilha, Atualizar e "+" azul, todos sem rótulo |
| "+" abre | Busca de processo automática, Processo e Caso |
| Filtros | Seta de filtro avançado, campo "Digite algo para pesquisar", etiqueta e "Ativos" |
| Faixa | "Estamos buscando seus processos e movimentações no site do tribunal", com fechar |
| Colunas | Caixa, estrela, ícone de monitoramento, título com situação e número, cliente ou pasta, ação e foro, última movimentação |
| Ações no hover | Etiqueta e editar |

- O número do processo fica sublinhado na linha. Clicar nele copia; o tooltip diz "Copiar". 1 clique.
- Abrir a ficha: 1 clique no título. A lista some, a ficha é página nova.
- Visões: só tabela.

### Ficha do processo

Rota `#/main/folders/detail/<id>`.

Acima da dobra, de cima para baixo:

1. Título com as partes, em duas linhas.
2. "Processo" e o número sublinhado, que copia ao clicar.
3. Cliente, Status com instância, Responsável e Criado por.
4. Abas: Resumo, Atividades (com contagem) e Histórico.
5. Coluna esquerda: "Dados do Processo" com ação, número, juízo, link do tribunal, valor da causa, condenação e datas.
6. Coluna direita: "Próximas atividades" com "Adicionar" e "Documentos" com "Adicionar documentos".

Abaixo da dobra: partes e advogados com "Ver mais", últimos históricos, recursos e desdobramentos, apensos, atendimentos e honorários.

- Ações do cabeçalho: seta de voltar, estrela, etiqueta, três pontos e "+".
- O "+" lista 16 itens em cinco grupos. Os grupos: atividade, financeiro, documento, link e recurso. Quatro itens financeiros pedem upgrade.
- Os três pontos listam: apensar, alterar instância, desvincular do tribunal, imprimir relatório, editar, encerrar e excluir.
- "Encerrar" e "Excluir" ficam no mesmo menu de "Editar", separados só por um divisor.
- O bloco "Dados do Processo" tem "Copiar" no número e no link do tribunal.
- A aba Histórico mostra a instância e as movimentações por data, com "Ver todos".

| Ação-chave | Cliques | Caminho |
|---|---|---|
| Copiar o número | 1 | Número no cabeçalho ou "Copiar" no bloco de dados |
| Criar tarefa | 2 | "+" e "Tarefa", ou "Adicionar" em Próximas atividades |
| Ver documentos | 0 | Bloco "Documentos" na coluna direita, acima da dobra |
| Adicionar documento | 2 | "Adicionar documentos" e o tipo |
| Voltar | 1 | Seta no cabeçalho |

## Documentos

Rota `#/main/documents/[,,]`.

- A conta não tem documento. A tela mostra só o estado vazio, com ilustração.
- "Adicionar documento" abre: Documento, Link, Documento padrão, Arquivo do Google Drive e Documento padrão do Google.
- A varredura não viu a lista com itens. Ações por linha, filtros e prévia ficaram sem verificação.

## Alertas

Rota `#/main/alerts`.

- Abas: Importantes, Todos, Andamentos, Processos, Tarefas, Agenda, Portal do Cliente, Integração e Outros. Todos e Tarefas têm contagem.
- Barra: caixa de seleção, "Mostrando 1 de 1 alertas" e ordenar. Atualizar no cabeçalho.
- O card mostra o tipo ("Tarefa atrasada") e a data e hora do alerta.
- Abaixo vêm a data e o título da tarefa, o título do processo com instância e o responsável.
- Ações do card: "Visualizar tarefa", "Concluir tarefa", "Reagendar" com calendário e "Descartar alerta".
- O título do processo é texto, sem link.

| Ação-chave | Cliques | Caminho |
|---|---|---|
| Ir do alerta ao processo | 2 | "Visualizar tarefa" e o link do processo no modal |
| Copiar o número | 2 | "Visualizar tarefa" e o número no modal |

## Publicações, Financeiro e Indicadores

- As três telas mostram só a peça de upsell do plano gratuito: ilustração, título, texto e "Conhecer planos".
- Indicadores tem também o link "Saiba mais sobre o módulo de indicadores".
- Cada tela usa texto e ilustração próprios. A estrutura da peça é a mesma.

## Administração

Rota `#/main/admin/access/`, pela engrenagem do cabeçalho.

- Abas: Escritório, Grupo de envolvidos, Acesso, Modelos de documento, Certificado Digital e Segurança.
- A aba Acesso mostra busca de usuário e uma tabela.
- Colunas: nome e e-mail, admin, honorários, status e menu de três pontos.
- Abaixo fica a permissão para excluir processos e atendimentos, em rádio.

## Conheça as IAs

Rota `#/main/hub-ia`.

- Abas: Resumo, Tratamento de publicações, Tradução do juridiquês, Criação de peças e Priorização de andamentos.
- O Resumo mostra um card por IA, com os planos em tag, o nome, a descrição e "Acessar detalhes".
- O card lista todos os planos que têm a IA. Ele não diz se o plano atual tem a IA.

## O que ficou sem verificação

- Lista de Documentos com itens: a conta não tem documento.
- Formulário de adicionar processo: a varredura abriu só o menu do "+".
- Modal de nova tarefa e de novo evento: já estão registrados em `01-telas-observadas.md`, telas 14 a 16.
- Configurações do Escritório, Segurança e Certificado: a varredura viu só a aba Acesso.
- Destino dos links de Estatísticas na Área de trabalho.

<!-- lint-ignore-fim -->
