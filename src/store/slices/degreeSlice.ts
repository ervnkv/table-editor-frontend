// Добавление, редактирование и удаление уровней образования
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Degree } from '../../types';


const defaultList: Degree[] = [
    { id: 1, name: 'Бакалавриат' },
    { id: 2, name: 'Магистратура' }
]
const defaultSelected: Degree[] = [];

const degreeSlice = createSlice({
    name: 'degree',
    initialState: {
        list: defaultList,
        selected: defaultSelected,
        modalEdit: false,
        modalAdd: false,
    },
    reducers: {
        // Действия со списком уровней образования
        listAdd(state, action: PayloadAction<Pick<Degree, "name">>) {
            const lastId = state.list.length > 0 ? state.list[state.list.length-1].id : 0;
            state.list.push({
                id: lastId+1,
                name: action.payload.name,
            })
        },
        listRemove(state, action: PayloadAction<Degree[]>) {
            state.list = state.list.filter(stateItem => !action.payload.some(actionItem => actionItem.id === stateItem.id));
        },
        listEdit(state, action: PayloadAction<Degree>) {
            const index = state.list.findIndex(grade => grade.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },

        // Действия со списком выделенных строк
        selectedToggle(state, action: PayloadAction<Degree>) {
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
    modalEditClose
} = degreeSlice.actions;
export default degreeSlice.reducer;

