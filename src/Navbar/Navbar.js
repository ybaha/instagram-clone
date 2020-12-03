import React from 'react'
import './Navbar.css'
import logo from './istekram.png'
import {
  Direct,
  DirectFill,
  Explore,
  ExploreFill,
  Home,
  HomeFill,
  Like,
  LikeFill,
  Profile,
  Ayarlar,
  SaveBorder
} from '../icons'

export default function NavbarTop() {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <img className="istekram-logo" src={logo} alt="Instekram"></img>
        <input placeholder="Ara"></input>
        <div className="navbar-btns-sec">
          <div className="navbar-btns"><HomeFill /></div>
          <div className="navbar-btns"><Direct /></div>
          <div className="navbar-btns"><Explore /></div>
          <div className="navbar-btns"><Like /></div>
          <div className="navbar-btns"><Profile /></div>
        </div>
      </div>
    </div>
  )
}
