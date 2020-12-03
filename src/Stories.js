import React, { useEffect, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import './Slider.css'
import { useWindowSize } from './Resize'

export default function Stories() {

  const cardContainerRef = React.createRef()
  const [displayStory, setDisplayStory] = useState(false)
  const [width, height] = useWindowSize()

  const getCardCount = () => {
    const cardCount = cardContainerRef.current.childNodes.length
    cardContainerRef.current.style.width = `${cardCount * 78}px`
  }

  const handleClick = () => {
    setDisplayStory(true)
  }

  const closeStoryDisplay = () => {
    setDisplayStory(false)
  }

  useEffect(() => {
    getCardCount()
  })


  function Story() {
    return (
      <div className="story-box">
        <div className="story" onClick={handleClick}> </div>
        <div className="story-username">ybahae</div>
      </div>
    )
  }

  function StoryDisplay() {
    return (
      <div className="storyDisplay" style={displayStory ? { width: width, height: height } : {}}>
        <div className="story-close-btn" onClick={closeStoryDisplay} style={displayStory ? { display: "block" } : { display: "none" }}>
          X
        </div>
        <div style={displayStory ? { display: "block" } : { display: "none" }}>
          SELAM
        </div>

      </div>
    )
  }



  return (
    <div>
      <StoryDisplay />
      <div>
      </div>
      <div className="story-container">
        <ScrollContainer vertical={true} className="scroll-container">
          <div className="card-container" ref={cardContainerRef}>
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
            <Story />
          </div>
        </ScrollContainer>
      </div>
    </div>
  )
}
