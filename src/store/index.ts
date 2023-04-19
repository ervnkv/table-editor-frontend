import { configureStore } from '@reduxjs/toolkit';
import degreeReducer from './slices/degreeSlice';
import employeeReducer from './slices/employeeSlice';

const store = configureStore ({
    reducer: {
        degree: degreeReducer,
        employee: employeeReducer,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch