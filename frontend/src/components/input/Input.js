import React from 'react';
import classes from './customStyle.module.css';

export default function Input(props) {
  return <input type={props.type} className={`form-control ${classes['input-custom']} my-2 py-2`} onChange={props.onChange} placeholder={props.placeholder} />;
}
