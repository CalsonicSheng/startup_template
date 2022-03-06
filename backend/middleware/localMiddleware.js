import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserCollection from '../models/userModel.js';

// this local middleware function MUST BE USED for ALL PROTECTED ROUTE THAT REQUIRES AUTHENTICATION | this middleware function will be executed first
// all the axios request sent to fetch all the protected resources must include "headers" config with token for verification
// this middleware should handle all the potential verification error
// if error exist:
// 1. either jwt does not exist
// 2. jwt verification fail
// 3. user can not find
// either one of the situation, should all be going back to signin page and remove the userlocalstate to resigning or resignup

async function authProtectionCheck(req, res, next) {
  dotenv.config();

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const receivedToken = req.headers.authorization.split(' ')[1];
      const decodedData = jwt.verify(receivedToken, process.env.JWT_SECRET);
      req.targetUser = await UserCollection.findById(decodedData.id);
      next();
    } catch (error) {
      res.status(401).json({ redirect: '/signin' });
    }
  } else {
    res.status(401).json({ redirect: '/signin' });
  }
}

export { authProtectionCheck };
