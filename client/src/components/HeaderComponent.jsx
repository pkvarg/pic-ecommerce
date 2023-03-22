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
import { setChatRooms, setSocket } from './../actions/chatActions'

const HeaderComponent = () => {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   //if (userInfo.isAdmin) {
  //   //const sckt = socket
  //   socket.on('server sends message from client to admin', ({ message }) => {
  //     dispatch(setSocket(socket))
  //     console.log('hc')
  //     //   let chatRooms = {
  //     //     fddf54gfgfSocketID: [{ "client": "dsfdf" }, { "client": "dsfdf" }, { "admin": "dsfdf" }],
  //     //   };
  //     dispatch(setChatRooms('exampleUser', message))
  //   })
  //   //}
  // }, [])

  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav>
            <LinkContainer to='/admin'>
              <Nav.Link className='absolute right-8 top-2.5'>
                Admin
                <span className='absolute -translate-y-[50%] p-2 bg-[#cd3049] border border-light rounded-full'></span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default HeaderComponent
