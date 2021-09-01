import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute: React.FC<{ [x: string]: any }> = ({
  Component,
  ...rest
}) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/istekram/login" />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
