import React, { useCallback, useEffect, useState } from 'react'
 import {useParams} from 'react-router-dom'
import summaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayNGNCurrency from '../utils/displayCurrency';

const ProductDetails = () => {

  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    description: '',
    price: '',
    sellingprice: ''
  })

  const params = useParams()
  const[activeImage, setActiveImage] = useState('')
  const [zoomImageCoodinate, setZoomImageCoodinate] = useState({
    x:0,
    y:0
  })
  const [zoomImage, setZoomImage] = useState(false)

  

const fetchProductDetails = async () => {
  const response = await fetch(summaryApi.productDetails.url, {
    method: summaryApi.productDetails.method,
    credentials: 'include',
    headers: {'content-type' : 'application/json'},
    body: JSON.stringify({
      productId: params?.id
    })
  }) 
  const dataResponse = await response.json()
  setData(dataResponse?.data)
  setActiveImage(dataResponse?.data?.productImage[0] )
}


useEffect(() => {
  fetchProductDetails()
}, []) 

const handleMouseEnterZoom = (imageUrl) => {
  setActiveImage(imageUrl)
}


const handleFullZoom = useCallback((e) => {
  setZoomImage(true)
  const { left, top, width, height } = e.target.getBoundingClientRect()
  
  const x = (e.clientX - left) / width
  const y = (e.clientY - top) / height


  setZoomImageCoodinate({
    x,
    y
  })
  
}, [zoomImageCoodinate])

const handleLeaveImageZoom = (e) => {
  setZoomImage(false)
}

  return (
    <div className='container mx-auto p-4'>
      <div className="min-h-[200px]">

          {/* product image */}
          <div className="flex gap-4">
            <div className="h-96 flex flex-col lg:flex-row  gap-4 ">
              <div className="h-full">
                <div className="flex gap-2 lg:flex-col overflow-scroll h-full">
                  {
                    data?.productImage.map((imageUrl, index) => {
                      return (
                        <div className="h-20 w-20 bg-slate-200 rounded" key={imageUrl}>
                            <img src={imageUrl} alt=""  className='w-full h-full mix-blend-multiply object-scale-down cursor-pointer' onMouseEnter={()=> handleMouseEnterZoom(imageUrl)} onClick={()=> handleMouseEnterZoom(imageUrl)}/>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative" >
                <img src={activeImage} alt="" className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleFullZoom} onMouseLeave={handleLeaveImageZoom}/>
                  {/* product zoom */}
                  {
                    zoomImage && (

                <div className="hidden lg:block absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[520px] top-0 overflow-hidden">
                  <div className="w-full h-full mix-blend-multiply min-h-[400px] min-w-[500px] scale-125" style={{backgroundImage: `url(${activeImage})`, backgroundRepeat: 'no-repeat', backgroundPosition: `${zoomImageCoodinate.x * 100}% ${zoomImageCoodinate.y  * 100}%` }}>

                  </div>
                </div> 
                    )
                  }


              </div>
            </div>
             {/* product details  */}
            <div className="flex flex-col gap-1">
                <p className='bg-red-200 text-red-700 px-2 rounded-full w-fit'>{data?.brandName}</p>
                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                <p className='capitalize text-slate-500'>{data?.category}</p>

                <div className="flex text-red-700 gap-1 text-xs">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalf />
                </div>

                <div className="flex items-center gap-2  text-lg lg:text-2xl font-medium my-1 ">
                  <p className='text-red-700'>{ displayNGNCurrency(data?.sellingprice) }</p>
                  {
                    data?.price !== data?.sellingprice &&
                  <p className='line-through text-slate-400'>{ displayNGNCurrency(data?.price) }</p>
                  }
                </div>

                <div className="flex gap-3 items-center my-2">
                  <button className='border-2 border-red-700 rounded px-3 py-1 min-w-[120px] font-medium text-red-700 hover:text-white hover:bg-red-700 cursor-pointer'>Buy</button>
                  <button className='hover:border-2 hover:border-red-700 hover:bg-slate-100 hover:text-red-700 bg-red-700 text-white cursor-pointer rounded px-3 py-1 min-w-[120px]'>Add To Cart</button>
                </div>

                <div className="">
                  <p className='text-slate-600 font-medium my-1'>Description: </p>
                  <p>{data?.description}</p>
                </div>


            </div>
          </div>

      </div>
    </div>
  )
}

export default ProductDetails