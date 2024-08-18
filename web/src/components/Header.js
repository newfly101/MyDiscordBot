import React from 'react';
import classes from '../css/Header.module.css';

const Header = () => {
    return (
        <div className={classes.iconShortCut}>
            <img src={"/calendar.svg"} alt={"icon"}/>
            <img src={"/calendar.svg"} alt={"icon"}/>
        </div>
    );
};

export default Header;
