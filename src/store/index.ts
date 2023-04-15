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
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch