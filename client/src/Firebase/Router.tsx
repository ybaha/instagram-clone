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
          path="/*"
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
          path="/*"
          element={
            <PrivateRoute>
              <Login />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/"
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
    <BrowserRouter basename="/instagram-clone">
      {currentUser ? <PrivateRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
};

export default Router;
