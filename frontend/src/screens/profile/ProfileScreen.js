import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfileProtectedRoute } from '../../state_slice/userSlice';
import classes from './customStyle.module.css';
import ProfileInfoCard from '../../components/profile_info_card/ProfileInfoCard';
import SuccessfulActionMessageBox from '../../components/message_box/SuccessfulActionMessageBox';
import ErrorMessageBox from '../../components/message_box/ErrorMessageBox';

export default function ProfileScreen() {
  const { isloading, userState } = useSelector((state) => {
    return state.userReducer;
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  //----------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (!userState.authSuccess) {
      dispatch(getUserProfileProtectedRoute());
    }
  }, [dispatch, userState.authSuccess]);

  useEffect(() => {
    if (userState.authFail) {
      navigate(userState.authFail.redirect, {
        state: {
          pathBeforeAuth: '/profile',
        },
      });
    }
  }, [userState, navigate]);

  //----------------------------------------------------------------------------------------------------------------

  return (
    <>
      {isloading ? (
        <h3>Loading...</h3>
      ) : (
        <div className={`w-50 mx-auto ${classes['container-custom']}`}>
          <div className="mb-5">
            <h3 className="mb-3">Your Profile</h3>
            {userState.authSuccess.updateSuccessMessage && (
              <SuccessfulActionMessageBox>
                <p className="m-0 text-white">{userState.authSuccess.updateSuccessMessage}</p>
              </SuccessfulActionMessageBox>
            )}
            {userState.authSuccess.customErrorMessage && (
              <ErrorMessageBox>
                <p className="m-0 text-white">{userState.authSuccess.customErrorMessage}</p>
              </ErrorMessageBox>
            )}
            <ul className="list-group">
              <li className={`list-group-item border-2 ${classes['list-group-raidus-custom-top']}`}>
                <ProfileInfoCard label={'Name'} placeholder={userState.authSuccess.username} dbKey={'username'} type="text" value={userState.authSuccess.username} />
              </li>
              <li className="list-group-item border-top-0 border-2">
                <ProfileInfoCard label={'E-mail'} placeholder={userState.authSuccess.email} dbKey={'email'} type="email" value={userState.authSuccess.email} />
              </li>
              <li className="list-group-item border-top-0 border-2">
                <ProfileInfoCard label={'Password'} placeholder={''} dbKey={'password'} type="password" value="********" />
              </li>
              <li className={`list-group-item border-top-0 border-2 ${classes['list-group-raidus-custom-bottom']}`}>
                <ProfileInfoCard label={'Phone'} placeholder={5873341089} dbKey={'phone'} type="number" value={5873341089} />
              </li>
            </ul>
          </div>
          <div className="row">
            <h3 className="mb-3">Your Address</h3>
            <div className="col-sm-12 col-md-6">
              <div className={`${classes['add-address-box']} mb-4`}>
                <div className="mt-5">
                  <div className={`${classes['plus']}`}></div>
                  <p className="fw-bold">Add Address</p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <ul className="list-group">
                <li className={`list-group-item border-2 ${classes['list-group-raidus-custom-top']}`}>
                  <p className="m-0 fw-bold">your name</p>
                </li>
                <li className={`list-group-item border-top-0 border-2 ${classes['list-group-raidus-custom-bottom']}`}>
                  <p className="mb-1 fs-6 ">300 Evansborough Way NW</p>
                  <p className="mb-1 fs-6 ">Calgary, Alberta T3P0R1</p>
                  <p className="mb-1 fs-6 ">Canada</p>
                  <p className="mb-1 fs-6 ">Phone Number: 5873341089</p>
                  <p className="mb-1 fs-6 ">Delivery instructions"</p>
                  <div className="mt-5">
                    <Link to="/address" className={`${classes['text-custom']}`}>
                      Edit
                    </Link>
                    <span className="ms-3">|</span>
                    <Link to="/address" className={`${classes['text-custom']} ms-3`}>
                      Remove
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
