const {Collection, EmbedBuilder} = require("discord.js");

function commandsList(client) {
    // command collection create
    client.aliases = new Collection();

    // // command register : ex) ping
    // client.commands.set('ping', {
    //     name: 'ping',
    //     description: 'Replies with Pong!',
    //     execute: (message, args) => {
    //         message.channel.send('Pong!');
    //     }
    // });

    client.commands.set('안녕', {
        name: '안녕',
        description: '유저에게 인사!',
        execute: (message, args) => {
            message.channel.send(`안녕하세요! ${message.author.username}`);
        }
    });

    client.commands.set('출석', {
        name: '출석',
        description: '출석부 등록',
        execute: (message, args) => {
            message.channel.send(`출석되었습니다! ${message.member.nickname}`);
        }
    });

    client.commands.set('명령어', {
        name: '명령어',
        description: '명령어 리스트 출력',
        execute: async (message, args) => {
            try {
                // 명령어 목록 생성
                const commands = client.commands.map(cmd => ({
                    name: cmd.name,
                    description: cmd.description
                }));

                // 임베드 메시지 생성
                const embed = new EmbedBuilder()
                    .setTitle('사용 가능한 명령어 목록')
                    .setColor('#0099ff')
                    .setDescription(commands.map(cmd => `**${cmd.name}**: ${cmd.description}`).join('\n'))
                    .setTimestamp();

                // 임베드 메시지 전송
                await message.channel.send({embeds: [embed]});
            } catch (e) {
                console.error(`명령어 리스트 출력 중 에러 발생 ${e}`);
            }

        }
    });

    // 별칭 등록 p -> ping
    // client.aliases.set('p', 'ping');
    client.aliases.set('ㅎㅇ', '안녕');
    client.aliases.set('ㅊ', '출석');
}

module.exports = commandsList;