import React from 'react'
import Rightbar from './Rightbar/Rightbar'
import Post from './Post/Post'
import './Home.css'
import Stories from './Stories/Stories'
import NavbarTop from '../Navbar/Navbar'

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
