import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import { passWordValidator } from '../validator/dataBaseValidator.js';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter a username'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please enter an email'],
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter an password'],
      minlength: [8, 'password requires at least 8 characters'],
      validate: [passWordValidator, 'password must contain at least one number and one uppercase letter'],
    },
    isOwner: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
