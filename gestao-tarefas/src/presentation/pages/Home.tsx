import FormTask from "../components/Form/FormTask"
import MenuHeader from "../components/MenuHeader/MenuHeader"

const Home = () => {
  document.title = 'Gestão de Tarefas';

  return (
    <div className="homeContainer">
      <MenuHeader />
      <FormTask />
    </div>
  );
}

export default Home;