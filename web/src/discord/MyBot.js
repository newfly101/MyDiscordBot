const {Client, GatewayIntentBits, PermissionsBitField, Collection} = require('discord.js');

const config = require('./Config');
const expressServer = require("./ExpressServer");
const getCommands = require('./module/GetCommands');
const commandsList = require("./module/CommandsList");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    try {
        // Guild 및 Channel 객체 가져오기
        const guild = client.guilds.cache.get(config.GUILD_ID);
        if (!guild) {
            console.log('Guild not found');
            return;
        }
        const channel = guild.channels.cache.get(config.CHANNEL_ID);
        if (!channel) {
            console.log('Channel not found');
            return;
        }
        // 권한 설정
        const permissions = [{
            id: client.user.id, // 봇 사용자 ID
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory]
        }];
        await channel.permissionOverwrites.set(permissions);
        console.log('우주봇 권한 업데이트 완료!');
        // 봇 커맨드 설정 (명령어 설정)
        commandsList(client);

        /** 슬래시 커맨드인 경우에만 필요한 코드임
        // getCommands(client);
        **/

        client.category = ['bot', 'moderator'];

    } catch (error) {
        console.error('Error updating permissions:', error);
    }
});



client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (command) {
        await command.execute(interaction);
    } else {
        await interaction.reply('$$$$$$존재하지 않는 명령어 입니다.');
    }
    // if (interaction.commandName === 'ping') {
    //     await interaction.reply('Pong!');
    //
    //     // logToArray(`[${new Date().toISOString()}] Command executed: ping, replied with Pong!`);
    // }
    // if (interaction.commandName === '명령어') {
    //     await interaction.reply(commandsList.map((list) => list.name));
    // }
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    console.log(`[${message.author.id}]${message.author.username} : ${message.content}`);
});

client.login(config.TOKEN);



expressServer();










