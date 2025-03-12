import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'

import Frontpage from './pages/frontpage'
import PageNotFound from './pages/404'
import SingleUserView from './pages/singleUserView'
import SinglePostView from './pages/singlePostView'
import Login from './pages/login'

function App() {
  const [user, setUser] = useState("Niilo")

  const onLogin = (user) => {
    setUser(user)
  }
  const onLogout = () => {
    setUser("")
  }
  return (
    <>
      <Navbar user={user} setUser={onLogout}/>
      <Container id="Main">
        <Routes>
          <Route path='/' element={<Frontpage />} />
          <Route path='login' element={<Login onLogin={onLogin}/>}/>
          <Route path='/user/:id' element={<SingleUserView user={user}/>} />
          <Route path='/post/:id' element={<SinglePostView />} />
          <Route path='*' element={<PageNotFound />} /> 
        </Routes>
      </Container>
    </>
  )
}

export default App
