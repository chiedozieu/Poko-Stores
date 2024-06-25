
import jwt from 'jsonwebtoken'
export const authToken = (req, res, next) => {
    try {
       const token = req.cookies?.token 

       if(!token) {
        return res.status(200).json('User not signed in')    
       }

       jwt.verify(token, process.env.JWT_SECRET_KEY, function(error, decoded) {
        if(error) {
            console.log('error:', error)
        }
        
        req.userId = decoded?.id // if console log decoded = _id. use decoded?._id
        next()
      });

     


    } catch (error) {
        res.status(400).json({ 
            message: error.message || error,
            data: [],
            success: false,
            error: true
         })
    }

}