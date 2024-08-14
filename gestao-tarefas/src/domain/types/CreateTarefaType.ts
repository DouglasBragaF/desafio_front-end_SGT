export type CreateTarefaType = {
  titulo: string;
  descricao: string;
  dataVencimento?: Date | null;
  status: StatusTarefa;
};

export enum StatusTarefa {
  Pendente = "Pendente",
  EmProgresso = "EmProgresso",
  Concluida = "Concluida"
}