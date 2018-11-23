'use strict'

const Discord = require('discord.js');
const commando = require('discord.js-commando');
const client = new Discord.Client();

class Tag {
  constructor(client) {
    client.on('message', function(message) {
      let mention = message.mentions.users.first();
      try {
        if (mention.id === '388420378982219796') {
          message.channel.send("Yes it's me");
        }
        if (message.author.id === '388420378982219796' || message.author.id === '215705227498618880') {
          return null;
        }
        if (mention.id === '215705227498618880') {
          message.channel.send("wait.... Orel will answer you soon");
        }
      } catch (e) {
      }
    });
  }
}

module.exports = Tag;
