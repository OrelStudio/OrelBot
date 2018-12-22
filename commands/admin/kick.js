'use strict';

const Discord = require('discord.js');
const commando= require('discord.js-commando');
const client = new Discord.Client();

let prefix = '!';

class kickCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "kick",
      group: "list",
      memberName: "kick",
      description: "kicks a member"
    });
    client.on('message', function(message) {
      let msg = message.content;
      let messageArray = msg.split(" ");
      let args = messageArray.slice(1);
      let kReason = args.join(" ").slice(22);
      if (msg.startsWith('!kick')) {
        //if the message is equals to '!kick'
        if (message.channel.type === "dm") {
          message.channel.send("This command must be in a server NOT in DM :expressionless: (use '!help-kick' for help)")
          return null;
        }
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!kUser) {
          message.channel.send("Can't find user! (use '!help-kick' for help)");
          return null;
        }
        if (!message.member.hasPermission("KICK_MEMBERS")) {
          message.channel.send("sorry" + `<@${message.author.id}>` + ", you can't kick members")
        } else if (!message.author.id === '215705227498618880') {
          return null;
        }
        if (message.author.id === '215705227498618880') {
          message.channel.send("I can't deny my creator");
        }
        // if (kUser.hasPermission("KICK_MEMBERS")) {
        //   message.channel.send("That person can't be kicked!")
        //   return null;
        // }
        if (!kReason) {
          message.channel.send("you must enter a reason (use '!help-kick' for help)")
          return null;
        }
        let kickEmbed = (new Discord.RichEmbed())
        .setDescription("~Kick~")
        .setColor("#ff00a1")
        .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with id ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", kReason);

        if (kUser === '215705227498618880') {
          message.channel.send('bye Orel :sob:')
        }
        let kickChannel = message.guild.channels.find(`name`, "kicked-banned");
        if (!kickChannel) {
          message.channel.send("Can't find kicked-banned channel.");
          return null;
        }

        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);
      }
      if (msg === '!help-kick') {
        if (!message.channel.type === "dm") {
          message.channel.send("To use kick command you must have **kick members permission in your role**");
          message.channel.send("This is how to use it **!kick @user#tag reason");
          message.channel.send("example of this command **!kick @example#6669 spam");
        } else {
          message.channel.send("Note: This command must be in a server")
          message.channel.send("To use kick command you must have **kick members permission in your role**");
          message.channel.send("This is how to use it **!kick @user#tag reason**");
          message.channel.send("example of this command **!kick @example#6669 spam**");
        }
        message.channel.send("hope I helped you :smile:")
      }
    });
  }
}

module.exports = kickCommand;
