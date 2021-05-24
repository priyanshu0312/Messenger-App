import React from 'react'
import './ChatBar.css'
import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'

export const ChatBar = ({ room }) => {
  return (
    <div>
      <div className="infoBar">
        <div className="leftInnerContainer">
          <img className="onlineIcon" src={onlineIcon} alt="online icon" />
          <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
          <a href="/">
            <img src={closeIcon} alt="close icon" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ChatBar
