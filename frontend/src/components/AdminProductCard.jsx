import { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";

const AdminProductCard = ({productData, fetchData}) => {

    const [editProduct, setEditProduct] = useState(false)
  return (
    <div className="bg-white p-4 rounded group">
        <img src={productData?.productImage[0]} width={120} height={120} alt="image" />
        <h1>{productData?.productName}</h1>

        <div className="cursor-pointer bg-green-100 hover:bg-green-700 hover:text-white rounded-full w-fit ml-auto p-1 " onClick={()=>setEditProduct(true)}>
            <MdOutlineModeEditOutline />
        </div> 
          {
            editProduct && 
             (<AdminEditProduct productEditData={productData} onClose={()=> setEditProduct(false )} fetchData={fetchData} />)
          }
   </div>
  )
} 

export default AdminProductCard