import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthHeaders from "../../utils/setAuthHeaders";

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT
} from "../types";


const AuthState = props => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Register a User
    const register = async newUser => {
        
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }

        try {
            const res = await axios.post("/api/users", newUser, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            loadUser(); 
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        }
    }

    // login user
    const login = async (user) => {
        const config = {
            header: {
                "Content-Type" : "application/json"
            }
        }

        try {
            const res = await axios.post("/api/auth", user, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            });
        }
    }

    // load logout
    const logout = () => {
        dispatch({ type: LOGOUT });
    }

    // load user
    const loadUser = async () => {
        // todo set the toekn headers
        if (localStorage.getItem("token")) {
            setAuthHeaders(localStorage.getItem("token"));
        }

        try {
            const res = await axios.get("/api/auth");

            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (error) {
            dispatch({ type: AUTH_ERROR });
        }
    }

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login,
            logout
        }} >
            {props.children}
        </AuthContext.Provider>
    );

}


export default AuthState;