import {setAuthorization} from "./general";
import axios from "axios";

export function login(credentials) {
    return new Promise((res) => {
        axios.post('/api/auth/login', credentials)
            .then((response) => {
                setAuthorization(response.data.data.token);
                res(response.data);
            })
    })
}

export function refreshToken() {
    return new Promise((res) => {
        axios.post('/api/auth/refresh')
            .then((response) => {
                setAuthorization(response.data.data.token);
                res(response.data);
            })
    })
}

export function getLocalUser() {
    const userStr = localStorage.getItem("user");

    if (!userStr) {
        return null;
    }

    return JSON.parse(userStr);
}
