import React, { useRef } from 'react'
import {useLocation} from 'react-router-dom'
import NavbarButtons from "./NavbarButtons.js"
import './Navbar.css'
import logo from './istekram.png'

export default function NavbarTop() {
  const navbar = useRef()
  const loc = useLocation()

  React.useEffect(() => {
    console.log(loc);
    if (loc.pathname === "/istekram/direct/inbox"){
      navbar.current.style.display = "none"
      console.log("asdasd")
    }
    else{
      navbar.current.style.display = "block"
    }

  }, [loc.pathname])

  return (
    <div className="navbar" ref={navbar}>
      <div className="navbar-container">
        <img className="istekram-logo" src={logo} alt="Instekram"></img>
        <input placeholder="Ara"></input>
        <div className="navbar-btns-sec">
          <NavbarButtons />
        </div>
      </div>
    </div>
  )
}
