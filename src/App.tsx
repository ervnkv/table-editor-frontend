import { Routes, Route, Navigate} from 'react-router-dom';
import { Header } from './components/Header';
import { DegreesPage } from './pages/DegreesPage';
import { EmployeesPage } from './pages/EmployeesPage';
import { NotFoundPage } from './pages/NotFoundPage';



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Navigate to={'/employees'} replace/>} />
        <Route path='/employees' element={<EmployeesPage />} />
        <Route path='/degrees' element={<DegreesPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
