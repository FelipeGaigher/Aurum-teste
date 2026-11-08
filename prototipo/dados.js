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
})();
