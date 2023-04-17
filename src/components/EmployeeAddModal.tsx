// React
import { useState } from 'react';
// Material UI элементы
import { 
  Box,
  Modal,
} from '@mui/material';

// Redux-toolkit инструменты
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {     
  listAdd,
  selectedClear,
  modalAddClose,
} from '../store/slices/employeeSlice';
import { ModalHeader } from './low-level/ModalHeader';
import { ModalDoneButton } from './low-level/ModalDoneButton';
import { ModalTextField } from './low-level/ModalTextField';
import { ModalSelect } from './low-level/ModalSelect';


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

interface EmployeeAddModalProps {};

export const EmployeeAddModal = ({}: EmployeeAddModalProps) => {
  const dispatch = useAppDispatch();

  const open = useAppSelector(state => state.employee.modalAdd);
  const [newName, setNewName] = useState('');
  const defaultDegreeId = -1;
  const [newDegree, setNewDegree] = useState(defaultDegreeId);

  const addEmployee = () => {
    dispatch(listAdd({name: newName, degree_id: newDegree}));
    dispatch(modalAddClose());
    dispatch(selectedClear())
  }

  return (
    <Modal
      sx={{zIndex: 2}}
      open={open}
      onClose={() => dispatch(modalAddClose())}
    >
      <Box sx={style}>
        <ModalHeader title='Добавить сотрудника' closeFunction={() => dispatch(modalAddClose())}/>
        <ModalTextField label='ФИО' placeholder='Введите ФИО' onChange={e => setNewName(e.target.value)}/>
        <ModalSelect 
          label='Образование' 
          value={newDegree} 
          defaultValue={defaultDegreeId} 
          onChange={e => setNewDegree(Number(e.target.value))} 
          clearOnClick={() => setNewDegree(defaultDegreeId)}
        />
        <ModalDoneButton onClick={addEmployee} disable={newDegree === defaultDegreeId || !newName}/>
      </Box>
    </Modal>
  );
}