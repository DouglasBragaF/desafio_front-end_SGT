import apiClient from "../../infrasctruture/api/apiClient";
import { CreateTarefaType } from "../../domain/types/CreateTarefaType";

export const TarefaService = {
  async create(tarefa: CreateTarefaType) {

    console.log("Registrando tarefa:", tarefa);
    try {
      const response = await apiClient.post("/Tarefa", tarefa);
      console.log("retorno apiClient post:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
      throw error;
    }
  },


  async getAll() {
    try {
      const response = await apiClient.get("/Tarefa");
      console.log("retorno apiClient get:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
      throw error;
    }
  },
};
