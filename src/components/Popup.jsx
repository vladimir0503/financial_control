import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Popup({ popupLogOff }) {
    const [initPopup, setInitPopup] = useState(false);
    const popupRef = useRef();

    const history = useSelector(({ user }) => user.history);

    const handleLogOff = () => {
        setInitPopup(false);
        popupLogOff();
    };

    const handlePopup = () => {
        setInitPopup(!initPopup);
    };

    const handeOutsideClick = (event) => {
        const path = event.path || (event.composedPath && event.composedPath());
        if (!path.includes(popupRef.current)) {
            setInitPopup(false);
        };
    };

    useEffect(() => {
        document.body.addEventListener('click', handeOutsideClick);
    }, []);

    return (
        <div ref={popupRef} className="popupWrapper">
            <button className={initPopup ? 'headerBtn popupBtn up' : 'headerBtn popupBtn down'} onClick={handlePopup}>
                <div className='swgWrapper'>
                    <svg
                        width="20"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                            fill="black"
                        />
                    </svg>
                </div>
            </button>
            <div className={initPopup ? "popupBlock show" : "popupBlock hide"}>
                {!!history.length
                    && <Link to="/history">
                        <button onClick={() => setInitPopup(false)} className="headerBtn popupItemBtn">История операций</button>
                    </Link>}
                <Link to="/">
                    <button className="headerBtn popupItemBtn" onClick={handleLogOff}>
                        Выйти
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Popup;
