'use strict';

const Discord = require('discord.js');
const commando = require('discord.js-commando');

const client = new Discord.Client();

class RoleGiver {
  constructor(client) {
    client.on('guildMemberAdd', function(member) {
      let welcomeChannel = member.guild.channels.find("name", "welcome");
      let goodRole = member.guild.roles.find("name", "😁GOOD PEOPLE😁");
      if (!welcomeChannel) {
        return null;
      }
      welcomeChannel.send(member.toString() + " welcome");
      if (!goodRole) {
        return null;
      }
      member.addRole(goodRole)
    });
  }
}

module.exports = RoleGiver;
