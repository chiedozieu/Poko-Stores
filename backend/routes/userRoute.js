import express from 'express';
import { AllUsers, updateUser, userDetails, userLogOut, userSignIn, userSignUp } from '../controllers/userController.js';
import { authToken } from '../middleware/authToken.js'
import { getProduct, uploadProduct } from '../controllers/productsController.js';


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




export default router;