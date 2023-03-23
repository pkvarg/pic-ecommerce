import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { socket } from './../../socket'

const UserChatComponent = () => {
  const [chat, setChat] = useState([])
  const [messageReceived, setMessageReceived] = useState(false)
  useEffect(() => {
    // if (!userInfo.isAdmin) {
    var audio = new Audio('/audio/chat-msg.mp3')
    socket.on('no admin', (msg) => {
      setChat((chat) => {
        return [...chat, { admin: 'No admin available at the moment.' }]
      })
    })
    socket.on('server sends message from admin to client', (msg) => {
      setChat((chat) => {
        return [...chat, { admin: msg }]
      })
      setMessageReceived(true)
      audio.play()
      const chatMessages = document.querySelector('.cht-msg')
      chatMessages.scrollTop = chatMessages.scrollHeight
    })
    return () => socket.disconnect()
    //}
  }, [])

  const clientSubmitChatMsg = (e) => {
    if (e.keyCode && e.keyCode !== 13) {
      return
    }
    setMessageReceived(false)
    const msg = document.getElementById('clientChatMsg')
    let v = msg.value.trim()
    if (v === '' || v === null || v === false || !v) {
      return
    }
    socket.emit('client sends message', v)
    setChat((chat) => {
      return [...chat, { client: v }]
    })
    msg.focus()
    setTimeout(() => {
      msg.value = ''
      const chatMessages = document.querySelector('.cht-msg')
      chatMessages.scrollTop = chatMessages.scrollHeight
    }, 200)
  }

  return (
    <>
      <input type='checkbox' id='check' />
      <label className='chat-btn' htmlFor='check'>
        <FontAwesomeIcon icon={faCommentDots} className='text-[30px] comment' />

        {messageReceived && (
          <span className='absolute top-0 right-[50%] -translate-y-[50%] p-2 bg-[#CD3049] border border-light rounded-full'></span>
        )}

        <FontAwesomeIcon icon={faCircleXmark} className='text-[30px] close' />
      </label>

      <div className='chat-wrapper'>
        <div className='chat-header'>
          <h6>Let's Chat - Online</h6>
        </div>
        <div className='chat-form'>
          <div className='cht-msg'>
            {chat.map((item, id) => (
              <div key={id}>
                {item.client && (
                  <p>
                    <b>You wrote:</b> {item.client}
                  </p>
                )}
                {item.admin && (
                  <p className='bg-primary p-3 ms-4 text-light rounded-pill'>
                    <b>Support wrote:</b> {item.admin}
                  </p>
                )}
              </div>
            ))}
          </div>
          <textarea
            onKeyUp={(e) => clientSubmitChatMsg(e)}
            id='clientChatMsg'
            className='form-control'
            placeholder='Your Text Message'
          ></textarea>

          <button
            onClick={(e) => clientSubmitChatMsg(e)}
            className='btn btn-success btn-block'
          >
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

export default UserChatComponent
