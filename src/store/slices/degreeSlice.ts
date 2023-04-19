// Добавление, редактирование и удаление уровней образования

import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { Degree } from '../../types';

const BASE_URL = `${process.env.REACT_APP_SERVER}/degree`;

/**
 * Получить все уровни образования 
 * 
 * GET-запрос
 * 
 * GET-ответ - json в виде [ {"id": "1", "name": "Бакалавриат"} ]
 */
export const listGet = createAsyncThunk<Degree[], undefined, {rejectValue: string}>(
    'degree/listGet', async function(_, { rejectWithValue }) {
        try {
            const response = await fetch(BASE_URL);
            if (!response.ok) return rejectWithValue('Не удалось получить данные с сервера');
            return await response.json();
        } catch (error) {
            return rejectWithValue('Не удалось соединиться с сервером');
        }
    }
);
/**
 * Добавить уровень образования 
 * 
 * POST-запрос - в теле json в виде {"name": "Магистратура"}
 * 
 * POST-ответ - json в виде {"id": "2", "name": "Магистратура"}
 */
export const listAdd = createAsyncThunk<Degree, string, {rejectValue: string}>(
    'degree/listAdd', async function(name, { rejectWithValue }) {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name})
            });
            if (!response.ok) return rejectWithValue('Не удалось получить данные с сервера');
            return await response.json();
        } catch (error) {
            return rejectWithValue('Не удалось соединиться с сервером');
        }
    }
);
/**
 * Изменить уровень образования
 * 
 * PUT-запрос - в теле json в виде {"id": "1", "name": "Аспирантура"}
 * 
 * PUT-ответ - json в виде {"id": "1", "name": "Аспирантура"}
 */
export const listEdit = createAsyncThunk<Degree, Degree, {rejectValue: string}>(
    'degree/listEdit', async function(degree, { rejectWithValue }) {
        try {
            const response = await fetch(BASE_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(degree)
            });
            if (!response.ok) return rejectWithValue('Не удалось получить данные с сервера');
            return await response.json();
        } catch (error) {
            return rejectWithValue('Не удалось соединиться с сервером');
        }
    }
);
/**
 * Удалить уровни образования
 * 
 * DELETE-запрос - в теле json в виде [1, 2]
 * 
 * DELETE-ответ - json в виде [1, 2]
 */
export const listRemove = createAsyncThunk<number[], Degree[], {rejectValue: string}>(
    'degree/listRemove', async function(degrees, { rejectWithValue }) {
        try {
            const ids = degrees.map(degree => degree.id);
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

const degreeSlice = createSlice({
    name: 'degree',
    initialState: {
        list: [] as Degree[],
        selected: [] as Degree[],
        isLoading: false,
        errorText: null as string | null,
        modalEdit: false,
        modalAdd: false,
    },
    reducers: {
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
    },
    // Действия с сервером
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
                const index = state.list.findIndex(grade => grade.id === action.payload.id);
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
// Функция проверки вернулась ли ошибка 
function isError(action: AnyAction) {
    return action.type.endsWith('rejected');
}

export const {
    selectedToggle,
    selectedClear,
    modalAddOpen,
    modalAddClose,
    modalEditOpen,
    modalEditClose
} = degreeSlice.actions;
export default degreeSlice.reducer;


