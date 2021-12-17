import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newOperation } from "../../redux/actions/history";
import { fetchSum } from "../../redux/actions/totalSum";
import Form from "../Form";

function NewOperation() {
  const [sum, setSum] = useState("");
  const [comment, setComment] = useState("");
  const [isRefill, setRefill] = useState(false);
  const [info, setInfo] = useState({
    text: "",
    status: false,
  });

  const total = useSelector(({ user }) => user.total);

  const dispatch = useDispatch();
  const currentDate = new Date().toLocaleDateString();
  let timer;

  const createNewOperation = (sum, comment, date) => ({
    sum,
    comment,
    date: date,
  });

  const resetFrom = () => {
    setSum("");
    setComment("");
  };

  const createInfo = (text) => {
    setInfo({ text, status: true });
    timer = setTimeout(() => setInfo({ text, status: false }), 2000);
  };

  const validation = refill => {
    let success = true;

    if (sum === "") {
      createInfo("Введите сумму!");
      success = false;
    };

    if (!refill && +sum > total) {
      createInfo("На балансе не достаточно средств!");
      success = false;
    };

    return success;
  };

  const fetchTotal = async (newSum, history, refill) => {
    try {
      dispatch(newOperation(history));
      await dispatch(fetchSum(newSum));
      setRefill(refill);
      createInfo(refill ? `Вы внесли ${sum} р.` : `Вы сняли ${sum} р.`);
      resetFrom();
    } catch (error) {
      setRefill(false);
      createInfo(`Ошибка сервера`);
      console.log(error);
    };
  }

  const addSum = async () => {
    if (!validation(true)) return;

    const newSum = total + +sum;
    const historyObj = createNewOperation(`+${sum}`, comment, currentDate);
    fetchTotal(newSum, historyObj, true);
  };

  const removeSum = async () => {
    if (!validation(false)) return;

    const newSum = total - +sum;
    const historyObj = createNewOperation(`-${sum}`, comment, currentDate);
    fetchTotal(newSum, historyObj, false);
  };

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="operationBlock">
      <Form name="Новая операция">
        <div className={info.status ? "infoOn" : "infoOff"}>
          <h4 style={{ color: isRefill ? "green" : "" }}>{info.text}</h4>
        </div>
        <div className="formItems">
          <div className="inputBlock">
            <label className="inputName">Сумма</label>
            <input
              type="number"
              className="inp"
              value={sum}
              onChange={(e) => setSum(e.target.value)}
            ></input>
          </div>
          <div className="inputBlock">
            <label className="inputName">Комментарий</label>
            <textarea
              className="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button onClick={addSum} className="btn">
            Внести
          </button>
          <button onClick={removeSum} className="btn">
            Снять
          </button>
        </div>
      </Form>
    </div>
  );
}

export default NewOperation;
