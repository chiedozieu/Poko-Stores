import { GrSearch } from "react-icons/gr";
import Logo from "./Logo";
import { PiUser } from "react-icons/pi";
import { BsCart4 } from "react-icons/bs";


const Header = () => {
  return (
    <>
    <header className="h-[6rem] shadow-md">
     
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
          <div className="">
            <Logo />
          </div>
     
        
         <div className="hidden md:inline-flex items-center w-full justify-between max-w-md h-12 border rounded-full focus-within:shadow pl-2">
            <input type="text" placeholder="Search products" className=" w-full outline-none "/>
            <div>
              <GrSearch  className="bg-red-700 h-full text-lg min-w-[50px] p-2 rounded-r-full text-white flex justify-center items-center"/>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className=" cursor-pointer text-3xl">
            <PiUser />
            </div>
            <div className="text-3xl relative">
              <span>
                <BsCart4 />
              </span>
             <div className="bg-red-700 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-1 -right-2 ">
               <p className="text-sm">0</p>
             </div>
            </div>
          </div>
       </div>
    </header>

    </>
  )
}

export default Header