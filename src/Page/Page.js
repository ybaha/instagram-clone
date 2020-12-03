import React from 'react'
import Rightbar from './Rightbar/Rightbar'
import Post from './Post/Post'
import './Page.css'
import Stories from './Stories/Stories'

export default function Page() {
  return (
    <div className="Page">
      <div className="Leftbar">
        <Stories />
        <div className="posts-container">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
    
      </div>
      <Rightbar />
    </div>
  )
}
