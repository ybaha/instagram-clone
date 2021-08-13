import React from "react";
import img from "../Home/Post/post.jpg";
import DirectFooter from "./DirectFooter";
import Message from "./Message";

export default function MessagesContainer() {
  const messageContainer = React.useRef<any>();
  const messagesButton = React.useRef<any>();

  const handleContactsClick = () => {};

  return (
    <div className="messages-container" ref={messageContainer}>
      <div className="messages-header">
        <button
          onClick={handleContactsClick}
          ref={messagesButton}
          style={{ width: "10px", height: "10px" }}
        ></button>
      </div>
      <div style={{ overflow: "auto", height: "calc(100% - 60px)" }}>
        <Message
          senderImg={img}
          incoming={true}
          message={
            "SelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelamSelam"
          }
        />
        <Message senderImg={img} incoming={false} message={"Merhaba"} />
        <Message senderImg={img} incoming={false} message={"Merhaba"} />
        <Message senderImg={img} incoming={false} message={"Merhaba"} />
        <Message senderImg={img} incoming={false} message={"Merhaba"} />
        <Message senderImg={img} incoming={true} message={"Selam"} />

        <Message
          senderImg={img}
          incoming={false}
          message={
            "MerhabaMerhabaMerhabaMerhabaMerhabaMerhabaMerhabaMerhabaMerhabaMerhabaMerhaba"
          }
        />
        <Message senderImg={img} incoming={true} message={"QWEQWEQWEQWE"} />
        <Message senderImg={img} incoming={false} message={"Merhaba"} />
        <Message senderImg={img} incoming={true} message={"A"} />
      </div>

      <div className="direct-footer-wrap">
        <DirectFooter />
      </div>
    </div>
  );
}
