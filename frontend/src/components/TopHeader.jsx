import { Link } from "react-router-dom";


export default function TopHeader() {


  return (
   
      <div className='flex bg-red-700 text-white justify-between max-w-screen-2xl h-10 items-center'>
          <div className=""></div>
          <Link to={'/'} className="p-2 mr-6 font-extrabold cursor-pointer hover:scale-125 transition">POKO</Link>
      </div>
    
  )
}
