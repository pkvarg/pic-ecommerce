import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { socket } from './../../socket'
import ScrollToBottom from 'react-scroll-to-bottom'

const UserChatComponent = () => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])

  //const [socket, setSocket] = useState(false)
  // useEffect(() => {
  //   const socket = socketIOClient()
  //   setSocket(socket)
  //   return () => socket.disconnect()
  // }, [])

  const clientSubmitChatMsg = (e) => {
    if (e.keyCode && e.keyCode !== 13) {
      return
    } else {
      // socket.emit('message', 'message from client')
      if (currentMessage !== '') {
        const messageData = {
          author: 'PV',
          receiver: 'receiver',
          message: currentMessage,
          time:
            new Date(Date.now()).getHours() +
            ':' +
            new Date(Date.now()).getMinutes(),
        }

        socket.emit('sendMessage', messageData)
        setMessageList((list) => [...list, messageData])
        setCurrentMessage('')
      }
    }
  }

  return (
    <>
      <input type='checkbox' id='check' />
      <label className='chat-btn' htmlFor='check'>
        <FontAwesomeIcon icon={faCommentDots} className='text-[30px] comment' />
        <span className='absolute top-0 right-[50%] -translate-y-[50%] p-2 bg-[#CD3049] border border-light rounded-full'></span>

        <FontAwesomeIcon icon={faCircleXmark} className='text-[30px] close' />
      </label>

      <div className='chat-wrapper'>
        <div className='chat-header'>
          <h6>Let's Chat - Online</h6>
        </div>
        <div className='chat-form'>
          <div className='chat-msg'>
            {/* {Array.from({ length: 20 }).map((_, id) => (
              <div key={id}>
                <p>
                  <b>You wrote:</b>Hello world! This is a toast message.
                </p>
                <p className='bg-[#046FF6] rounded'>
                  <b>Support wrote:</b>Hello world! This is a toast message.
                </p>
              </div>
            ))} */}
            <ScrollToBottom>
              {messageList.map((messageContent, i) => (
                <div
                  key={i}
                  className='message'
                  //id={username === messageContent.author ? 'you' : 'other'}
                >
                  <div>
                    <div className='message-content'>
                      <p>{messageContent.message}</p>
                    </div>
                    <div className='message-meta'>
                      <p id='time'>{messageContent.time}</p>
                      <p id='author'>{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollToBottom>
          </div>
          <div className='flex flex-col mt-3'>
            {/* <textarea
              onKeyUp={(e) => clientSubmitChatMsg(e)}
              id='clientChatMsg'
              className='form-control'
              placeholder='Your Text Message'
            ></textarea>

            <button
              onClick={(e) => clientSubmitChatMsg(e)}
              className='btn bg-[#16a34a] p-[10px] rounded-xl'
            >
              Submit
            </button> */}
            <input
              type='text'
              value={currentMessage}
              placeholder='Ahoj...'
              onChange={(event) => {
                setCurrentMessage(event.target.value)
              }}
              onKeyDown={(event) => {
                event.key === 'Enter' && clientSubmitChatMsg()
              }}
            />
            <button
              onClick={(e) => clientSubmitChatMsg(e)}
              className='btn bg-[#16a34a] p-[10px] rounded-xl'
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserChatComponent
