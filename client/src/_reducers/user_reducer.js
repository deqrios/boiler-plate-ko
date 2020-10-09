import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

// => dispatch로 인해 action함수가 실행되었을 때, action에 타입에 맞게 로직 처리를 하는 부분.
// => parameter로 현재state(없으면 default = empty object)와 액션을 받고, state를 update한다.
export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };
            break;

        case REGISTER_USER:
            return { ...state, register: action.payload };
            break;

        case AUTH_USER:
            return { ...state, userData: action.payload };
            break;

        default:
            return state;
    }
}
