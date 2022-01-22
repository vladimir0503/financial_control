import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from '../features/app/appSlice';
import { clearUser } from '../features/user/userSlice'
import Popup from "./Popup";


function Header({ history, total }) {
  const dispatch = useDispatch();

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
          {!!history
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
