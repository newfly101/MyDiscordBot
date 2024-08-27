const {Collection} = require("discord.js");

function commandsList(client) {
    // command collection create
    client.aliases = new Collection();

    // command register : ex) ping
    client.commands.set('ping', {
        name: 'ping',
        description: 'Replies with Pong!',
        execute: (message, args) => {
            message.channel.send('Pong!');
        }
    });

    client.commands.set('안녕', {
        name: '안녕',
        description: '유저에게 인사!',
        execute: (message, args) => {
            message.channel.send(`안녕하세요! ${message.author.username}`);
        }
    })

    // 별칭 등록 p -> ping
    client.aliases.set('p', 'ping');
    client.aliases.set('ㅎㅇ', '안녕');


}

// const commandsList = [
//     {
//         name: 'ping',
//         description: 'Replies with Pong!',
//         execute: (message, args) => {
//             message.channel.send('Pong!');
//         }
//     },
//     {
//         name: '명령어',
//         description: '명령어 리스트 출력',
//     }
// ];


module.exports = commandsList;