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
            <div className={classes.miniProfile}>
                <div className={classes.content}>
                    <img src={'/myProfile.jpg'} alt="myProfile" className={classes.myProfileImg}/>
                </div>
                <div className={classes.myProfile}>
                    <h4 className={classes.profileTitle}>우주</h4>
                    <label className={classes.profileText}>출퇴근 하는 삶 살기 프리랜서 그만</label>
                </div>
                <div className={classes.content}>
                    <img src={"/howAbout.svg"} alt={"todayworks"} className={classes.howAbout}/>
                </div>
            </div>
        </>
    );
};

export default Friends;
