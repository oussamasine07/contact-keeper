import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";


const Login = (props) => {

    const { setAlert } = useContext(AlertContext);
    const { isAuthenticated, login, error } = useContext(AuthContext);

    
    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/");
        }

        if (error !== null) {
            setAlert(error, "danger");    
        } 
        // eslint-disable-next-line
    }, [props.history]);

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name] : e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (user === "" || password === "") {
            setAlert("please fill in the login fields", "danger");
        } else {
            login(user);
            props.history.push("/");
        }
    }


    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Login</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" placeholder="email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} />
                </div>
                <input type="submit" className="btn btn-primary btn-block"/>
            </form>
        </div>
    );

}

export default Login;