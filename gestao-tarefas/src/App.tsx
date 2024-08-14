import AppRoutes from './routes/AppRoutes';
import styles from './App.module.css';
import MenuHeader from './components/MenuHeader/MenuHeader';

function App() {
  return (
    <div className={styles.app}>
      <MenuHeader />
      <AppRoutes />
    </div>
  );
}

export default App;
