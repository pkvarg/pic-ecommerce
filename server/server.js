import express from 'express'
import { Server } from 'socket.io'

const app = express()

const io = new Server(8990, {
  cors: {
    origin: 'http://localhost:5173',
  },
})

const admins = []
let activeChats = []
function get_random(array) {
  return array[Math.floor(Math.random() * array.length)]
}

io.on('connection', (socket) => {
  socket.on('admin connected with server', (adminName) => {
    admins.push({ id: socket.id, admin: adminName })
  })
  console.log('admins', admins)
  socket.on('client sends message', (msg) => {
    if (admins.length === 0) {
      socket.emit('no admin', '')
    } else {
      let client = activeChats.find((client) => client.clientId === socket.id)
      console.log('client:', client)
      let targetAdminId
      if (client) {
        targetAdminId = client.adminId
      } else {
        let admin = get_random(admins)
        activeChats.push({ clientId: socket.id, adminId: admin.id })
        targetAdminId = admin.id
        console.log('admin:', admin)
      }
      socket.broadcast
        .to(targetAdminId)
        .emit('server sends message from client to admin', {
          user: socket.id,
          message: msg,
        })
    }
  })

  socket.on('admin sends message', ({ user, message }) => {
    console.log('user,message:', user, message)
    socket.broadcast
      .to(user)
      .emit('server sends message from admin to client', message)
  })

  socket.on('disconnect', (reason) => {
    console.log('reason:', reason)
    // admin disconnected
    const removeIndex = admins.findIndex((item) => item.id === socket.id)
    if (removeIndex !== -1) {
      admins.splice(removeIndex, 1)
    }
  })
})
