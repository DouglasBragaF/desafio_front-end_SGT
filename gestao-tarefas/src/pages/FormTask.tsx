import { useState } from 'react';
import styles from './FormTask.module.css';

const FormTask = () => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [status, setStatus] = useState('Pendente');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const taskData = {
      titulo,
      descricao,
      dataVencimento,
      status,
    };
    console.log('Tarefa registrada:', taskData);
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
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
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
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
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
                value={dataVencimento}
                onChange={(e) => setDataVencimento(e.target.value)}
                className={`${styles.input} ${styles.data}`}
                required
              />
            </div>
          </div>
          {/* <div className={styles.row}>
            <div className={styles.col}>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={styles.selectCliente}
                required
              >
                <option value="Pendente">Pendente</option>
                <option value="EmProgresso">Em Progresso</option>
                <option value="Concluida">Concluída</option>
              </select>
            </div>
          </div> */}
          <div className={styles.botoes}>
            <button type="submit" className={styles.saveButton}>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTask;
