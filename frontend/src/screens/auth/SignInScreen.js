import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import { userSliceActions, signInWithEandP } from '../../state_slice/userSlice';
import classes from './customStyle.module.css';

export default function SignInScreen() {
  const fallBackPath = useLocation().state.pathBeforeAuth; // this fallback path is used to redirect to previous path if user (signin) is success
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //-------------------------------------------------------------------------

  const [emailInput, setEmailInput] = useState('');

  const [passwordInput, setPasswordInput] = useState('');

  const { userState } = useSelector((state) => {
    return state.userReducer;
  });

  //-------------------------------------------------------------------------

  function emailInputHandler(e) {
    setEmailInput(e.target.value);
  }

  function passwordInputHandler(e) {
    setPasswordInput(e.target.value);
  }
  //-------------------------------------------------------------------------

  function signInHandler() {
    dispatch(signInWithEandP({ email: emailInput, password: passwordInput }));
  }

  //-------------------------------------------------------------------------

  // function is ONLY triggered to redirect to last path before userentication ONLY WHEN signin success
  // note, once signin is success, the header will also update to replace the signin link with profile link (you can NOT EVEN go to signin screen anymore --> every important)

  useEffect(() => {
    if (userState.authSuccess) {
      navigate(fallBackPath);
    }
  }, [userState, fallBackPath, navigate]);

  // this is to reset the user status state for each "FIRST TIME" SIGNIN COMPONENT IS LOADED
  useEffect(() => {
    dispatch(userSliceActions.userStateReset());
  }, [dispatch]);

  //-------------------------------------------------------------------------

  return (
    <>
      <div className="container w-50">
        <h2>Sign in</h2>
        <form className="mt-5">
          <div className="mb-4">
            <label className="mb-2">Email Address</label>
            <Input type="email" onChange={emailInputHandler} />
          </div>
          <div className="mb-4">
            <label className="mb-2">Password</label>
            <Input type="password" onChange={passwordInputHandler} />
          </div>

          <p className="m-0 mb-3">
            Don't have an account?
            <Link to="/signup" className={`ms-2 ${classes['text-custom']}`} state={{ pathBeforeAuth: fallBackPath }}>
              sign up now
            </Link>
          </p>

          {userState.authFail && <p className={`m-0 ${classes['warning-message-custom']} fw-bold`}>{userState.authFail.customErrorMessage}</p>}

          <button type="button" className={`btn btn-primary mt-5 ${classes['button-custom']}`} onClick={signInHandler}>
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}
