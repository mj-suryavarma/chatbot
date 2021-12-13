import messageModel from "../models/messageModel.js";


export const CreateMessage = (req,res) => {

 
       const message = req.body;
   
       messageModel.create(message, (err, data) => {
           if (err) {
               res.status(500).send(err)
   
           } else {
                 res.status(201).send(`new message created: \n ${data}`)
           }
       })
   
   }
   



export const GetAllMessages = async (req,res) =>{
         
         const {from,to} = req.body;

        // console.log("user request ",from, "to is ", to)       
    //   await messageModel.find({from,to})
      await messageModel.find({})
       .then(resData => {
            //   console.log("res data is",resData)
                res.status(200).json(resData)

       })
       .catch(err =>{ 
        //    console.log("res erro is ",err)
           res.status(500).json({error : err})
    
    })
}
