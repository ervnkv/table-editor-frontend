import { Box, Button, Container, Grid, Tooltip } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useEffect, useState } from "react";

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



interface DegreeToolsProps {};

export const DegreeTools = ({}: DegreeToolsProps) => {
    const dispatch = useAppDispatch();
    const selected = useAppSelector(state => state.degree.selected)
    const listEmployee = useAppSelector(state => state.employee.list);

    const [selectedUsed, setSelectedUsed] = useState(false);

    useEffect(() => {
        if (selected) {
            const isSomeDegreesUsed = selected.some(selectDegree => listEmployee.find(employee => employee.degree === selectDegree.id));
            setSelectedUsed(isSomeDegreesUsed);
        }
      }, [selected]);

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
                    <Tooltip  title="Выделенный уровень образования используется" placement="bottom" arrow open={selectedUsed} >
                        <Button 
                            disabled={!(selected.length >= 1 && !selectedUsed)} 
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
                    </Tooltip>

                </Grid>
            </Grid>
        </Container>
    )
};