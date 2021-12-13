import express from 'express'
const Router = express.Router();
import {getUserInfo, FindGoogleUser, createGoogleUser}  from '../controller/googleAuth.js'



Router.route('/google/auth').post(getUserInfo);
Router.route('/find/:id').get(FindGoogleUser);
Router.route('/create/user').post(createGoogleUser);


export default Router;
