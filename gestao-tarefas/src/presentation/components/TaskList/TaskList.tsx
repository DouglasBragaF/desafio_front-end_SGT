import { useState, useEffect } from 'react';
import styles from './TaskList.module.css';
import { StatusTarefa, Tarefa } from '../../../domain/types/TarefaTypes';
import { TarefaService } from '../../../application/services/TarefaService';

const TaskList = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    fetchTarefas();
  }, []);

  const handleStatusChange = async (id: number, newStatus: StatusTarefa) => {
    try {
      // Atualiza o status da tarefa no backend
      // await TarefaService.updateStatus(id, newStatus);

      // Atualiza o estado local após a atualização bem-sucedida
      // setTarefas((prevTarefas) =>
      //   prevTarefas.map((tarefa) =>
      //     tarefa.id === id ? { ...tarefa, status: newStatus } : tarefa
      //   )
      // );
    } catch (error) {
      console.error('Erro ao atualizar o status da tarefa:', error);
      setError('Erro ao atualizar o status da tarefa');
    }
  };

  const handleEdit = (id: number) => {
    console.log('Editar tarefa:', id);
  }

  const handleDelete = async (id: number) => {
    try {
      await TarefaService.deleteTarefa(id);
      setTarefas((prevTarefas) => prevTarefas.filter((tarefa) => tarefa.id !== id));
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
