import React from 'react';
import classes from './customStyle.module.css';

export default function NotificationMessageBox(props) {
  return <div className={`${classes['notification-message-box']} ${classes['radius-custom']}`}>{props.children}</div>;
}
