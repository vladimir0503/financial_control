import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useAuthForm = (request, registration = false) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [isLoading, setLoading] = useState(false)
    const [info, setInfo] = useState({
        text: "",
        status: false,
    });

    const dispatch = useDispatch();

    let timer;

    const createInfo = (text) => {
        setLoading(false);
        setInfo({ text, status: true });
        timer = setTimeout(() => setInfo({ text, status: false }), 2000);
    };

    const formSubmit = async () => {
        setLoading(true);

        if (name === "" || password === "") {
            createInfo("Не заполненны поля!");
            return;
        };

        if (registration && password !== repeatPassword) {
            createInfo("Пароли не совпадают!");
            return;
        };

        const success = await dispatch(request(name, password));

        if (!success) {
            createInfo(registration ? 'Такой пользователь уже существует' : 'Не верное имя или пароль');
        };
    };

    useEffect(() => {
        return () => clearTimeout(timer);
    }, []);

    return {
        name,
        setName,
        password,
        setPassword,
        repeatPassword,
        setRepeatPassword,
        isLoading,
        setLoading,
        info,
        setInfo,
        formSubmit
    };
};

export default useAuthForm;