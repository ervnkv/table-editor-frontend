// Добавление, редактирование и удаление сотрудников
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../../types';


const defaultList: Employee[] = [
    { id: 1, name: 'Егор', degree: 1 },
    { id: 2, name: 'Галинова Евгения Юрьевна', degree: 1 }
]
const defaultSelected: Employee[] = [];

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        list: defaultList,
        selected: defaultSelected,
        modalAdd: false,
        modalEdit: false,
        modalDegree: false,
    },
    reducers: {
        // Действия со списком уровней образования
        listAdd(state, action: PayloadAction<Pick<Employee, "name" | "degree">>) {
            const lastId = state.list.length > 0 ? state.list[state.list.length-1].id : 0;
            state.list.push({
                id: lastId+1,
                name: action.payload.name,
                degree: action.payload.degree,
            })
        },
        listRemove(state, action: PayloadAction<Employee[]>) {
            state.list = state.list.filter(stateItem => !action.payload.some(actionItem => actionItem.id === stateItem.id));
        },
        listEdit(state, action: PayloadAction<Employee>) {
            const index = state.list.findIndex(employee => employee.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },

        // Действия со списком выделенных строк
        selectedToggle(state, action: PayloadAction<Employee>) {
            const index = state.selected.findIndex( stateItem => stateItem.id === action.payload.id);
            if (index > -1) {
                state.selected.splice(index, 1);
            } else {
                state.selected.push(action.payload);
            }
        },
        selectedClear(state) {
            state.selected.length = 0;
        },

        // Действия с модальными окнами
        modalAddOpen(state) {
            state.modalAdd = true;
        },
        modalAddClose(state) {
            state.modalAdd = false;
        },
        modalEditOpen(state) {
            state.modalEdit = true;
        },
        modalEditClose(state) {
            state.modalEdit = false;
        },
        modalDegreeOpen(state) {
            state.modalDegree = true;
        },
        modalDegreeClose(state) {
            state.modalDegree = false;
        },
    }
});

export const {
    listAdd,
    listRemove,
    listEdit,
    selectedToggle,
    selectedClear,
    modalAddOpen,
    modalAddClose,
    modalEditOpen,
    modalEditClose,
    modalDegreeOpen,
    modalDegreeClose,
} = employeeSlice.actions;
export default employeeSlice.reducer;

