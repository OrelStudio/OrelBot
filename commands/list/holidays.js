const commando = require('discord.js-commando');
const discord = require('discord.js');
const moment = require('moment')

const holidays = ['hanukkah','holiday']

class Hanukkah extends commando.Command {
    constructor (client) {
        super(client, {
            name: 'happy hanukkah',
            group: 'list',
            memberName: 'hanukkah',
            description: 'happy hanukkah (NOT WORKING)'
        });
    }

    async run (message, ...args) {
      var date = (new Date()).getTime()

      console.log('message')

      const parsedMessage = String(message).trim().toLowerCase()
      const holiday = parsedMessage.split('happy ')[1]

      console.log(parsedMessage, holiday)

      if (!holidays.includes(holiday)) {
        return message.reply('happy hanukkah')
      }

      if (parsedMessage.includes(holiday) &&
        moment().isBetween(moment().days(13).month(12).year(moment().utc().year()), moment().days(20).month(12).year(moment().utc().year())))
        message.reply((holidays[0]))

      if (message.author == 215705227498618880 && message.content === 'Happy hanukkah' && Date.startsWith('October 13')) {
        message.reply((holidays[0]) + 'wait but i\'m Orel LOL');
      }
    }
  }

module.exports = Hanukkah
