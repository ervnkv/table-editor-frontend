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
// Реиспользуемые компоненты
import { ModalHeader } from './low-level/ModalHeader';
import { ModalDoneButton } from './low-level/ModalDoneButton';
import { ModalSelect } from './low-level/ModalSelect';
import { ModalTextField } from './low-level/ModalTextField';
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
interface EmployeeEditModalProps {};

export const EmployeeEditModal = ({}: EmployeeEditModalProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation('tables', {keyPrefix: 'employee_table.edit_modal'});
  // Redux-toolkit стейт открытия модального окна 
  const open = useAppSelector(state => state.employee.modalEdit);
  // Redux-toolkit стейт выделенных строк. [0] потому что здесь всегда один элемент 
  const selected = useAppSelector(state => state.employee.selected)[0];
  // React стейт для значения из поля ввода нового Имени сотрудника
  const [newName, setNewName] = useState('');
  // React стейт для значения из селектора нового Образования
  const defaultDegreeId = -1;
  const [newDegree, setNewDegree] = useState(defaultDegreeId);
  // Хук для обновления дефолтных значений в поле ввода на значение из выделенной строки
  useEffect(() => {
    if (selected) {
      setNewName(selected.name);
      setNewDegree(selected.degree_id);
    }
  }, [selected]);
  // Функция обработки кнопки ОК. Redux-toolkit actions
  const editEmployee = () => {
    if (!newName || !newDegree) return; // Проверка на наличие отправляемых данных
    dispatch(listEdit({id: selected.id, name: newName, degree_id: newDegree})); // Изменение Сотрудника
    dispatch(selectedClear()); // Очистка выделения строк в таблице
    dispatch(modalEditClose()); // Закрытие модального окна
  }

  return (
    <Modal
      sx={{zIndex: 2}}
      open={open}
      onClose={() => dispatch(modalEditClose())}
    >
      <Box sx={style}>
        <ModalHeader title={t('head')} closeFunction={() => dispatch(modalEditClose())}/>
        <ModalTextField label={t('name_input_label')} defaultValue={newName} placeholder={t('name_input_placeholder')} onChange={e => setNewName(e.target.value)}/>
        <ModalSelect 
          label={t('degree_select_label')} 
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