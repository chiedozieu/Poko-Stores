import React from 'react'

function DisplayImage({imgUrl, onClose}) {
  return (
    <div className='flex justify-center p-4'>
      <img src={imgUrl}alt="" className='w-full h-full' />
    </div>
  )
}

export default DisplayImage
 