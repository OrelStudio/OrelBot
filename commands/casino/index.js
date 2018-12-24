'use strict'

const Discord = require('discord.js')
const fs = require('fs')
const data = require(`${__dirname}/config/data.json`)
const editJsonFile = require("edit-json-file")
let file = editJsonFile(`${__dirname}/config/data.json`)

const Client = new Discord.Client()

let info = fs.readFileSync(`${__dirname}/config/data.json`)
let config = JSON.parse(info)

class Casino {
  constructor(Client) {
    Client.on('message', (message) => {
      // user data
      let items = data[getID()]
      /**
       * callback function when writeFile ends
       */
      function finished() {
        console.log('load');
      }

      /**
       * fetch the id from the user
       */
      function getID() {
        return message.author.id
      }

      /**
       * fetch the money from user config
       */
      function getMoney() {
        return items.money
      }


      function load(callback) {
        file = editJsonFile(`${__dirname}/config/data.json`, {
          autosave: true
        })
        info = fs.readFileSync(`${__dirname}/config/data.json`, finished)
        config = JSON.parse(info)
        if (typeof callback === 'function') {
          callback()
        }
      }

      /**
       * returns the amount of money user has
       */
      function balance() {
        message.reply(`Balance: ${getMoney()}`)
      }

      function addMoney(amount, callback) {
        let added = (Number(items.money) + Number(amount))
        // file.set(getID().money, added)
        // file.save();
        items.money += added
        info = JSON.stringify(data, null, 2)
        fs.writeFile(`${__dirname}/config/data.json`, finished)
        console.log(typeof items.money);
        console.log(`Added ${amount} to ${items.username} with id: ${getID()}`)
        if (typeof callback === 'function') {
          callback()
        }
      }

      /**
       * creates a new data for new user
       */
      function join() {
        let id = message.author.id
        if (data[getID()] || data[getID().used] === true) {
          // if data[getID()] is exist or used is true that means the user already joined the casino
          return message.reply(`already joined`)
        }
        message.reply(`Welcome`)

        /**
         * user's default config
         */
        data[message.author.id] = {
          money: 1000,
          username: message.author.username,
          used: true,
          isAdmin: false
        }

        // converts JavaScript object or value to a JSON string
        info = JSON.stringify(data, null, 2)

        // save the info to the file
        fs.writeFile(`${__dirname}/config/data.json`, info, finished => {})
      }

      switch (message.content) {
        case '+join':
          load(join)

          break
        case '+balance':
          load(balance)
          break
      } // switch case ends here
      // special conditions
      if (message.content.startsWith('+add')) {
        if (items.isAdmin) {
          let amount = message.content.split(' ').slice(1).join(' ')
          addMoney(amount, load)
          message.channel.send(`Added ${amount}`)
          if (!amount || amount === NaN) {
            return message.channel.send(`you must include amount`)
          }
        } else {
          return message.channel.send(`this is admin only command`)
        }
      }

    })
  }

}

module.exports = Casino
