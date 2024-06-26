import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setUserDetails } from '../store/userSlice'
import summaryApi from '../common/index.js'
import moment from 'moment'
import { LiaUserEditSolid } from "react-icons/lia";
import ChangeUserRole from '../components/ChangeUserRole.jsx';

const AllUsers = () => {
  const[allUsers, setAllUsers] = useState([])
 

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
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>profilePic</th>
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
                  <td className='flex justify-center'><img src={user?.profilePic} alt="" className='w-8 h-8 rounded-full items-center' /></td>
                  <td>{user?.role }</td>
                  <td>{moment(user?.createdAt).format('ll') }</td>
                  <td className='flex justify-center'><button><LiaUserEditSolid className='bg-green-100 w-8 h-8 rounded-full hover:bg-green-400'/></button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <ChangeUserRole />
    </div>
  )
}

export default AllUsers