import React from 'react';
import classes from '../css/Home.module.css';

const Friends = () => {
    return (
        <div className={classes.container}>
            <div className={classes.profile}>
                <img src={'/myProfile.jpg'} alt="myProfile" />
                <label>me</label>
            </div>
        </div>
    );
};

export default Friends;
