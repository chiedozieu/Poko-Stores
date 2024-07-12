import React, { useEffect, useState } from 'react'
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
import AllUsers from './pages/AllUsers.jsx'
import AllProducts from './pages/AllProducts.jsx'
import CategoryProduct from './pages/CategoryProduct.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import SearchProducts from './pages/SearchProducts.jsx'



const App = () => {
  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0)

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

const fetchUserAddToCart = async () => {
  const response = await fetch(summaryApi.countAddToCartProduct.url, {
    method: summaryApi.countAddToCartProduct.method,
    credentials: 'include',
  })

  const responseData = await response.json();
   if (responseData.success) {
    setCartProductCount(responseData.data?.count)
   }
}


useEffect(() => {
  //user Details
  FetchUserDetails()
    //user details cart product
  fetchUserAddToCart()
}, [])

  return (
  <BrowserRouter>
      <Context.Provider value={{FetchUserDetails, cartProductCount, fetchUserAddToCart}}> 
      <ToastContainer position='top-center' />
      <Header />
    <main className='min-h-[calc(100vh-200px)]'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/category-product' element={<CategoryProduct />}/>
        <Route path='/product/:id' element={<ProductDetails />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/search' element={<SearchProducts  />}/>
        <Route path='/admin-panel' element={<AdminPanel />}>
          <Route path='all-users' element={<AllUsers />}/>
          <Route path='all-products' element={<AllProducts />}/>
        </Route>
      </Routes>
    </main>
     <Footer />
     </Context.Provider>
   </BrowserRouter>
  )
}

export default App
