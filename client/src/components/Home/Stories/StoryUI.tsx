import React, { useState, useEffect } from "react";
import { useWindowSize } from "./Resize";

export default function StoryUI() {
  const [width, height] = useWindowSize();
  const [displayStory, setDisplayStory] = useState(false);
  return (
    <div
      className="storyDisplay"
      style={
        displayStory
          ? { width: width, height: height }
          : { width: "0px", height: "0px" }
      }
    ></div>
  );
}
