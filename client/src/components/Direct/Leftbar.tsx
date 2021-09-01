import React, { useRef } from "react";
import { useWindowSize } from "../Home/Stories/Resize";
import img from "../Home/Post/post.jpg";
import Contact from "./Contact";

export default function Leftbar() {
  const [windowWidth] = useWindowSize();
  const contactsContainer = useRef<any>();
  const contactsButton = useRef();

  return (
    <div className="contacts-container active" ref={contactsContainer}>
      <div className="contacts-header"></div>
      <div
        className="scrollable-view"
        style={{ width: windowWidth > 933 ? "349px" : "100%" }}
      >
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
  );
}
