'use strict'

const Discord = require('discord.js');
const commando = require('discord.js-commando');
const uupdates = require('./updates')
const client = new Discord.Client();

module.exports = class UpdatesS extends commando.Command {
    constructor (client) {
        super(client, {
            name: 'updates',
            group: 'list',
            memberName: 'updates',
            description: 'last updates'
          });

          client.on('message', function (message) {
            if (message.content === '!updates') {
              message.channel.send("jokes for the bot");
              message.channel.send("last updates command");
              message.channel.send("live post bitcoin and ethereum value");
              console.log("updates command")
            }
          });

/*
        client.on('message', function (message) {
            console.log("updates command");
            message.reply("jokes for the bot");
            message.reply("last updates command");
            message.reply("live post bitcoin and ethereum value");
            */
        };
      }
    //};
    /*
            message.channel.send(updates.updates.first)
            message.channel.send(updates.updates.second)
            message.channel.send(updates.updates.third)
            */
