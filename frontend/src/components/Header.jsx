import { GrSearch } from "react-icons/gr";
import Logo from "./Logo";
import { PiUser } from "react-icons/pi";
import { BsCart4 } from "react-icons/bs";
import TopHeader from "./TopHeader";
import { Link } from "react-router-dom";


const Header = () => {
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
            <div className=" cursor-pointer text-3xl">
            <PiUser />
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
              <Link to={'/login'} className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded-md text-white cursor-pointer ">
                Login
              </Link>
            </div>
          </div>

       </div>

    </header>

    </>
  )
}

export default Header