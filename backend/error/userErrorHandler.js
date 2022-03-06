// There are multiple TYPEs of errors can potentially occus for auth process
// for signup process, you have both doc-validation (multiple cases) and async operation errors || for signin process, you have matching error and async oepration errors
// Therefore, you need to handle all cases + all types of errors

function signInErrorHandler(err) {
  if (err.message.includes('input error: ')) {
    return { customErrorMessage: err.message.substring(13) };
  }
  return { customErrorMessage: 'Something went wrong at our end, please try again later' };
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function signUpErrorHandler(err) {
  if (err.message.includes('validation failed')) {
    // this "err.code" is only for the case of duplicated email | the duplication error ONLY occurs under the absence of all other errors
    if (err.code) {
      return { email: 'Email already exist, please enter a different one' };
    }
    //--------------------------------------------------------------------------------
    const rawErrors = err.errors;
    const fieldNames = Object.keys(rawErrors);
    const errorMessages = Object.values(rawErrors).map((e) => {
      return e.message;
    });
    const customErrorObj = {};
    for (const i in fieldNames) {
      customErrorObj[fieldNames[i]] = errorMessages[i];
    }
    return customErrorObj;
  } else {
    return { customErrorMessage: 'Something went wrong at our end, please try again later' };
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function profileUpdateErrorHandler(err) {
  if (err.message.includes('validation failed')) {
    // this "err.code" is only for the case of duplicated email | the duplication error ONLY occurs under the absence of all other errors
    if (err.code) {
      return { customErrorMessage: 'Email already exist, please enter a different one' };
    }
    //--------------------------------------------------------------------------------
    const rawError = err.errors;
    const errorMessage = Object.values(rawError)[0].message;
    const customErrorObj = { customErrorMessage: errorMessage };
    return customErrorObj;
  } else if (err.message.includes('input error: ')) {
    return { customErrorMessage: err.message.substring(13) };
  } else {
    return { customErrorMessage: 'Something went wrong at our end, please try again later' };
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export { signUpErrorHandler, signInErrorHandler, profileUpdateErrorHandler };
