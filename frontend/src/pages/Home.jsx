import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'

const Home = () => {
  return (
    <div className=''>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={'airpods'} heading={"Top's Airpords"} /> 
    </div>
  )
}

export default Home