import React ,{useState, useEffect,useRef}from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {
    MoreVert,
    InsertEmoticon,
    HeadsetMic,
    Mic,
    ArrowForwardRounded
} from '@material-ui/icons'
import './chat.css';
import axios from './axios.js';



function Chat({ userData}) {

  const [userInput, setUserInput] = useState("");
  const [messages , setMessages] = useState([]); 
  const currentUserId = localStorage.getItem('currentId')
  const messageEndRef = useRef(null);


  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({behavior :'smooth'})

  }
  

   useEffect(() =>{

    scrollToBottom()
  
  },
   [messageEndRef])

 async function fetchData () {

  const params = window.location.search;
  const id = new URLSearchParams(params).get('id') 
  
  const currentUserId = localStorage.getItem('currentId')

  
  
  if(currentUserId ==='61b43c3917232cd65b00f6af'){
 
  await axios.post('http://localhost:5000/api/v1/message/sync',
  {from : "61b43c3917232cd65b00f6af",
  to:"61b493689f78dbbd66d10700"
   })
          .then((resData) => { 
            setMessages(resData.data);

          }).catch((err) => {
            console.log(err)
          })
    }
    else if (currentUserId === '61b493689f78dbbd66d10700'){
  
      await axios.post('http://localhost:5000/api/v1/message/sync',{
        from: "61b493689f78dbbd66d10700",
          to : "61b43c3917232cd65b00f6af"
      })
              .then((res) => { 
                setMessages(res.data)
              }).catch((err) => {
                console.log(err)
              })
        }


  }

  //  const onScrollBottom = () =>{
  //    messageEndRef.current
  //  }  
   useEffect( () =>{
     
     fetchData();
     scrollToBottom();
   },[])   
  
  const sendMessage = async (e) => {
    e.preventDefault(); 
    
    window.scrollTo({ top:600, behavior:'smooth' })

  const currentUserId = localStorage.getItem('currentId')
    
    let userTimestamp = new Date();
   userTimestamp = userTimestamp.toUTCString();
    
   if(currentUserId ==='61b43c3917232cd65b00f6af'){
   
     await axios.post('/api/v1/message/new', {
      from : userData._id,
      to : "61b493689f78dbbd66d10700",
      message : userInput,
      timestamp : userTimestamp,
       
       }).then((res)=> console.log(res.data))
       .catch((err) => console.log(err));
       
        setUserInput("")
  
  }

  else if (currentUserId === '61b493689f78dbbd66d10700'){

    await axios.post('/api/v1/message/new', {
      from : "61b493689f78dbbd66d10700",
      to : userData._id,
      message : userInput,
      timestamp : userTimestamp,
       
       }).then((res)=> console.log(res.data))
       .catch((err) => console.log(err));
       
        setUserInput("")
        
  }  

  fetchData(); 
     scrollToBottom()

    
      }
 
  
       return (  <div className="chat">
           <div className="chat_header">
             <Avatar src={userData.picture} />
               <div className="chat_headerInfo">
                  <h3>{userData.name}</h3>
               </div>
               <div className="chat_headerRight"> 
                  <IconButton>
                  <HeadsetMic />
                  </IconButton>
                  
                  <IconButton>
                    <MoreVert />
                 </IconButton>
               </div>

           </div>

           <div className="chat_body">
              {Array.isArray(messages) ? messages.map((message) => (
                <p 
                className={`chat_message  ${currentUserId === message.from ?  'chat_reciever' : ''}`}
                 key={message._id}
                > 
                    <span className="chat_name">
                       {userData.name}
                    </span>     
                    {message.message}
                    <span className="chat_timestamp">
                    {message.timestamp}
                    </span>
                  </p>

              )) : ""}

            
            <div ref={messageEndRef} style={{ float:"left", clear: "both" }} />

           </div>
                
           <div className="chat_footer">
               <InsertEmoticon />
             <form class="form-group" onSubmit={sendMessage}>
               <input type="text" 
               className="form-control" 
               name="message" 
               id="message"
               autoComplete='off'
               value={userInput}
               onChange={(e)=> setUserInput(e.target.value)}
               aria-describedby="helpId" 
               required
               placeholder="some text message" 
                />
              <button className="btn_send_message">
                  <ArrowForwardRounded fontSize="medium" />
              </button> 
             </form>
             <Mic />
           </div>

        </div>
    )
}

export default Chat
