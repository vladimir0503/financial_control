import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child, set } from "firebase/database";

const url = 'https://finanse-db-default-rtdb.firebaseio.com/users';

const firebaseConfig = {
    apiKey: "AIzaSyDplm1rPzcpQiNy9yzUS5ZnZvD-hIYrLQU",
    authDomain: "finanse-db.firebaseapp.com",
    projectId: "finanse-db",
    storageBucket: "finanse-db.appspot.com",
    messagingSenderId: "1042497105016",
    appId: "1:1042497105016:web:39e0617d957ae9e21a118d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

export const getUsers = async () => {
    const dbRef = ref(db);
    const snapShot = await get(child(dbRef, 'users/'));
    return snapShot.val();
};

export const changeData = async data => {
    await fetch(`${url}/${data.id}/.json`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
};

export const addNewUser = async (userName, password) => {
    const id = Math.floor(Math.random() * (10000000 - 1)) + 1;
    const newUser = {
        id,
        userName,
        password,
        total: 0,
        history: []
    };

    await set(ref(db, 'users/' + id), newUser);
    return newUser;
};