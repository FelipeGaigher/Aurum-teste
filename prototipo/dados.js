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
})();
