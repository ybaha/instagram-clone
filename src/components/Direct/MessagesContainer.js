import React from 'react'
import img from '../Home/Post/post.jpg'
import Message from './Message'

export default function MessagesContainer() {
  return (
    <div className="messages-container" ref={messageContainer}>
      <div className="messages-header">
        <button onClick={handleContactsClick} ref={messagesButton} style={{ width: "10px", height: "10px" }}></button>
      </div>
      <div style={{ overflow: "auto", height: "calc(100% - 60px)" }}>
        <Message sender={true} message={"SelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelam"} />
        <Message senderImg={img} sender={false} message={"Merhaba"} />
        <Message senderImg={img} sender={false} message={"Merhaba"} />
        <Message senderImg={img} sender={false} message={"Merhaba"} />
        <Message senderImg={img} sender={false} message={"Merhaba"} />
        <Message sender={true} message={"Selam"} />

        <Message senderImg={img} sender={false} message={"MerhabaMerhabaMerhabaMerhabaMerhabaMerhabaMerhabaMerhabaMerhabaMerhabaMerhaba"} />
        <Message sender="true" message={"QWEQWEQWEQWE"} />
        <Message senderImg={img} sender={false} message={"Merhaba"} />
        <Message sender={true} message={"A"} />
      </div>


      <div className="direct-footer-wrap">
        <DirectFooter />
      </div>
    </div>
  )
}
