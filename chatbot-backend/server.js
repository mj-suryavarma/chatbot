import express from 'express';
/// dotenv config
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
 
// import db
import { connectDB } from './db/connect.js';
 
import Pusher from 'pusher';
import mongoose from 'mongoose';
/// import routes
import messageRoutes from './routes/messageRoutes.js'
import googleRoutes from './routes/googleUser.js'
import notFound from './middleware/not-found.js';


/// app config
const app = express();
const port = process.env.PORT ||5000;
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors());


const pusher = new Pusher({
    appId: "1313777",
    key: "b32b4a8747fcbd39d94c",
    secret: "c05468ac77fea366934a",
    cluster: "ap2",
    useTLS: true
  });
  

const db = mongoose.connection;

db.once("open", () => {
    console.log("db connected......")

    const msgCollection = db.collection("messagecontents")
    const changeStream = msgCollection.watch();

    // console.log(changeStream);

    changeStream.on("change",(change) => {
        
        console.log("change ocuured ...... ",change)

        if(change.operationType === 'insert') {

            const messageDetails = change.fullDocument ;
            pusher.trigger("messages", "inserted" , {
                name : messageDetails.name,
                message : messageDetails.message,
                timestamp : messageDetails.timestamp,
                recieved: messageDetails.recieved,
            })

        } else {
            console.log("error on  trigger pusher .....");
        }




    })
})


//// routes
    
app.get('/', (req,res) => {
    res.status(200).send("hello world from backend");
})

app.use('/api/v1',messageRoutes);

app.use('/api/v1',googleRoutes);


//// middleware
app.use('*',notFound)
  

const start = () => {
     connectDB(process.env.MONGO_URI);
     app.listen(port , ()=>{
          
        console.log(`server listing on the port no ${port}`);
    })
    
   
}


/// app start point
start();