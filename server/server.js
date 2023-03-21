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
  socket.on('sendMessage', (msg) => {
    console.log(msg)
  })
})
