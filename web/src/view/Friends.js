import React from 'react';
import classes from '../css/Home.module.css';

const Friends = () => {
    return (
        <>
        <table>
            <tbody>
                <tr>
                    <th><img src={'/myProfile.jpg'} alt="myProfile" className={classes.profileImg}/></th>
                    <th><img src={'/rightArrow.svg'} alt="rightArrow" className={classes.profileImg}/></th>
                </tr>
                <tr>
                    <th><label className={classes.profileLabel}>me</label></th>
                </tr>
            </tbody>
        </table>

        </>
    );
};

export default Friends;
