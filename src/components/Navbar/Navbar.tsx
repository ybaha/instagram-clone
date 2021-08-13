import React, { useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useWindowSize } from "../Home/Stories/Resize";
import NavbarButtons from "./NavbarButtons";
import "./Navbar.css";
import logo from "./istekram.png";

export default function NavbarTop() {
  const navbar = useRef<HTMLDivElement>(null);
  const [width] = useWindowSize();
  const loc = useLocation();

  React.useEffect(() => {
    console.log(loc);
    if (
      loc.pathname === "/istekram/direct/inbox" &&
      width < 935 &&
      navbar.current
    ) {
      navbar.current.style.display = "none";
      console.log("asdasd");
    } else if (navbar.current) {
      navbar.current.style.display = "block";
    }
  }, [loc.pathname, width]);

  return (
    <div className="navbar" ref={navbar}>
      <div className="navbar-container">
        <Link to="/istekram" style={{ height: "30px" }}>
          <img className="istekram-logo" src={logo} alt="Instekram"></img>
        </Link>
        <input placeholder="Ara"></input>
        <div className="navbar-btns-sec">
          <NavbarButtons />
        </div>
      </div>
    </div>
  );
}
