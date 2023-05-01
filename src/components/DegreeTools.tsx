// React
import { useEffect, useState } from "react";
// Material UI элементы
import { 
    Container,
} from "@mui/material";
// Redux-toolkit инструменты
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  listRemove,
  selectedClear,
  modalAddOpen,
  modalEditOpen,
} from '../store/slices/degreeSlice';
// Реиспользуемые компоненты
import { Tools } from "./low-level/Tools";


// Типизация пропсов
interface DegreeToolsProps {};

export const DegreeTools = ({}: DegreeToolsProps) => {
    const dispatch = useAppDispatch();
    
    // Redux-toolkit стейт выделенных строк
    const selected = useAppSelector(state => state.degree.selected)
    // Redux-toolkit стейт всего списка Сотрудников
    const listEmployee = useAppSelector(state => state.employee.list);
    // React стейт проверки используются ли выделенные Образования
    const [selectedUsed, setSelectedUsed] = useState(false);
  // Хук для проверки выделенных образований
    useEffect(() => {
        if (selected) {
            const isSomeDegreesUsed = selected.some(selectDegree => listEmployee.find(employee => employee.degree_id === selectDegree.id));
            setSelectedUsed(isSomeDegreesUsed);
        }
    }, [selected]);

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
                removeDisable={selectedUsed || selected.length === 0} 
                removeTipOpen={selectedUsed}
            />
        </Container>
    )
};