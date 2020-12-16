import React from 'react'
import NavbarButtons from "./NavbarButtons.js"
import './Navbar.css'
import logo from './istekram.png'


export default function NavbarTop() {
  return (
    <div className="navbar">
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
