import UserModel from "../models/userModel.js"
import bcryptjs from 'bcryptjs';

export const userSignUp = async (req, res,) => {
    try {
         const {username, email, password} = req.body
         console.log('req.body:', req.body);

         if(!username){
            throw new Error("Please enter a username")
         }
         if(!email){
            throw new Error("Please enter an email")
         }
         if(!password){
            throw new Error("Please enter a password")
         }
         const hashedPassword = bcryptjs.hashSync(password, 10)

         const userData = new UserModel({
            username,
            email,
            password: hashedPassword
         })

         const savedUser = await userData.save()
         
         res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: 'User created successfully'
         })


    } catch (error) {
        res.json({
            message: error,
            error: true,
            success: false
        })
    }
}