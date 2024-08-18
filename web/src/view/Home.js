import React, {useEffect, useState} from 'react';

const Home = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        async function getLogs() {
            try {
                const response = await fetch('http://localhost:3001/logs');
                const data = await response.json();
                // console.log(data);
                setLogs(data);
            } catch (error) {
                console.log('Error fetching logs', error);
            }
        }
        const interval = setInterval(getLogs, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Discord Bot Logs</h1>
            <div>
                {logs && logs.map((log, index) => (
                    <p key={index}>{log}</p>
                ))}
            </div>
        </div>
    );
};

export default Home;
