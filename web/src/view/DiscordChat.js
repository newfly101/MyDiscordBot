import React, {useEffect, useState} from 'react';
import classes from "../css/Discord.module.css";

const DiscordChat = () => {
    const [logs, setLogs] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckBox =  () => {
        setIsChecked(!isChecked);
        console.log(isChecked);
    }
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
                <div>Calendar</div>
                <article>
                    <button className={classes.todoTemplate} data-icon="alone">&#36;&#123;할일제목&#125;</button>
                    <div className={classes.addTodo}>
                        <span className={`${classes.checkbox} ${isChecked ? classes.active : ''}`}
                              onClick={toggleCheckBox}/>
                        <input type='text' placeholder="할 일 입력"/>
                    </div>
                </article>
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
