import mongoose from 'mongoose';

const googleShema = new mongoose.Schema({
       
    emailVerified : Boolean,
    name : String,
    email : String,
    picture : String,

})

export default mongoose.model("google-user",googleShema);
