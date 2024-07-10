import UserModel from "../models/userModel.js"
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 1 Register New User


export const userSignUp = async (req, res,) => {
    try {
         const {username, email, password, profilePic} = req.body

         if(username.length < 5){

            throw new Error('Username must be at least 5 characters')
         }
         
         if(password.length < 5){

            throw new Error('Password must be at least 5 characters')
         }
         

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
            password: hashedPassword,
            profilePic,
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

// 2 Login registered user /Add cookie

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

      const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

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
 
// 3 Getting a user details

export const userDetails = async (req, res,) => {
   try {
      // console.log('userId', req.userId)
       const user = await UserModel.findById(req.userId);
       res.status(200).json({
         data: user,
         success: true,
         error:false,
         message: 'User details'
       })

   } catch (error) { 
       
       res.status(400).json({
           message: error.message || error ,
           error: true,
           success: false,
       });
   }
}

// 4 Logout user

export const userLogOut = async (req, res) => {
   try {
      res.clearCookie('token');

      res.json({
         message: 'User logged out',
         success: true,
         error: false,
      })
   } catch (error) {
      res.json({
         message: error.message || error ,
         error: true,
         success: false,
     });  
   }

};


// 5 Getting all users

export const AllUsers = async (req, res) => {
   try {
      const allUsers = await UserModel.find({})
     
      
      res.json({ 
         message: 'All users',
         data: allUsers,
         success: true,
         error: false
      })
      
   } catch (error) {
      res.status(400).json({
         message: error.message || error ,
         error: true,
         success: false,
     }); 
   }
} 

// 6 update user

export const updateUser = async (req, res) => {
   try {
      const sessionUser = req.userId
      const { userId, email, username, role } = req.body

      const payload = {
         ...(email && {email: email}),
         ...(username && {username: username}),
         ...(role && {role: role})
      }
      const user = await UserModel.findById(sessionUser)

      console.log('user.role', user.role)

      const updateUser = await UserModel.findByIdAndUpdate(userId, payload)

      res.json({
         data: updateUser, 
         message: 'user updated',
         success: true,
         error: false
      })
      
   } catch (error) {
      res.status(400).json({
         message: error.message || error ,
         error: true,
         success: false,
     }); 
   }
}