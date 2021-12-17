import { getUsers, addNewUser } from "../../api/api";
import { loadUser } from "./loadUser";

export const authApp = val => ({ type: 'AUTH_APP', payload: val });
export const logout = () => ({ type: 'LOGOUT' });

export const getUserData = getState => getState().user;

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