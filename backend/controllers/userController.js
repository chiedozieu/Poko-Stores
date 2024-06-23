import UserModel from "../models/userModel.js"
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


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
            role: 'GENERAL',
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
            message: error.message || error ,
            error: true,
            success: false,
        });
    }
}

export const userSignIn = async (req, res) => {
   const {email, password} = req.body;

   try {
      
      if(!email || !password) {
         throw new Error('Please provide valid credentials');
      }
      
      const validUser = await UserModel.findOne({email})
      if(!validUser) {
         throw new Error('Please provide valid credentials or sign up');
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password); 
      if(!validPassword) {
         throw new Error('Provide valid credentials or sign up');
      }
      const tokenData = {id: validUser._id, email: validUser.email}

      const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '8h' });

      const tokenOptions = {
         httpOnly: true,   
         secure: true,
      }
res.cookie("token", token, tokenOptions).json({
   message: 'Login successful',
   data: token,
   success: true,
   error:false

});
   } catch (error) {
      res.json({
         message: error.message || error ,
         error: true,
         success: false,
     });
   }



}