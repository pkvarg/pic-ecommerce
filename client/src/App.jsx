import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

import UserChatComponent from './components/UserChatComponent'
import Admin from './pages/admin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <Router>
          <Routes>
            <Route path='/admin' element={<Admin />} />
          </Routes>

          <UserChatComponent />
        </Router>
      </div>
    </>
  )
}

export default App
