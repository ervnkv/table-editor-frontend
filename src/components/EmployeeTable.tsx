import {
  Table as TableMUI,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Container
} from '@mui/material';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import {     
  listAdd,
  listRemove,
  listEdit,
  selectedToggle,
  selectedClear,
  modalAddOpen,
  modalAddClose,
  modalEditOpen,
  modalEditClose,
} from '../store/slices/employeeSlice';
import { Degree } from '../types';


const getDegreeName = (id: number, listDegree: Degree[]) => {
  const degree = listDegree.find(degree => degree.id === id);
  if (degree) return degree.name
}

interface EmployeeTableProps {};

export const EmployeeTable = ({}: EmployeeTableProps) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(state => state.employee.selected);
  const list = useAppSelector(state => state.employee.list);
  const listDegree = useAppSelector(state => state.degree.list);
  
  return (
    <Container sx={{width:600, mb: 5 }}>
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
                  <TableCell align="center">{getDegreeName(item.degree, listDegree)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableMUI>
      </TableContainer>
    </Container>
  );
}