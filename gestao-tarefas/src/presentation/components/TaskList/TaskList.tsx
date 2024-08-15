import styles from './TaskList.module.css';
import { Tarefa } from '../../../domain/types/TarefaTypes';
import EditIcon from '../Icon/EditIcon';
import DeleteIcon from '../Icon/DeleteIcon';
import useTaskList from '../../../application/hooks/useTaskList';
import { StatusTarefa } from '../../../domain/types/TarefaTypes';

interface TaskListProps {
  onEdit: (tarefa: Tarefa) => void;
}

const TaskList = ({ onEdit }: TaskListProps) => {
  const { tarefas, loading, error, handleStatusChange, handleDelete } = useTaskList();

  const handleEdit = (id: number) => {
    const tarefaToEdit = tarefas.find(tarefa => tarefa.id === id);
    if (tarefaToEdit) {
      onEdit(tarefaToEdit);
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
