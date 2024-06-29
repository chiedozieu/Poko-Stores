import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import productCategory from "../utils/productCategory";
import { PiUploadSimpleThin } from "react-icons/pi";
import uploadImage from "../utils/uploadImage.js";
import DisplayImage from "./DisplayImage.jsx";
import { MdDelete } from "react-icons/md";
import summaryApi from "../common/index.js";
import {toast} from 'react-toastify'

const UploadAllProduct = ({onClose}) => {
    const [formData, setFormData] = useState({
        productName: '',
        brandName: '',
        category: '',
        productImage: [],
        description: '',
        price: '',
        sellingprice: '',
    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState('')

    const handleOnChange = (e) => {
        const {name , value} = e.target
        setFormData((prev) => {
            return {
                ...prev,
                 [name] : value
            }  
        })
    };

    const handUploadAllProduct = async (e) => {
        const file = e.target.files[0];
        
        const uploadImageCloudinary = await uploadImage(file)

        setFormData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }  
        })
    }

    const handleDeleteProductImage = async (index) => {
        console.log('index', index )
        const newProductImage = [...formData.productImage]; // copy of existing product image
        newProductImage.splice(index, 1)

        setFormData((prev) => {
            return {
                ...prev,
                productImage: [...newProductImage]         
            }  
        })  
    };

    const handleSubmit = async (e) =>  {
        e.preventDefault();
       
        const response = await fetch(summaryApi.uploadProduct.url, {
            method:summaryApi.uploadProduct.method,
            credentials: 'include',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(formData)
        })
        const data = await response.json(); 

        if(data.success){
            toast.success(data?.message)
            onClose()
        }
        if(data.error){
            toast.error(data?.message)
        }
    }  

    return (
        <div className="fixed bg-slate-200 bg-opacity-55 w-full h-full top-0 bottom-0 right-0 left-0 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">

                <div className="flex justify-between pb-3">
                        <h2 className="font-bold text-lg">Upload Product</h2>
                        
                        <div className="w-fit ml-auto text-red-500 cursor-pointer hover:text-red-800 hover:scale-110 transition-all duration-75" onClick={onClose}>
                            <IoIosCloseCircleOutline size='25'/> 
                        </div> 
                </div>

                <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
                    <label htmlFor="productName">Product Name:</label>
                    <input 
                    type="text" id="productName" 
                    placeholder="Enter product name"
                    name="productName"
                    onChange={handleOnChange} 
                    value={formData.productName}
                    className="p-2 bg-slate-100 rounder"
                    required
                    />

                    <label htmlFor="brandName" className="mt-3">Brand Name:</label>
                    <input 
                    type="text" id="brandName" 
                    placeholder="Enter brand name"
                    name="brandName"
                    onChange={handleOnChange} 
                    value={formData.brandName}
                    className="p-2 bg-slate-100 rounder"
                    required
                    />

                    <label htmlFor="category " className="mt-3">Category:</label>
                    <select required value={formData.category} name="category" className="p-2 bg-slate-100 rounder" onChange={handleOnChange}>
                    <option value= {''}>select Category</option>
                         {
                            productCategory.map((pCat,index)=> {
                                return (
                                    <option value={pCat.value} key={pCat.value+index}>{pCat.label}</option>
                                )
                            })
                         }
                    </select>

                    <label htmlFor="productImage" className="mt-3">Product Image:</label>
                    <label htmlFor="uploadImageInput">
                        <div className="p-1 bg-slate-100 border rounded w-full h-32 flex justify-center items-center cursor-pointer">
                                <div className="text-slate-500 cursor-pointer flex justify-center items-center flex-col gap-2">
                                    <span className="text-4xl">
                                        <PiUploadSimpleThin />
                                    </span>
                                    <p className="text-sm">Upload Product Image</p>
                                    <input type="file" id="uploadImageInput" hidden onChange={handUploadAllProduct}/>
                                </div>
                        </div>
                    </label>
                    <div className=""> 
                    {
                        formData?.productImage[0]? (
                            <div className="flex items-center gap-2 h-20 overflow-hidden">
                                {

                                    formData.productImage.map((pImage, index) => {
                                        return (
                                        <div className="relative group">
                                            <img
                                                src={pImage} alt={pImage}
                                                onClick={()=> {
                                                    setOpenFullScreenImage(true)
                                                    setFullScreenImage(pImage)
                                                }}
                                                width={80} height={80}
                                                className="bg-slate-100 border cursor-pointer" />
                                            <div className="absolute bottom-0 right-0 bg-red-700 text-white rounded-full cursor-pointer p-1 text-xs hidden group-hover:block" onClick={()=> handleDeleteProductImage(index)}>
                                                <MdDelete  className=""/>
                                            </div>
                                        </div>
 
                                        )
                                    })
                                }
                            </div>

                        ) : (
                            <p className="text-red-700 text-xs">*Please upload product image</p>
                        )
                    }
                    </div>
                    <label htmlFor="price">Price:</label>
                    <input 
                        type="number" id="price" 
                        placeholder="Enter price "
                        name="price"
                        onChange={handleOnChange} 
                        value={formData.price}
                        required
                        className="p-2 bg-slate-100 rounder"
                    />
                    <label htmlFor="sellingprice">Selling Price:</label>
                    <input 
                        type="number" id="sellingprice" 
                        placeholder="Enter selling price "
                        name="sellingprice"
                        onChange={handleOnChange} 
                        value={formData.sellingprice}
                        required
                        className="p-2 bg-slate-100 rounder"
                    />

                    <label htmlFor="description">Description:</label>
                    <textarea name="description" rows={3} className="bg-slate-100 h-28 border resize-none p-2" placeholder="Enter product description" onChange={handleOnChange}>

                    </textarea>

                     
                    <button className='text-center bg-red-700 px-3 py-2 mb-10 hover:bg-red-800 cursor-pointer rounded-md text-white'>Upload Product</button>

                </form>
            
            </div> 
            {/* Display Image full */}
            {
                openFullScreenImage &&
            <DisplayImage onClose={()=> setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
            }


        </div>
    )
}
export default UploadAllProduct  