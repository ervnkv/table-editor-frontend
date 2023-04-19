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
  selectedClear,
  modalAddClose,
  listAdd,
} from '../store/slices/degreeSlice';
// Реиспользуемые компоненты
import { ModalHeader } from './low-level/ModalHeader';
import { ModalDoneButton } from './low-level/ModalDoneButton';
import { ModalTextField } from './low-level/ModalTextField';

// Стилизация модального окна
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

// Типизация пропсов
interface DegreeAddModalProps {};

export const DegreeAddModal = ({}: DegreeAddModalProps) => {
  const dispatch = useAppDispatch();

  // Redux-toolkit стейт открытия модального окна 
  const open = useAppSelector(state => state.degree.modalAdd);
  // React стейт для значения из поля ввода
  const [newName, setNewName] = useState<string>('');
  // Функция обработки кнопки ОК. Redux-toolkit actions
  const addDegree = () => {
    dispatch(listAdd(newName)); // Добавление нового Образования
    dispatch(selectedClear()); // Очистка выделения строк в таблице
    dispatch(modalAddClose()); // Закрытие модального окна
  }

  return (
    <Modal
      sx={{zIndex: 4}}
      open={open}
      onClose={() => dispatch(modalAddClose())}
    >
      <Box sx={style}>
        <ModalHeader title='Добавить уровень образования' closeFunction={() => dispatch(modalAddClose())}/>
        <ModalTextField label='Название' placeholder='Введите название' onChange={e => setNewName(e.target.value)}/>
        <ModalDoneButton onClick={addDegree} disable={!newName}/>
      </Box>
    </Modal>
  );
}