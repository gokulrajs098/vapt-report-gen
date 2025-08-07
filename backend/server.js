import express from 'express';
import reportRoutes from "./routes/reportRoutes.js"

const app = express();


const port = 5000;

app.use(express.json());

app.use('/api/reports', reportRoutes)

app.listen(port, ()=>{
  
    console.log(`server is running on port ${port}`);
})