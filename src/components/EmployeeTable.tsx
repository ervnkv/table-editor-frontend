// React
import { useEffect } from 'react';
// Material UI элементы
import {
  Table as TableMUI,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  CircularProgress,
  Alert
} from '@mui/material';
// Redux-toolkit инструменты
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  listGet,
  selectedToggle,
} from '../store/slices/employeeSlice';
import {
  listGet as listGetDegree,
} from '../store/slices/degreeSlice';
import { Degree } from '../types';

// Функция получения названия Образования по данному id
const getDegreeName = (id: number, listDegree: Degree[]) => {
  const degree = listDegree.find(degree => degree.id === id);
  if (degree) return degree.name
}
// Типизация пропсов
interface EmployeeTableProps {};

export const EmployeeTable = ({}: EmployeeTableProps) => {
  const dispatch = useAppDispatch();
    // Redux-toolkit стейт списка всех строк, загрузки с сервера, ошибки и списка выделенных строк
  const {list, isLoading, errorText, selected} = useAppSelector(state => state.employee);
  const listDegree = useAppSelector(state => state.degree.list);
  // Хук для получения списка всех строк Сотрудников и Образований с сервера
  useEffect(() => {
    dispatch(listGet());
    dispatch(listGetDegree());
  }, [dispatch]);

  return (
    <>
    <Container sx={{width:600, height: 50, display: 'flex', justifyContent: 'center'}}>
      {isLoading && <CircularProgress />}
      {errorText && <Alert sx={{width:'100%'}} severity="error">Ошибка: {errorText}</Alert>}
    </Container>
    <Container sx={{width:600, mb: 5 }}>
      {!isLoading && !errorText &&
        <TableContainer component={Paper}>
          <TableMUI  aria-label="simple table">

            <TableHead>
              <TableRow sx={{cursor: 'default'}}>
                <TableCell align="center">ФИО</TableCell>
                <TableCell align="center">Образование</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {list.map(item => (
                <TableRow
                  hover
                  selected={selected.some(selectedItem => selectedItem.id === item.id)}
                  onClick={() => dispatch(selectedToggle(item))}
                  key={item.id}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    cursor: 'pointer',
                  }}
                >
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{getDegreeName(item.degree_id, listDegree)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            
          </TableMUI>
        </TableContainer>
      }
    </Container>
    </>
  );
}