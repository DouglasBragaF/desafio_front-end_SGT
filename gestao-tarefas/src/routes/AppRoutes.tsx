import { Routes, Route } from 'react-router-dom';
import FormTask from '../pages/FormTask';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FormTask />} />
    </Routes>
  );
};

export default AppRoutes;
