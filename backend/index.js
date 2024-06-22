import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/Db.js';
import router from './routes/userRoute.js';

dotenv.config() 


const app = express();
connectDB();

app.use(cors())
app.use(express.json());
app.use('/api', router)



const PORT = 8080 || process.env.PORT 

app.listen(PORT, ()=> {
    console.log(`Server is listening on port:${PORT}`)
})