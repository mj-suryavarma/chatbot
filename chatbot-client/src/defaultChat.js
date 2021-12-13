import React from 'react';
import { Avatar } from '@material-ui/core';
import './defaultChat.css';

function DefaultChat() {
               
    const DefaultHandler = () => { 
        localStorage.setItem('currentId', '61b493689f78dbbd66d10700')
         window.location.reload();
     }
   

    return (
        <div className="sidebarChat" onClick={DefaultHandler}>
               <Avatar src="https://media-exp1.licdn.com/dms/image/C4E03AQFqY0gYF50ZuA/profile-displayphoto-shrink_100_100/0/1638796210799?e=1644451200&v=beta&t=zHAQx7NGgDsmghMVUr-PmtILf32tjKzUKDX6_o4Rtjw" />
                
               <div  className="sidebarChat_info">
                   <h2>Default Chating with developer</h2>
                  
               </div>       
        </div>
    )
}

export default DefaultChat
