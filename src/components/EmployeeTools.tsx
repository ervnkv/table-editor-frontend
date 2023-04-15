import { Container} from "@mui/material";

import { useAppSelector, useAppDispatch } from '../store/hooks';
import {  
  listRemove,
  selectedClear,
  modalAddOpen,
  modalEditOpen,
} from '../store/slices/employeeSlice';
import { Tools } from "./low-level/Tools";

interface EmployeeToolsProps {};

export const EmployeeTools = ({}: EmployeeToolsProps) => {
    const dispatch = useAppDispatch();
    const selected = useAppSelector(state => state.employee.selected)

    return(
        <Container sx={{width:600, mb: 5 }}>
            <Tools 
                addOnClick={() => dispatch(modalAddOpen())} 
                editOnClick={() => dispatch(modalEditOpen())} 
                editDisable={!(selected.length === 1)} 
                removeOnClick={() => {
                    dispatch(listRemove(selected))
                    dispatch(selectedClear())
                }} 
                removeDisable={!(selected.length >= 1)}
            />
        </Container>
    )
};