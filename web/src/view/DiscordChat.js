import React, {useEffect, useState} from 'react';
import classes from "../css/Discord.module.css";
import TodoList from "./TodoList";
import TodoCalendar from "./TodoCalendar";

const DiscordChat = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        async function getLogs() {
            try {
                const response = await fetch('http://localhost:3001/logs');
                const data = await response.json();
                console.log(data);
                setLogs(data);
            } catch (error) {
                console.log('Error fetching logs', error);
            }
        }

        const interval = setInterval(getLogs, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className={classes.wrapper}>
                <TodoCalendar />
                <TodoList />
            </div>
            <div className={classes.chatRoom}>
                {logs && logs.map((log, index) => (
                    <p key={index}>{log}</p>
                ))}
            </div>
        </>
    );
};

export default DiscordChat;
