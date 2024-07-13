import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  
  return (
    <div className='h-[calc(100vh-220px)] overflow-y-scroll scrollbar-hidden'>
      <CategoryList />
      <BannerProduct />
      <VerticalCardProduct category={'mobiles'} heading={"Mobiles"}/>
      <HorizontalCardProduct category={'airpods'} heading={"Top Airpords"} /> 
      <HorizontalCardProduct category={'watches'} heading={"Popular Watches"} /> 

      <VerticalCardProduct category={'mouse'} heading={"Mouse"}/>
      <VerticalCardProduct category={'televisions'} heading={"TVs"}/>
      <VerticalCardProduct category={'camera'} heading={"Cameras"}/>
      {/* <VerticalCardProduct category={'watches'} heading={"Watches"}/> */}
      <VerticalCardProduct category={'speakers'} heading={"Bluetooth Speakers"}/>
      <VerticalCardProduct category={'earphones'} heading={"Earphones"}/>
      <VerticalCardProduct category={'refrigerator'} heading={"Refrigerator"}/>
      <VerticalCardProduct category={'trimmer'} heading={"Trimmers"}/>
      {/* <VerticalCardProduct category={'processor'} heading={"Processor"}/> */}
      {/* <VerticalCardProduct category={'printers'} heading={"Printers"}/> */}
    </div>
  )
}

export default Home