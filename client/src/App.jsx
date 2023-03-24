import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HeaderComponent from './components/HeaderComponent'

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

          <HeaderComponent />
          <UserChatComponent />
        </Router>
      </div>
    </>
  )
}

export default App
