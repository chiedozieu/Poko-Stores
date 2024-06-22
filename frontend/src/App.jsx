import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home' 
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import SignUp from './pages/SignUp'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
  <BrowserRouter>
      <ToastContainer />
      <Header />
    <main className='min-h-[calc(100vh-200px)]'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </main>
     <Footer />
   </BrowserRouter>
  )
}

export default App
