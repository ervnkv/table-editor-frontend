import { useState } from 'react';
// Material UI элементы
import { 
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  IconButton,
  Container,
} from '@mui/material';

import {
  Edit as EditIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

// Redux-toolkit инструменты
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




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const getDegreeName = (id: number, listDegree: Degree[]) => {
  const degree = listDegree.find(degree => degree.id === id);
  if (degree) {
    console.log(degree.name)
    return degree.name
  }
}


interface EmployeeAddModalProps {};

export const EmployeeAddModal = ({}: EmployeeAddModalProps) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(state => state.employee.modalAdd);

  const listDegree = useAppSelector(state => state.degree.list);

  const [newName, setNewName] = useState('');
  const defaultDegreeId = -1;
  const defaultDegreeName = 'Не выбрано';
  const [newDegree, setNewDegree] = useState(defaultDegreeId);

  const addEmployee = () => {
    dispatch(listAdd({name: newName, degree: newDegree}));
    dispatch(modalAddClose());
    dispatch(selectedClear())
  }

  return (
    <Modal
      open={open}
      onClose={() => dispatch(modalAddClose())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{mb: 3}}>
          Добавить сотрудника
        </Typography>

        <TextField
          sx={{width: '100%', mb: 3}}
          label="ФИО"
          placeholder='Введите ФИО'
          size="medium"
          onChange={e => setNewName(e.target.value)}
        />

        <Box sx={{mb: 3, display: 'inline-flex', width: '100%'}}>
          <FormControl sx={{width: '100%'}}>
            <InputLabel id="demo-simple-select-label">Образование</InputLabel>
            <Select
              value={newDegree}
              label="Образование"
              onChange={e => setNewDegree(Number(e.target.value))}
            >
              <MenuItem disabled value={defaultDegreeId}>{defaultDegreeName}</MenuItem>
              {listDegree.map(degree => (
                <MenuItem key={degree.name} value={degree.id}>{degree.name}</MenuItem>
              ))}

            </Select>
          </FormControl>
          
          <IconButton sx={{m: 1}} color="primary">
            <EditIcon />
          </IconButton>

          <IconButton sx={{m: 1, ml: 0, mr: 0}} color="primary" disabled={newDegree === defaultDegreeId} onClick={() => setNewDegree(defaultDegreeId)}>
            <ClearIcon />
          </IconButton>
        </Box>

        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Button 
            variant="contained" 
            color="success"
            disabled={!newName || newDegree === defaultDegreeId}
            onClick={addEmployee}
          >
            ОК
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={() => dispatch(modalAddClose())}
          >
            Отмена
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}