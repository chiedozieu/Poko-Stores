import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function TopHeader() {
  const user = useSelector((state) => (state.user?.user))


  return (
   
      <div className='flex bg-blue-500 text-white justify-between h-10 items-center w-full '>
          <div className="ml-8">
          Welcome {user? ( <span className="capitalize text-xl font-bold">{user.username}</span>) : (
            <span className="capitalize text-xl font-bold">Guest</span>
          )}
          </div>
          <Link to={'/'} className="p-2 mr-6 font-extrabold cursor-pointer hover:scale-125 transition">POKO</Link>
      </div>
    
  )
}
