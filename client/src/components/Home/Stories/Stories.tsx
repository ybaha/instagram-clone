import React, { useEffect, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import "./Stories.css";
import StoryUI from "./StoryUI";

export default function Stories() {
  const cardContainerRef = React.createRef<HTMLDivElement>();

  function Story() {
    return (
      <div className="story-box">
        <div className="story" onClick={StoryUI}>
          {" "}
        </div>
        <div className="story-username">ybahae</div>
      </div>
    );
  }

  const getCardCount = () => {
    if (cardContainerRef.current) {
      const cardCount = cardContainerRef.current.childNodes.length;
      cardContainerRef.current.style.width = `${cardCount * 80}px`;
    }
  };

  useEffect(() => {
    getCardCount();
  });

  return (
    <div className="scroll-container-wrapper">
      <ScrollContainer vertical={true} className="scroll-container">
        <div className="card-container" ref={cardContainerRef}>
          {Array.from(Array(10).keys()).map(() => (
            <Story />
          ))}
        </div>
      </ScrollContainer>
      <div
        style={{
          position: "absolute",
          backgroundColor: "rgba(78, 78, 78, 0.768)",
          width: "100%",
          height: "118px",
          zIndex: 0,
          marginTop: "34px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "40px",
          overflow: "hidden",
        }}
      >
        Under Development
      </div>
    </div>
  );
}
