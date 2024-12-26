import express from 'express';
const app = express();
import authRoutes from './routes/auth.route.js'

app.use("/api/v1/auth",authRoutes)

app.listen(5000,()=>{
    console.log(`server is running at http://localhost:5000`);
    
})
