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
})();
