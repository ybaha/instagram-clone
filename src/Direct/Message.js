import React from 'react'

export default function Message(p) {
  return (
    <div incoming={p.incoming} className={p.incoming ? "message-container sent" : "message-container"}>
      {p.incoming ? null : <img src={p.senderImg} width="24px" height="24px" alt="a"></img>}
      <div className={p.incoming ? "message-sent" : "message"}>
        {p.message}
      </div>
    </div>
  )
}
