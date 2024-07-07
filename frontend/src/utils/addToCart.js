import summaryApi from "../common";
import {toast} from 'react-toastify'

const addToCart = async (e, id) => {
     e?.stopPropagation();
     e?.preventDefault();
 
     try {
         const response = await fetch(summaryApi.addToCartProduct.url, {
             method: summaryApi.addToCartProduct.method,
             credentials: 'include',
             headers: { 'content-type': 'application/json' },
             body: JSON.stringify({ productId: id })
         });
 
         const responseData = await response.json();
          
         if (responseData.success) {
             toast.success(responseData.message);
         } 
         if(!responseData.success) {
             toast.error(responseData.message);
         }
         return responseData
         

     } catch (error) {
         toast.error("Network error, please try again.");
     }
 };

export default addToCart 