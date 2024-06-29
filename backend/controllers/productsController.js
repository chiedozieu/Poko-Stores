import ProductModel from "../models/productModel.js";
import { uploadProductPermission } from "../utils/permission.js";


export const uploadProduct = async (req, res) => {
    try {
        const sessionUserId = req.userId

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error('You do not have permission to upload')
        }

        const uploadProduct = new ProductModel(req.body);
        const saveProduct = await uploadProduct.save()

        res.status(201).json(({
            message: 'Product uploaded successfully',
            success: true,
            error: false,
            data: saveProduct
        }))
    } catch (error) {
        res.status(400).json({
            message: error.message || error ,
            error: true,
            success: false,
        }); 
    }
}