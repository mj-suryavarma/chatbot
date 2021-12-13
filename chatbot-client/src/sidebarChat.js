import React from 'react';
import { Avatar } from '@material-ui/core';
import './sidebarChat.css';

function SidebarChat({userData}) {
             

    const ClickHandler = () => {
        localStorage.setItem('currentId', '61b43c3917232cd65b00f6af')
        window.location.reload();

       }

       return (
        <div className="sidebarChat" onClick={ClickHandler}>
               <Avatar src={userData.picture} />

               <div  className="sidebarChat_info">
                   <h2>{userData.name}</h2> 
               </div>       
        </div>
    )
}

export default SidebarChat
