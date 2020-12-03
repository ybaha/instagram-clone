import React from 'react'
import './Navbar.css'
import logo from './istekram.png'

export default function NavbarTop() {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <img className="istekram-logo" src={logo} alt="Instekram"></img>
        <div className="navbar-btns-sec">
          <div className="navbar-btns"></div>
          <div className="navbar-btns"></div>
          <div className="navbar-btns"></div>
        </div>
      </div>
    </div>
  )
}
