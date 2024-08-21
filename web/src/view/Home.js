import React, {useEffect, useState} from 'react';
import Friends from "./Friends";
import classes from "../css/Home.module.css";
import Profile from "./MyProfile";
import DiscordChat from "./DiscordChat";

const Home = () => {


    return (
        <div className={classes.container}>
            <Friends/>
            <Profile />

            <h1>Discord Bot Logs</h1>
            <DiscordChat />
        </div>
    );
};

export default Home;
