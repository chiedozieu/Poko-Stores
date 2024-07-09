import addToCartModel from "../models/cartProduct.js";

export const addToCart = async (req, res) => {
    try {
        const {productId} =req?.body
        const currentUser = req.userId

        const isProductAvailable = await addToCartModel.findOne({productId})

        if (isProductAvailable){
            return res.json({
                message: 'Product already available in Cart',
                success: false,
                error: true
            })
        }

        
        const payload = {
            productId: productId,
            quantity : 1, 
            userId : currentUser 
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = newAddToCart.save()

       return  res.json({
            data: saveProduct,
            message: 'Product added in cart',
            success: true,
            error: false,
            
        })

    } catch (error) {
        res.status(400).json({
            message: error?.message || error ,
            error: true,
            success: false,
        }); 
    }
};


// 2 add to cart count

export const countAddToCartProduct = async (req, res) => {
    try {
        const userId = req.userId
        const count = await addToCartModel.countDocuments({
            userId: userId
        })

        res.json({
            data: { count: count},
            message: 'ok',
            success: true,
            error: false           
        })



    } catch (error) {
        res.status(400).json({
            message: error?.message || error ,
            error: true,
            success: false,
        }); 
    }
}


// 3 View product in add cart 

export const AddToCartViewProduct  = async (req, res) => {
    try {
       
        const currentUser = req.userId

        const allProduct = await addToCartModel.find({
            userId: currentUser,
        }).populate('productId')

        res.json({
            data: allProduct,
            success: true,
            error: false
        })

    } catch (error) {
        res.status(400).json({
            message: error?.message || error ,
            error: true,
            success: false,
        }); 
    }
}

// 4 update add cart 

export const updateAddToCartProduct  = async (req, res) => {
    try { 
       
        const currentUserId = req.userId
        const addToCartProductId = req?.body?._id

        const qty = req.body.quantity

        const updateProduct = await addToCartModel.updateOne({_id: addToCartProductId}, {
          ...(qty && {quantity : qty})
        })

        res.json({
            message: 'Product updated successfully',
            data: updateProduct,
            success: true,
            error: false
        })

    } catch (error) {
        res.status(400).json({
            message: error?.message || error ,
            error: true,
            success: false,
        }); 
    }
}

// 5 delete item in add cart 

export const deleteAddToCartProduct  = async (req, res) => {
    try { 
        const currentUserId = req.userId
        const addToCartProductId = req?.body?._id

        const deleteProduct = await addToCartModel.deleteOne({_id: addToCartProductId  })

        res.json({
            message: 'Product deleted successfully',
            success: true,
            error: false,
            data: deleteProduct
        })
        

    } catch (error) {
        res.status(400).json({
            message: error?.message || error ,
            error: true, 
            success: false,
        }); 
    }
}







