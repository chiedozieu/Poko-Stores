import { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayNGNCurrency from "../utils/displayCurrency";

const AdminProductCard = ({productData, fetchData}) => {

    const [editProduct, setEditProduct] = useState(false)
  return (
    <div className="bg-white p-4 rounded group">
        <div className="w-40">
            <div className="w-32 h-32 flex items-center justify-center">
              <img src={productData?.productImage[0]}  alt="image" className="mx-auto object-fill h-full "/>
            </div>
            <h1 className="text-ellipsis line-clamp-2">{productData?.productName}</h1>
            <div className="">
                <p className="font-semibold ">
                  {
                    displayNGNCurrency(productData?.sellingprice)
                  }
                </p>
                <div className="cursor-pointer bg-green-100 hover:bg-green-700 hover:text-white rounded-full w-fit ml-auto p-1 " onClick={()=>setEditProduct(true)}>
                    <MdOutlineModeEditOutline />
                </div>
            </div>
        </div>
          {
            editProduct && 
             (<AdminEditProduct productEditData={productData} onClose={()=> setEditProduct(false )} fetchData={fetchData} />)
          }
   </div>
  )
} 

export default AdminProductCard