'use strict';

const Discord = require('discord.js');
const commando = require('discord.js-commando');
const client = new Discord.Client();

class reportCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'report',
      group: 'list',
      memberName: 'report',
      description: 'reports a user'
    });
    client.on('message', function(message) {
      let messageArray = message.content.split(" ");
      let args = messageArray.slice(1);
      if (message.content.startsWith("!report")) {
        if (message.channel.type === "dm") {
          message.channel.send("This command must be in a server NOT in DM :expressionless:")
          return null;
        }
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!rUser) {
          message.channel.send("Couldn't find user.");
          return null;
        }
        let reason = args.join(" ").slice(22);

        if (!reason) {
          message.channel.send("You must enter a reason with picture link")
          return null;
        }

        let reportEmbed = new Discord.RichEmbed()
          .setDescription("~Report~")
          .setColor("#ff00fc")
          .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
          .addField("Reported by", `${message.author} with ID: ${message.author.id}`)
          .addField("Channel", message.channel)
          .addField("Time", message.createdAt)
          .addField("Reason and picture link", reason)

        let reportchannel = message.guild.channels.find(`name`, "reports");
        if (!reportchannel) {
          message.channel.send("Couldn't find reports channel");
          return null;
        }
        message.delete().catch(msg => {});
        reportchannel.send(reportEmbed);
      }
    });
  }
}

module.exports = reportCommand;
