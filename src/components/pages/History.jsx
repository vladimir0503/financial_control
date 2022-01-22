import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchClearHistory } from "../../features/user/userSlice";
import Form from "../Form";

function History() {
  const historyArr = useSelector(({ user }) => user.userData.history);

  const dispatch = useDispatch();

  const handleClearHistory = () => {
    if (window.confirm("Вы уверенны?")) {
      dispatch(fetchClearHistory());
      window.history.back();
    };
  };

  return (
    <div className="operationBlock">
      <Form name="История операций">
        <div className="formItems">
          <div className={historyArr ? "historyFull" : "historyEmpty"}>
            {historyArr.map((opr, index) => (
              <li key={`${index}_${opr.date}`} className="historyItem">
                <p>
                  Дата операции: <strong>{opr.date}</strong>
                </p>
                <p>
                  Сумма операции: <strong>{opr.sum}</strong>
                </p>
                <p>
                  Комментарий: <strong>{opr.comment}</strong>
                </p>
              </li>
            ))}
          </div>
          <button onClick={handleClearHistory} className="btn">
            Отчистить историю
          </button>
          <Link to="/">
            <button className="btn">Вернутся на главную</button>
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default History;
