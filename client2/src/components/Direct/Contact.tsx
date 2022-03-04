import React from "react";

const Contact: React.FC<{ img: any }> = ({ img }) => {
  return (
    <div>
      <div className="contact">
        <img src={img} width="56px" height="56px" alt="a"></img>
        <div className="text-wr">
          <div className="contact-name">ybahae</div>
          <div className="contact-text">Şu an aktif</div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
