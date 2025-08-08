export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'professor' | 'aluno';
  avatar?: string;
}

export interface Aula {
  id: string;
  tipoAulaId: string;
  professorId: string;
  dataHora: Date;
  quantidadeAlunos: number;
  valorAula: number;
  status: 'agendada' | 'realizada' | 'cancelada' | 'remarcar';
  observacoes?: string;
}

export interface TipoAula {
  id: string;
  nome: string;
  icone: string;
  cor: string;
  descricao?: string;
}

export interface Professor {
  id: string;
  nome: string;
  email: string;
  cor: string;
  especialidades: string[];
  ativo: boolean;
}

export interface Treino {
  id: string;
  alunoId: string;
  professorId: string;
  nome: string;
  descricao: string;
  exercicios: Exercicio[];
  status: 'ativo' | 'inativo' | 'concluido';
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface Exercicio {
  id: string;
  nome: string;
  series: number;
  repeticoes: number;
  peso?: number;
  descanso: number;
  observacoes?: string;
}

export interface Aluno {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: Date;
  plano: string;
  ativo: boolean;
  status: 'ativo' | 'inativo' | 'pendente';
  aulasRealizadas: number;
  treinosAtivos: number;
  dataVencimento: Date;
}

export interface DashboardStats {
  totalAulas: number;
  aulasHoje: number;
  totalAlunos: number;
  totalProfessores: number;
  aulasSemana: number;
  receitaMes: number;
}

export interface Atividade {
  id: string;
  tipo: 'aula_criada' | 'aula_cancelada' | 'aluno_cadastrado' | 'treino_atualizado';
  titulo: string;
  descricao: string;
  data: Date;
  usuarioId: string;
}
