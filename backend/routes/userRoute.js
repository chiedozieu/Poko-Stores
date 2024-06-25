import express from 'express';
import { userDetails, userSignIn, userSignUp } from '../controllers/userController.js';
import { authToken } from '../middleware/authToken.js'


const router = express.Router();

router.post('/signup', userSignUp)
router.post('/signin', userSignIn)
router.get('/user-details', authToken, userDetails)




export default router;