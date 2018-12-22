'use strict'

const Discord = require('discord.js')
const Commando = require('discord.js-commando')

const Holdings = require('./holdings')

const SUPPORTED_COINS = ['bitcoin', 'ethereum']

module.exports = class GetCurrency extends Commando.Command {
    constructor(client) {
      super(client, {
        name: 'get-currency',
        group: 'list',
        memberName: 'currency',
        description: 'Get crypto currency'
      })
    }

    async run(message, args) {
      Holdings.fetch().then(function (data = []) {
        // take only the coins i want
        const coins = data.filter(function (coin) {
          return SUPPORTED_COINS.includes(coin.id)
        })
        const messages = coins.map(function (coin) {
          return `${coin.name}: ${coin['price_usd']}$`
        })
        message.reply(messages.join(', '));
        console.log(messages.join(', '));
      })
    }
}
