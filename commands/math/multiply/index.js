'use strict'

const Discord = require('discord.js');
const commando = require('discord.js-commando');
const client = new Discord.Client();

module.exports = class MultiplyCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'multiply',
      group: 'list',
      memberName: 'multiply',
      description: 'multiply command'
    });
    client.on('message' function (message) {
      if (message.content === '!multiply') {
      // if the message is !multiply.
      let multiplytwo = (num, num2) => {
        let getFirstNumber = String(message.content);
        // the first number to multiply.
        message.channel.send('please enter your first number');
        // to enter the first number to multiply.
        num = getFirstNumber
        // replacing the getFirstNumber by num.
        let getSecondNumber = String(message.content);
        // the ssecond number to multiply.
        message.channel.send('please enter your second number');
        // to enter the second number to multiply.
        num2 = getSecondNumber
        // replacing the getSecondNumber by num2
        let multiplied = num * num2
        // multiplying num and num2
      }
      }
    })
  }
}
