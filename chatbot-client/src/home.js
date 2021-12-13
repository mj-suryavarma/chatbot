import React, {useState} from 'react';
import whatsappLogo from './whatsappLogo.png';
import {GoogleLogin} from 'react-google-login'
import { ArrowForwardOutlined} from '@material-ui/icons'
import axios from 'axios';
import './home.css';


function Home() {

   const [userData, setUserData] = useState({})

    const responseSuccessGoogle = (response) => {

           axios({
               method:'post',
               url : 'http://localhost:5000/api/v1/google/auth',
               data : {  tokenId : response.tokenId  }

           })
           .then(res => {
                     setUserData(res.data.data) 
                         console.log(res.data)
               if(res.data.data.emailVerified){
                    window.open(`/app?id=${res.data.data._id}`,"self")
                    
               }else if(res.data.verification){
                    console.log("something went wrong...")
               }else{
                console.log("something went wrong...")
           }
        })
           .catch(err => console.log(err))
           
    }

      const responseFailureGoogle = (response) => {
              console.log(response)
      }

      console.log(userData);

    return (
        <div className="home_page">
            <div className='container home_container'>
                <img src={whatsappLogo} alt="whatsapp logo" className="whatsapp_logo"/>
                 <div className='login_container'> 
                   <form className="form manual_login"> 
                    <div className="form-group mt-3">
                      <label htmlFor="email">Email</label>
                      <input type="text" 
                      className="form-control"
                       name="email" 
                       id="email" 
                       required
                       autoComplete='false'
                       aria-describedby="helpId" 
                       placeholder="" />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="password">Password</label>
                      <input type="password"
                       className="form-control"
                       name="password"
                        id="email" 
                        autoComplete='false'
                        aria-describedby="helpId" 
                        placeholder=""
                        required
                       />
                    </div>
                          <button className='btn btn-submit mt-3 btn-primary'>
                          Submit
                          </button>
                   </form>
                   <hr />
                      <div className='google_login'>
                         <GoogleLogin 
                          clientId='568221959001-slj1kqrk0175a1ih5tjafneeec1uitaf.apps.googleusercontent.com'
                          buttonText='Login'
                          render={renderProps => (
                              <button onClick={renderProps.onClick} disabled={renderProps.disabled}
                              className=' btn mt-4 btn-primary text-light custom_google_login'> 
                          <ArrowForwardOutlined/>    continue with google </button>
                              )}
                          onSuccess={responseSuccessGoogle}
                          onFailure={responseFailureGoogle}
                          cookiePolicy={'single_host_origin'} 
                         />
                      </div>

                 </div>
            </div>
        </div>
    )
}

export default Home
