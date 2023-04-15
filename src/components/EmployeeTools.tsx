import { Box, Button, Container, Grid } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useEffect } from "react";

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
} from '../store/slices/employeeSlice';

interface EmployeeToolsProps {};

export const EmployeeTools = ({}: EmployeeToolsProps) => {
    const dispatch = useAppDispatch();
    const selected = useAppSelector(state => state.employee.selected)

    return(
        <Container sx={{width:600, mb: 5 }}>
            <Grid container justifyContent="space-between" >
                <Grid item>
                    <Button 
                        startIcon={<AddCircleIcon />} 
                        variant="contained" 
                        color="success"
                        onClick={() => dispatch(modalAddOpen())}
                    >
                        Добавить
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        disabled={selected.length === 1 ? false : true } 
                        startIcon={<EditIcon />} 
                        variant="contained" 
                        color="warning"
                        onClick={() => dispatch(modalEditOpen())}
                    >
                        Редактировать
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        disabled={selected.length >= 1 ? false : true } 
                        startIcon={<DeleteForeverIcon />} 
                        variant="contained" 
                        color="error"
                        onClick={() => {
                            dispatch(listRemove(selected))
                            dispatch(selectedClear())
                        }}
                    >
                        Удалить
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
};