const path = require('path');
const fs = require('fs');

// JSON 파일 경로
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

module.exports = config;