'use strict'

const discord = require('discord.js');
const commando = require('discord.js-commando');

const Jokes = require('./index.js');

module.exports = class JokesCommand extends commando.Command {
  constructor(client) {
    console.log('here')
    super(client, {
      name: 'jokes',
      group: 'list',
      memberName: 'jokes',
      description: 'a list of jokes'
    });
    console.log(Object.keys(Jokes), Jokes.get)

  }

  async run(message) {
    const joke = Jokes.get()
    console.log(joke)
    message.reply(joke)
  }
}
