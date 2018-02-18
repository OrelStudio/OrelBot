'use strict'

const discord = require('discord.js');
const commando = require('discord.js-commando');

const Jokes = require('../../modules/jokes');

module.exports = class JokesCommand extends commando.Command {
  constructor (client) {
    console.log('here')
    super (client, {
      name: 'jokes',
      group: 'list',
      memberName: 'jokes',
      description: 'a list of jokes'
    });
    console.log(Object.keys(Jokes), Jokes.get)

    // client.on('message', function (message) {
    //   const joke = Jokes.get()
    //   message.reply(joke)
      // console.log('joke', joke)
      // const parsedMessage = String(message.content).trim().toLowerCase()
      // if (parsedMessage === 'JokeList') {
      //   message.channel.send('This is the list, please select a joke.')
      // }
      // message.channel.send('1')
      // const parsdMessage = String(message.content).trim().toLowerCase()
      // if (parsdMessage == '1') {
      //   message.channel.send(jokes.jokes.one)
      //   console.log(jokes.jokes.one)
      // }
    // });
  }

  async run (message) {
    const joke = Jokes.get()
    console.log(joke)
    message.reply(joke)
  }
}
