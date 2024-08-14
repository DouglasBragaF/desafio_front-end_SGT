import React, { useState, useEffect } from 'react';
import styles from './TaskList.module.css';
import { StatusTarefa, Tarefa } from '../../../domain/types/TarefaTypes';
import { TarefaService } from '../../../application/services/TarefaService';

const TaskList: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const tarefas = await TarefaService.getAll();
        setTarefas(tarefas);
        setLoading(false);
      } catch (error) {
        setError('Erro ao carregar as tarefas');
        setLoading(false);
      }
    };

    fetchTarefas();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.taskList}>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <strong>{tarefa.titulo}</strong> - {tarefa.descricao}
            <div>Status: {StatusTarefa[tarefa.status]}</div>
            <div>Data de Criação: {tarefa.dataCriacao.toLocaleDateString()}</div>
            {tarefa.dataVencimento && (
              <div>Data de Vencimento: {tarefa.dataVencimento.toLocaleDateString()}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
