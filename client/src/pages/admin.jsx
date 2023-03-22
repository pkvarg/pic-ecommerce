import React, { useEffect } from 'react'
import { socket } from './../../socket'

import AdminChatRoomComponent from '../components/AdminChatRoomComponent'

import { setChatRooms } from '../actions/chatActions'
import { useDispatch, useSelector } from 'react-redux'

const Admin = () => {
  const dispatch = useDispatch()

  const { chatRooms } = useSelector((state) => state.adminChat)
  // console.log('s:', socket)

  // from Header - not use Header
  useEffect(() => {
    //if (userInfo.isAdmin) {
    //const sckt = socket
    socket.on('server sends message from client to admin', ({ message }) => {
      //dispatch(setSocket(socket))

      //   let chatRooms = {
      //     fddf54gfgfSocketID: [{ "client": "dsfdf" }, { "client": "dsfdf" }, { "admin": "dsfdf" }],
      //   };
      dispatch(setChatRooms('exampleUser', message))
    })
    //}
  }, [])

  return (
    <div>
      {/* <h1 className='text-left'>Admin</h1> */}
      {Object.entries(chatRooms).map((chatRoom, index) => (
        <AdminChatRoomComponent
          key={index}
          chatRoom={chatRoom}
          roomIndex={index + 1}
          socket={socket}
          socketUser={chatRoom[0]}
        />
      ))}
    </div>
  )
}

export default Admin
