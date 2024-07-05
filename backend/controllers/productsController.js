import ProductModel from "../models/productModel.js";
import { uploadProductPermission } from "../utils/permission.js";


// uploadProduct

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

// 2 getProduct

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


// 3 updateProduct

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


// 4 getCategory Product (First product from each category)

export const getCategoryProduct = async (req, res) => {
    try {
        const productCategory = await ProductModel.distinct('category')

        // array to store one product from each category

        const productByCategory = []
        
        
        for (const category of productCategory) {
            const product = await ProductModel.findOne({category})
            if(product){
                productByCategory.push(product)
            }
        }

        res.json({
            message: 'Category Product',
            data: productByCategory,
            success: true,
            error: false
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });   
    }
};

// 5 getCategory Product (all category)

export const getCategoryWiseProduct = async (reg, res) => {
    try {
        const { category } = reg?.body || req?.query
        const product = await ProductModel.find({ category })

        res.json({
            message: 'Category Products',
            data: product,
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });  
    }
}

// 6 get Product details )

export const getProductDetails = async (req, res) => {

    try {
        const { productId } = req.body 
    const product = await ProductModel.findById(productId)

    res.json({
         message: 'Product Details',
         data: product,
         success: true,
         error: false,
    })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });  
    }
}
