import React from "react";
import { Link } from 'react-router-dom';
import { fetchAddNewUser } from "../../redux/actions/app";
import useAuthForm from "../../hooks/useAuthForm";
import FetchButton from "../common/FetchButton";

import Form from "../Form";

function Registartion() {
  const {
    name,
    password,
    repeatPassword,
    isLoading,
    info,
    setName,
    setPassword,
    setRepeatPassword,
    formSubmit } = useAuthForm(fetchAddNewUser, true);

  return (
    <Form name="Регистрация">
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
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="inputBlock">
          <label className="inputName">Пароль</label>
          <input
            type="password"
            className="inp"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="inputBlock">
          <label className="inputName">Повторите пароль</label>
          <input
            type="password"
            className="inp"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          ></input>
        </div>
        <FetchButton isLoading={isLoading} handleSubmit={formSubmit} text='Зарегистрироваться' />
        <Link to="/">
          <button className="btn">
            Вернуться
          </button>
        </Link>
      </div>
    </Form>
  );
}

export default Registartion;
