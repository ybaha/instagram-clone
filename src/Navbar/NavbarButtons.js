import React from 'react'
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
import { Link } from 'react-router-dom'

export default function NavbarButtons(e) {
  const Button = e.button
  return (
    <>
      {Button ?
        <div className="navbar-btns">
          <Button></Button>
        </div>
        :
        ""}
      <div className="navbar-btns">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <HomeFill />
        </Link>
      </div>
      <div className="navbar-btns">
        <Link to="/direct/inbox" style={{ textDecoration: "none", color: "black" }}>
          <Direct />
        </Link>
      </div>
      <div className="navbar-btns"><Explore /></div>
      <div className="navbar-btns"><Like /></div>
      <div className="navbar-btns"><Profile /></div>
    </>
  )
}
