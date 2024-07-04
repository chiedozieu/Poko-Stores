import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../utils/fetchCategoryWiseProduct'
import displayNGNCurrency from '../utils/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

const HorizontalCardProduct = ({category, heading}) => {
     const [data, setData] = useState([])
     const [loading, setLoading] = useState(false)
     const loadingList = new Array(13).fill(null)

    //  const[scroll, setScroll] = useState(0)
     const scrollElement =  useRef()

     const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false) 

        setData(categoryProduct.data)
     }

     useEffect(() => {
        fetchData() 
     }, [])

     const scrollRight = () => {
        scrollElement.current.scrollLeft += 350
     }
     const scrollLeft  = () => {
        scrollElement.current.scrollLeft -= 350
     }

  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
        <div className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-hidden transition-all" ref={scrollElement}>
            <button className='bg-white text-lg rounded-full p-1 absolute left-0 hidden md:block' onClick={scrollLeft} >
                    <FaAngleLeft />
            </button>
            <button className='bg-white text-lg rounded-full p-1 absolute right-0 hidden md:block' onClick={scrollRight} >
                    <FaAngleRight />
            </button>
            {
                data?.map((product, index) => {
                    return (
                            <div className="f" key={index}>
                                <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                                    <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] hover:scale-125">
                                        <img src={product?.productImage[0]} alt="" className='h-full hover:scale-110 transition-all'/>
            
                                    </div>
                                    <div className="py-4 px-2 font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-gray-700 grid">
                                        <h2>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className="text-sm flex gap-2">
                                            <p className='text-red-700 font-medium'>{displayNGNCurrency(product?.sellingprice)}</p>

                                            {product?.sellingprice !== product?.price && (
                                            <p className='text-slate-500 line-through'>{displayNGNCurrency(product?.price)}</p>
                                            )}
                                        </div>
                                        <button className='rounded-md bg-red-700 hover:bg-red-800 text-white px-3 py-0.5 text-sm my-auto'>Add to cart</button>

                                    </div>
                                </div>
                            </div>
                    )
                })
            }
        </div>


    </div>
  )
}

export default HorizontalCardProduct