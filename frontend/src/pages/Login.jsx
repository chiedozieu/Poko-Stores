import { useContext, useState } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { TbEyeCheck, TbEyeClosed,  } from "react-icons/tb"; 
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

 
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({});

    const navigate = useNavigate();
    const {FetchUserDetails, fetchUserAddToCart} = useContext(Context)


    // console.log('generalContext:', generalContext); 

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim()});
        
    };

    const handleSubmit = async (e)=> {
        e.preventDefault();
        
        try {
            
            const res = await fetch(summaryApi.signIN.url, {
             method: summaryApi.signIN.method,
             credentials: 'include',
             headers: {
               'content-type': 'application/json'
             },
             body: JSON.stringify(formData)
            })
            const data = await res.json()
            if(data.success){
              toast.success(data.message) 
              navigate('/')  
              FetchUserDetails() 
              fetchUserAddToCart()
            }
            if(data.error){
              toast.error(data.message)
            }
            
          } catch (error) {
            console.log(error.message)
          }
        
    }


  return (
    <section id="login">
        <div className="mx-auto container p-4">
                <div className="bg-white p-2 w-full max-w-md mx-auto py-5">
                    <div className="w-20 h-20 mx-auto">
                        <PiUserCircleThin size={100} />

                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-10 p-4">
                        <div className="grid">
                            <label htmlFor="email">Email:</label>
                            <div className="bg-slate-100 p-2">
                              <input onChange={handleChange} 
                                    id="email" 
                                    type="email" 
                                    required
                                    placeholder="Enter email" 
                                    className="w-fll h-full outline-none bg-transparent"/>
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="password">Password:</label>
                            <div className="bg-slate-100 p-2 flex justify-between">
                               <input type={showPassword ? "text" : "password"} 
                                      placeholder="Enter password" 
                                      required
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
                            <Link to='/forgot-password' className="text-sm cursor-pointer text-slate-500 block w-fit ml-auto mt-1 hover:underline hover:text- red-800">
                            
                                <p>Forgot password</p>
                            </Link> 
                        </div>

                        <button type="submit" className="p-2 w-full bg-blue-500 hover:bg-blue-700 cursor-pointer text-white text-md rounded-lg ">Login</button>
                    </form>
                    <p className="p-4">Don't have account? <Link to='/signup' className="cursor-pointer text-blue-500 hover:text-blue-700 hover:underline">Sign Up</Link></p>
                </div>
        </div>

    </section>
  )
}
 
export default Login