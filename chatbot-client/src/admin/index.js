import React, {useEffect,useState} from 'react'
import Chat from './admin-chat';
import '../App.css';
import Pusher from 'pusher-js';
import axios from '../axios.js';



function AdminPanel() {
  
 const [messages, setMessages] = useState([]);
 const [userData, setUserData] = useState({});


 const findUser = async () => {
  
  const params = window.location.search;
  const id = new URLSearchParams(params).get('id') 

     await axios.get(`http://localhost:5000/api/v1/find/${id}`)
     .then(res => setUserData(res.data))
     .catch(err => console.log(err))

 }


//  async function fetchData () {

//           await axios.get('/api/v1/message/sync')
//                   .then((res) => {
//                     setMessages(res.data)
//                   }).catch((err) => {
//                     console.log(err)
//                   })
//  }



 useEffect(() => { 
    // fetchData();
    findUser()

   console.log("current user id is : fucking...",localStorage.getItem('currentId'))
 
  },[])
  
  useEffect(() => {

    const pusher = new Pusher('b32b4a8747fcbd39d94c', {
      cluster: 'ap2'
    });

       const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) =>{
      // alert(JSON.stringify(data));
            
      // fetchData();           
        }); 

        return () => {
        channel.unbind_all();
        channel.unsubscribe();
      }

},[messages]);



   console.log("messages :  ",messages)
   console.log("user data is  :  ",userData)
    
  return (
    <div className="App">  
        <div className="app_body">
        <Chat messages={messages} userData={userData} />
        </div>
    </div>
  );
}

export default AdminPanel;
