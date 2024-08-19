const {REST, Routes, Client, GatewayIntentBits, PermissionsBitField} = require('discord.js');

const config = require('./Config');
const expressServer = require("./ExpressServer");
const getCommands = require('./module/GetCommands');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];





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
        const permissions = [
            {
                id: client.user.id, // 봇 사용자 ID
                allow: [
                    PermissionsBitField.Flags.ViewChannel,
                    PermissionsBitField.Flags.SendMessages,
                    PermissionsBitField.Flags.ReadMessageHistory
                ]
            }
        ];
        await channel.permissionOverwrites.set(permissions);
        console.log('Permissions updated');
    } catch (error) {
        console.error('Error updating permissions:', error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');

        // logToArray(`[${new Date().toISOString()}] Command executed: ping, replied with Pong!`);
    }
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    console.log(`[${message.author.id}]${message.author.username} : ${message.content}`);
});

client.login(config.TOKEN);


getCommands(commands); // commands works
expressServer();










