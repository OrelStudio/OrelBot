'use strict';

const Discord = require('discord.js');
const commando = require('discord.js-commando');
const client = new Discord.Client();

let prefix = '!';

class banCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "ban",
      group: "list",
      memberName: "ban",
      description: "bans a member"
    });
    client.on('message', function(message) {
      let msg = message.content;
      let messageArray = msg.split(" ");
      let args = messageArray.slice(1);
      if (msg.startsWith('!ban')) {
        //if the message is equals to '!ban'
        if (message.author.id === '215705227498618880') {
          message.channel.send("You know how to use this command Orel... stop testing, you know it's working..")
          return null;
        }
        if (message.channel.type === "dm") {
          message.channel.send("This command must be in a server NOT in DM :expressionless:")
          return null;
        }
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!bUser) {
          message.channel.send("Can't find user!");
          return null;
        }
        let bReason = args.join(" ").slice(22);
        if (!message.member.hasPermission("BAN_MEMBERS")) {
          message.channel.send("sorry" + `<@${message.author.id}>` + ", you can't ban members")
        }
        if (!message.author.id === '215705227498618880') {
          return null;
        }
        if (message.author.id === '215705227498618880') {
          message.channel.send("I can't deny my creator");
        }
        // if (bUser.hasPermission("BAN_MEMBERS")) {
        //   message.channel.send("That person can't be baned!")
        //   return null;
        // }
        if (!bReason) {
          message.channel.send("you must enter a reason")
          return null;
        }
        let banEmbed = (new Discord.RichEmbed())
          .setDescription("~Kick~")
          .setColor("#ff00a1")
          .addField("Banned User", `${bUser} with ID ${bUser.id}`)
          .addField("Banned By", `<@${message.author.id}> with id ${message.author.id}`)
          .addField("Banned In", message.channel)
          .addField("Time", message.createdAt)
          .addField("Reason", bReason);

        if (bUser === '215705227498618880') {
          message.channel.send('bye Orel :sob:')
        }
        let banChannel = message.guild.channels.find(`name`, "kicked-banned");
        if (!banChannel) {
          message.channel.send("Can't find kicked-banned channel.");
          return null;
        }

        message.guild.member(bUser).ban(bReason);
        banChannel.send(banEmbed);
      }
      if (msg === '!help-ban') {
        if (!message.channel.type === "dm") {
          message.channel.send("To use ban command you must have **ban members permission in your role**");
          message.channel.send("This is how to use it **!ban @user#tag reason");
          message.channel.send("example of this command **!ban @example#6669 spam");
        } else {
          message.channel.send("Note: This command must be in a server")
          message.channel.send("To use ban command you must have **ban members permission in your role**");
          message.channel.send("This is how to use it **!ban @user#tag reason**");
          message.channel.send("example of this command **!ban @example#6669 spam**");
        }
        message.channel.send("hope I helped you :smile:")
      }
    });
  }
}

module.exports = banCommand;
