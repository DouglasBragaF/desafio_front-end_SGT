import FormTask from "../components/Form/FormTask";
import MenuHeader from "../components/MenuHeader/MenuHeader";
import TaskList from "../components/TaskList/TaskList";
import styles from './Home.module.css'; // Importando o CSS do módulo

const Home = () => {
  document.title = 'Gestão de Tarefas';

  return (
    <div className={styles.homeContainer}>
      <MenuHeader />
      <main className={styles.mainContainer}>
        <div className={styles.taskListContainer}>
          <TaskList />
        </div>
        <div className={styles.formContainer}>
          <FormTask />
        </div>
      </main>
    </div>
  );
}

export default Home;
