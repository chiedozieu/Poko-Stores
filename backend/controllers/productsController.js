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

// 2

export const getProduct = async (req, res) => {
    try {
        const allProduct = await ProductModel.find().sort({ createdAt: -1 })
        res.json({
            message: 'All Product',
            success: true,
            error: false,
            data: allProduct

        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error ,
            error: true,
            success: false,
        }); 
    }
}

export const updateProduct = async (req, res) => {
    try {
        if (!uploadProductPermission(req.userId)) {
            throw new Error('You do not have permission to upload')
        }

        const {_id, ...restBody} = req.body; // Use the spread operator to separate _id from the rest of the body
       
        //findByIdAndUpdate Parameters: findByIdAndUpdate(_id, update object, {new: true})
        const updateProduct = await ProductModel.findByIdAndUpdate(
            _id, // The first parameter is the document ID to find.
            restBody, // The second parameter is the update object.
            { new: true } // Set the 'new' option to true to return the updated document
        );

        
        res.json({
            message: 'Product updated successfully',
            data: updateProduct,
            success: true,
            error: false 
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        }); 
    }
}
