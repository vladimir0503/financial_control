import React from "react";
import { Link } from "react-router-dom";
import Form from "../Form";
import { fetchAuthApp } from '../../redux/actions/app'
import useAuthForm from "../../hooks/useAuthForm";
import FetchButton from "../common/FetchButton";

function Autorization() {
  const { name, password, isLoading, info, setName, setPassword, formSubmit } = useAuthForm(fetchAuthApp);

  return (
    <Form name="Авторизация">
      <div className={info.status ? "infoOn" : "infoOff"}>
        <h4>{info.text}</h4>
      </div>
      <div className="formItems">
        <div className="inputBlock">
          <label className="inputName">Имя</label>
          <input
            type="text"
            className="inp"
            value={name}
            onChange={e => setName(e.target.value)}
          ></input>
        </div>
        <div className="inputBlock">
          <label className="inputName">Пароль</label>
          <input
            type="password"
            className="inp"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></input>
        </div>
        <FetchButton isLoading={isLoading} handleSubmit={formSubmit} text='Войти' />
        <Link to="/registration">
          <button className="btn">Регистрация</button>
        </Link>
      </div>
    </Form>
  );
}

export default Autorization;
