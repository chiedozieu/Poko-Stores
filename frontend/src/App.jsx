import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home' 
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'


const App = () => {
  return (
   <BrowserRouter>
      <Header />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/login' element={<Login />}/>
    </Routes>
     <Footer />
   </BrowserRouter>
  )
}

export default App
