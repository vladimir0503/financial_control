import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import app from "./redusers/app";
import user from "./redusers/user";

const reducer = combineReducers({
    app,
    user
});

export const getStore = () => {
    return createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
};