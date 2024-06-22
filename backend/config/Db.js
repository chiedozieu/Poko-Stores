import mongoose from "mongoose";

async function connectDB (){
    try {
       await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDb connection established')
        
    } catch (error) {
       console.log(error)
       process.exit(1);
 
    }
}

export default connectDB;

