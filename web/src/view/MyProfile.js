import React from 'react';
import classes from "../css/Home.module.css";

const Profile = () => {
    return (
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
    );
};

export default Profile;
