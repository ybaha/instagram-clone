import React from 'react'
import img from '../Home/Post/post.jpg'
import Contact from './Contact'
import {messageContainer,contactsContainer,messagesButton,contactsButton} from './handleContainers'

export default function ContactsContainer() {
  return (
    <div className="contacts-container" ref={contactsContainer}>
      <div className="contacts-header">
        <button onClick={handleContactsClick} ref={contactsButton} style={{ width: "10px", height: "10px" }}></button>
      </div>
      <div style={{ overflow: "auto", width: "349px", height: "calc(100% - 60px)" }}>
        <div className="contacts">
          <Contact img={img} />
          <Contact img={img} />
          <Contact img={img} />
          <Contact img={img} />
          <Contact img={img} />
          <Contact img={img} />
          <Contact img={img} />
          <Contact img={img} />
          <Contact img={img} />
          <Contact img={img} />
        </div>
      </div>
    </div>
  )
}
