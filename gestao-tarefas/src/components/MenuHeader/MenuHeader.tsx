import './MenuHeader.module.css';

const MenuHeader = () => {
  const handleLogout = () => {
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1>Gestão de Tarefas</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default MenuHeader;