import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setUserDetails } from '../store/userSlice'
import summaryApi from '../common/index.js'
import moment from 'moment'
import { LiaUserEditSolid } from "react-icons/lia";
import ChangeUserRole from '../components/ChangeUserRole.jsx';
import { PiUserCircleLight } from "react-icons/pi";

const AllUsers = () => {
  const[allUsers, setAllUsers] = useState([])
  const[openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: '',
    username: '',
    role: '',
    _id: '',
  })
 

  const getAllUsers = async () => {
    const res = await fetch(summaryApi.allUsers.url ,{
      method: summaryApi.allUsers.method,
      credentials: 'include',
    })
    const data = await res.json()
    
    if(data.success) {
      setAllUsers(data.data)
    }
    if(data.error) {
      toast.error(data.message)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className='pb-4 bg-white'>
      <table className=' w-full user-table '>
        <thead className='font-medium'>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Profile Pic</th>
            <th>role</th>
            <th>Date Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className=''>
          {
            allUsers.map((user, index) => {
              return (
                <tr>
                  <td>{index+1 }</td>
                  <td>{user?.username }</td>
                  <td>{user?.email }</td>
                  <td className='flex justify-center'>
                  {
                    user?.profilePic ? (
                  <img src={user?.profilePic} className='w-8 h-8 rounded-full items-center' />
                    ) : (
                      <PiUserCircleLight className='w-8 h-8 rounded-full items-center'/>
                    )
                  }
                  </td>
                  <td>{user?.role }</td>
                  <td>{moment(user?.createdAt).format('ll') }</td>
                  <td className='flex justify-center'>
                    <button 
                    onClick={() => {
                      setUpdateUserDetails(user);                   
                      setOpenUpdateRole(true)
                      }
                    }>
                    <LiaUserEditSolid className='bg-green-100 w-8 h-8 rounded-full hover:bg-green-400'/>
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        openUpdateRole && (
      <ChangeUserRole 
            onClose={() => setOpenUpdateRole(false)} 
            role={updateUserDetails.role} 
            email={updateUserDetails.email}
            userId={updateUserDetails._id}
            username={updateUserDetails.username}
            callFunc={getAllUsers}
            />
            
        )
      } 
    </div>
  )
}

export default AllUsers