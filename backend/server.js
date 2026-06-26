import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/UserRoute.js';
import 'dotenv/config.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';



// app config
const app = express();

const port =process.env.PORT || 4000;

// middleware

app.use(express.json())
app.use(cors())

// db connection
connectDB();

// api enspoints

app.use("/api/food",foodRouter)  // use foodRouter for /api/food routes
app.use('/images', express.static('uploads')); // serve static files from the uploads directory
app.use('/api/user', userRouter); // use userRouter for /api/users routes
app.use('/api/cart',cartRouter)  
app.use('/api/order',orderRouter)




app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});



// mongodb+srv://sruthisuresh:04082002@cluster0.nmjsuqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0