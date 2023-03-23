import express from 'express'
import { Server } from 'socket.io'

const app = express()

const io = new Server(8990, {
  cors: {
    origin: 'http://localhost:5173',
    origin: 'http://127.0.0.1:5173',
  },
})

const admins = []

io.on('connection', (socket) => {
  socket.on('admin connected with server', (adminName) => {
    admins.push({ id: socket.id, admin: adminName })
    console.log(admins)
  })
  socket.on('client sends message', (msg) => {
    if (admins.length === 0) {
      socket.emit('no admin', '')
    } else {
      socket.broadcast.emit('server sends message from client to admin', {
        message: msg,
      })
      console.log('cl:', msg)
    }
  })

  socket.on('admin sends message', ({ message }) => {
    console.log('asm:', message)
    socket.broadcast.emit('server sends message from admin to client', message)
  })
  socket.on('disconnect', (reason) => {
    // admin disconnected
    const removeIndex = admins.findIndex((item) => item.id === socket.id)
    if (removeIndex !== -1) {
      admins.splice(removeIndex, 1)
    }
  })
})
