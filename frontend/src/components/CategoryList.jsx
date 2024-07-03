import React, { useEffect, useState } from 'react'
import summaryApi from '../common'

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
        <div className="flex  items-center gap-4 overflow-scroll scrollbar-hidden">
            {
                categoryProduct.map((product, index)=> {
                    return (
                        <div className="">
                            <div className="w-16 h-16 md:w-20 md:h-20 p-3 bg-white flex items-center justify-center gap-3 rounded-full overflow-hidden">
                                <img
                                    className='h-full object-fill cursor-pointer'
                                    src={product?.productImage[0]}
                                    alt={product?.category} />
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default CategoryList