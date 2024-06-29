import { useState } from "react";
import UploadAllProduct from "../components/UploadAllProduct";




const AllProducts = () => {
  const [openUploadAllProduct, setOpenUploadAllProduct] = useState(false);
  return (
    <div>
        <div className="bg-white py-2 px-4 flex justify-between items-center ">
          <h2 className='font-bold text-lg'>All Products</h2>

          <button onClick={() => setOpenUploadAllProduct(true)} 
          className='border-2 p-1 px-3 border-red-700 text-red-700 cursor-pointer hover:bg-red-700   hover:text-white rounded-md transition-all'>Upload Products</button>
        </div>

        {/* upload product component */}
        {
          openUploadAllProduct && (
            <UploadAllProduct onClose={()=> setOpenUploadAllProduct(false)}/>
          )
        }
    </div>
  )
}

export default AllProducts 