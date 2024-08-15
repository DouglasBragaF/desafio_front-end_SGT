import styles from './FormTask.module.css';
import { InputField } from './InputField';
import { TextareaField } from './TextareaField';
import useFormTask from '../../../application/hooks/useFormTask';

const FormTask = ({ tarefa, onTaskUpdated }: { tarefa: any, onTaskUpdated: any }) => {
  const { taskData, handleInputChange, handleSubmit } = useFormTask(tarefa, onTaskUpdated);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>{tarefa ? 'Editar Tarefa' : 'Registrar Tarefa'}</h1>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <InputField
            id="titulo"
            label="Título"
            value={taskData.titulo}
            onChange={handleInputChange}
            maxLength={255}
            required
          />
          <TextareaField
            id="descricao"
            label="Descrição"
            value={taskData.descricao}
            onChange={handleInputChange}
            required
          />
          <InputField
            id="dataVencimento"
            label="Data de Vencimento"
            value={taskData.dataVencimento}
            onChange={handleInputChange}
            type="date"
            className={`${styles.input} ${styles.data}`}
            required
          />
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
