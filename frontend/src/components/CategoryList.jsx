import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import {Link} from 'react-router-dom'
import { Audio, Circles, ColorRing } from 'react-loader-spinner'

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchCategoryProduct = async () => {

        setLoading(true)
        const response = await fetch(summaryApi.getProductCategory.url)
        const dataResponse = await response.json() 
        setCategoryProduct(dataResponse.data)
        setLoading(false)
    }

    useEffect(()=> {
        fetchCategoryProduct()
    }, [])

  return (
    <div className='container mx-auto p-4'>
        <div className="flex items-center gap-4 overflow-scroll scrollbar-hidden justify-between">
            {
                loading? (
                    <div className='mx-auto p-10'>
                        <ColorRing 
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        />         
                    </div>
                                        ) : (

                categoryProduct.map((product, index)=> {
                    return (
                        <Link to={'/category-product?category='+ product?.category} className="" key={index}>
                            <div className="w-16 h-16 md:w-20 md:h-20 p-4  bg-slate-200 flex items-center justify-center gap-3 rounded-full overflow-hidden">
                                <img
                                    className='h-full object-scale-down cursor-pointer mix-blend-multiply hover:scale-125 transition-all'
                                    src={product?.productImage[0]}
                                    alt={product?.category} />
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                        </Link>
                    )
                })
                )
            }
        </div>
    </div>
  )
}

export default CategoryList