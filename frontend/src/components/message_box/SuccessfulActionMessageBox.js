import React from 'react';
import classes from './customStyle.module.css';

export default function SuccessfulActionMessageBox(props) {
  return <div className={`${classes['success-action-message-box']} ${classes['radius-custom']}`}>{props.children}</div>;
}
