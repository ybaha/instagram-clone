import React from "react";
import s from "../Rightbar.module.scss";

export default function Recommended() {
  return (
    <div className={s.recommendedUsers}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className={s.photo}></div>
        <div className={s.username}>ybahae</div>
      </div>
      <div className={s.followBtn}>Takip Et</div>
    </div>
  );
}
