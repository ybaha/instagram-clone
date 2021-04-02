import React, { useRef, useState } from "react"
import { useAuth } from "./AuthContext"
import { Link, useHistory } from "react-router-dom"
import './Signup.css'
import logo from '../components/Navbar/istekram.png'
import android from './android.png'
import ios from './ios.png'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      let obj = await signup(emailRef.current.value, passwordRef.current.value)
      console.log(obj);
      if (obj.message) {
        setError(obj.message)
        setLoading(false)
      }
      else{
        history.push('/istekram')
        window.location.reload() //fix this later
      }
    } catch {
      setLoading(false)
    }
  }


  return (
    <div className="signup-wrapper">
      <div className="signup">
        <img src={logo} className="logo" alt="logo"></img>
        <div className="signup-text">
          Sign up to see photos and videos from your friends.
        </div>
        <button>Log in with Facebook</button>
        <div className="hr"></div>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div id="email">
            <input
              type="email"
              ref={emailRef}
              placeholder="Email"
              required />
          </div>
          <div id="full-name">
            <input
              type="text"
              placeholder="Full name"
              required />
          </div>
          <div id="username">
            <input
              type="text"
              placeholder="Username"
              required />
          </div>
          <div id="password">
            <input
              type="password"
              ref={passwordRef}
              placeholder="Password"
              required />
          </div>
          <button disabled={loading} type="submit">
            Sign Up
          </button>
          <div className="policies">
            By signing up, you agree to our Terms , Data Policy and Cookies Policy .
          </div>
        </form>
      </div>
      <div className="signup-bot">
        Have an account? <Link to="/istekram/login" className="lgn-btn">Log In</Link>
      </div>
      <div className="app-sec" style={{ height: "120px", marginTop: "12px" }}>
        <p>
          Get the app.
        </p>
        <div className="app-img">
          <img src={ios} width="136px" style={{ marginRight: "8px" }}></img>
          <img src={android} width="136px"></img>
        </div>
      </div>
    </div>
  )
}
