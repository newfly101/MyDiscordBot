const {Client, GatewayIntentBits, PermissionsBitField, Collection} = require('discord.js');

const config = require('./Config');
const expressServer = require("./ExpressServer");
const getCommands = require('./module/GetCommands');
const commandsList = require("./module/CommandsList");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// 명령어 컬렉션 초기화
client.commands = new Collection();
// 명령어 등록
commandsList(client);

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
        // commandsList(client);

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

client.on('messageCreate', async message => {
    const prefix = '!';
    console.log(`[${message.author.id}]${message.author.username} : ${message.content}`);
    // 봇이 봇의 명령어에 응답하는 경우 방지
    if (message.author.bot) return;
    // `!`로 시작하지 않는 경우 응답 방지
    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));

    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        await message.reply('There was an error trying to execute that command!');
    }
});

client.login(config.TOKEN);

expressServer();










