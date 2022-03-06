import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../../components/input/Input';
import { updateUserProfileInfoProtectedRoute } from '../../state_slice/userSlice';
import classes from './customStyle.module.css';

export default function ProfileInfoCard(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [userInput, setUserInput] = useState('');
  const dispatch = useDispatch();

  //-----------------------------------------------------------------

  function enableEditHandler() {
    setIsEdit(true);
  }

  function cancelEditHandler() {
    setIsEdit(false);
  }

  function nonPasswordUserInputHandler(e) {
    setUserInput(e.target.value);
  }

  //-----------------------------------------------------------------

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function currentPasswordUserInputHandler(e) {
    setCurrentPassword(e.target.value);
  }
  function newPasswordUserInputHandler(e) {
    setNewPassword(e.target.value);
  }
  function confirmPasswordUserInputHandler(e) {
    setConfirmPassword(e.target.value);
  }

  //-----------------------------------------------------------------

  function saveUpdateHandler() {
    dispatch(updateUserProfileInfoProtectedRoute({ [props.dbKey]: userInput }));
    setIsEdit(false);
  }

  function saveUpdatePasswordHandler() {
    dispatch(updateUserProfileInfoProtectedRoute({ [props.dbKey]: [currentPassword, newPassword, confirmPassword] }));
    setIsEdit(false);
  }

  //-----------------------------------------------------------------

  return (
    <>
      {isEdit && props.label !== 'Password' ? (
        <div className="d-flex justify-content-between align-items-center">
          <div className="w-50">
            <p className={`m-0 ${classes['text-custom']}`}>New {props.label}</p>
            <Input placeholder={props.placeholder} onChange={nonPasswordUserInputHandler} type={props.type} />
          </div>
          <div>
            <button type="button" className={`btn btn-dark mb-2 p-0 ${classes['radius-custom']} ${classes['button-custom']}`} onClick={saveUpdateHandler}>
              <p className="m-0 fs-6">save</p>
            </button>
            <div></div>
            <button type="button" className={`btn btn-dark m-0 p-0 ${classes['radius-custom']} ${classes['button-custom']}`} onClick={cancelEditHandler}>
              <p className="m-0 fs-6">cancel</p>
            </button>
          </div>
        </div>
      ) : isEdit && props.label === 'Password' ? (
        <div className="d-flex justify-content-between align-items-top">
          <div className="w-50">
            <p className={`m-0 ${classes['text-custom']}`}>Current {props.label}</p>
            <Input placeholder={props.placeholder} onChange={currentPasswordUserInputHandler} type={props.type} />
            <p className={`m-0 ${classes['text-custom']}`}>New password {props.label}</p>
            <Input placeholder={props.placeholder} onChange={newPasswordUserInputHandler} type={props.type} />
            <p className={`m-0 ${classes['text-custom']}`}>Confirm password {props.label}</p>
            <Input placeholder={props.placeholder} onChange={confirmPasswordUserInputHandler} type={props.type} />
          </div>
          <div className="mt-2">
            <button type="button" className={`btn btn-dark mb-2 p-0 ${classes['radius-custom']} ${classes['button-custom']}`} onClick={saveUpdatePasswordHandler}>
              <p className="m-0 fs-6">save</p>
            </button>
            <div></div>
            <button type="button" className={`btn btn-dark m-0 p-0 ${classes['radius-custom']} ${classes['button-custom']}`} onClick={cancelEditHandler}>
              <p className="m-0 fs-6">cancel</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className={`m-0 ${classes['text-custom']}`}>{props.label}:</p>
            <p className="m-0">{props.value}</p>
          </div>
          <button type="button" className={`btn btn-dark m-0 p-0 ${classes['radius-custom']} ${classes['button-custom']}`} onClick={enableEditHandler}>
            <p className="m-0 fs-6">Edit</p>
          </button>
        </div>
      )}
    </>
  );
}
