import React, { useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import s from "./Login.module.scss";

export default function Login() {
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      if (emailRef.current && passwordRef.current) {
        await login(emailRef.current.value, passwordRef.current.value);
        // await login(emailRef.current.value, passwordRef.current.value);
      }
    } catch (e: any) {
      console.log(e);
      setError(e.message);
      setLoading(false);
    } finally {
      navigate("/");
    }
  }

  return (
    <div className={s.loginWrapper}>
      <div className={s.leftSec}>
        <img src={process.env.PUBLIC_URL + "/phone.png"} alt="phones"></img>
      </div>
      <div className={s.rightSec}>
        <div className={s.loginTop}>
          <img
            src={process.env.PUBLIC_URL + "/.png"}
            height="51px"
            alt="logo"
          ></img>
          <form className={s.form} onSubmit={handleSubmit}>
            <div id="email">
              <input
                type="email"
                ref={emailRef}
                placeholder="Phone number, username, or email"
                style={{ marginTop: "20px" }}
                required
              />
              {error ? (
                <div
                  style={{
                    color: "red",
                    position: "absolute",
                    marginTop: "-84px",
                    fontSize: "14px",
                    width: "300px",
                  }}
                >
                  {error}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div id="password">
              <input
                type="password"
                ref={passwordRef}
                placeholder="Password"
                required
              />
            </div>
            <button disabled={loading} type="submit" className={s.loginButton}>
              Log In
            </button>
            <div className={s.hr}></div>
            <div className="fb">
              <div>Log in with Facebook</div>
            </div>
            <div className={s.forgotPassword}>
              <Link
                to="/forgot-password"
                style={{ textDecoration: "none", color: "black" }}
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
        <div className={s.loginBot}>
          Don't have an accout?
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              fontWeight: 600,
              color: "#0095F6",
              marginLeft: "4px",
            }}
          >
            Sign up
          </Link>
        </div>
        <div className={s.appSec} style={{ height: "120px" }}>
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
    </div>
  );
}
