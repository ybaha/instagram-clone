import React, { useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef<any>();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
      setLoading(false);
    } catch {
      setError("Failed to reset password");
    }
  }

  return (
    <div className="card">
      <div className="card-wrapper">
        <h2>Password Reset</h2>
        {error && <div>{error}</div>}
        {message && <div>{message}</div>}
        <form onSubmit={handleSubmit}>
          <div id="email">
            <div>Email</div>
            <input type="email" ref={emailRef} required />
          </div>
          <button disabled={loading} type="submit">
            Reset Password
          </button>
        </form>
        <div>
          <Link to="/login">Login</Link>
        </div>

        <div>
          Need an account? <Link to="/istekram/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
