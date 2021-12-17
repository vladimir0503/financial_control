import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/app";
import { clearUser } from "../redux/actions/loadUser";
import Popup from "./Popup";


function Header({ total }) {
  const dispatch = useDispatch();

  const history = useSelector(({ user }) => user.history);

  const logOff = () => {
    dispatch(logout());
    dispatch(clearUser());
    sessionStorage.clear();
  };

  return (
    <div className="headerWrapper">
      <h2 className="savingInfo">Мои сбережения: {total} руб.</h2>
      <Popup popupLogOff={logOff} />
      <div className="savingBlock">
        <div>
          {!!history.length
            && <Link to="/history">
              <button className="headerBtn">История операций</button>
            </Link>}
          <Link to="/">
            <button className="headerBtn" onClick={logOff}>
              Выйти
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
