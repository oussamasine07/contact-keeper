import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
import Alerts from "../layouts/Alerts";

const Register = (props) => {
    
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, loadUser, isAuthenticated } = authContext;

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    const { name, email, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name] : e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (name === "" || email === "" || password === "") {
            setAlert("Please fill in all the fields", "danger");
        } else if (password !== password2) {
            setAlert("passwords don't match", "danger");
        } else {
            register(user);
            loadUser();
            // clear the inputs
            setUser({
                name: "",
                email: "",
                password: "",
                password2: ""
            })
            
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/");
        }
        if (error !== null) {
            setAlert(error, "danger");
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    return (
        <div className="form-container">
            <Alerts/>
            <h1>Account <span className="text-primary">Register</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" placeholder="email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirme Password: </label>
                    <input type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={onChange} />
                </div>
                <input type="submit" className="btn btn-primary btn-block"/>
            </form>
        </div>
    );

}

export default Register;