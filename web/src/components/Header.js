import React from 'react';
import classes from '../css/Header.module.css';

const Header = () => {
    return (
        <div className={classes.iconShortCut}>
            <img src={"/d.svg"} alt={"icon"}/>
            <img src={"/d.svg"} alt={"icon"}/>
        </div>
    );
};

export default Header;
