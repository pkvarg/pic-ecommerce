import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Form,
  DropdownButton,
  Dropdown,
  Button,
  InputGroup,
} from 'react-bootstrap'

import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { socket } from './../../socket'
import {
  setChatRooms,
  setSocket,
  setMessageReceived,
  removeChatRoom,
} from './../actions/chatActions'

const HeaderComponent = () => {
  const dispatch = useDispatch()
  const { messageReceived } = useSelector((state) => state.adminChat)

  useEffect(() => {
    // if userInfo.isAdmin
    var audio = new Audio('/audio/chat-msg.mp3')

    // !!! stop multiple admins SOLVE WHEN REDUX IF ADMIN IS DONE
    socket.emit(
      'admin connected with server'
      //'Admin' + Math.floor(Math.random() * 1000000000000)
    )
    socket.on(
      'server sends message from client to admin',
      ({ user, message }) => {
        //dispatch(setSocket(socket))
        console.log('hc:', user, message)
        //   let chatRooms = {
        //     fddf54gfgfSocketID: [{ "client": "dsfdf" }, { "client": "dsfdf" }, { "admin": "dsfdf" }],
        //   };
        dispatch(setChatRooms(user, message))
        dispatch(setMessageReceived(true))

        audio.play()
      }
    )
    socket.on('disconnected', ({ reason, socketId }) => {
      //console.log(socketId, reason)
      dispatch(removeChatRoom(socketId))
    })
    return () => socket.disconnect()
  }, [])

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav>
            <LinkContainer to='/admin'>
              <Nav.Link className='absolute right-8 top-2.5'>
                Admin
                {messageReceived && (
                  <span className='absolute -translate-y-[50%] p-2 bg-[#cd3049] border border-light rounded-full'></span>
                )}
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default HeaderComponent
