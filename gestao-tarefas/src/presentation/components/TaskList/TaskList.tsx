import { useState, useEffect } from 'react';
import styles from './TaskList.module.css';
import { StatusTarefa, Tarefa } from '../../../domain/types/TarefaTypes';
import { TarefaService } from '../../../application/services/TarefaService';
import { CreateTarefaType } from '../../../domain/types/CreateTarefaType';

interface TaskListProps {
  onEdit: (tarefa: Tarefa) => void;
}

const TaskList = ({ onEdit }: TaskListProps) => {
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

      setTarefas(formattedTarefas);
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
          id: tarefaToUpdate.id!,
          titulo: tarefaToUpdate.titulo,
          descricao: tarefaToUpdate.descricao,
          dataVencimento: tarefaToUpdate.dataVencimento
            ? tarefaToUpdate.dataVencimento.toISOString().substring(0, 10)
            : '', // Formatar a data para o formato YYYY-MM-DD
          status: newStatus, // Aqui o status é atualizado
        };

        // Atualiza o status da tarefa no backend
        await TarefaService.update(updateData);

        // Faz um novo fetch das tarefas para atualizar a lista
        fetchTarefas();
      }
    } catch (error) {
      console.error('Erro ao atualizar o status da tarefa:', error);
      setError('Erro ao atualizar o status da tarefa');
    }
  };

  const handleEdit = (id: number) => {
    const tarefaToEdit = tarefas.find(tarefa => tarefa.id === id);
    if (tarefaToEdit) {
      onEdit(tarefaToEdit);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await TarefaService.deleteTarefa(id);
      fetchTarefas();
      console.log(`Tarefa com id ${id} foi excluída.`);
    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
      setError('Erro ao excluir a tarefa');
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.taskList}>
      <h2>Lista de Tarefas</h2>
      <div className={styles.listHeader}>
        <span>Título</span>
        <span>Descrição</span>
        <span>Data de Criação</span>
        <span>Data de Vencimento</span>
        <span>Status</span>
        <span>Andamento</span>
      </div>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} className={styles.listItem}>
            <span>{tarefa.titulo}</span>
            <span>{tarefa.descricao}</span>
            <span>{tarefa.dataCriacao.toLocaleDateString()}</span>
            <span>
              {tarefa.dataVencimento ? tarefa.dataVencimento.toLocaleDateString() : 'Sem vencimento'}
            </span>
            <span>{StatusTarefa[tarefa.status]}</span>
            <span>
              <select
                value={tarefa.status}
                onChange={(e) => handleStatusChange(tarefa.id!, parseInt(e.target.value))}
                className={styles.statusDropdown}
              >
                <option value={StatusTarefa.EmProgresso}>Em Progresso</option>
                <option value={StatusTarefa.Concluida}>Concluída</option>
              </select>
            </span>
            <span className={styles.actionIcons}>
              <svg
                onClick={() => handleEdit(tarefa.id!)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={styles.icon}
              >
                <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zm14.71-10.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
              <svg
                onClick={() => handleDelete(tarefa.id!)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={styles.icon}
              >
                <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1zM18 8H6v11c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8z" />
              </svg>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
