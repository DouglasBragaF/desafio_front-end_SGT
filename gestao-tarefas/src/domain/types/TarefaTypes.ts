// Definição do tipo para StatusTarefa
export enum StatusTarefa {
  Pendente = 0,
  EmProgresso = 1,
  Concluida = 2,
}

// Interface para Tarefa
export interface Tarefa {
  id?: number;
  titulo: string;
  descricao: string;
  dataCriacao: Date;
  dataVencimento?: Date;
  status: StatusTarefa;
  dataAlteracao?: Date;
}

// Interface para a lista de tarefas
export interface ListaTarefasProps {
  tarefas: Tarefa[];
}
