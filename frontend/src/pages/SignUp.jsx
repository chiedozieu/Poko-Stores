import { useState } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { TbEyeCheck, TbEyeClosed,  } from "react-icons/tb"; 
import { Link } from "react-router-dom";
 
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim()});
        console.log(formData);
    };

    const handleSubmit = ()=> {
        e.preventDefault(); 
    }


  return (
    <section id="signup">
        <div className="mx-auto container p-4">
                <div className="bg-white p-2 w-full max-w-md mx-auto py-4">
                    <div className="w-20 h-20 mx-auto">
                        <PiUserCircleThin size={100} />

                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-4">
                        <div className="">
                            <label htmlFor="Username">Username:</label>
                            <div className="bg-slate-100 p-2">
                              <input onChange={handleChange} 
                                    id="username" 
                                    type="username" 
                                    placeholder="Enter username" 
                                    className="w-fll h-full outline-none bg-transparent"/>
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="email">Email:</label>
                            <div className="bg-slate-100 p-2">
                              <input onChange={handleChange} 
                                    id="email" 
                                    type="email" 
                                    placeholder="Enter email" 
                                    className="w-fll h-full outline-none bg-transparent"/>
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="password">Password:</label>
                            <div className="bg-slate-100 p-2 flex justify-between">
                               <input type={showPassword ? "text" : "password"} 
                                      placeholder="Enter password" 
                                      className="w-fll h-full outline-none bg-transparent" id="password"  
                                      onChange={handleChange}/>

                               <div className="cursor-pointer text-xl">
                                 <span onClick={()=> setShowPassword((prev)=> !prev)}> 
                                 {
                                    showPassword ? <TbEyeClosed /> :  <TbEyeCheck />
                                 }
                                 </span>
                               </div>
                            </div> 

                            <div className="my-6">
                              <label htmlFor="confirm password">Confirm Password:</label>
                              <div className="bg-slate-100 p-2 flex justify-between">
                                 <input type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Enter password"
                                        className="w-fll h-full outline-none bg-transparent" id="confirm-password"
                                        />
                                 <div className="cursor-pointer text-xl">
                                   <span onClick={()=> setShowConfirmPassword((prev)=> !prev)}>
                                   {
                                      showConfirmPassword ? <TbEyeClosed /> :  <TbEyeCheck />
                                   }
                                   </span>
                                 </div>
                              </div>
                            </div>
                            
                        </div>

                        <button type="submit" className="p-2 w-full bg-red-700 hover:bg-red-800 cursor-pointer text-white text-md rounded-lg ">Login</button>
                    </form>
                    <p className="p-4">Have account? <Link to='/signup' className="cursor-pointer text-red-700 hover:text-red-800 hover:underline">Login</Link></p>
                </div>
        </div>

    </section>
  )
}
 
export default Login