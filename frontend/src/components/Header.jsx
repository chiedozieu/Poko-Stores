import Logo from "./Logo";
import { PiUser } from "react-icons/pi";
import { BsCart4 } from "react-icons/bs";
import TopHeader from "./TopHeader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import summaryApi from "../common";
import { setUserDetails } from "../store/userSlice";
import { useContext, useState } from "react";
import ROLE from "../common/role";
import Context from "../context";
 


const Header = () => {
  const user = useSelector((state) => (state.user?.user))
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLsearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLsearch.getAll('q')
  const [search, setSearch] = useState(searchQuery)

  
  // console.log('searchInput', searchInput)


  const handleLogOut = async () => {
    const res = await fetch(summaryApi.userLogOUT.url, {
      method: summaryApi.userLogOUT.method, 
      credentials: 'include'
    })
    const data = await res.json()
 
    if(data.success){
     toast.success(data.message)
     dispatch(setUserDetails(null))
     navigate('/')
    }

    if(data.error){
      toast.error(data.message)
     }
  } 


  const handleSearch = (e) => {
     const { value } = e.target
     setSearch(value)
     if(value){
      navigate(`/search?q=${value}`)
     }else{
      navigate('/search') 
     }
  }
 

  return (
    <div> 
    <div className="w-full h-full">
      <TopHeader />
    </div>
    <header className="h-[6rem] shadow-md bg-white w-full">
     
   <div className=" h-full container mx-auto flex items-center px-4 justify-between gap-4">
              {/* Logo */}
        <Link to={'/'} className="cursor-pointer hover:scale-110 transition font-extrabold text-5xl text-slate-500 lg:flex-2">
        Poko
          {/* <Logo /> */}
        </Link>
        
                {/* Search bar */}

        <form className="max-w-lg mx-auto hidden md:inline flex-1">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" value={search} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Search products ..." required onChange={handleSearch}/>
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Search</button>
            </div>
        </form>
                               {/* Search bar end */}
            {/* <div className="hidden md:inline-flex items-center w-full justify-between max-w-md h-12 border border-red-700 rounded-full focus-within:shadow pl-2">
                <input type="text" placeholder="Search products" className=" w-full outline-none "/>
                <div>
                  <GrSearch  className="bg-red-700 h-full text-lg min-w-[50px] p-2 rounded-r-full text-white flex justify-center items-center"/>
                </div>
              </div> */}

              <div className="flex items-center gap-7 lg:flex-2 ">
                <div className="relative  flex justify-center" onClick={()=> setShowMenu(prev => !prev)}>
                {
                  user?._id && (
                    
                  <div className=" cursor-pointer text-3xl">
                      { user?.profilePic ? (
                        <img src={user.profilePic} alt={user.username} className="h-10 w-10 rounded-full"/>
                      ) : (
                      <PiUser /> 
                      )} 
                  </div>
                  )
                }
                      {
                        showMenu && (
                      <div className="absolute bg-white bottom-0 top-11 h-fit p-2 hidden md:block  shadow-lg rounded-md ">
                        <nav>
                        {
                          user?.role === ROLE.ADMIN && (

                          <Link to='/admin-panel/all-products' className="whitespace-nowrap hover:bg-slate-100 p-2" >Admin Panel</Link>
                          )
                        }  
                        </nav>
                      </div>
                        )
                      }
                </div> 
                  {
                    user?._id && (
                <Link to={'/cart'} className="text-3xl relative">
                  <span className="flex">
                    <BsCart4 />
                  </span>
                  <div className="bg-red-700 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-1 -right-2 ">
                    <p className="text-sm">{context?.cartProductCount}</p>
                  </div>
                </Link>
                    )
                  }
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

        </div>
      )
}

export default Header