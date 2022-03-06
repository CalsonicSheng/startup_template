import React from 'react';
import classes from './customStyle.module.css';

export default function ErrorMessageBox(props) {
  return <div className={`${classes['error-message-box']} ${classes['radius-custom']}`}>{props.children}</div>;
}
