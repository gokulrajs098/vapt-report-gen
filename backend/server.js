import express from 'express';
import reportRoutes from "./routes/reportRoutes.js"
import cors from "cors";
const app = express();

app.use(cors({
    origin:"http://localhost:5173"
}))

const port = 5000;

app.use(express.json());

app.use('/api/reports', reportRoutes)

app.listen(port, ()=>{
  
    console.log(`server is running on port ${port}`);
})