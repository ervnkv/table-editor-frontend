import { useEffect, useState } from 'react';
// Material UI элементы
import { 
  Box,
  Modal,
} from '@mui/material';

// Redux-toolkit инструменты
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {     
  listEdit,
  selectedClear,
  modalEditClose,
} from '../store/slices/employeeSlice';
import { Degree } from '../types';
import { ModalHeader } from './low-level/ModalHeader';
import { ModalDoneButton } from './low-level/ModalDoneButton';
import { ModalSelect } from './low-level/ModalSelect';
import { ModalTextField } from './low-level/ModalTextField';


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

interface EmployeeEditModalProps {};

export const EmployeeEditModal = ({}: EmployeeEditModalProps) => {

  const dispatch = useAppDispatch();
  const open = useAppSelector(state => state.employee.modalEdit);
  const selected = useAppSelector(state => state.employee.selected)[0];

  const [newName, setNewName] = useState('');
  const defaultDegreeId = -1;
  const [newDegree, setNewDegree] = useState(defaultDegreeId);

  useEffect(() => {
    if (selected) {
      setNewName(selected.name);
      setNewDegree(selected.degree);
    }
  }, [selected]);

  const editEmployee = () => {
    if (!newName || !newDegree) return
    dispatch(listEdit({id: selected.id, name: newName, degree: newDegree}));
    dispatch(modalEditClose());
    dispatch(selectedClear())
  }

  return (
    <Modal
      open={open}
      onClose={() => dispatch(modalEditClose())}
    >
      <Box sx={style}>
        <ModalHeader title='Редактировать Сотрудника' closeFunction={() => dispatch(modalEditClose())}/>
        <ModalTextField label='ФИО' defaultValue={newName} placeholder='Введите новое ФИО' onChange={e => setNewName(e.target.value)}/>
        <ModalSelect 
          label='Образование' 
          value={newDegree} 
          defaultValue={defaultDegreeId} 
          onChange={e => setNewDegree(Number(e.target.value))} 
          clearOnClick={() => setNewDegree(defaultDegreeId)}
        />
        <ModalDoneButton onClick={editEmployee} disable={newDegree === defaultDegreeId || !newName}/>
      </Box>
    </Modal>
  );
}