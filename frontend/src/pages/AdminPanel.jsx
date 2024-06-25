import React from 'react'
import { PiUser } from 'react-icons/pi'
import { useSelector } from 'react-redux'

const AdminPanel = () => {
    const user = useSelector((state) =>state.user?.user)
  return (
    <div className='min-h-[calc(100vh-200px)] flex'>
        <aside className='bg-white min-h-full w-full max-w-60 custom-shadow' >
             <div className="h-32 flex flex-col justify-center items-center p-2">
                 <div className=" cursor-pointer text-5xl">
                  { user?.profilePic ? (
                    <img src={user.profilePic} alt={user.username} className="h-20 w-20 rounded-full"/>
                  ) : (
                  <PiUser />
                  )}
                  </div>
                  <p className='text-sm capitalize p-1'>{user?.username}</p> 
             </div>
        </aside>

        <main>
            main 
        </main>
    </div>
  )
}

export default AdminPanel