import express from 'express';
import { Mongoose } from 'mongoose';
import {createServer} from  "node:http";
import ServerURL from './environment.js';
import cors from 'cors';
import { Server } from 'socket.io';
import { connectToSocket } from './controllers/socketManager.js';

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
const httpServer = createServer(app);
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb', extended:true}));
main().then(() => { console.log("connection successful"); }).catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/SyncWave');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.get("/home",(req,res)=>{
    res.json({message:"Welcome to the Home Page"});
})



server.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});