import { useState } from "react";
import { LiaUserCircleSolid } from "react-icons/lia";
import { TbEyeCheck, TbEyeClosed,  } from "react-icons/tb"; 
 
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <section id="login">
        <div className="mx-auto container p-4">
                <div className="bg-white p-2 w-full max-w-md mx-auto py-5">
                    <div className="w-20 h-20 mx-auto">
                        <LiaUserCircleSolid size={100}/>
                    </div>

                    <form action="">
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
                        </div>

                        <button>Login</button>
                    </form>
                </div>
        </div>

    </section>
  )
}
 
export default Login