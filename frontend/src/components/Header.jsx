import { GrSearch, GrToast } from "react-icons/gr";
import Logo from "./Logo";
import { PiUser } from "react-icons/pi";
import { BsCart4 } from "react-icons/bs";
import TopHeader from "./TopHeader";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import summaryApi from "../common";
import { setUserDetails } from "../store/userSlice";
import { useState } from "react";
 


const Header = () => {
  const user = useSelector((state) => (state.user?.user))
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogOut = async () => {
    const res = await fetch(summaryApi.userLogOUT.url, {
      method: summaryApi.userLogOUT.method, 
      credentials: 'include'
    })
    const data = await res.json()
 
    if(data.success){
     toast.success(data.message)
     dispatch( setUserDetails(null))
    }

    if(data.error){
      toast.error(data.message)
     }
  }
  return (
    <> 
    <div className="sticky">
      <TopHeader />
    </div>
    <header className="h-[6rem] shadow-md bg-white">
     
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
          <Link to={'/'} className="cursor-pointer hover:scale-110 transition">
            <Logo />
          </Link>
     
        
         <div className="hidden md:inline-flex items-center w-full justify-between max-w-md h-12 border border-red-700 rounded-full focus-within:shadow pl-2">
            <input type="text" placeholder="Search products" className=" w-full outline-none "/>
            <div>
              <GrSearch  className="bg-red-700 h-full text-lg min-w-[50px] p-2 rounded-r-full text-white flex justify-center items-center"/>
            </div>
          </div>

          <div className="flex items-center gap-7  ">
            <div className="relative  flex justify-center" onClick={()=> setShowMenu(prev => !prev)}>
              <div className=" cursor-pointer text-3xl">
              { user?.profilePic ? (
                <img src={user.profilePic} alt={user.username} className="h-10 w-10 rounded-full"/>
              ) : (
              <PiUser />
              )} 
              </div>
              {
                showMenu && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2  shadow-lg rounded-md ">
                <nav>
                  <Link to='/admin-panel' className="whitespace-nowrap hover:bg-slate-100 p-2">Admin Panel</Link>
                </nav>
              </div>
                )
              }
            </div> 
            <div className="text-3xl relative">
              <span className="flex">
                <BsCart4 />
              </span>
             <div className="bg-red-700 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-1 -right-2 ">
               <p className="text-sm">0</p>
             </div>
            </div>
            <div className="">
            {
              user?._id  ? (
                <button onClick={handleLogOut} className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded-md text-white cursor-pointer">Logout</button>
              ) : (

              <Link to={'/login'} className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded-md text-white cursor-pointer">
                Login
              </Link>
              )
            }
            </div>
          </div>

       </div>

    </header>

    </>
  )
}

export default Header