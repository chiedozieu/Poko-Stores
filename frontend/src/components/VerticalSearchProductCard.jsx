import React, { useContext } from 'react'
import displayNGNCurrency from '../utils/displayCurrency'
import { scrollTop } from '../utils/scrollTop'
import Context from '../context'
import addToCart from '../utils/addToCart'
import { Link } from 'react-router-dom'

const VerticalSearchProductCard = ({data=[]}) => {

    const {fetchUserAddToCart} = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e,id)
        await fetchUserAddToCart()
    }

  return (
    <div>
       <div className='container mx-auto px-2 my-6 relative'>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,300px))] justify-center md:justify-between md:gap-2 transition-all" onClick={scrollTop }>
           
            {
                data?.map((product, index) => { 
                    return (
                            <div className="" key={index}>
                                <Link to={'/product/'+product?._id} className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-sm shadow">
                                    <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex items-center justify-center">
                                        <img src={product?.productImage[0]} alt="" className='h-full hover:scale-105 transition-all mix-blend-multiply'/>
                                    </div>
                                    <div className="py-4 px-2 font-medium text-base md:text-lg text-gray-700 grid gap-3">
                                        <h2 className='text-ellipsis line-clamp-1'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500 text-xs'>{product?.category}</p>
                                        <div className="text-sm flex gap-2 text-ellipsis line-clamp-1">
                                            <p className='text-red-700 font-medium'>{displayNGNCurrency(product?.sellingprice)}</p>

                                            {product?.sellingprice !== product?.price && (
                                            <p className='text-slate-500 line-through'>{displayNGNCurrency(product?.price)}</p>
                                            )}
                                        </div>
                                        <button className='rounded-md bg-red-700 hover:bg-red-800 text-white px-3 py-2 text-sm my-auto' onClick={(e)=>handleAddToCart (e,product?._id)}>Add to cart</button>

                                    </div>
                                </Link>
                            </div>
                    )
                })
            }
        </div>


    </div>
    </div>
  )
}

export default VerticalSearchProductCard
