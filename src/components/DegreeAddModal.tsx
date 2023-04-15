import { useState } from 'react';
// Material UI элементы
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
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
} from '../store/slices/degreeSlice';




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

interface DegreeAddModalProps {};

export const DegreeAddModal = ({}: DegreeAddModalProps) => {

  const dispatch = useAppDispatch();
  const open = useAppSelector(state => state.degree.modalAdd);

  const [newName, setNewName] = useState<string>('');

  const addDegree = () => {
    dispatch(listAdd({name: newName}));
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
          Добавить уровень образования
        </Typography>

        <TextField
          sx={{width: '100%', mb: 3}}
          label="Название"
          id="outlined-size-small"
          placeholder='Введите название'
          size="medium"
          onChange={e => setNewName(e.target.value)}
        />

        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Button 
            variant="contained" 
            color="success"
            disabled={!newName}
            onClick={addDegree}
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