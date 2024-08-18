const WebSocket = require('ws');

function setupWebSocket(server, PORT) {
    const wss = new WebSocket.Server({server});

    wss.on('connection', (ws) => {
        console.log('Client connected');
        console.log = (...args) => {
            ws.send(args.join(' '));
            console.info(...args);
        };
        console.error = (...args) => {
            ws.send(`ERROR: ${args.join(' ')}`);
            console.error(...args);
        };
    });
}

module.exports = setupWebSocket;
