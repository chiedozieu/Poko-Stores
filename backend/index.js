import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/Db.js';
dotenv.config()


const app = express();
connectDB();

app.use(cors())

const PORT = 8080 || process.env.PORT 


app.listen(PORT, ()=> {
    console.log(`Server is listening on port:${PORT}`)
})