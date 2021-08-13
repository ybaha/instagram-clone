import React from "react";
import "./Post.css";
import postImage from "./post.jpg";

export default function Post() {
  return (
    <div className="post">
      <div className="post-header">
        <div className="photo" style={{ marginLeft: "10px" }}></div>
        <div className="username">ybahae</div>
        <div></div>
      </div>
      <img style={{ width: "100%" }} src={postImage} alt="landscape post"></img>
      <div></div>
      <div className="post-btns-section">
        <div className="post-btns">XX</div>
        <div className="post-btns">XX</div>
        <div className="post-btns">XX</div>
      </div>
      <div className="post-sub">
        <div className="post-likes">
          <div className="bold-text"> ybahae</div> ve{" "}
          <div className="bold-text">diğer kişiler</div> bunu beğendi
        </div>
      </div>
    </div>
  );
}
