const initialState = {
    isAuth: false
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_APP':
            return {
                ...state,
                isAuth: action.payload
            };

        case 'LOGOUT':
            return {
                ...state,
                isAuth: false
            };

        default:
            return state;
    }
};

export default app;