import express from 'express';
import reportRoutes from "./routes/reportRoutes.js"
import cors from "cors";
const app = express();

app.use(cors({
    origin:"*"
}))

const port = 5000;
const host = "0.0.0.0";

app.use(express.json());

app.use('/api/reports', reportRoutes)

app.listen(port, host, ()=>{
  
    console.log(`server is running on port ${port}`);
})