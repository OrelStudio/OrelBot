'use strict'

const commando = require('discord.js-commando');
const Discord = require('discord.js')

class Avatar extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'what is my avatar',
      group: 'list',
      memberName: 'avatar',
      description: 'Post your avatar (do not use "!" before this command)'
    });
    client.on('message', function (message) {
    	const parsedMessage = String(message.content).trim().toLowerCase()
      // If the message is "what is my avatar"
      if (parsedMessage.startsWith('what is my avata') && parsedMessage.endsWith('r')) {
        // Send the user's avatar URL
        message.channel.send(message.author.avatarURL || 'You don\'t have an avatar');
      }
    });
  }
};

module.exports = Avatar
