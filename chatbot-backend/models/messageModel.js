import mongoose from 'mongoose';


const whatsappShema = new mongoose.Schema({
    from : String,
    to : String,
    message : String,
    timestamp : String,
});

export default mongoose.model("messagecontents", whatsappShema);


