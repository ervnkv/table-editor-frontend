// Material UI элементы
import { Container} from "@mui/material";
// Redux-toolkit инструменты
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {  
  listRemove,
  selectedClear,
  modalAddOpen,
  modalEditOpen,
} from '../store/slices/employeeSlice';
// Реиспользуемые компоненты
import { Tools } from "./low-level/Tools";

// Типизация пропсов
interface EmployeeToolsProps {};

export const EmployeeTools = ({}: EmployeeToolsProps) => {
    const dispatch = useAppDispatch();
    // Redux-toolkit стейт выделенных строк
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