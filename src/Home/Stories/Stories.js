import React, { useEffect, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import './Stories.css'
import StoryUI from './StoryUI'

export default function Stories() {

  const cardContainerRef = React.createRef()



  function Story() {
    return (
      <div className="story-box">
        <div className="story" onClick={StoryUI}> </div>
        <div className="story-username">ybahae</div>
      </div>
    )
  }


  const getCardCount = () => {
    const cardCount = cardContainerRef.current.childNodes.length
    cardContainerRef.current.style.width = `${cardCount * 80}px`
  }

  useEffect(() => {
    getCardCount()
  })


  return (
    <div>
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
  )
}
