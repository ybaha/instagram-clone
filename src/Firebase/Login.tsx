import React, { useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      if (emailRef.current && passwordRef.current) {
        //@ts-ignore
        await login(emailRef.current.value, passwordRef.current.value);
        //@ts-ignore
        await login(emailRef.current.value, passwordRef.current.value);
      }
      history.push("/istekram");
    } catch (e) {
      console.log(e);
      setError(e.message);
      setLoading(false);
    }
  }

  return (
    <div className="login-wrapper">
      <div className="left-sec">
        <img src={"./phone.png"} alt="phones"></img>
      </div>
      <div className="right-sec">
        <div className="login-top">
          <img
            src={"../components/Navbar/istekram.png"}
            height="51px"
            alt="logo"
          ></img>
          <form onSubmit={handleSubmit}>
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
            <button disabled={loading} type="submit" className="login-button">
              Log In
            </button>
            <div className="hr"></div>
            <div className="fb">
              <div>Log in with Facebook</div>
            </div>
            <div className="forgot-password">
              <Link
                to="/istekram/forgot-password"
                style={{ textDecoration: "none", color: "black" }}
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
        <div className="login-bot">
          Don't have an accout?
          <Link
            to="/istekram/signup"
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
        <div className="app-sec" style={{ height: "120px" }}>
          <p>Get the app.</p>
          <div className="app-img">
            <img
              src={"./ios.png"}
              width="136px"
              style={{ marginRight: "8px" }}
            ></img>
            <img src={"./android.png"} width="136px"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
