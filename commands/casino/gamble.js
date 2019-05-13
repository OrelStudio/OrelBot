'use strict'

const Discord = require('discord.js')

const Client = new Discord.Client()

class Gamble {
  constructor (message) {
    this.message = message
    //this.items = data[gamble.getID()]
  }

  static selectID(id) {
    return data[id]
  }

  /**
   * callback function when writeFile ends
   */
  finished() {
    console.log('load')
  }

  /**
   * fetch the id from the user
   */
  getID() {
    return this.message.author.id
  }

  /**
   * fetch the money from user config
   */
  getMoney() {
    return items.money
  }

  /**
   * f
   */
  // getUserFromMention(mention) {
  //   if (!mention) return
  //
  //   const matches = mention.match(/^<@!?(\d+)>$/);
  //   // The id is the first and only match found by the RegEx.
  //   // However the first element in the matches array will be the entire mention, not just the ID,
  //   // so use index 1.
  //   const id = matches[1];
  //
  //   return client.users.get(id);
  //
  //   if (mention.startsWith('<@') && mention.endsWith('>')) {
  //     mention = mention.slice(2, -1)
  //
  //     if (mention.startsWith('!')) {
  //       mention = mention.slice(1)
  //     }
  //
  //     return client.users.get(mention)
  //   }
  //
  //   return
  // }

  load(callback) {
    file = editJsonFile(`${__dirname}/config/data.json`, {
      autosave: true
    })
    info = fs.readFileSync(`${__dirname}/config/data.json`, finished)
    config = JSON.parse(info)
    if (typeof callback === 'function') {
      callback()
    }
  }

  save() {
    info = JSON.stringify(data, null, 2)
    fs.writeFile(`${__dirname}/config/data.json`, info, finished)
  }

  /**
   * returns the amount of money user has
   */
  balance() {
    message.reply(`Balance: ${getMoney()}`)
  }

  addMoney(amount) {
    let added = (Number(items.money) + Number(amount))
    items.money = added
    save()
    console.log(`Added ${amount} to ${items.username} with id: ${getID()}`)
  }

  setMoney(sum, userSelected, numContain) {
    console.log(userSelected)
    var secondID = selectID(userSelected)
    secondID.money = Number(sum)
    save()
    console.log(`set ${sum} to ${secondID.username} with id: ${numContain}`)
  }

  /**
   * creates a new data for new user
   */
  join() {
    let id = message.author.id
    if (data[getID()] || data[getID().used] === true) {
      // if data[getID()] is exist or used is true that means the user already joined the casino
      return message.reply(`already joined`)
    }
  }
}

module.exports = Gamble
