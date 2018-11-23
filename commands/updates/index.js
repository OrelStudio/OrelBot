'use strict'

const Discord = require('discord.js');
const commando = require('discord.js-commando');
const uupdates = require('./updates')
const client = new Discord.Client();

module.exports = class UpdatesS extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'updates',
      group: 'list',
      memberName: 'updates',
      description: 'last updates'
    });

    client.on('message', function(message) {
      if (message.content === '!updates') {
        message.channel.send("jokes for the bot");
        message.channel.send("last updates command");
        message.channel.send("live post bitcoin and ethereum value");
        console.log("updates command")
      }
    });
  }
}
