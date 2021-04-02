import React, { useRef, useState } from "react"
import { useAuth } from "../../Firebase/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/istekram")
    } catch(e) {
      setError(e)
      console.log(e)
      setLoading(false)
    }
  }

  return (
    <div className="wrapper">
      <div className="main-container">
        <img src={logo} alt="logo"></img>
        <form onSubmit={handleSubmit}>
          <div id="email">
            <input type="email" ref={emailRef} required />
          </div>
          <div id="password">
            <input type="password" ref={passwordRef} required />
          </div>
          <div>
            <Link to="/istekram/forgot-password">Forgot Password?</Link>
          </div>
          <button disabled={loading} type="submit" className="login-button">
            Log In
          </button>
        </form>
      </div>
      <div className="sub-container"></div>
    </div>
  )
}
