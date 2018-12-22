'use strict'

const Discord = require('discord.js');
const commando = require('discord.js-commando');
const client = new Discord.Client();

module.exports = class setPlaying extends commando.Command {
  constructor(client) {
    super('client', {
      name: 'setgame',
      group: 'list',
      memberName: 'setgame',
      description: 'command to change playing status for admin'
    });

    client.on('message', function(message, game) {
      if (message.content.startsWith("!setgame")) {
        if (message.author.id === '215705227498618880') {
          let args = message.content.split(" ").slice(1);
          let game = args.join(" ")
          if (!game) {
            message.channel.send("example: !setgame game")
            return null;
          }
          console.log(game)
          client.user.setGame(game)
          message.channel.send('done my playing status is now **' + game + "**")
        } else {
          message.channel.send("sorry " + message.author + ", this is  **admin only** command.")
          console.log(message.author + 'tried use setgame command BUT FAILED!');
        }
      }
    })

  }
}
