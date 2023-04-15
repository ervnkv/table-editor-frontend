// Material UI элементы
import {
  Table as TableMUI,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container
} from '@mui/material';
// Redux-toolkit инструменты
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  selectedToggle,
} from '../store/slices/degreeSlice';

// Типизация пропсов
interface DegreeTableProps {};

export const DegreeTable = ({}: DegreeTableProps) => {
  const dispatch = useAppDispatch();
  
  // Redux-toolkit стейт выделенных строк
  const selected = useAppSelector(state => state.degree.selected);
  // Redux-toolkit стейт всего списка Образований
  const listDegree = useAppSelector(state => state.degree.list);

  return (
    <Container sx={{width:600, mb: 5 }}>
      <TableContainer component={Paper}>
        <TableMUI  aria-label="simple table">

          <TableHead>
            <TableRow sx={{cursor: 'default'}}>
              <TableCell align="center">Образование</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listDegree.map(item => (
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
    </Container>
  );
}