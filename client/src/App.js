import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// load contact context
import ContactState from "./context/contact/ContactState";
// load auth context
import AuthState from "./context/auth/AuthState";
// laod alert state
import AlertState from "./context/alert/AlertState";
// load the headers
import setAuthHeaders from "./utils/setAuthHeaders"

// load component
import NavBar from "./components/layouts/NavBar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.getItem("token")) {
  setAuthHeaders(localStorage.getItem("token"));
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <Router>
          <Fragment>
            <AlertState>
              <NavBar />
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </AlertState>
          </Fragment>
        </Router>
      </ContactState>
    </AuthState>
  );
};

export default App;
