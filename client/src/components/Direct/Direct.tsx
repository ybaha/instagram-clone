import React, { useState } from "react";
import "./Direct.css";
import DirectFooter from "./DirectFooter";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";
import { useWindowSize } from "../Home/Stories/Resize";
import { Hamburger } from "../icons";
export default function DirectD() {
  const [contactClicked, setContactClicked] = useState(false);
  const [windowWidth] = useWindowSize();

  const changeButton = () => {
    return (
      <div
        style={{
          width: "22px",
          height: "22px",
          position: "absolute",
          left: "10px",
          top: "19px",
        }}
        className="button"
        onClick={() => {
          setContactClicked(!contactClicked);
        }}
      >
        <Hamburger />
      </div>
    );
  };

  const messageInput = () => {
    return (
      <input
        className="message-input"
        style={{ margin: "16px auto", display: "block" }}
      ></input>
    );
  };

  const handleUI = () => {
    return windowWidth < 934 ? (
      contactClicked ? (
        <Leftbar />
      ) : (
        <Rightbar />
      )
    ) : (
      <>
        <Leftbar></Leftbar>
        <Rightbar></Rightbar>
      </>
    );
  };

  return (
    <div className="main-wrapper">
      <div className="main-container">
        {handleUI()}
        <div className="direct-footer-wrap">
          <DirectFooter button={changeButton} />
        </div>
      </div>
    </div>
  );
}
