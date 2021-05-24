import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'


import './Chat.css'

import ChatBar from '../ChatBar/ChatBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'


// const ENDPOINT = 'https://react-chat-real.herokuapp.com/';


let socket

export const Chat = ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const ENDPOINT = 'http://localhost:5000'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket = io(ENDPOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, () => {})

    return () => {
      socket.emit('disconnect')

      socket.off()
    }
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
    return () => {
      socket.off()
    }
  }, [messages])

  // function for sending messages
  const sendMessage = (event) => {
    event.preventDefault()

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  console.log(message, messages)

  return (
    <div>
      <div className="outerContainer">
        <div className="container">
          <ChatBar room={room} />
          {/* <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) =>
              event.key === 'Enter' ? sendMessage(event) : null
            }
          /> */}
          <Messages messages={messages} name={name} />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
      
    </div>
  )
}

export default Chat
