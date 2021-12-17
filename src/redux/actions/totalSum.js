import { changeData } from "../../api/api";
import { getUserData } from "./app";

export const changeSum = sum => ({ type: "CHANGE_TOTAL", payload: sum });

export const fetchSum = value => async (dispatch, getState) => {
  const { id, password, userName, history } = getUserData(getState);
  const res = await changeData({ id, password, userName, history, total: value });
  dispatch(changeSum(value));
  return res;
};

