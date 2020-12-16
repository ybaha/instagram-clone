import React from 'react'

export default function Contact(p) {
  return (
    <div>
      <div className="contact">
        <img src={p.img} width="56px" height="56px" alt="a"></img>
        <div className="text-wr">
          <div className="contact-name">ybahae</div>
          <div className="contact-text">Şu an aktif</div>
        </div>
      </div>
    </div>
  )
}
