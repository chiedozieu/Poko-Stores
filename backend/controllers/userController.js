import UserModel from "../models/userModel.js"
import bcryptjs from 'bcryptjs';

export const userSignUp = async (req, res,) => {
    try {
         const {username, email, password} = req.body

         if(!username){
            throw new Error("Please enter a username")
         }
         if(!email){
            throw new Error("Please enter an email")
         }
         if(!password){
            throw new Error("Please enter a password")
         }
         const userExist = await UserModel.findOne({email})
         if(userExist){
            throw new Error("User already exists")
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
    } catch (err) {
        console.log('err',err.message);
        res.json({
            message: err.message || err ,
            error: true,
            success: false,
        });
    }
}