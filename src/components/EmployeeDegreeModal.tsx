import { useEffect, useState } from 'react';
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
  IconButton
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
  modalDegreeClose,
} from '../store/slices/employeeSlice';
import { Degree } from '../types';
import { DegreeTools } from './DegreeTools';
import { DegreeTable } from './DegreeTable';
import { DegreeEditModal } from './DegreeEditModal';
import { DegreeAddModal } from './DegreeAddModal';
import { ModalHeader } from './low-level/ModalHeader';




const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 2,
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


interface EmployeeDegreeModalProps {};

export const EmployeeDegreeModal = ({}: EmployeeDegreeModalProps) => {

  const dispatch = useAppDispatch();
  const open = useAppSelector(state => state.employee.modalDegree);

  return (
    <Modal
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