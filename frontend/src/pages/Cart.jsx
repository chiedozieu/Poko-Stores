import React, { useContext, useEffect, useState } from 'react'
import summaryApi from '../common'
import Context from '../context'
import displayNGNCurrency from '../utils/displayCurrency'
import { MdDelete } from "react-icons/md";
import { scrollTop } from '../utils/scrollTop';

const Cart = () => {
    const [data, setData] =useState([])
    const [loading, setLoading] =useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)
 
    const fetchData = async () => {
        // setLoading(true)
        const response = await fetch(summaryApi.addToCartProductView.url, {
            method: summaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {'content-type': 'application/json'}
        })
        // setLoading(false)
        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }
    }

    const handleLoading = async () => {
        await fetchData()
    }

    useEffect(()=> {
        setLoading(true)
        handleLoading()
        setLoading(false)
        
    }, []) 

    const increaseQty = async (id, qty) => {
         const response = await fetch(summaryApi.updateCartProduct.url, {
            method: summaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {'content-type':'application/json'}, 
            body : JSON.stringify(
                {
                    _id: id,
                quantity : qty + 1
             }
            )}
        )
        const responseData = await response.json() 

        if (responseData.success) {
            fetchData()
        }
        
    }
    const decreaseQty = async (id, qty) => {
        if (qty >= 2){ const response = await fetch(summaryApi.updateCartProduct.url, {
            method: summaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {'content-type':'application/json'}, 
            body : JSON.stringify(
                {
                    _id: id,
                quantity : qty - 1
             }
            )}
        )
        const responseData = await response.json() 

        if (responseData.success) {
            fetchData()
        }
        }
    }

    const deleteCartProduct = async (id) => {
        const response = await fetch(summaryApi.deleteCartProduct.url, {
            method: summaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {'content-type':'application/json'}, 
            body : JSON.stringify(
                {
                    _id: id,
             }
            )}
        )
        const responseData = await response.json()  

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((prev, curr)=> prev + (curr?.quantity * curr?.productId?.sellingprice), 0)

    


  return (
    <div className='container mx-auto'>
        <div className='text-center font-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )
            }
        </div>
 
            {/* View product */}

        <div className="flex flex-col md:flex-row lg:justify-between p-4 gap-4">
            <div className="w-full max-w-3xl h-[calc(100vh-220px)] overflow-y-scroll ">
                {
                    loading ? (
                        loadingCart.map((load, index) =>{
                            return (
                                <div key={index + load} className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded">
            
                                </div>
                            )
                        })
                ) : (
                   
                        data?.map((product, index)=> {
                           return ( 
                            <div key={index + product?._id} className="w-full bg-white h-40 my-2 border border-slate-300 grid grid-cols-[150px,1fr]" onClick={scrollTop}>
                                <div className="w-40 h-40 bg-slate-200">
                                    <img src={product?.productId?.productImage[0]} alt="" className='w-full
                                     h-full object-scale-down mix-blend-multiply p-1'/>
                                </div>
                                <div className="px-4 py-3 relative ">
                                  {/* delate Product */}
                                    <div className="absolute right-0 text-red-700 p-2 hover:bg-red-700 hover:text-white rounded-full cursor-pointer hover:mx-1" onClick={()=> deleteCartProduct(product?._id)}>
                                    <MdDelete />
                                    </div>

                                    <h2 className=' text-lg lg:text-xl text-ellipsis line-clamp-1'>
                                        {product?.productId?.productName}
                                    </h2>
                                    <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                                    <div className="flex-col lg:flex lg:flex-row justify-between items-center">
                                        <p className='text-lg text-red-700 font-medium'>{displayNGNCurrency(product?.productId?.sellingprice)}
                                        </p>
                                        {
                                            displayNGNCurrency(product?.productId?.sellingprice) !== displayNGNCurrency(product?.productId?.sellingprice * product?.quantity) && (
                                        <p className='text-lg  text-slate-600 font-semibold'>{displayNGNCurrency(product?.productId?.sellingprice * product?.quantity)}
                                        </p>)
                                        }
                                    </div>
                                    <div className="flex items-center gap-3 mt-1 ">
                                        <button className='border border-red-700 text-red-600 w-6 h-6 rounded flex items-center justify-center hover:bg-red-700 hover:text-white' onClick={()=>decreaseQty(product?._id, product?.quantity)}>-</button>
                                            <span>{product?.quantity}</span>
                                        <button className='border border-red-700 text-red-600 w-6 h-6 rounded flex items-center justify-center hover:bg-red-700 hover:text-white' onClick={()=>increaseQty(product?._id, product?.quantity)}>+</button>
                                    </div>
                                </div>  
                            </div> 
                            )
                        })
                                   
                ) 
                }
            </div>
            {/* Summary  */}
            <div className="mt-5 lg:mt-0 w-full max-w-sm">
                {
                    loading ? (
                        <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse">
                            
                         </div>
                    ) : (
                        <div className="h-36 bg-white">
                             <h2 className='text-white bg-red-700 px-4 py-1'>Summary</h2>
                             <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                                <p className=''>Quantity</p>
                                <p>{totalQty}</p>                               
                             </div>
                             <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                                <p className=''>Total Price</p>
                                <p>{displayNGNCurrency(totalPrice)}</p>
                             </div>
                             <button className='bg-blue-600 text-white w-full p-2 my-2'>Payment</button>
                        </div>
                    )
                }
            </div>
        </div>





    </div>
  )
}
 
export default Cart