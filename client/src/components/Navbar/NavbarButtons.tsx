import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../Firebase/AuthContext";
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
  Settings,
  SaveBorder,
} from "../icons";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import axios from "axios";

const NavbarButtons: React.FC<{
  button?: any;
  dropdown?: boolean;
  setDropdown?: Function;
}> = ({ button, dropdown, setDropdown }) => {
  const Button = button;
  const history = useHistory();
  const { logout } = useAuth();

  const handleHistory = (url: string) => {
    history.push(url);
  };

  const handleDropdown = () => {
    if (setDropdown) setDropdown(!dropdown);
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
            handleHistory("/istekram/direct/inbox");
          }}
          to="/istekram"
          style={{ textDecoration: "none", color: "black" }}
        >
          <HomeFill />
        </Link>
      </div>
      <div className="navbar-btns">
        <Link
          to="/istekram/direct/inbox"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Direct
            onClick={() => {
              handleHistory("/istekram/direct/inbox");
            }}
          />
        </Link>
      </div>
      <div className="navbar-btns">
        <Explore />
      </div>
      <div className="navbar-btns">
        <Like
          onClick={async () => {
            let res = await axios.post(
              process.env.REACT_APP_SERVER + "api/user/create",
              {
                uid: "H3ji7gRGlahwM4cvmkcxdpBZkwC2",
                username: "emirmmustafa",
                profile_picture: "",
                real_name: "",
                website: "",
                bio: "",
                email: "hek@hek.co",
                following: [],
                posts: [],
              }
            );
            console.log(res.data);
          }}
        />
      </div>
      <div
        className="navbar-btns"
        onClick={handleDropdown}
        style={{ cursor: "pointer" }}
      >
        <Profile />
        {dropdown ? <Dropdown /> : <div></div>}
      </div>
    </div>
  );
};

export default NavbarButtons;
