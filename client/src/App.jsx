import { useState } from 'react'
import './App.css'
import UserChatComponent from './components/UserChatComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <UserChatComponent />
    </div>
  )
}

export default App
