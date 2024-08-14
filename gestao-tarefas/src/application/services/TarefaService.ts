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

  async updateStatus(id: number, newStatus: number) {
    try {
      const response = await apiClient.put(`/Tarefa/${id}/status`, {
        status: newStatus,
      });
      console.log("retorno apiClient put:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar o status da tarefa:", error);
      throw error;
    }
  },

  async update(tarefa: CreateTarefaType) {
    try {
      const response = await apiClient.put(`/Tarefa/${tarefa.id}`, tarefa);
      console.log("retorno apiClient put:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
      throw error;
    }
  },

  async deleteTarefa(id: number) {
    try {
      const response = await apiClient.delete(`/Tarefa/${id}`);
      console.log("retorno apiClient delete:", response.status);
      return response.status;
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
      throw error;
    }
  }
};
