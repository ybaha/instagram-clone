import React from "react";
import NavbarButtons from "../Navbar/NavbarButtons";
import "./Footer.css";

export default function Footer() {
  const [dropdown, setDropdown] = React.useState(false);

  return (
    <div className="footer">
      <div className="footer-btns-sec">
        <NavbarButtons
          dropdown={dropdown}
          setDropdown={setDropdown}
          style={{
            top: -200,
            position: "absolute",
            transform: "transform: translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}
