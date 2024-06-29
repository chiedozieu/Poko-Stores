import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingprice: Number,
},
    {timestamps: true}
)

const ProductModel = mongoose.model('product', productSchema)

export default ProductModel