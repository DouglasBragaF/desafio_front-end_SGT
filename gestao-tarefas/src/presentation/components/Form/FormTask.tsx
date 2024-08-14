import { useState } from 'react';
import styles from './FormTask.module.css';
import { CreateTarefaType } from '../../../domain/types/CreateTarefaType';
import { TarefaService } from '../../../application/services/TarefaService';

const FormTask = () => {
  const [taskData, setTaskData] = useState<CreateTarefaType>({
    titulo: '',
    descricao: '',
    dataVencimento: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;

    setTaskData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const taskDataToSubmit = {
      ...taskData,
    };

    try {
      await TarefaService.create(taskDataToSubmit);
      console.log('Tarefa registrada:', taskDataToSubmit);
    } catch (error) {
      console.error('Erro ao criar a tarefa:', error);
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
          <h1>Registrar Tarefa</h1>
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
            <button type="submit" className={styles.saveButton}>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTask;
