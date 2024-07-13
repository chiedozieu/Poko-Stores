import React, { useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom'
import summaryApi from '../common'
import VerticalSearchProductCard from '../components/VerticalSearchProductCard'

const SearchProducts = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)


    const fetchProduct = async () =>{
        setLoading(true)
        const response = await fetch(summaryApi.searchProduct.url+query.search)
        const responseData = await response.json()
        setLoading(false)
        setData(responseData.data)
        
    }

    useEffect (()=> {
        fetchProduct()
    }, [query])
  return (
    <div className='container mx-auto p-4 h-[calc(100vh-120px)] overflow-y-scroll scrollbar-hidden'>
    {
        loading && (
            <p className='text-lg text-center'>Loading...</p>
        )
    }

        <p className='text-lg font-medium px-2'>Search Results: {data.length}</p>
        {
            data.length === 0 && !loading && (
                <p className='bg-white text-lg text-center p-4'>No Data Found</p>
            )
        }

        {
            data.length !== 0 && !loading && (
                 
                        <div className="">
                            <VerticalSearchProductCard data={data}/>
                        </div>         
            )
        }
     </div>
  )
}

export default SearchProducts 