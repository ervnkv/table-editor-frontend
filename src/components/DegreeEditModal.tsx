import { useEffect, useState } from 'react';
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

interface DegreeEditModalProps {};

export const DegreeEditModal = ({}: DegreeEditModalProps) => {

  const dispatch = useAppDispatch();
  const open = useAppSelector(state => state.degree.modalEdit);
  const selected = useAppSelector(state => state.degree.selected)[0];

  const [newName, setNewName] = useState('');
  
  useEffect(() => {
    if (selected) {
      setNewName(selected.name);
    }
  }, [selected]);

  const editDegree = () => {
    dispatch(listEdit({id: selected.id, name: newName}));
    dispatch(modalEditClose());
    dispatch(selectedClear())
  }

  return (
    <Modal
      open={open}
      onClose={() => dispatch(modalEditClose())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" sx={{mb: 3}}>
          Редактировать уровень образования
        </Typography>

        <TextField
          sx={{width: '100%', mb: 3}}
          size="medium"
          id="outlined-size-small"
          label="Название"
          placeholder='Введите новое название'
          defaultValue={newName}
          onChange={(e) => {
            setNewName(e.target.value)
          }}
        />

        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Button 
            variant="contained" 
            color="success"
            disabled={!newName}
            onClick={editDegree}
          >
            ОК
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={() => dispatch(modalEditClose())}
          >
            Отмена
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}