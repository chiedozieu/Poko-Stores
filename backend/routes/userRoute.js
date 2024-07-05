import express from 'express';
import { AllUsers, updateUser, userDetails, userLogOut, userSignIn, userSignUp } from '../controllers/userController.js';
import { authToken } from '../middleware/authToken.js'
import { getCategoryWiseProduct, getCategoryProduct, getProduct, updateProduct, uploadProduct, getProductDetails } from '../controllers/productsController.js';


const router = express.Router();

router.post('/signup', userSignUp)
router.post('/signin', userSignIn)
router.get('/user-details', authToken, userDetails)
router.get('/logout', userLogOut)

// Admin route

router.get('/all-users', authToken, AllUsers)
router.post('/update-user', authToken, updateUser)


// product routes

router.post('/upload-product', authToken, uploadProduct)
router.get('/get-product', getProduct)
router.post('/update-product', authToken, updateProduct)
router.get('/get-category-product', getCategoryProduct)
router.post('/category-product', getCategoryWiseProduct)
router.post('/product-details', getProductDetails)




export default router;