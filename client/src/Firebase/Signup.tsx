import React, { useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import s from "./Signup.module.scss";
import axios from "axios";

export default function Signup() {
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const usernameRef = useRef<any>();
  const fullNameRef = useRef<any>();
  const passwordConfirmRef = useRef<any>();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if (
        !emailRef.current.value.length ||
        !passwordRef.current.value.length ||
        !usernameRef.current.value.length ||
        !fullNameRef.current.value.length
      )
        return;
      let obj = await signup(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value,
        fullNameRef.current.value
      );
      axios.post(process.env.REACT_APP_SERVER!, {
        uid: currentUser?.uid,
        email: emailRef.current.value,
        username: usernameRef.current.value,
      });
      if (obj.message) {
        setError(obj.message);
        setLoading(false);
      } else {
        navigate("/");
        window.location.reload(); //fix this later
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className={s.signupWrapper}>
      <div className={s.signup}>
        <img
          src={process.env.PUBLIC_URL + "/.png"}
          className={s.logo}
          alt="logo"
        ></img>
        <div className={s.signupText}>
          Sign up to see photos and videos from your friends.
        </div>
        <button>Log in with Facebook</button>
        <div className={s.hr}></div>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div id="email">
            <input type="email" ref={emailRef} placeholder="Email" required />
          </div>
          <div id="full-name">
            <input
              type="text"
              ref={fullNameRef}
              placeholder="Full name"
              required
            />
          </div>
          <div id="username">
            <input
              type="text"
              ref={usernameRef}
              placeholder="Username"
              required
            />
          </div>
          <div id="password">
            <input
              type="password"
              ref={passwordRef}
              placeholder="Password"
              required
            />
          </div>
          <button disabled={loading} type="submit">
            Sign Up
          </button>
          <div className={s.policies}>
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy .
          </div>
        </form>
      </div>
      <div className={s.signupBot}>
        Have an account?{" "}
        <Link to="/login" className={s.lgnBtn}>
          Log In
        </Link>
      </div>
      <div className={s.appSec} style={{ height: "120px", marginTop: "12px" }}>
        <p>Get the app.</p>
        <div className={s.appImg}>
          <img
            src={process.env.PUBLIC_URL + "/ios.png"}
            width="136px"
            style={{ marginRight: "8px" }}
          ></img>
          <img
            src={process.env.PUBLIC_URL + "/android.png"}
            width="136px"
          ></img>
        </div>
      </div>
    </div>
  );
}
