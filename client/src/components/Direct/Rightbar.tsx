import React, { useRef, useEffect } from "react";
import { useWindowSize } from "../Home/Stories/Resize";
import img from "../Home/Post/post.jpg";
import Message from "./Message";

export default function Rightbar() {
  const [windowWidth] = useWindowSize();
  const messagesButton = useRef<any>();
  const messageContainer = useRef<any>();

  useEffect(() => {
    if (windowWidth < 933) {
      messageContainer.current.className = "messages-container active";
    }
  }, [windowWidth]);

  return (
    <div className="messages-container" ref={messageContainer}>
      <div className="messages-header">
        <div className="message-sender">
          <div>asdasds</div>
          <img
            width="8px"
            height="8px"
            src="https://img.icons8.com/emoji/48/000000/green-circle-emoji.png"
          />
        </div>
      </div>
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "calc(100% - 95px)",
        }}
      >
        <Message
          incoming={true}
          senderImg={img}
          message={
            "Merhaba Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,"
          }
        />
        <Message
          incoming={false}
          senderImg={img}
          message={"Merhaba, sit amet,"}
        />
        <Message
          incoming={true}
          senderImg={img}
          message={
            "Merhaba Neque porro quisquam est qui dolorem ipsum quia dolor sit ametdolor sit amet,"
          }
        />
      </div>
    </div>
  );
}
