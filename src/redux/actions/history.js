import { changeData } from "../../api/api";
import { getUserData } from "./app";

export const newOperation = (obj) => ({
  type: "NEW_OPERATION",
  payload: obj,
});

export const clearHistory = () => ({
  type: "CLEAR_HISTORY",
});

export const fetchClearHistory = () => async (dispatch, getState) => {
  const { id, password, userName, total } = getUserData(getState);
  await changeData({ id, password, userName, total, history: [] });
  dispatch(clearHistory());
};