import React, { useEffect } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Card, Button } from 'react-bootstrap'
import sinan from './sinanSon.jpeg'
import './Slider.css'

const BCard = () => {
  return (
    <Card style={{ width: "302px", height: "400px", textAlign: "left" }} >
      <Card.Img variant="top" src={sinan} style={{ width: "300px", height: "120px" }} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text style={{ maxHeight: "150px", height: "150px", overflow: "hidden"}} >
          Some quick example text to build on the card title and make up the bulk of
          the card's content. Some quick example text to build on the card title and make up the bulk of
          the card's content. Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </Card.Text>
        <Button variant="dark">Go somewhere</Button>
      </Card.Body>
    </Card>
  )
}


export default function Slider() {
  const cardContainerRef = React.createRef()

  const getCardCount = () => {
    const { innerWidth } = window

    let cardCount = cardContainerRef.current.childNodes.length
    let c = cardCount * 302 > innerWidth ? (cardCount * 306) : innerWidth

    cardContainerRef.current.style.width = `${c}px`
  }

  useEffect(() => {
    getCardCount()
  }, [])


  return (
    <div>
      <ScrollContainer className="scroll-container" vertical={true}>
        <div className="card-container" ref={cardContainerRef}>
          <BCard />
          <BCard />
          <BCard />
          <BCard />
          <BCard />
          <BCard />
          <BCard />
          <BCard />
          <BCard />
          <BCard />
        </div>
      </ScrollContainer>
    </div>
  )
}


