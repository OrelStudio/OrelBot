'use strict'

const Discord = require('discord.js');
const client = new Discord.Client();

class BankAccount {
  constructor(client) {
    client.on('message', function(message) {
      if (message.content === 'I got') {
        message.channel.send('1');
        message.channel.send('2');
        message.channel.send('3');
        message.channel.send('4');
        message.channel.send('5');
        message.channel.send('6');
        message.channel.send('7');
        message.channel.send('8');
        message.channel.send("M's in my bank bank account");
      }
    });
  }
}

module.exports = BankAccount
