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
  Alert,
  CircularProgress
} from '@mui/material';

// Redux-toolkit инструменты
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  selectedToggle,
  listGet,
} from '../store/slices/degreeSlice';
import { useTranslation } from 'react-i18next';

// Типизация пропсов
interface DegreeTableProps {};

export const DegreeTable = ({}: DegreeTableProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation('header');
  // Redux-toolkit стейт списка всех строк, загрузки с сервера, ошибки и списка выделенных строк
  const {list, isLoading, errorText, selected} = useAppSelector(state => state.degree);
  // Хук для получения списка всех строк с сервера
  useEffect(() => {
    dispatch(listGet());
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
                <TableCell align="center">{t('degree_tab')}</TableCell>
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