import apiClient from "../../infrasctruture/api/apiClient";
import { CreateTarefaType } from "../../domain/types/CreateTarefaType";

export const TarefaService = {
  async create(tarefa: CreateTarefaType) {
    try {
      const response = await apiClient.post("/tarefa", tarefa);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
      throw error;
    }
  },
};
