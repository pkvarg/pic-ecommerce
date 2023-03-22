import express from 'express'
import { Server } from 'socket.io'

const app = express()

const io = new Server(8990, {
  cors: {
    origin: 'http://localhost:5173',
    origin: 'http://127.0.0.1:5173',
  },
})

io.on('connection', (socket) => {
  socket.on('client sends message', (msg) => {
    socket.broadcast.emit('server sends message from client to admin', {
      message: msg,
    })
    console.log('cl:', msg)
  })

  socket.on('admin sends message', ({ message }) => {
    console.log('asm:', message)
    socket.broadcast.emit('server sends message from admin to client', message)
  })
})
