import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import App from "../components/App";
import ForgotPassword from "./ForgotPassword";
import Signup from "./Signup";

import { useAuth } from "./AuthContext";
import { Profile } from "../components/icons";

const Router: React.FC = () => {
  const { currentUser } = useAuth();

  const NoMatch: React.FC<{ text: string }> = ({ text }) => {
    return <h1>No Match {text}</h1>;
  };

  const PrivateRoutes = () => {
    return (
      <Routes>
        <Route
          path="/istekram/*"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        <Route element={<NoMatch text="PrivateRoutes" />} />
      </Routes>
    );
  };

  const AuthRoutes = () => {
    return (
      <Routes>
        <Route
          path="/istekram/*"
          element={
            <PrivateRoute>
              <Login />
            </PrivateRoute>
          }
        />
        <Route path="/istekram/login" element={<Login />} />
        <Route path="/istekram/signup" element={<Signup />} />
        <Route path="/istekram/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/istekram/"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    );
  };

  return (
    <BrowserRouter>
      {currentUser ? <PrivateRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
};

export default Router;
