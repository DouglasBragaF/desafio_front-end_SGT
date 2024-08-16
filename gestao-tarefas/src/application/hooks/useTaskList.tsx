import { useState, useEffect } from 'react';
import { StatusTarefa, Tarefa } from '../../domain/types/TarefaTypes';
import { TarefaService } from '../../application/services/TarefaService';
import { CreateTarefaType } from '../../domain/types/CreateTarefaType';

const useTaskList = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTarefas = async () => {
    try {
      const rawTarefas = await TarefaService.getAll();

      const formattedTarefas = rawTarefas.map((tarefa: Tarefa) => ({
        ...tarefa,
        dataCriacao: new Date(tarefa.dataCriacao),
        dataVencimento: tarefa.dataVencimento ? new Date(tarefa.dataVencimento) : undefined,
        dataAlteracao: tarefa.dataAlteracao ? new Date(tarefa.dataAlteracao) : undefined,
      }));

      const sortedTarefas = formattedTarefas.sort((a: any, b: any) => {
        if (!a.dataVencimento) return 1;
        if (!b.dataVencimento) return -1;
        return a.dataVencimento.getTime() - b.dataVencimento.getTime();
      });

      setTarefas(sortedTarefas);
    } catch (error) {
      console.error('Erro ao carregar as tarefas:', error);
      setError('Erro ao carregar as tarefas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  const handleStatusChange = async (id: number, newStatus: StatusTarefa) => {
    try {
      const tarefaToUpdate = tarefas.find(tarefa => tarefa.id === id);

      if (tarefaToUpdate) {
        const updateData: CreateTarefaType = {
          id: tarefaToUpdate.id,
          titulo: tarefaToUpdate.titulo,
          descricao: tarefaToUpdate.descricao,
          dataVencimento: tarefaToUpdate.dataVencimento ? tarefaToUpdate.dataVencimento.toISOString().substring(0, 10) : '',
          status: newStatus,
        };

        await TarefaService.update(updateData);
        fetchTarefas();
      }
    } catch (error) {
      console.error('Erro ao atualizar o status da tarefa:', error);
      setError('Erro ao atualizar o status da tarefa');
    }
  };

  const handleDelete = async (id: number) => {
    console.log(`Excluindo tarefa com id ${id}...`);
    try {
      await TarefaService.deleteTarefa(id);
      fetchTarefas();
      console.log(`Tarefa com id ${id} foi excluída.`);
    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
      setError('Erro ao excluir a tarefa');
    }
  };

  return {
    tarefas,
    loading,
    error,
    handleStatusChange,
    handleDelete,
    fetchTarefas
  };
};

export default useTaskList;
