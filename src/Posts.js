import React from 'react'
import './Post.css'
import postImage from './post.jpg'

export default function Posts() {
  return (
    <div className="post">
      <div className="post-header"></div>
      <img src={postImage} width="600px" alt="landscape post"></img>
      <div className="post-btns-section">
        <div className="post-btns">XX</div>
        <div className="post-btns">XX</div>
        <div className="post-btns">XX</div>
      </div>
      <div className="post-sub">
        <div className="post-likes">
          <div className="bold-text"> ybahae</div> ve <div className="bold-text">diğer kişiler</div> bunu beğendi
          </div>
      </div>
    </div>
  )
}