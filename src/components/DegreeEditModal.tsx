// React
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
interface DegreeEditModalProps {};

export const DegreeEditModal = ({}: DegreeEditModalProps) => {
  const dispatch = useAppDispatch();

  // Redux-toolkit стейт открытия модального окна 
  const open = useAppSelector(state => state.degree.modalEdit);
  // React стейт для значения из поля ввода
  const [newName, setNewName] = useState('');
  // Redux-toolkit стейт выделенных строк. [0] потому что здесь всегда один элемент 
  const selected = useAppSelector(state => state.degree.selected)[0];
  // Хук для обновления дефолтного значения в поле ввода на значение из выделенной строки
  useEffect(() => {
    if (selected) {
      setNewName(selected.name);
    }
  }, [selected]);
  // Функция обработки кнопки ОК. Redux-toolkit actions
  const editDegree = () => {
    dispatch(listEdit({id: selected.id, name: newName})); // Изменение Образования
    dispatch(selectedClear()); // Очистка выделения строк в таблице
    dispatch(modalEditClose()); // Закрытие модального окна
  }

  return (
    <Modal
      sx={{zIndex: 4}}
      open={open}
      onClose={() => dispatch(modalEditClose())}
    >
      <Box sx={style}>
        <ModalHeader title='Редактировать уровень образования' closeFunction={() => dispatch(modalEditClose())}/>
        <ModalTextField label='Название' placeholder='Введите новое название' onChange={e => setNewName(e.target.value)} defaultValue={newName}/>
        <ModalDoneButton onClick={editDegree} disable={!newName}/>
      </Box>
    </Modal>
  );
}