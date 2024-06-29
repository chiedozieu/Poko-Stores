import React from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io'

function DisplayImage({imgUrl, onClose}) {
  return (
    <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center">

      <div className="bg-white shadow-lg rounded max-w-5xl mx-auto">
        <div className="w-fit ml-auto text-red-500 cursor-pointer hover:text-red-800 hover:scale-110 transition-all duration-75 p-4" onClick={onClose}>
                  <IoIosCloseCircleOutline size='25'/> 
        </div>
        <div className='flex justify-center p-4 max-w-[80vw] max-h-[80vh]'>
          <img src={imgUrl}alt="" className='w-full h-full' />
        </div>
      </div>

    </div>
  )
}

export default DisplayImage
 