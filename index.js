'use strict'

const path = require('path')

const config = require('./config')

const commando = require('discord.js-commando');
const bot = new commando.Client();

bot.registry.registerGroup('list', 'List');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(path.resolve(__dirname, './commands'));

bot.login(config.discord.token);
console.log('I am up')
