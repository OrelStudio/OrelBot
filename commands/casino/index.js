'use strict'

const Discord = require('discord.js')
const fs = require('fs')
const data = require(`${__dirname}/config/data.json`)
const editJsonFile = require("edit-json-file")
const bank = require('./bank')

let file = editJsonFile(`${__dirname}/config/data.json`)

const Gamble = require(`${__dirname}/gamble`)

const prefix = '+'

const client = new Discord.Client()

const gambles = []
const addGamble = (gamble) => {
  gambles.push(gamble)
}
const removeGamble = (id) => {
  const index = gambles.findIndex(gamble => gamble.id === id)
  if (index > -1) {
    gambles.splice(index, 1)
  }
}

let info = fs.readFileSync(`${__dirname}/config/data.json`)
let config = JSON.parse(info)

class Casino {
    constructor(client) {
      this.gambles = []
      client.on('message', (message) => {
        if (message.content.startsWith('!register')) {
          bank.register(message.author)
        }
        // if (false)
        //   // user data
        //   const gamble = new Gamble(message)
        //   let items = data[gamble.getID()]
        //
        //   const withoutPrefix = message.content.slice(prefix.length);
        //   const split = withoutPrefix.split(/ +/);
        //   const command = split[0];
        //   const args = split.slice(1);
        //
        //   var subString
        //   var numContain
        //   var sum
        //   var userSelected
        //   var userMessage
        //
        //
        //   /**
        //    * user's default config
        //    */
        //   data[message.author.id] = {
        //     money: 1000,
        //     username: message.author.username,
        //     id: Number(message.author.id),
        //     used: true,
        //     isAdmin: false
        //   }
        //
        //   // converts JavaScript object or value to a JSON string
        //   info = JSON.stringify(data, null, 2)
        //
        //   // save the info to the file
        //   fs.writeFile(`${__dirname}/config/data.json`, info, finished => {})
        //
        // switch (message.content) {
        //   case '+join':
        //     Gamble.load(join)
        //
        //     break
        //   case '+balance':
        //     Gamble.load(balance)
        //     break
        // } // switch case ends here
        // // special conditions
        // if (message.content.startsWith('+add')) { // add money case here
        //   if (!items) {
        //     return message.channel.send('you must have joined the casino')
        //   }
        //   if (items.isAdmin) {
        //     let amount = message.content.split(' ').slice(1).join(' ')
        //     if (!amount || isNaN(amount)) {
        //       return message.channel.send(`you must include amount`)
        //     }
        //     Gamble.addMoney(amount)
        //     message.channel.send(`Added ${amount}`)
        //   } else {
        //     return message.channel.send(`this is admin only command`)
        //   }
        // } else if (message.content.startsWith('+change')) { // set case here
        //   if (!items) {
        //     return message.channel.send('you must have joined the casino')
        //   } // actions for '+change' here
        //   if (items.isAdmin) {
        //     subString = message.content.split(' ').slice(1).join(' ')
        //     numContain = subString.match(/^\d+|\d+\b|\d+(?=\w)/g)
        //     sum = numContain[0]
        //     userSelected = Gamble.getID()
        //     if (!sum || isNaN(sum)) {
        //       return message.channel.send(`you must include amount`)
        //     }
        //     if (numContain[1]) {
        //       if (!Gamble.selectID(numContain[1])) {
        //         return message.channel.send(`the user you mentioned haven't joined casino yet`)
        //       }
        //     }
        //     if (!numContain[1] || numContain[1] === Gamble.getID()) {
        //       userSelected = Gamble.getID()
        //     } else if (numContain[1]) {
        //       userSelected = numContain[1].id
        //     }
        //     Gamble.setMoney(sum, userSelected, numContain)
        //     message.channel.send(`updated to ${sum}`)
        //   } else {
        //     return message.channel.send(`this is admin only command`)
        //   }
        // } else if (String(message.content).trim().toLowerCase().startsWith('+setadmin')) { // set admin case here
        //   if (items.isAdmin) {
        //     if (!message.mentions.users.first()) {
        //       return message.channel.send('you must enter valid id')
        //     }
        //     let userAdmin = message.mentions.users.first() // the first user mentioned in the message
        //     if (userAdmin.id === Gamble.getID()) {
        //       return message.channel.send('this is you...')
        //     } else {
        //       if (!selectID) {
        //         return message.channel.send('user not joined the casino')
        //       }
        //       let fromID = Gamble.selectID(userAdmin.id)
        //       fromID.isAdmin = !fromID.isAdmin // the opposite of the boolean value
        //     }
        //   } else {
        //     return message.channel.send('casino admin only command')
        //   }
        //   Gamble.save()
        // }
      })
  }

  addGamble (gamble) {
    this.gambles.push(gamble)
  }

  removeGamble (id) {
    const index = this.gambles.findIndex(gamble => gamble.id === id)
    if (index > -1) {
      this.gambles.splice(index, 1)
    }
  }

  isGamblbeExist (id) {
    return gambles.some(gamble => gamble.id === id)
  }
}

//Casino.init(client)

module.exports = Casino
