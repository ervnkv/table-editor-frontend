// Добавление, редактирование и удаление сотрудников
import { createSlice, PayloadAction, createAsyncThunk, AnyAction} from '@reduxjs/toolkit';
import { Employee } from '../../types';

const BASE_URL = `${process.env.REACT_APP_SERVER}/employee`;

export const listGet = createAsyncThunk<Employee[], undefined, {rejectValue: string}>(
    'employee/listGet', async function(_, { rejectWithValue }) {
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) return rejectWithValue('Не удалось получить данные с сервера');
            return await response.json();
        } catch (error) {
            return rejectWithValue('Не удалось соединиться с сервером');
        }
    }
);

export const listAdd = createAsyncThunk<Employee, Pick<Employee, "name" | "degree_id">, {rejectValue: string}>(
    'employee/listAdd', async function({name, degree_id}, { rejectWithValue }) {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, degree_id})
            });
            if (!response.ok) return rejectWithValue('Не удалось получить данные с сервера');
            return await response.json();
        } catch (error) {
            return rejectWithValue('Не удалось соединиться с сервером');
        }
    }
);

export const listEdit = createAsyncThunk<Employee, Employee, {rejectValue: string}>(
    'employee/listEdit', async function(employee, { rejectWithValue }) {
        try {
            const response = await fetch(BASE_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            });
            if (!response.ok) return rejectWithValue('Не удалось получить данные с сервера');
            return await response.json();
        } catch (error) {
            return rejectWithValue('Не удалось соединиться с сервером');
        }
    }
);

export const listRemove = createAsyncThunk<number[], Employee[], {rejectValue: string}>(
    'employee/listRemove', async function(employes, { rejectWithValue }) {
        try {
            const ids = employes.map(employee => employee.id);
            const response = await fetch(BASE_URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ids)
            });
            if (!response.ok) return rejectWithValue('Не удалось получить данные с сервера');
            return await response.json();
        } catch (error) {
            return rejectWithValue('Не удалось соединиться с сервером');
        }
    }
);


const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        list: [] as Employee[],
        selected: [] as Employee[],
        isLoading: false,
        errorText: null as string | null,
        modalAdd: false,
        modalEdit: false,
        modalDegree: false,
    },
    reducers: {
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
    },

    extraReducers: (builder) => {
        builder
            .addCase(listGet.pending, (state) => {
                state.isLoading = true;
                state.errorText = null;
            })
            .addCase(listGet.fulfilled, (state, action) => {
                state.list = action.payload;
                state.isLoading = false;
                state.errorText = null;
            })
            .addCase(listAdd.fulfilled, (state, action) => {
                state.list.push(action.payload);
                state.isLoading = false;
                state.errorText = null;
            })
            .addCase(listEdit.fulfilled, (state, action) => {
                const index = state.list.findIndex(employee => employee.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
                state.isLoading = false;
                state.errorText = null;
            })
            .addCase(listRemove.fulfilled, (state, action) => {
                state.list = state.list.filter(stateItem => !action.payload.some(id => id === stateItem.id));
                state.isLoading = false;
                state.errorText = null;
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.errorText = action.payload;
                state.isLoading = false;
            })
    }
});

function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

export const {
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

