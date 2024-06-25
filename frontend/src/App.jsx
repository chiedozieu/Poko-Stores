import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home' 
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import SignUp from './pages/SignUp'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from './common'
import Context from './context/index.js'
import { setUserDetails } from './store/userSlice.js'
import {useDispatch} from 'react-redux'
import AdminPanel from './pages/AdminPanel.jsx'



const App = () => {
  const dispatch = useDispatch()

const FetchUserDetails = async () => {
  const res = await fetch(summaryApi.currentUser.url, {
    method: summaryApi.currentUser.method,
    credentials: 'include'
  })
  const data = await res.json();
  
  
  if (data.success) {
    dispatch(setUserDetails(data.data))
  }

};


useEffect(() => {
  //user Details
  FetchUserDetails() 
}, [])

  return (
  <BrowserRouter>
      <Context.Provider value={{FetchUserDetails}}> 
      <ToastContainer />
      <Header />
    <main className='min-h-[calc(100vh-200px)]'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/admin-panel' element={<AdminPanel />}/>
      </Routes>
    </main>
     <Footer />
     </Context.Provider>
   </BrowserRouter>
  )
}

export default App
