import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Firebase/AuthContext";
import { Direct, Explore, HomeFill, Like, Profile } from "../icons";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import axios from "axios";

const NavbarButtons: React.FC<{
  button?: any;
  dropdown?: boolean;
  setDropdown?: Function;
  style?: React.CSSProperties;
}> = ({ button, dropdown, setDropdown, style }) => {
  const Button = button;
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleHistory = (url: string) => {
    navigate(url);
  };

  const handleDropdown = () => {
    if (setDropdown) setDropdown(!dropdown);
    console.log({ dropdown });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "15vw",
        minWidth: "220px",
        height: "40px",
      }}
    >
      {Button && (
        <div>
          <Button></Button>
        </div>
      )}
      <div className="navbar-btns">
        <Link
          onClick={() => {
            handleHistory("/direct/inbox");
          }}
          to="/"
          style={{ textDecoration: "none", color: "black" }}
        >
          <HomeFill />
        </Link>
      </div>
      <div className="navbar-btns">
        <Link
          to="/direct/inbox"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Direct
            onClick={() => {
              handleHistory("/direct/inbox");
            }}
          />
        </Link>
      </div>
      <div className="navbar-btns">
        <Explore />
      </div>
      <div className="navbar-btns">
        <Like
        // onClick={async () => {
        //   let res = await axios.post(
        //     process.env.REACT_APP_SERVER + "api/user/create",
        //     {
        //       uid: "H3ji7gRGlahwM4cvmkcxdpBZkwC2",
        //       username: "emirmmustafa",
        //       profile_picture: "",
        //       real_name: "",
        //       website: "",
        //       bio: "",
        //       email: "hek@hek.co",
        //       following: [],
        //       posts: [],
        //     }
        //   );
        //   console.log(res.data);
        // }}
        />
      </div>
      <div
        className="navbar-btns"
        onClick={handleDropdown}
        style={{ cursor: "pointer" }}
      >
        <Profile />
        {dropdown ? <Dropdown style={style ? style : {}} /> : <div></div>}
      </div>
    </div>
  );
};

export default NavbarButtons;
