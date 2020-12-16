import React, { useState } from 'react'
import './Direct.css'
import DirectFooter from './DirectFooter'
import Leftbar from './Leftbar'
import Rightbar from './Rightbar'
import { Switch, Route } from 'react-router-dom'
import { useWindowSize } from '../Home/Stories/Resize'
import { Direct } from '../icons'

export default function DirectD() {
  const [contactClicked, setContactClicked] = useState(false)
  const [windowWidth] = useWindowSize()

  const changeButton = () => {
    return (
      <button style={{ width: "24px", height: "24px" }} onClick={() => { setContactClicked(!contactClicked) }} />
    )
  }

  const messageInput = () => {
    return (
      <input className="message-input" style={{ margin: "16px auto", display: "block" }}></input>
    )
  }

  const handleUI = () => {
    return(
    windowWidth < 934 ?
      <Route component={contactClicked ? Leftbar : Rightbar} />
    :
      <><Leftbar></Leftbar><Rightbar></Rightbar></>
    )
  }

  return (
    <div className="main-wrapper">
      <div className="main-container" >
        {handleUI()}
        <div className="direct-footer-wrap">
          <DirectFooter button={changeButton} />
        </div>
      </div>
    </div>
  )
}
