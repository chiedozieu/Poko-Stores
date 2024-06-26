import express from 'express';
import { AllUsers, userDetails, userLogOut, userSignIn, userSignUp } from '../controllers/userController.js';
import { authToken } from '../middleware/authToken.js'


const router = express.Router();

router.post('/signup', userSignUp)
router.post('/signin', userSignIn)
router.get('/user-details', authToken, userDetails)
router.get('/logout', userLogOut)

// Admin route

router.get('/all-users', authToken, AllUsers)




export default router;