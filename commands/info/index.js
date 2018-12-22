'use strict'

const Discord = require('discord.js');
const config = require('../../config.json');
const commando = require('discord.js-commando');
const client = new Discord.Client();


class kickCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "info",
      group: "list",
      memberName: "info",
      description: "info"
    });
    console.log('out');
    client.on('message', function(message) {
      console.log('inn');
      let prefix = config.discord.prefix;
      let messageArray = message.content.split(" ");
      let cmd = messageArray[0];
      let args = messageArray.slice(1);

      if (message.content === '!botinfo') {
        let sendinfo = (new Discord.RichEmbed())
          .setDescription("Bot information")
          .setColor("#ff00f5")
          .addField("Bot Name: " + bot.user.username)
          .addField("Bot Created By OrelStudio (Orel#3784)")

        message.channel.send(sendinfo);
      }
    });
  }
}
