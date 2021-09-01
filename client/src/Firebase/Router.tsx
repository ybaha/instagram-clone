import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import App from "../components/App";
import ForgotPassword from "./ForgotPassword";
import Signup from "./Signup";

import { useAuth } from "./AuthContext";

const Router: React.FC = () => {
  const { currentUser } = useAuth();

  const NoMatch: React.FC<{ text: string }> = (text) => {
    return <h1>No Match {text}</h1>;
  };

  const PrivateRoutes = () => {
    return (
      <Switch>
        <PrivateRoute path="/" component={App} />
        {/* <Route render={() => <NoMatch text={"PrivateRoutes"} />} /> */}
      </Switch>
    );
  };

  const AuthRoutes = () => {
    return (
      <Switch>
        <Route exact path="/istekram" component={Login} />
        <Route path="/istekram/login" component={Login} />
        <Route path="/istekram/signup" component={Signup} />
        <Route path="/istekram/forgot-password" component={ForgotPassword} />
        <Route render={() => <NoMatch text={"Auth Routes"} />} />
      </Switch>
    );
  };

  return (
    <BrowserRouter>
      {currentUser ? <PrivateRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
};

export default Router;
