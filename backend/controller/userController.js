import { profileUpdateErrorHandler, signInErrorHandler, signUpErrorHandler } from '../error/userErrorHandler.js';
import UserCollection from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { createJwtToken } from '../utils/utils.js';

// NOTE: ONLY SUCCESSFUL SIGNIN or SIGNUP PROCESS WILL GENERATE JWT and included as part of "userObject", AND SEND BACK to frontend redux store to receive
async function signInWithEandP(req, res) {
  const { email, password } = req.body;
  try {
    const targetUser = await UserCollection.findOne({ email: email });
    if (targetUser) {
      const passwrodMatchResult = await bcrypt.compare(password, targetUser.password);
      if (passwrodMatchResult) {
        const userObject = { ...targetUser.toObject(), token: createJwtToken(targetUser._id) };
        // res.cookie('jwt', createJwtToken(targetUser._id), { maxAge: 60 * 60 * 24 * 5 * 1000, httpOnly: true });
        res.status(200).json(userObject);
        return;
      }
      throw new Error('input error: Password incorrect, please try again later');
    }
    throw new Error('input error: We could not find your email, please try again');
  } catch (error) {
    const customErrorObj = signInErrorHandler(error);
    res.status(401).json(customErrorObj);
  }
}

//-----------------------------------------------------------------------------------------------------------

async function signUpWithEandP(req, res) {
  const { email, password } = req.body;
  try {
    await UserCollection.create(req.body); // create new doc under "User" collection and auto carry out ALL validation checks and will return error if any one of the validation fails
    const targetUser = await UserCollection.findOne({ email: email }); // find this newly added doc again
    targetUser.password = await bcrypt.hash(password, 10); // now, update the password field to hash value
    await targetUser.save(); // save into collection
    const userObject = { ...targetUser.toObject(), token: createJwtToken(targetUser._id) };
    // res.cookie('jwt', createJwtToken(targetUser._id), { httpOnly: true, maxAge: 60 * 60 * 24 * 5 * 1000 });
    res.status(200).json(userObject);
  } catch (error) {
    const customErrorObj = signUpErrorHandler(error);
    res.status(401).json(customErrorObj);
  }
}

//-------------------------------------------------------------------------------------------------------------

async function getUserProfile(req, res) {
  const targetUser = req.targetUser;
  const userObject = targetUser.toObject();
  res.status(200).json(userObject);
}

//-------------------------------------------------------------------------------------------------------------

async function updateUserProfileInfo(req, res) {
  const originalUserObject = req.targetUser.toObject();

  try {
    const fieldKey = Object.keys(req.body)[0];
    const updateInput = req.body[fieldKey];
    const targetUser = req.targetUser;

    //--------------------------------------------------------

    if (fieldKey === 'password') {
      const currentPasswrodMatchResult = await bcrypt.compare(updateInput[0], targetUser.password);
      const newPasswordMatchingResult = updateInput[1] === updateInput[2];
      if (!currentPasswrodMatchResult) {
        throw new Error('input error: Your current password does not match, please try again');
      }
      if (!newPasswordMatchingResult) {
        throw new Error('input error: Your new password does not match with each other, please try again');
      }
      if (currentPasswrodMatchResult && newPasswordMatchingResult) {
        targetUser[fieldKey] = updateInput[1];
        await targetUser.save();
        targetUser[fieldKey] = await bcrypt.hash(updateInput[1], 10);
        await targetUser.save();
      }
    } else {
      targetUser[fieldKey] = updateInput;
      await targetUser.save();
    }

    //--------------------------------------------------------

    const userObject = targetUser.toObject();
    userObject.updateSuccessMessage = `"${fieldKey}" updated successfully!`;
    res.status(200).json(userObject);
  } catch (error) {
    originalUserObject.customErrorMessage = profileUpdateErrorHandler(error).customErrorMessage;
    res.status(400).json(originalUserObject);
  }
}

//-------------------------------------------------------------------------------------------------------------

export { signUpWithEandP, signInWithEandP, getUserProfile, updateUserProfileInfo };
