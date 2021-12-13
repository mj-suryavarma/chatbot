import express from 'express';
const Router = express.Router();


// controller import 
import {CreateMessage, GetAllMessages} from '../controller/message.js';


Router.route('/message/new').post(CreateMessage);
Router.route('/message/sync').post(GetAllMessages);

export default Router;