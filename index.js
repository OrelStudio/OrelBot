'use strict'

const path = require('path')

const config = require('./config')

const commando = require('discord.js-commando')
const emitter = require('eventemitter2')
const bot = new commando.Client()

bot.registry.registerGroup('list', 'List')
bot.registry.registerDefaults()
bot.registry.registerCommandsIn(path.resolve(__dirname, './commands'))

bot.login(config.discord.token)
bot.on('ready', () => {
  console.log('I am up')
  bot.user.setGame('with Orel')

})

bot.on('message', function(message) {
  if (message.content === '*ping') {
    message.reply('Pong!')
    if (message.author.id === '215705227498618880') {
      message.reply("You already know it's working...")
    } else {
      message.reply("Orel still programming me")
    }
  }
})
