import React from 'react'
import { PiUser } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

const AdminPanel = () => {
    const user = useSelector((state) =>state.user?.user)
  return (
    <div className='min-h-[calc(100vh-200px)] hidden md:flex'>
        <aside className='bg-white min-h-full w-full max-w-60 custom-shadow' >
             <div className="h-32 flex flex-col justify-center items-center p-2 my-2">
                 <div className=" cursor-pointer text-5xl">
                  { user?.profilePic ? (
                    <img src={user.profilePic} alt={user.username} className="h-20 w-20 rounded-full"/>
                  ) : (
                  <PiUser />
                  )}
                  </div>
                  <p className='text-lg capitalize p-1 font-semibold'>{user?.username}</p>
                  <p className='text-xs text-slate-500'>{user?.role}</p>            
             </div>
             <div className="">
                <nav className='grid p-4'>
                    <Link to={'all-users'} className='px-2 py-1 hover:bg-slate-100 '>All Users</Link>
                    <Link to={'all-products'} className='px-2 py-1 hover:bg-slate-100 '>All Products</Link>
                </nav>
               
             </div>
        </aside>
 
        <main className='w-full h-full p-2 '>
          <Outlet /> 
        </main>
    </div>
  )
}

export default AdminPanel