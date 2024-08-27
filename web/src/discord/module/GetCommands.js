const {Routes, REST} = require("discord.js");
const config = require("../Config");
const commandsList = require("./commandsList");

function getCommands(client) {
    const rest = new REST({version: '10'}).setToken(config.TOKEN);

    async function botCommands(client) {
        try {
            console.log('Started refreshing application (/) commands.');

            // client.commands = Collection(); 인 경우
            const commands = client.commands.map(command => ({
                name: command.name,
                description: command.description,
                options: command.options || [],
                execute: command.execute.bind(client),
            }))

            await rest.put(Routes.applicationCommands(config.CLIENT_ID), {body: commands});
            // await rest.put(Routes.applicationCommands(config.CLIENT_ID), {body: commandsList});
            console.log("명령어 등록 완료!");

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    }
    botCommands(client);
}

module.exports = getCommands;