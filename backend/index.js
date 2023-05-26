import express from "express";
import dotenv from 'dotenv';
import ConnectDB from "./config/db.js";
import UserRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json())
const PORT = process.env.PORT_URI || 4000 ;

dotenv.config();    

ConnectDB();

//Routing
app.use('/api/users', UserRoutes );


app.listen(PORT, () => {
    console.log('running', PORT)
})