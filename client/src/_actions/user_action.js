// 여러 action들을 한 파일에서 관리.

import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

// => 타입에 맞게 request를 보냄. (이하 동일)
export function loginUser(dataTosubmit) {
    const request = axios.post("/api/users/login", dataTosubmit).then((response) => response.data);

    // axios로 비동기로 응답을 받아서, 그 응답을 payload에 담아서 type과 함께 리턴.
    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export function registerUser(dataTosubmit) {
    const request = axios.post("/api/users/register", dataTosubmit).then((response) => response.data);

    return {
        type: REGISTER_USER,
        payload: request,
    };
}

export function auth() {
    const request = axios.get("/api/users/auth").then((response) => response.data);

    return {
        type: AUTH_USER,
        payload: request,
    };
}
