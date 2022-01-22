import { createSlice } from '@reduxjs/toolkit';
import { getUsers, addNewUser } from '../../api/api';
import { loadUser } from '../user/userSlice';

const initialState = {
    isAuth: false
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        authApp: (state, action) => {
            state.isAuth = action.payload
        },
        logout: state => {
            state.isAuth = false
        }
    }
});

export const { authApp, logout } = appSlice.actions;

const findUser = async (name, password) => {
    const users = await getUsers();
    const user = Object.values(users).filter((user) => (user.userName === name && user.password === password))[0];
    return user;
};

export const fetchAuthApp = (name, password) => async dispatch => {
    const user = await findUser(name, password);
    if (user) {
        dispatch(authApp(true));
        dispatch(loadUser(user));
        sessionStorage.setItem('isAuth', JSON.stringify({ name, password }));
    } else {
        return false;
    };
};

export const fetchAddNewUser = (name, password) => async dispatch => {
    const user = await findUser(name, password);
    if (!user) {
        const newUser = await addNewUser(name, password);
        dispatch(loadUser(newUser));
        dispatch(authApp(true));
        sessionStorage.setItem('isAuth', JSON.stringify({ name, password }));
        window.history.back();
    } else {
        return false;
    };
};

export default appSlice.reducer;