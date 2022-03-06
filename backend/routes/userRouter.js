import express from 'express';
import { getUserProfile, signInWithEandP, signUpWithEandP, updateUserProfileInfo } from '../controller/userController.js';
import { authProtectionCheck } from '../middleware/localMiddleware.js';

const userRouter = express.Router();

userRouter.route('/signin').post(signInWithEandP);

userRouter.route('/signup').post(signUpWithEandP);

userRouter.route('/profile').get(authProtectionCheck, getUserProfile);

userRouter.route('/profile').put(authProtectionCheck, updateUserProfileInfo);

export default userRouter;
