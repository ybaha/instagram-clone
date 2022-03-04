import React from "react";

type Props = {
  incoming: boolean;
  senderImg: any; // img
  message: string;
};

const Message: React.FC<Props> = ({ incoming, senderImg, message }) => {
  return (
    <div className={incoming ? "message-container sent" : "message-container"}>
      {incoming ? null : (
        <img src={senderImg} width="24px" height="24px" alt="a"></img>
      )}
      <div className={incoming ? "message-sent" : "message"}>{message}</div>
    </div>
  );
};

export default Message;
