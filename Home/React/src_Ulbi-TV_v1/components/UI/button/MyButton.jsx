import React from 'react';
import classes from './MyButton.module.css';

const MyButton = ({children, ...rest}) => {
    return (
        <button {...rest} className={
            rest.className
                ?
            [classes.MyBtn, classes[rest.className]].join(' ')
                :
                classes.MyBtn
        }>
            {children}
        </button>
    );
};

export default MyButton;