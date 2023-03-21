import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const UserChatComponent = () => {
  return (
    <>
      <input type='checkbox' id='check' />
      <label className='chat-btn' htmlFor='check'>
        <FontAwesomeIcon icon={faCommentDots} className='text-[30px] comment' />
        <FontAwesomeIcon icon={faCircleXmark} className='text-[30px] close' />
      </label>

      <div className='chat-wrapper'>
        <div className='chat-header'>
          <h6>Let's Chat - Online</h6>
        </div>
        <div className='chat-form'>
          <div className='cht-msg'>
            <p>Chat history</p>
          </div>
          <div className='flex flex-col mt-3'>
            <textarea
              id='clientChatMsg'
              className='form-control'
              placeholder='Your Text Message'
            ></textarea>

            <button className='btn bg-[#16a34a] p-[10px] rounded-xl'>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserChatComponent
