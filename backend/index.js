import express from "express";
import dotenv from 'dotenv';
import ConnectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from 'cors';

const app = express();
app.use(express.json())
const PORT = process.env.PORT_URI || 4000 ;

dotenv.config();    

ConnectDB();

const whiteList = [process.env.FRONTEND_URL];
console.log(whiteList[0], 'hola')

const corsOptions = {
    origin: function (origin, callback) {
        if(whiteList.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Error Cors'))
        }
    }
}

app.use(cors(corsOptions))

//Routing
app.use('/api/users', userRoutes );
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);


const server = app.listen(PORT, () => {
    console.log('running', PORT)
})

//SOCKET IO
import {Server} from 'socket.io'

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: '*',
    },

});

io.on('connection', (socket) => {
    console.log('connected to socket io');


    //define your socket io's events

    //receive info from the frontend 
   socket.on('open project', (projectId) => {
        socket.join(projectId);
    
    })

    socket.on('new task', (task) => {       
        socket.to(task.data.project).emit('task added', task.data)
    })
    socket.on('delete task', (task) => {     
        console.log(task)  

        
        socket.to(task.project._id).emit('task deleted', task)
    })


}) 
