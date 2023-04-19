// Material UI элементы
import { 
  Box,
  Modal,
} from '@mui/material';
// Redux-toolkit инструменты
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  modalEditClose,
  modalDegreeClose,
} from '../store/slices/employeeSlice';
// Реиспользуемые компоненты
import { DegreeTools } from './DegreeTools';
import { DegreeTable } from './DegreeTable';
import { DegreeEditModal } from './DegreeEditModal';
import { DegreeAddModal } from './DegreeAddModal';
import { ModalHeader } from './low-level/ModalHeader';

// Стилизация модального окна
const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  maxHeight: '100%',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

// Типизация пропсов
interface EmployeeDegreeModalProps {};

export const EmployeeDegreeModal = ({}: EmployeeDegreeModalProps) => {
  const dispatch = useAppDispatch();
  
  // Redux-toolkit стейт открытия модального окна 
  const open = useAppSelector(state => state.employee.modalDegree);

  return (
    <Modal
      sx={{zIndex: 3}}
      open={open}
      onClose={() => dispatch(modalEditClose())}
    >
      <Box sx={style}>
        <ModalHeader title='Образование' closeFunction={() => dispatch(modalDegreeClose())}/>
        <Box>
          <DegreeTools />
          <DegreeTable />
          <DegreeEditModal/>
          <DegreeAddModal/>
        </Box>
      </Box>
    </Modal>
  );
}