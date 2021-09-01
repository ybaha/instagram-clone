import React, { useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const usernameRef = useRef<any>();
  const passwordConfirmRef = useRef<any>();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if (
        !emailRef.current.value.length ||
        !passwordRef.current.value.length ||
        !usernameRef.current.value.length
      )
        return;
      let obj = await signup(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value
      );
      if (obj.message) {
        setError(obj.message);
        setLoading(false);
      } else {
        history.push("/istekram");
        window.location.reload(); //fix this later
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="signup-wrapper">
      <div className="signup">
        <img
          src={process.env.PUBLIC_URL + "/istekram.png"}
          className="logo"
          alt="logo"
        ></img>
        <div className="signup-text">
          Sign up to see photos and videos from your friends.
        </div>
        <button>Log in with Facebook</button>
        <div className="hr"></div>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div id="email">
            <input type="email" ref={emailRef} placeholder="Email" required />
          </div>
          <div id="full-name">
            <input type="text" placeholder="Full name" required />
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
          <div className="policies">
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy .
          </div>
        </form>
      </div>
      <div className="signup-bot">
        Have an account?{" "}
        <Link to="/istekram/login" className="lgn-btn">
          Log In
        </Link>
      </div>
      <div className="app-sec" style={{ height: "120px", marginTop: "12px" }}>
        <p>Get the app.</p>
        <div className="app-img">
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