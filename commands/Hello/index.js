'use strict'

const Discord = require('discord.js');
const commando = require('discord.js-commando');
const client = new Discord.Client();
const user = require('../../node_modules/discord.js/src/structures/user.js')

module.exports = class HelloCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'hello',
      group: 'list',
      memberName: 'hello',
      description: 'hello command'
    });

    client.on('message', function(message) {
      if (message.content === '!hello' && message.author.id === '215705227498618880') {
        message.channel.send("hey Orel");
        return;
      } else if(message.content === '!hello' && message.author.id === '336453130378280971') {
        message.channel.send('Hello Tal :smile: ')
        return;
      } else if (message.content === '!hello') {
        message.reply("hello :)");
        console.log("hello command");
        return;
      }
    });
  }
}
