import express from 'express';
import {loginUser, registerUser} from '../controllers/UserController.js';

const userRouter = express.Router();

// user registration route

userRouter.post('/register', registerUser);

// user login route
userRouter.post('/login', loginUser);

export default userRouter;