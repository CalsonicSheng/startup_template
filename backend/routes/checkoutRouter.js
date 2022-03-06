import express from 'express';
import { getCheckout } from '../controller/checkoutController.js';
import { authProtectionCheck } from '../middleware/localMiddleware.js';

const checkoutRouter = express.Router();

checkoutRouter.route('/').get(authProtectionCheck, getCheckout);

export default checkoutRouter;
