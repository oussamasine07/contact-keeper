import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_FAIL, 
    LOGIN_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
                error: null
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                error: null,
                user: action.payload
            }
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: null,
                user: null,
                error: action.payload
            }
        default:
            return state
    }
}