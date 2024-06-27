import { useState } from 'react';
import ROLE from '../common/role.js'
import { IoIosCloseCircleOutline } from "react-icons/io";
import summaryApi from '../common/index.js';
import {toast} from 'react-toastify'

const ChangeUserRole = ({
  username,
  email,
  role,
  userId,
  onClose,
  callFunc,
}) => {
  const [userRole, setUserRole] = useState(role); 

  const handleChange = (e) => {
    setUserRole(e.target.value)
   
  };

  const updateUserRole = async() => {
    const res = await fetch(summaryApi.updateUser.url, {
      method:summaryApi.updateUser.method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }, 
      body : JSON.stringify({
          userId: userId,
          role: userRole
         })
    })

    const data = await res.json();

    if(data.success){
      toast.success(data.message)
      onClose()
      callFunc()
    }
      
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-55'>
         <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
         
         <button className="block ml-auto hover:text-red-700 hover:scale-110 tr" onClick={onClose}> 
            <IoIosCloseCircleOutline />
         </button>
            <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>

            <p>Name :{username}</p>
            <p>Email: {email}</p>
              <div className="flex items-center justify-between my-4">
                <p>Role</p>
                            <select className='border px-4 py-1' value={userRole} onChange={handleChange}>
                            {
                  Object.values(ROLE).map(r => {
                      return(
                          <option value={r} key={r}>{r}</option>
                      )
                  })
                            }             
                            </select>
              </div>
              <button className='w-fit mx-auto block py-1 px-3 rounded-md bg-red-700 hover:bg-red-800 text-white' onClick={updateUserRole}>Change Role</button>
             
         </div>   
    </div>
  )
}

export default ChangeUserRole 



