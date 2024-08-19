const {Routes, REST} = require("discord.js");
const config = require("../Config");

function getCommands(commands) {
    const rest = new REST({version: '10'}).setToken(config.TOKEN);

    async function botCommands(commands) {
        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(Routes.applicationCommands(config.CLIENT_ID), {body: commands});

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    }
    botCommands(commands);
}

module.exports = getCommands;