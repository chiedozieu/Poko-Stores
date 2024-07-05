import React, { useEffect, useState } from 'react'
 import {useParams} from 'react-router-dom'
import summaryApi from '../common'

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

  console.log('product id', params)

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
  setData(dataResponse.data)
}

console.log('data', data)

useEffect(() => {
  fetchProductDetails()
}, [])

  return (
    <div className='container mx-auto p-4'>
      <div className="">

          {/* product image */}
          <div className="">
            
          </div>

           {/* product details  */}
          <div className="">

          </div>

      </div>
    </div>
  )
}

export default ProductDetails