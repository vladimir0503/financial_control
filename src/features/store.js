import { configureStore } from '@reduxjs/toolkit';
import appReducer from './app/appSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
        user: userReducer
    }
});