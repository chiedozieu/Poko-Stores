import { useRef, useState } from "react";
import { PiUserCircleThin } from "react-icons/pi";
import { TbEyeCheck, TbEyeClosed,  } from "react-icons/tb"; 
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../utils/imageToBase64";
import summaryApi from "../common/index.js";
import { toast } from "react-toastify";
 
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const uploadRef = useRef()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      profilePic: '' 
    });
    
    const handleChange = (e) => {
       const {name, value} = e.target
       setFormData((prev) => {
        return{
          ...prev,
          [name] : value
        }
       });
      
    };


    const handleUploadPic = async (e) => {
      const file = e.target.files[0];

      const imagePic = await imageToBase64(file)
      
      setFormData((prev) => {
        return{
          ...prev,
          profilePic: imagePic
        }
      }) 
      console.log('this is image ', profilePic)
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if(formData.password !== formData.confirmPassword) {
          toast.error('Please check both password inputs')
          // console.log('Please check password and confirm password')
          return
    }
        // const res = await fetch('/api/signup', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(formData),
        // });
        // const data = await res.json()
        // console.log(data)
       
          try {
            
            const res = await fetch(summaryApi.signUP.url, {
             method: summaryApi.signUP.method,
             headers: {
               'content-type': 'application/json'
             },
             body: JSON.stringify(formData)
            })
            const data = await res.json()
            if(data.success){
              toast.success(data.message) 
              navigate('/login')  
            }
            if(data.error){
              toast.error(data.message)
            }
            
          } catch (error) {
            toast.error(data.message)
          }
    }


  return (
    <section id="signup">
        <div className="mx-auto container p-4">
                <div className="bg-white w-full max-w-md mx-auto">
                
                    <div className="w-32 h-30 mx-auto relative overflow-hidden rounded-full">
                        <div className="">
                        {formData.profilePic ? (
                          <img 
                              src={formData.profilePic} 
                              onClick={()=> uploadRef.current.click()}
                              alt="profilePic" 
                              // name="profilePic"
                              className="mt-2 rounded-full w-20 h-20 object-cover cursor-pointer" />
                        ) : (
                          <PiUserCircleThin size={125} name="ProfilePic"/>
                        ) 
                        }
                        </div> 
                        <form onSubmit={handleSubmit}>
                            <div hidden={formData.profilePic} onClick={()=> uploadRef.current.click()} className="text-sm bg-blue-500 text-slate-100 p-2 scale-x-50 text-center absolute bottom-0 w-full cursor-pointer">
                              Upload pic
                            </div>
                            <input 
                                type="file" 
                                ref={uploadRef} 
                                hidden 
                                accept="image/*"                                
                                onChange={handleUploadPic}/>                        
                        </form>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
                        <div className="">
                            <label htmlFor="Username">Username:</label>
                            <div className="bg-slate-100 p-2">
                              <input onChange={handleChange} 
                                    name="username"
                                    value={formData.username} 
                                    type="text" 
                                    placeholder="Enter username" 
                                    required
                                    className="w-fll h-full outline-none bg-transparent"/>
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="email">Email:</label>
                            <div className="bg-slate-100 p-2">
                              <input onChange={handleChange} 
                                    name="email" 
                                    value={formData.email}
                                    type="email" 
                                    placeholder="Enter email" 
                                    required
                                    className="w-fll h-full outline-none bg-transparent"/>
                            </div>
                        </div>

                        <div className="">
                            <label htmlFor="password">Password:</label>
                            <div className="bg-slate-100 p-2 flex justify-between">
                               <input type={showPassword ? "text" : "password"}
                                      placeholder="Enter password" 
                                      className="w-fll h-full outline-none bg-transparent" 
                                      name="password"
                                      required
                                      value={formData.password}  
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
                                        className="w-fll h-full outline-none bg-transparent" 
                                        name="confirmPassword"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
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

                        <button type="submit" className="p-2 w-full bg-blue-500 hover:bg-blue-700 cursor-pointer text-white text-md rounded-lg ">Sign Up</button>
                    </form>
                    <p className="p-4">Already have account? <Link to='/login' className="cursor-pointer text-blue-500 hover:text-blue-700 hover:underline">Login</Link></p>
                </div>
        </div>

    </section>
  )
}
 
export default Login