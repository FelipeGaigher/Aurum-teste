// Dados fictícios do protótipo. ATIVIDADES é a mesma lista do Kanban.
(function () {
const ATIVIDADES = [
  { id: 'a1', titulo: 'Protocolar contestação', tipo: 'prazo', processo: '5004213-75.2025.8.24.0023', responsavel: 'Rafael Antunes', prazoEmDias: -2, status: 'a-fazer' },
  { id: 'a2', titulo: 'Audiência de conciliação', tipo: 'audiencia', processo: '0301877-92.2024.8.24.0008', responsavel: 'Marina Couto', prazoEmDias: 0, status: 'a-fazer' },
  { id: 'a3', titulo: 'Reunião com a cliente sobre o acordo', tipo: 'evento', processo: '5012940-75.2025.8.24.0038', responsavel: 'Beatriz Lemos', prazoEmDias: 1, status: 'a-fazer' },
  { id: 'a4', titulo: 'Opor embargos de declaração', tipo: 'prazo', processo: '0007315-64.2023.8.24.0023', responsavel: 'Otávio Prado', prazoEmDias: 2, status: 'a-fazer' },
  { id: 'a5', titulo: 'Manifestar sobre o laudo pericial', tipo: 'prazo', processo: '5020066-92.2024.8.24.0045', responsavel: 'Rafael Antunes', prazoEmDias: 5, status: 'a-fazer', sugestaoIa: 'Criada pela IA a partir de uma publicação' },
  { id: 'a6', titulo: 'Juntar procuração atualizada', tipo: 'tarefa', processo: '5001789-08.2025.8.24.0008', responsavel: 'Beatriz Lemos', prazoEmDias: -1, status: 'fazendo' },
  { id: 'a7', titulo: 'Interpor recurso de apelação', tipo: 'prazo', processo: '0312054-93.2022.8.24.0038', responsavel: 'Marina Couto', prazoEmDias: 3, status: 'fazendo' },
  { id: 'a8', titulo: 'Calcular custas finais', tipo: 'tarefa', processo: '5009427-81.2024.8.24.0023', responsavel: 'Otávio Prado', prazoEmDias: 4, status: 'fazendo' },
  { id: 'a9', titulo: 'Preparar rol de testemunhas', tipo: 'tarefa', processo: '5016603-51.2025.8.24.0064', responsavel: 'Marina Couto', prazoEmDias: 8, status: 'concluido' },
  { id: 'a10', titulo: 'Apresentar contrarrazões', tipo: 'prazo', processo: '0004981-88.2023.8.24.0045', responsavel: 'Rafael Antunes', prazoEmDias: 10, status: 'concluido' },
];

const RESPONSAVEIS = [...new Set(ATIVIDADES.map((a) => a.responsavel))];

const NUMEROS = [...new Set(ATIVIDADES.map((a) => a.processo))];

// Nomes inventados para o protótipo, um por processo, na ordem de NUMEROS.
const CLIENTES = [
  'Yara Monteverde', 'Caetano Bittencourt Lins', 'Iolanda Prestes Vidal', 'Nestor Arruda Fontes',
  'Tereza Quintanilha Dorneles', 'Estaleiro Três Marés Ltda', 'Lauro Sampaio Neves',
  'Oficina Rosa dos Ventos Ltda', 'Dalva Figueiró Castanho', 'Heitor Valadão Nogueira',
];

const PROCESSOS = NUMEROS.map((numero, i) => {
  const daqui = ATIVIDADES.filter((a) => a.processo === numero);
  return { numero, cliente: CLIENTES[i], responsavel: daqui[0].responsavel, atividades: daqui.map((a) => a.id) };
});

const CONTATOS = PROCESSOS.map((p, i) => ({
  id: `c${i + 1}`,
  nome: p.cliente,
  tipo: p.cliente.endsWith('Ltda') ? 'Pessoa jurídica' : 'Pessoa física',
  email: `contato${i + 1}@exemplo.invalid`,
  telefone: `(48) 90000-${String(i + 1).padStart(4, '0')}`,
  processo: p.numero,
}));

window.DADOS = { ATIVIDADES, CONTATOS, PROCESSOS, RESPONSAVEIS };

// Ficha do processo: parte contrária, advogado dela e valores, na ordem de NUMEROS.
// Nomes, foros e escritórios inventados. Link no tribunal é só texto.
const PARTES_CONTRARIAS = [
  ['Comercial Pedra Alva Ltda', 'Lívia Sarmento Brandão'], ['Transportadora Vento Sul Ltda', 'Gustavo Peixoto Lacerda'],
  ['Construtora Morro Azul S.A.', 'Helena Viegas Tavares'], ['Banco Fictício do Litoral S.A.', 'Rodrigo Albuquerque Mendes'],
  ['Cooperativa Serra Clara', 'Patrícia Lobato Rangel'], ['Naval Insumos Baía Norte Ltda', 'Fábio Caldeira Moura'],
  ['Imobiliária Ponta do Sal Ltda', 'Simone Ribas Coutinho'], ['Município de Vale Encantado', 'Procuradoria do Município'],
  ['Espólio de Aurélio Castanho', 'Vinícius Teles Barreto'], ['Gilberto Nogueira Paes', 'Camila Junqueira Assis'],
];
const FICHAS = NUMEROS.map((numero, i) => ({
  numero,
  reu: PARTES_CONTRARIAS[i][0],
  advogadoContrario: PARTES_CONTRARIAS[i][1],
  foro: ['Foro da Comarca de Porto Lírio', 'Foro Regional de Ilha Mansa', 'Foro da Comarca de Serra Alta'][i % 3],
  linkNoTribunal: `Portal do tribunal, consulta ${numero}`,
  valorCondenacao: i % 3 === 0 ? 0 : (i + 1) * 4120,
  distribuidoHaDias: 380 + i * 47,
  criadoHaDias: 85 + i * 6,
  documentos: [],
}));

// Comentário de cada atividade, pela id de ATIVIDADES.
const COMENTARIOS_DE_ATIVIDADE = {
  a1: 'Aguardando a cópia integral dos autos para fechar a peça.',
  a2: 'Cliente confirmou presença. Levar proposta de parcelamento.',
  a3: 'Pauta: valor mínimo aceito e prazo de pagamento.',
  a4: 'Omissão sobre os juros de mora na sentença.',
  a5: 'Assistente técnico enviou o parecer na sexta.',
  a6: 'A procuração anterior venceu no mês passado.',
  a7: 'Preparo recolhido. Falta revisar as razões.',
  a8: 'Conferir a planilha do contador antes de protocolar.',
  a9: 'Três testemunhas confirmadas.',
  a10: 'Protocoladas dentro do prazo.',
};

// Movimentações fictícias do tribunal, da mais nova para a mais antiga.
// origem: tribunal (captura automática) ou manual (registrada no escritório).
const MOVIMENTACOES_MODELO = [
  { haDias: 1, origem: 'tribunal', descricao: 'Publicado despacho de mero expediente no diário eletrônico.' },
  { haDias: 4, origem: 'tribunal', descricao: 'Conclusos para despacho.' },
  { haDias: 9, origem: 'manual', descricao: 'Juntada de petição intermediária pelo escritório.' },
  { haDias: 15, origem: 'tribunal', descricao: 'Expedida intimação eletrônica da parte ré.' },
  { haDias: 23, origem: 'tribunal', descricao: 'Decisão interlocutória: deferida a produção de prova pericial.' },
  { haDias: 37, origem: 'manual', descricao: 'Reunião com o cliente registrada na ficha.' },
  { haDias: 52, origem: 'tribunal', descricao: 'Juntada de contestação pela parte ré.' },
  { haDias: 70, origem: 'tribunal', descricao: 'Citação da parte ré cumprida.' },
];

Object.assign(window.DADOS, { FICHAS, COMENTARIOS_DE_ATIVIDADE, MOVIMENTACOES_MODELO });

// Documentos anexados ao contato, pela id de CONTATOS. Arquivos fictícios: o protótipo não guarda o arquivo.
// tipo: PDF, DOCX ou Imagem. processo: número de NUMEROS, ou vazio quando o documento é só do contato.
const DOCUMENTOS_DE_CONTATO = {
  c1: [
    { id: 'd1', nome: 'Procuracao_Yara_Monteverde.pdf', tipo: 'PDF', tamanhoKb: 184, enviadoEm: '2026-09-02', enviadoPor: 'Rafael Antunes', processo: NUMEROS[0] },
    { id: 'd2', nome: 'Contrato_de_honorarios_assinado.pdf', tipo: 'PDF', tamanhoKb: 412, enviadoEm: '2026-09-02', enviadoPor: 'Rafael Antunes', processo: NUMEROS[0] },
    { id: 'd3', nome: 'RG_frente_e_verso.jpg', tipo: 'Imagem', tamanhoKb: 1630, enviadoEm: '2026-08-28', enviadoPor: 'Beatriz Lemos', processo: '' },
  ],
  c2: [
    { id: 'd4', nome: 'Peticao_inicial_conciliacao.docx', tipo: 'DOCX', tamanhoKb: 96, enviadoEm: '2026-07-15', enviadoPor: 'Marina Couto', processo: NUMEROS[1] },
    { id: 'd5', nome: 'Comprovante_de_residencia_junho.pdf', tipo: 'PDF', tamanhoKb: 238, enviadoEm: '2026-07-11', enviadoPor: 'Marina Couto', processo: '' },
  ],
  c4: [
    { id: 'd6', nome: 'Procuracao_ad_judicia_Nestor_Fontes.pdf', tipo: 'PDF', tamanhoKb: 201, enviadoEm: '2026-10-21', enviadoPor: 'Otávio Prado', processo: NUMEROS[3] },
    { id: 'd7', nome: 'Contrato_de_honorarios_2026.docx', tipo: 'DOCX', tamanhoKb: 74, enviadoEm: '2026-10-21', enviadoPor: 'Otávio Prado', processo: NUMEROS[3] },
    { id: 'd8', nome: 'Peticao_inicial_protocolada.pdf', tipo: 'PDF', tamanhoKb: 2870, enviadoEm: '2026-10-09', enviadoPor: 'Rafael Antunes', processo: NUMEROS[3] },
    { id: 'd9', nome: 'Laudo_pericial_contabil.pdf', tipo: 'PDF', tamanhoKb: 5340, enviadoEm: '2026-09-30', enviadoPor: 'Beatriz Lemos', processo: NUMEROS[3] },
    { id: 'd10', nome: 'RG_digitalizado.png', tipo: 'Imagem', tamanhoKb: 912, enviadoEm: '2026-09-18', enviadoPor: 'Marina Couto', processo: '' },
    { id: 'd11', nome: 'Comprovante_de_residencia.pdf', tipo: 'PDF', tamanhoKb: 156, enviadoEm: '2026-09-18', enviadoPor: 'Marina Couto', processo: '' },
  ],
  c6: [
    { id: 'd12', nome: 'Procuracao_Estaleiro_Tres_Mares.pdf', tipo: 'PDF', tamanhoKb: 230, enviadoEm: '2026-10-30', enviadoPor: 'Beatriz Lemos', processo: NUMEROS[5] },
    { id: 'd13', nome: 'Contrato_social_consolidado.pdf', tipo: 'PDF', tamanhoKb: 1480, enviadoEm: '2026-10-30', enviadoPor: 'Beatriz Lemos', processo: '' },
    { id: 'd14', nome: 'Contrato_de_honorarios_empresa.docx', tipo: 'DOCX', tamanhoKb: 88, enviadoEm: '2026-10-28', enviadoPor: 'Otávio Prado', processo: NUMEROS[5] },
    { id: 'd15', nome: 'Laudo_de_vistoria_do_casco.pdf', tipo: 'PDF', tamanhoKb: 7210, enviadoEm: '2026-10-12', enviadoPor: 'Rafael Antunes', processo: NUMEROS[5] },
  ],
  c9: [
    { id: 'd16', nome: 'Peticao_inicial_testemunhas.docx', tipo: 'DOCX', tamanhoKb: 112, enviadoEm: '2026-06-03', enviadoPor: 'Marina Couto', processo: NUMEROS[8] },
    { id: 'd17', nome: 'RG_digitalizado_Dalva.jpg', tipo: 'Imagem', tamanhoKb: 1205, enviadoEm: '2026-05-27', enviadoPor: 'Marina Couto', processo: '' },
    { id: 'd18', nome: 'Procuracao_Dalva_Castanho.pdf', tipo: 'PDF', tamanhoKb: 176, enviadoEm: '2026-05-27', enviadoPor: 'Marina Couto', processo: NUMEROS[8] },
  ],
};

Object.assign(window.DADOS, { DOCUMENTOS_DE_CONTATO });

// Atendimentos fictícios. Cliente e processo saem pelo índice de NUMEROS; processo vazio é atendimento sem processo.
const ATENDIMENTOS = [
  { id: 'at1', assunto: 'Verbas rescisórias não pagas', cliente: CLIENTES[1], processo: NUMEROS[1], responsavel: 'Marina Couto',
    inicio: '2026-10-27', status: 'andamento', area: 'Trabalhista', honorarios: 4800, horas: 6.5, documentos: 3 },
  { id: 'at2', assunto: 'Revisão de pensão alimentícia', cliente: CLIENTES[9], processo: NUMEROS[9], responsavel: 'Rafael Antunes',
    inicio: '2026-10-30', status: 'aguardando', area: 'Família', honorarios: 3200, horas: 2, documentos: 1 },
  { id: 'at3', assunto: 'Cobrança de aluguéis atrasados', cliente: CLIENTES[0], processo: NUMEROS[0], responsavel: 'Rafael Antunes',
    inicio: '2026-09-02', status: 'concluido', area: 'Cível', honorarios: 2500, horas: 4.25, documentos: 2 },
  { id: 'at4', assunto: 'Aposentadoria por tempo de contribuição', cliente: CLIENTES[4], processo: NUMEROS[4], responsavel: 'Rafael Antunes',
    inicio: '2026-10-14', status: 'andamento', area: 'Previdenciário', honorarios: 6000, horas: 9, documentos: 4 },
  { id: 'at5', assunto: 'Partilha de bens no inventário', cliente: CLIENTES[8], processo: NUMEROS[8], responsavel: 'Marina Couto',
    inicio: '2026-06-03', status: 'andamento', area: 'Família', honorarios: 8500, horas: 12.5, documentos: 3 },
  { id: 'at6', assunto: 'Indenização por avaria no casco', cliente: CLIENTES[5], processo: NUMEROS[5], responsavel: 'Beatriz Lemos',
    inicio: '2026-10-12', status: 'aguardando', area: 'Cível', honorarios: 12000, horas: 7.75, documentos: 4 },
  { id: 'at7', assunto: 'Auxílio por incapacidade negado', cliente: CLIENTES[6], processo: '', responsavel: 'Otávio Prado',
    inicio: '2026-11-03', status: 'andamento', area: 'Previdenciário', honorarios: 3600, horas: 1.5, documentos: 0 },
  { id: 'at8', assunto: 'Horas extras e adicional noturno', cliente: CLIENTES[3], processo: NUMEROS[3], responsavel: 'Otávio Prado',
    inicio: '2026-08-19', status: 'concluido', area: 'Trabalhista', honorarios: 5400, horas: 10, documentos: 6 },
];

// Linha do tempo de cada atendimento, da mais antiga para a mais recente.
const ANOTACOES_DE_ATENDIMENTO = {
  at1: [
    { autor: 'Marina Couto', em: '2026-10-27T09:40', texto: 'Primeira conversa. O cliente saiu da empresa em setembro e não recebeu férias nem a multa do FGTS.' },
    { autor: 'Marina Couto', em: '2026-10-29T15:10', texto: 'Recebi os holerites dos últimos doze meses. Faltam o termo de rescisão e o extrato do FGTS.' },
    { autor: 'Beatriz Lemos', em: '2026-11-02T11:25', texto: 'Cálculo preliminar pronto: diferença de R$ 18.420,00 com correção até outubro.' },
    { autor: 'Marina Couto', em: '2026-11-05T17:05', texto: 'Cliente aprovou o cálculo. Petição em revisão para protocolo nesta semana.' },
  ],
  at2: [
    { autor: 'Rafael Antunes', em: '2026-10-30T10:00', texto: 'O cliente mudou de emprego e a renda caiu pela metade. Quer reduzir o valor da pensão.' },
    { autor: 'Rafael Antunes', em: '2026-11-01T14:30', texto: 'Pedi a carteira de trabalho e os três últimos contracheques do emprego novo.' },
    { autor: 'Rafael Antunes', em: '2026-11-06T09:15', texto: 'Sem retorno do cliente. Lembrete enviado por telefone.' },
  ],
  at3: [
    { autor: 'Rafael Antunes', em: '2026-09-02T08:50', texto: 'Inquilino com quatro meses de aluguel em atraso. Contrato com fiador.' },
    { autor: 'Beatriz Lemos', em: '2026-09-10T16:20', texto: 'Notificação extrajudicial entregue ao inquilino e ao fiador.' },
    { autor: 'Rafael Antunes', em: '2026-09-24T13:45', texto: 'Acordo fechado: pagamento em três parcelas, a primeira já depositada.' },
    { autor: 'Rafael Antunes', em: '2026-10-20T10:30', texto: 'Última parcela compensada. Atendimento encerrado.' },
  ],
  at4: [
    { autor: 'Rafael Antunes', em: '2026-10-14T09:00', texto: 'Cliente com 33 anos de contribuição. Parte do período rural não aparece no extrato.' },
    { autor: 'Otávio Prado', em: '2026-10-21T15:40', texto: 'Separei as declarações do sindicato rural para comprovar o período de 1989 a 1994.' },
    { autor: 'Rafael Antunes', em: '2026-10-28T11:10', texto: 'Simulação da regra de transição: o pedágio de 50% dá o benefício em março.' },
    { autor: 'Rafael Antunes', em: '2026-11-04T16:55', texto: 'Requerimento administrativo protocolado. Prazo de análise de 90 dias.' },
    { autor: 'Beatriz Lemos', em: '2026-11-06T10:20', texto: 'Agendada a perícia documental para o dia 19.' },
  ],
  at5: [
    { autor: 'Marina Couto', em: '2026-06-03T14:00', texto: 'Três herdeiros. Um imóvel no litoral e uma conta poupança.' },
    { autor: 'Marina Couto', em: '2026-07-18T10:35', texto: 'Avaliação do imóvel recebida. Os herdeiros discordam do valor.' },
    { autor: 'Otávio Prado', em: '2026-09-09T17:20', texto: 'Proposta de partilha com compensação em dinheiro enviada aos três.' },
    { autor: 'Marina Couto', em: '2026-10-25T09:50', texto: 'Dois herdeiros aceitaram. O terceiro pediu reunião para a primeira quinzena de novembro.' },
  ],
  at6: [
    { autor: 'Beatriz Lemos', em: '2026-10-12T11:00', texto: 'Avaria no casco depois do reparo feito por terceiro. O estaleiro quer ressarcimento.' },
    { autor: 'Rafael Antunes', em: '2026-10-19T14:15', texto: 'Laudo de vistoria anexado. O dano foi estimado em R$ 96.000,00.' },
    { autor: 'Beatriz Lemos', em: '2026-11-04T08:40', texto: 'Aguardando o contrato do reparo e as notas fiscais, pedidos ao financeiro do cliente.' },
  ],
  at7: [
    { autor: 'Otávio Prado', em: '2026-11-03T10:10', texto: 'Benefício negado na perícia. O cliente tem laudo do ortopedista com afastamento de 120 dias.' },
    { autor: 'Otávio Prado', em: '2026-11-05T15:30', texto: 'Recurso administrativo ou ação judicial: decisão depois da consulta com o médico.' },
    { autor: 'Beatriz Lemos', em: '2026-11-07T09:05', texto: 'Cliente enviou os exames de imagem por e-mail.' },
  ],
  at8: [
    { autor: 'Otávio Prado', em: '2026-08-19T09:30', texto: 'Jornada de 12 horas sem registro de ponto. Testemunhas disponíveis.' },
    { autor: 'Marina Couto', em: '2026-08-30T16:45', texto: 'Planilha de horas montada a partir das escalas que o cliente guardou.' },
    { autor: 'Otávio Prado', em: '2026-09-22T11:15', texto: 'Audiência de conciliação com acordo de R$ 27.500,00.' },
    { autor: 'Otávio Prado', em: '2026-10-15T14:00', texto: 'Acordo quitado. Atendimento encerrado.' },
  ],
};

Object.assign(window.DADOS, { ATENDIMENTOS, ANOTACOES_DE_ATENDIMENTO });
})();
