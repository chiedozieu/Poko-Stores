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


