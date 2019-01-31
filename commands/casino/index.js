'use strict'

const Discord = require('discord.js')
const fs = require('fs')
const data = require(`${__dirname}/config/data.json`)
const editJsonFile = require("edit-json-file")
let file = editJsonFile(`${__dirname}/config/data.json`)

const prefix = '+'

const Client = new Discord.Client()

let info = fs.readFileSync(`${__dirname}/config/data.json`)
let config = JSON.parse(info)

class Casino {
  static selectID(id) {
    return data[id]
  }

  /**
   * callback function when writeFile ends
   */
  static finished() {
    console.log('load')
  }

  /**
   * fetch the id from the user
   */
  static getID() {
    return message.author.id
  }

  /**
   * fetch the money from user config
   */
  static getMoney() {
    return items.money
  }

  /**
   * f
   */
  getUserFromMention(mention) {
    if (!mention) return

    const matches = mention.match(/^<@!?(\d+)>$/);
    // The id is the first and only match found by the RegEx.
    // However the first element in the matches array will be the entire mention, not just the ID,
    // so use index 1.
    const id = matches[1];

    return client.users.get(id);

    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1)

      if (mention.startsWith('!')) {
        mention = mention.slice(1)
      }

      return client.users.get(mention)
    }

    return
  }

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
    message.reply(`Welcome`)
    constructor(Client) {
      Client.on('message', (message) => {
          // user data
          let items = data[getID()]

          const withoutPrefix = message.content.slice(prefix.length);
          const split = withoutPrefix.split(/ +/);
          const command = split[0];
          const args = split.slice(1);

          var subString
          var numContain
          var sum
          var userSelected
          var userMessage


          /**
           * user's default config
           */
          data[message.author.id] = {
            money: 1000,
            username: message.author.username,
            id: Number(message.author.id),
            used: true,
            isAdmin: false
          }

          // converts JavaScript object or value to a JSON string
          info = JSON.stringify(data, null, 2)

          // save the info to the file
          fs.writeFile(`${__dirname}/config/data.json`, info, finished => {})

        switch (message.content) {
          case '+join':
            this.load(join)

            break
          case '+balance':
            this.load(balance)
            break
        } // switch case ends here
        // special conditions
        if (message.content.startsWith('+add')) { // add money case here
          if (!items) {
            return message.channel.send('you must have joined the casino')
          }
          if (items.isAdmin) {
            let amount = message.content.split(' ').slice(1).join(' ')
            if (!amount || isNaN(amount)) {
              return message.channel.send(`you must include amount`)
            }
            this.addMoney(amount)
            message.channel.send(`Added ${amount}`)
          } else {
            return message.channel.send(`this is admin only command`)
          }
        } else if (message.content.startsWith('+change')) { // set case here
          if (!items) {
            return message.channel.send('you must have joined the casino')
          } // actions for '+change' here
          if (items.isAdmin) {
            subString = message.content.split(' ').slice(1).join(' ')
            numContain = subString.match(/^\d+|\d+\b|\d+(?=\w)/g)
            sum = numContain[0]
            userSelected = this.getID()
            if (!sum || isNaN(sum)) {
              return message.channel.send(`you must include amount`)
            }
            if (numContain[1]) {
              if (!this.selectID(numContain[1])) {
                return message.channel.send(`the user you mentioned haven't joined casino yet`)
              }
            }
            if (!numContain[1] || numContain[1] === this.getID()) {
              userSelected = this.getID()
            } else if (numContain[1]) {
              userSelected = numContain[1].id
            }
            this.setMoney(sum, userSelected, numContain)
            message.channel.send(`updated to ${sum}`)
          } else {
            return message.channel.send(`this is admin only command`)
          }
        } else if (String(message.content).trim().toLowerCase().startsWith('+setadmin')) { // set admin case here
          if (items.isAdmin) {
            if (!message.mentions.users.first()) {
              return message.channel.send('you must enter valid id')
            }
            let userAdmin = message.mentions.users.first() // the first user mentioned in the message
            if (userAdmin.id === this.getID()) {
              return message.channel.send('this is you...')
            } else {
              if (!selectID) {
                return message.channel.send('user not joined the casino')
              }
              let fromID = this.selectID(userAdmin.id)
              fromID.isAdmin = !fromID.isAdmin // the opposite of the boolean value
            }
          } else {
            return message.channel.send('casino admin only command')
          }
          this.save()
        }
      })
  }

}

module.exports = Casino
