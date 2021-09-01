import React from "react";
import s from "./Rightbar.module.scss";
import Recommended from "./Recomended/Recommended";
import CreatePost from "./CreatePost/CreatePost";

export default function Rightbar({ setPosts }: { setPosts: Function }) {
  return (
    <div className={s.Rightbar} style={{ position: "sticky" }}>
      <p
        style={{ fontSize: "14px", fontWeight: 500, color: "#808080" }}
        className={s.recommendedText}
      >
        Senin İçin Öneriler
      </p>
      <Recommended />
      <Recommended />
      <Recommended />
      <Recommended />

      <CreatePost setPosts={setPosts} />
    </div>
  );
}