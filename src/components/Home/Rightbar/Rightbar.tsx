import React from "react";
import "./Rightbar.css";
import Recommended from "./Recommended";

export default function Rightbar() {
  return (
    <div className="Rightbar" style={{ position: "sticky" }}>
      <p
        style={{ fontSize: "14px", fontWeight: 500, color: "#808080" }}
        className="rec-text"
      >
        Senin İçin Öneriler
      </p>
      <Recommended />
      <Recommended />
      <Recommended />
      <Recommended />
    </div>
  );
}
