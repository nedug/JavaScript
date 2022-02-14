import React from 'react';
import classes from './MyButton.module.css';

const MyButton = ({children, ...rest}) => {
    return (
        <button className={classes.MyBtn}>
            {children}
        </button>
    );
};

export default MyButton;