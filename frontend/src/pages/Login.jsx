import { useState } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { TbEyeCheck, TbEyeClosed,  } from "react-icons/tb"; 
import { Link } from "react-router-dom";
 
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <section id="login">
        <div className="mx-auto container p-4">
                <div className="bg-white p-2 w-full max-w-md mx-auto py-5">
                    <div className="w-20 h-20 mx-auto">
                        <PiUserCircleThin size={100} />

                    </div>

                    <form className="flex flex-col gap-10 p-4">
                        <div className="grid">
                            <label htmlFor="email">Email:</label>
                            <div className="bg-slate-100 p-2"><input type="email" placeholder="Enter email" className="w-fll h-full outline-none bg-transparent"/></div>
                        </div>
                        <div className="">
                            <label htmlFor="password">Password:</label>
                            <div className="bg-slate-100 p-2 flex justify-between">
                               <input type={showPassword ? "text" : "password"} placeholder="Enter password" className="w-fll h-full outline-none bg-transparent" />
                               <div className="cursor-pointer text-xl">
                                 <span onClick={()=> setShowPassword((prev)=> !prev)}> 
                                 {
                                    showPassword ? <TbEyeClosed /> :  <TbEyeCheck />
                                 }
                                 </span>
                               </div>
                            </div> 
                            <Link to='/forgot-password' className="text-sm cursor-pointer text-slate-500 block w-fit ml-auto mt-1 hover:underline hover:text- red-800">
                            
                                <p>Forgot password</p>
                            </Link> 
                        </div>

                        <button type="submit" className="p-2 w-full bg-red-700 hover:bg-red-800 cursor-pointer text-white text-md rounded-lg ">Login</button>
                    </form>
                    <p className="p-4">Don't have account? <Link to='/signup' className="cursor-pointer text-red-700 hover:text-red-800 hover:underline">Sign Up</Link></p>
                </div>
        </div>

    </section>
  )
}
 
export default Login