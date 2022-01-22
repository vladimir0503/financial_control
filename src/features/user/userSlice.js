import { createSlice } from '@reduxjs/toolkit'
import { changeData } from '../../api/api'

const initialState = {
    userData: {
        total: 0,
        id: 0,
        password: null,
        userName: null,
        history: []
    }
};

const findProperty = (prop, state) => {
    let property = null;
    const obj = JSON.parse(JSON.stringify(state));
    Object.keys(obj).forEach(key => {
        if (key === prop) property = obj[key];
    });
    return property;
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadUser: (state, action) => {
            state.userData = action.payload
        },
        newOperation: (state, action) => {
            const history = findProperty('history', state.userData);
            state.userData.history = !history ? [action.payload] : [...history, action.payload];
        },
        changeTotal: (state, action) => {
            state.userData.total = action.payload
        },
        clearHistory: state => {
            state.userData.history = []
        },
        clearUser: state => {
            state.userData = {
                total: 0,
                id: 0,
                password: null,
                userName: null,
                history: []
            }
        }
    }
});

export const { loadUser, newOperation, changeTotal, clearHistory, clearUser } = userSlice.actions;

export const fetchClearHistory = () => async (dispatch, getState) => {
    const { id, password, userName, total } = getState().user.userData;
    await changeData({ id, password, userName, total, history: [] });
    dispatch(clearHistory());
};

export const fetchSum = value => async (dispatch, getState) => {
    const { id, password, userName, history } = getState().user.userData;
    const res = await changeData({ id, password, userName, history, total: value });
    dispatch(changeTotal(value));
    return res;
};

export default userSlice.reducer;