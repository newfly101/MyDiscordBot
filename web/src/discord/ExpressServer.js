const express = require('express');
const cors = require('cors');
const setupWebSocket = require("./WebSocketServer");

function expressServer() {
    const app = express();
    const PORT = 3001;

    const logs = [];

    function logToArray(...args) {
        const message = args.join(' ');
        logs.push(message);
        console.info(message);
    }

    console.log = logToArray;
    console.error = (...args) => logToArray('ERROR', ...args);


    app.use(cors());
    app.get('/logs', (req, res) => {
        res.json(logs);
    });

    const server = app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

    setupWebSocket(server, PORT);
}
module.exports = expressServer;
