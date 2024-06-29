import { useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";

const AdminProductCard = ({product}) => {

    const [editProduct, setEditProduct] =useState(false)
  return (
    <div className="bg-white p-4 rounded group">
        <img src={product?.productImage[0]} width={120} height={120} alt="image" />
        <h1>{product?.productName}</h1>

        <div className="cursor-pointer bg-green-100 hover:bg-green-700 text-white rounded-full w-fit ml-auto p-1 ">
            <MdOutlineModeEditOutline />
        </div>

        <AdminEditProduct />
   </div>
  )
}

export default AdminProductCard