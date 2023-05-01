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
// Реиспользуемые компоненты
import { ModalHeader } from './low-level/ModalHeader';
import { ModalDoneButton } from './low-level/ModalDoneButton';
import { ModalTextField } from './low-level/ModalTextField';
import { ModalSelect } from './low-level/ModalSelect';
import { useTranslation } from 'react-i18next';

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
interface EmployeeAddModalProps {};

export const EmployeeAddModal = ({}: EmployeeAddModalProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation('tables', {keyPrefix: 'employee_table.add_modal'});
  // Redux-toolkit стейт открытия модального окна 
  const open = useAppSelector(state => state.employee.modalAdd);
  // React стейт для значения из поля ввода Имени сотрудника
  const [newName, setNewName] = useState('');
  // React стейт для значения из селектора Образования
  const defaultDegreeId = -1;
  const [newDegree, setNewDegree] = useState(defaultDegreeId);
  // Функция обработки кнопки ОК. Redux-toolkit actions
  const addEmployee = () => {
    dispatch(listAdd({name: newName, degree_id: newDegree})); // Добавление нового Сотрудника
    dispatch(selectedClear()); // Очистка выделения строк в таблице
    dispatch(modalAddClose()); // Закрытие модального окна
  }

  return (
    <Modal
      sx={{zIndex: 2}}
      open={open}
      onClose={() => dispatch(modalAddClose())}
    >
      <Box sx={style}>
        <ModalHeader title={t('head')} closeFunction={() => dispatch(modalAddClose())}/>
        <ModalTextField label={t('name_input_label')} placeholder={t('name_input_placeholder')} onChange={e => setNewName(e.target.value)}/>
        <ModalSelect 
          label={t('degree_select_label')} 
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