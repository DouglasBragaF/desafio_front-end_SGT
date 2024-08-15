import { useState, useEffect } from 'react';
import styles from './TaskList.module.css';
import { StatusTarefa, Tarefa } from '../../../domain/types/TarefaTypes';
import { TarefaService } from '../../../application/services/TarefaService';
import { CreateTarefaType } from '../../../domain/types/CreateTarefaType';
import EditIcon from '../Icon/EditIcon';
import DeleteIcon from '../Icon/DeleteIcon';

interface TaskListProps {
  onEdit: (tarefa: Tarefa) => void;
  reload: boolean;
  onReload: () => void;
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
          id: tarefaToUpdate.id,
          titulo: tarefaToUpdate.titulo,
          descricao: tarefaToUpdate.descricao,
          dataVencimento: tarefaToUpdate.dataVencimento?.toString() || '',
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
      <div className={styles.listContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Data de Criação</th>
              <th>Data de Vencimento</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {tarefas.map((tarefa) => (
              <tr key={tarefa.id} className={styles.tableRow}>
                <td>{tarefa.titulo}</td>
                <td>{tarefa.descricao}</td>
                <td>{tarefa.dataCriacao.toLocaleDateString()}</td>
                <td>
                  {tarefa.dataVencimento ? tarefa.dataVencimento.toLocaleDateString() : 'Sem vencimento'}
                </td>
                <td>
                  <select
                    value={tarefa.status}
                    onChange={(e) => handleStatusChange(tarefa.id!, parseInt(e.target.value))}
                    className={styles.statusDropdown}
                  >
                    <option value={StatusTarefa.EmProgresso}>Em Progresso</option>
                    <option value={StatusTarefa.Concluida}>Concluída</option>
                  </select>
                </td>
                <td className={styles.actionIcons}>
                  <EditIcon onClick={() => handleEdit(tarefa.id!)} />
                  <DeleteIcon onClick={() => handleDelete(tarefa.id!)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
