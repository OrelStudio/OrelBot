// 'use strict';
//
// const Discord = require('discord.js');
// const commando = require('discord.js-commando');
//
// const client = new Discord.Client()
//
// class Power extends commando.Command {
//   constructor(client) {
//     super(client, {
//       name: 'power2',
//       group: 'list',
//       memberName: 'power2',
//       description: 'power number by 2'
//     });
//     async run(message, args) {
//       if (message.content === '!2power') {
//         let msg = message.content;
//         let firstN = await msg;
//         let firstNF = firstN;
//         // F for final N for number
//         let secondN = await msg;
//         message.channel.send(firstNF * secondN)
//       }
//     });
//   }
// }
// 
// module.exports = Power;
