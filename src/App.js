import React from "react";
import { useSelector, useDispatch } from "react-redux";
import StartScreen from "./components/pages/StartScreen";
import Home from "./components/pages/Home";
// import { fetchAuthApp } from "./redux/actions/app";
import { fetchAuthApp } from './features/app/appSlice';

function App() {
  const isAuth = useSelector(({ app }) => app.isAuth);
  const dispatch = useDispatch();

  console.log(isAuth);

  React.useEffect(() => {
    if (sessionStorage.getItem('isAuth')) {
      const { name, password } = JSON.parse(sessionStorage.getItem('isAuth'));
      dispatch(fetchAuthApp(name, password));
    };
  }, []);

  return (
    <div>{!isAuth ? <StartScreen /> : <Home />}</div>
  );
};

export default App;
