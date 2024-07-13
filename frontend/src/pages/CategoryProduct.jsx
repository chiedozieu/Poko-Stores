import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../utils/productCategory'
import VerticalSearchProductCard from '../components/VerticalSearchProductCard'
import summaryApi from '../common'

const CategoryProduct = () => {
 
    const [data, setData ] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()  

    const location = useLocation() 
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListInArray = urlSearch.getAll("category")
   
    const urlCategoryListObject = {}
    urlCategoryListInArray.forEach(elem => {
      urlCategoryListObject[elem] = true   
    });
 
    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const [sortBy, setSortBy] = useState()

   

    const fetchData = async () => { 
      const response = await fetch(summaryApi.filterProduct.url, {
        method: summaryApi.filterProduct.method,
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          category: filterCategoryList 
        })
      })

      const dataResponse = await response.json()
   
      setData(dataResponse?.data || [])
      
      
    }
     
    const handleSelectCategory = (e) => {
      const { value, checked } = e.target

      setSelectCategory({...selectCategory, [value]: checked})      
    }
    
    useEffect(() => {
      fetchData()
    }, [filterCategoryList])
   
  
    useEffect(() => {
      const arrayOfCategory = Object.keys(selectCategory).map((categoryKeyName) => {
        if(selectCategory[categoryKeyName]){
          return categoryKeyName 
        }
        return null
      }).filter(elem => elem)
       
      setFilterCategoryList(arrayOfCategory)
      
      // Format for url change when changed on the checkbox 
      const urlFormat = arrayOfCategory.map((elem, i )=> {
      if((arrayOfCategory.length - 1 ) === i){
      return `category=${elem}`
      }
      return `category=${elem}&&`
      })

     
      navigate('/category-product?'+ urlFormat.join(''))
      // category-product?category=camera&&category=mouse
    }, [selectCategory]);

    const handleOnChangeSortBy = (e) => {
      const { value } = e.target

      setSortBy(value)
      
      if (value === 'asc'){
        setData(prev => prev.sort((a, b) => a.sellingprice - b.sellingprice))
      }
      if (value === 'dsc'){
        setData(prev => prev.sort((a, b) => b.sellingprice - a.sellingprice))
      }
    };

    useEffect(() => {

    }, [sortBy])
 
     
  return (
    <div className='container mx-auto p-4'>

    {/* desktop version */}
    <div className="hidden md:flex gap-2 ">
        {/* left side */}
        <div className="bg-white p-2 flex-2 min-h-[calc(100vh-120px)] min-w-[200px] overflow-y-scroll">

        {/* sort by price */}
            <div className="">
              <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Sort by</h3>
              <form action="" className='text-sm flex flex-col gap-2 py-2'>

                <div className="flex items-center gap-3">
                  <input type="radio" name='sortBy' value={'asc'} checked={sortBy==='asc'} onChange={handleOnChangeSortBy}/>
                  <label htmlFor="">Price low-high</label>
                </div>

                <div className="flex items-center gap-3">
                  <input type="radio" name='sortBy' value={'dsc'} checked={sortBy==='dsc'} onChange={handleOnChangeSortBy}/>
                  <label htmlFor="">Price high-low</label>

                </div>
              </form>
            </div>  
                {/* filter by */} 
              <div className="">
              <h3 className='text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1'>Category</h3>
              <form action="" className='text-sm flex flex-col gap-2 py-2'>
                {
                  productCategory.map((categoryName, index) => {
                    return (
                      <div className="flex items-center gap-3" key={index}>
                        <input type="checkbox" name={"category"} value={categoryName?.value} id={categoryName?.value} checked={selectCategory[categoryName.value]} onChange={handleSelectCategory}/>
                        
                        <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                      </div>
                    )
                  })
                }                
              </form>
            </div>      
        </div>
 
        {/* right side (product) */} 
        <div className="flex-1 px-4">
        <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>
          <div className="h-[calc(100vh-200px)] overflow-y-scroll scrollbar-hidden">
            {
              data.length !==0  && (
                <VerticalSearchProductCard data={data} />
              )
              }
          </div>
        </div>
    </div>
         
    </div>
  )
}
export default CategoryProduct