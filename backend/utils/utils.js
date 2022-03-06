import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

function createJwtToken(payload) {
  dotenv.config();
  const maxAge = 60 * 60 * 24 * 5;
  const createdToken = jwt.sign({ id: payload }, process.env.JWT_SECRET, { expiresIn: maxAge });
  return createdToken;
}

export { createJwtToken };
