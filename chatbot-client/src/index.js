import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter , Routes, Route} from 'react-router-dom' 
import Home from './home.js';
import AdminPanel from './admin/index'


ReactDOM.render(
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />  
    <Route  path='/app' element={<App/>} />
    <Route  path='/admin/chat' element={<AdminPanel/>} />
    <Route path='*' element={
      <main>
        <h2 className='text-center'>There is nothing here!...</h2>
      </main>
    } />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
