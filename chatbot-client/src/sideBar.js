import React, {useState} from 'react'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import{ Avatar,IconButton} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import SidebarChat from './sidebarChat';
import DefaultChat from './defaultChat';
import axios from 'axios';
import './sideBar.css'



function SideBar({userData}) {


   const ClickHandler = () => {

    localStorage.setItem('currentId', '61b43c3917232cd65b00f6af')
   }
   const DefaultHandler = () => { 
     localStorage.setItem('currentId', '61b493689f78dbbd66d10700')
  }

    return (
        <div className="sideBar">

              <div className="sidebar_header">
                         <Avatar src={userData.picture} />
{/* "https://media-exp1.licdn.com/dms/image/C4E03AQFqY0gYF50ZuA/profile-displayphoto-shrink_100_100/0/1638796210799?e=1644451200&v=beta&t=zHAQx7NGgDsmghMVUr-PmtILf32tjKzUKDX6_o4Rtjw" */}
                  <div className="sidebar_headerRight">
                         <IconButton>
                          <DonutLargeIcon />
                         </IconButton>
                         
                         <IconButton>
                       <ChatIcon />
                         </IconButton>

                         <IconButton>
                       <MoreVertIcon />
                         </IconButton>
                  </div>
                  
            </div>
             <div className="sidebar_search">
               <div className="sidebar_searchContainer">
                   <SearchOutlinedIcon />    
                      <input type="text" className="form-control" name="search" id="search" aria-describedby="helpId" placeholder="search contact" />
 
               </div>   
        </div>


        <div className="sidebar_chats">
            <div onClick={ClickHandler}>
            <SidebarChat userData={userData}  /> 
            </div>
            <div onClick={DefaultHandler}>
            <DefaultChat /> 
            </div>

        </div>

    </div>   
    )
}

export default SideBar
