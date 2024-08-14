import { useState, useEffect } from 'react';
import styles from './FormTask.module.css';
import { Tarefa } from '../../../domain/types/TarefaTypes';
import { CreateTarefaType } from '../../../domain/types/CreateTarefaType';
import { TarefaService } from '../../../application/services/TarefaService';

interface FormTaskProps {
  tarefa?: Tarefa; // Prop para receber a tarefa a ser editada
}

const FormTask: React.FC<FormTaskProps> = ({ tarefa }) => {
  const [taskData, setTaskData] = useState<CreateTarefaType>({
    titulo: tarefa?.titulo || '',
    descricao: tarefa?.descricao || '',
    dataVencimento: tarefa?.dataVencimento?.toString().substring(0, 10) || '', // Formatando a data para o input date
  });

  useEffect(() => {
    if (tarefa) {
      setTaskData({
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        dataVencimento: tarefa.dataVencimento?.toString().substring(0, 10) || '',
      });
    }
  }, [tarefa]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    setTaskData((prevData: any) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (tarefa) {
        // Atualizar a tarefa existente
        await TarefaService.update({ ...tarefa, ...taskData });
        console.log('Tarefa atualizada:', taskData);
      } else {
        // Criar uma nova tarefa
        await TarefaService.create(taskData);
        console.log('Tarefa registrada:', taskData);
      }
    } catch (error) {
      console.error('Erro ao salvar a tarefa:', error);
    }

    setTaskData({
      titulo: '',
      descricao: '',
      dataVencimento: '',
    });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>{tarefa ? 'Editar Tarefa' : 'Registrar Tarefa'}</h1>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.col}>
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                id="titulo"
                value={taskData.titulo}
                onChange={handleInputChange}
                className={styles.input}
                maxLength={255}
                required
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <label htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                value={taskData.descricao}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <label htmlFor="dataVencimento">Data de Vencimento</label>
              <input
                type="date"
                id="dataVencimento"
                value={taskData.dataVencimento}
                onChange={handleInputChange}
                className={`${styles.input} ${styles.data}`}
                required
              />
            </div>
          </div>
          <div className={styles.botoes}>
            <button type="submit" className={styles.saveButton}>
              {tarefa ? 'Salvar Alterações' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTask;
