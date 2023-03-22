import React, { useState, useEffect } from 'react'
import AdminChatRoomComponent from '../components/AdminChatRoomComponent'
import { socket } from './../../socket'
import { setChatRooms } from '../actions/chatActions'
import { useDispatch, useSelector } from 'react-redux'

const Admin = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    socket.on('server to admin', ({ message }) => {
      console.log(message)
      // let chatRooms = {}
      dispatch(setChatRooms('exampleUser', message))
    })
  }, [])

  const { chatRooms } = useSelector((state) => state.adminChat)
  console.log(chatRooms)

  return (
    <div>
      {/* <h1 className='text-left'>Admin</h1> */}
      {Object.entries(chatRooms).map((chatRoom, index) => (
        <AdminChatRoomComponent
          key={index}
          chatRoom={chatRoom}
          roomIndex={index + 1}
          socketUser={chatRoom[0]}
        />
      ))}
    </div>
  )
}

export default Admin
