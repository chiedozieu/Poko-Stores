import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Header from './components/Header'
import Footer from './components/Footer'


const App = () => {
  return (
   <BrowserRouter>
      <Header />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/signup' element={<SignUp />}/>
      <Route path='/signin' element={<SignIn />}/>
    </Routes>
     <Footer />
   </BrowserRouter>
  )
}

export default App
