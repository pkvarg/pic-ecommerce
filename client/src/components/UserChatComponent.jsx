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
        <span className='absolute top-0 right-[50%] -translate-y-[50%] p-2 bg-[#CD3049] border border-light rounded-full'></span>

        <FontAwesomeIcon icon={faCircleXmark} className='text-[30px] close' />
      </label>

      <div className='chat-wrapper'>
        <div className='chat-header'>
          <h6>Let's Chat - Online</h6>
        </div>
        <div className='chat-form'>
          <div className='chat-msg'>
            {Array.from({ length: 20 }).map((_, id) => (
              <div key={id}>
                <p>
                  <b>You wrote:</b>Hello world! This is a toast message.
                </p>
                <p className='bg-[#046FF6] rounded'>
                  <b>Support wrote:</b>Hello world! This is a toast message.
                </p>
              </div>
            ))}
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
