import { useState } from "react";
import FormTask from "../components/Form/FormTask";
import MenuHeader from "../components/MenuHeader/MenuHeader";
import TaskList from "../components/TaskList/TaskList";
import styles from './Home.module.css'; // Importando o CSS do módulo
import { Tarefa } from "../../domain/types/TarefaTypes";

const Home = () => {
  document.title = 'Gestão de Tarefas';

  const [selectedTask, setSelectedTask] = useState<Tarefa | undefined>(undefined);

  const handleEdit = (tarefa: Tarefa) => {
    setSelectedTask(tarefa);
  };

  return (
    <div className={styles.homeContainer}>
      <MenuHeader />
      <main className={styles.mainContainer}>
        <div className={styles.taskListContainer}>
          <TaskList onEdit={handleEdit} />
        </div>
        <div className={styles.formContainer}>
          <FormTask tarefa={selectedTask} />
        </div>
      </main>
    </div>
  );
}

export default Home;
