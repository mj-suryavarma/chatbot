import {OAuth2Client} from 'google-auth-library';
import googleUserModel from '../models/google-user-model.js';


const client = new OAuth2Client('568221959001-slj1kqrk0175a1ih5tjafneeec1uitaf.apps.googleusercontent.com')


export const getUserInfo = (req, res) => {

    const {tokenId} = req.body;
    console.log("this is tokenid : ",tokenId);
    
   client.verifyIdToken({idToken : tokenId, audience: '568221959001-slj1kqrk0175a1ih5tjafneeec1uitaf.apps.googleusercontent.com'}).then(resData => {
       const {email_verified, name, picture, email} = resData.payload;
        
       console.log("email verified",email_verified, "name",name,"email",email, picture)

       if(email_verified && name && picture && email){

             googleUserModel.findOne({emailVerified: email_verified, name, picture, email})
              .then(createdRes =>{
                  if(createdRes === null){

                    googleUserModel.create({emailVerified : email_verified, name, picture, email})
         .then(createdRes =>{             
             res.status(200).json({data : createdRes})
         })
         .catch(error => console.log(error))

                }else{
                    res.status(200).json({ data: createdRes})
                    console.log(createdRes)
                  }
                 })
              .catch(err => console.log(err))

        }
       else{
             res.status(400).json({error : "google user verification failed please another menthod....."})
       }
    })
    .catch(err => console.log(err));
 
}


export const FindGoogleUser = (req,res) => {
    const {params : {id : userId}} = req

    googleUserModel.findOne({_id :userId})
    .then(resData => {
        res.status(200).json(resData)
    }).then(err => {
        console.log(err)
    })

    
}


export const createGoogleUser = (req, res) => {

 
    const {tokenId} = req.body;
    console.log("this is tokenid : ",tokenId);
    
   client.verifyIdToken({idToken : tokenId, audience: '568221959001-slj1kqrk0175a1ih5tjafneeec1uitaf.apps.googleusercontent.com'}).then(resData => {
       const {email_verified, name, picture, email} = resData.payload;
        

       if(email_verified && name && picture && email){
                 
         googleUserModel.create({emailVerified : email_verified, name, picture, email})
         .then(res => console.log("google user created : ",res.data))
         .catch(err => console.log(err))

       }
        else{
        res.status(400)
        .json({error : "google user verification failed please another menthod....."})
  }

    })
}
