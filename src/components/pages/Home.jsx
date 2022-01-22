import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Header from "../Header";
import NewOperation from "./NewOperation";
import History from "./History";

function Home() {
  const [greeting, setGreeting] = useState(true);
  const [timesOfDay, setTimesOfDay] = useState(null);

  const { userName, total, history } = useSelector(({ user }) => user.userData);

  const getTimesOfDay = () => {
    const hour = new Date().getHours();
    const nigth = [0, 1, 2, 3, 4];
    const morning = [5, 6, 7, 8, 9, 10, 11];
    const day = [12, 13, 14, 15, 16];

    if (nigth.includes(hour)) {
      setTimesOfDay("Доброй ночи");
    } else if (morning.includes(hour)) {
      setTimesOfDay("Доброе утро");
    } else if (day.includes(hour)) {
      setTimesOfDay("Добрый день");
    } else {
      setTimesOfDay("Добрый вечер");
    }
  };

  useEffect(() => {
    getTimesOfDay();
    setTimeout(() => setGreeting(!greeting), 2000);
  }, []);

  return (
    <>
      <div className={greeting ? "helloScreenOn" : "helloScreenOff"}>
        <h1>{`${timesOfDay}, ${userName}!`}</h1>
      </div>
      <div>
        <Header total={total} history={history} />
        <Route path="/" component={NewOperation} exact />
        <Route path="/history" component={History} exact />
      </div>
    </>
  );
}

export default Home;
