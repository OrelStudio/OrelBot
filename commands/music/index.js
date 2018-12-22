'use strict';

const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
const EventEmitter = require('eventemitter3');

const Client = new Discord.Client();
const EE = new EventEmitter();

let config = JSON.parse(fs.readFileSync('./settings.json', 'utf-8'));

const yt_api_key = config.yt_api_key;
const bot_constroller = config.bot_controller;
const prefix = config.prefix;

let isPlaying;
let stream;

var guilds = {};

const addGuild = (guild) => {
  if (guild && guild.id && !guilds.hasOwnProperty(guild.id)) {
    guilds[guild.id] = {
      queue: [],
      queueNames: [],
      isPlaying: false,
      dispatcher: null,
      voiceChannel: null,
      skipReq: 0,
      skippers: [],
      isInside: false
    }
  }
}

class Musicc {
  constructor(Client) {
    Client.on('voiceStateUpdate', (newMember, oldMember) => {
      if (newMember.user.id === '388420378982219796') {
        addGuild(newMember.guild)
        if (newMember.voiceChannelID) {
          this.toInside(newMember.guild.id);
        }
      }
    })
    Client.on('message', (message) => {
      const member = message.member;
      const mess = message.content.toLowerCase();
      const args = message.content.split(' ').slice(1).join(" ");


      if (!guilds[message.guild.id]) {
        guilds[message.guild.id] = {
          queue: [],
          queueNames: [],
          isPlaying: false,
          dispatcher: null,
          voiceChannel: null,
          skipReq: 0,
          skippers: [],
          isInside: false
        };
      }

      if (mess.startsWith("+play")) {
        if (message.member.voiceChannel || guilds[message.guild.id].voiceChannel != null) {
          if (guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isPlaying) {
            getID(args, function(id) {
              add_to_queue(id, message);
              fetchVideoInfo(id, function(err, videoInfo) {
                if (err) {
                  throw new Error(err);
                }
                message.reply(" added to queue: **" + videoInfo.title + "**");
                guilds[message.guild.id].queueNames.push(videoInfo.title);
              });
            });
          } else {
            isPlaying = true;
            getID(args, function(id) {
              guilds[message.guild.id].queue.push(id);
              playMusic(id, message);
              fetchVideoInfo(id, function(err, videoInfo) {
                if (err) {
                  throw new Error(err);
                }
                guilds[message.guild.id].queueNames.push(videoInfo.title);
                message.channel.send(`now playing: **${videoInfo.title}**`);
                console.log(`playing ${videoInfo.title} in server: ${guild.name} time: ${message.createdAt} user: ${message.author} channel: ${message.channel}`);
              });
            });
          }
        } else {
          message.reply(" you need to be in a voice channel!");
        }
      } else if (mess.startsWith(prefix + "skip")) {
        skip_song(message);
        // if (guilds[message.guild.id].skippers.indexOf(message.author.id) === -1) {
        //   guilds[message.guild.id].skippers.push(message.author.id);
        //   guilds[message.guild.id].skipReq++;
        //   if (guilds[message.guild.id].skipReq >= Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)) {
        //     skip_song(message);
        //     message.reply(" your skip has been acknowledged. Skipping now!");
        //   } else {
        //     message.reply(" your skip has been acknowledged. You need **" + Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2) - guilds[message.guild.id].skipReq) = "**  more skip votes!";
        //   }
        // } else {
        //   message.reply(" you already voted to skip!");
        // }
      } else if (mess.startsWith(prefix + "queue")) {
        let message2 = "```";
        for (let i = 0; i < guilds[message.guild.id].queueNames.length; i++) {
          let temp = (i + 1) + ": " + guilds[message.guild.id].queueNames[i] + (i === 0 ? "Current Song" : "") + "\n";
          if ((message2 + temp).length <= 2000 - 3) {
            message2 += temp;
          } else {
            message2 += "```";
            message.channel.send(message2);
            message2 = "```";
          }
        }
        message2 += "```";
        message.channel.send(message2);
      } else if (mess.startsWith(prefix + "remove")) {
        for (let i = 0; i < guilds[message.guild.id].queueNames.length; i++);
        let removed = guilds[message.guild.id].queueNames.indexOf(args)
        guilds[message.guild.id].queueNames.splice(removed+1, 1);
        message.channel.send(`Removed from queue`);
      } else if (mess.startsWith(prefix + 'leave')) {
        if (guilds[message.guild.id].isInside) {
          if (isPlaying) {
            skip_song(message);
          }
          guilds[message.guild.id].voiceChannel.leave();
        } else {
          message.channel.send(`I'm not in the channel`);
        }
      }


      function skip_song(message) {
        guilds[message.guild.id].dispatcher.end();
      }

      function playMusic(id, message) {
        guilds[message.guild.id].voiceChannel = message.member.voiceChannel;

        guilds[message.guild.id].voiceChannel.join().then(function(connection) {
          stream = ytdl(`https://www.youtube.com/watch?v=${id}`, {
            filter: 'audioonly'
          });
          guilds[message.guild.id].isInside = true;
          guilds[message.guild.id].skispReq = 0;
          guilds[message.guild.id].skippers = [];

          guilds[message.guild.id].dispatcher = connection.playStream(stream);
          guilds[message.guild.id].dispatcher.on('end', function() {
            guilds[message.guild.id].skipReq = 0;
            guilds[message.guild.id].skippers = [];
            guilds[message.guild.id].queue.shift();
            guilds[message.guild.id].queueNames.shift();
            if (guilds[message.guild.id].queue.length === 0) {
              guilds[message.guild.id].queue = [];
              guilds[message.guild.id].queueNames = [];
              guilds[message.guild.id].isPlaying = false;
            } else {
              setTimeout(function() {
                playMusic(guilds[message.guild.id].queue[0], message);
              }, 500);
            }
          });
          return null
        });
      }

      function getID(str, cb) {
        if (isYoutube(str)) {
          cb(getYouTubeID(str));
        } else {
          search_video(str, function(id) {
            cb(id);
          });
        }
      }

      function add_to_queue(strID, message) {
        if (isYoutube(strID)) {
        } else {
          guilds[message.guild.id].queue.push(strID);
        }
      }

      function search_video(query, callback) {
        request(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${encodeURIComponent(query)}&key=${yt_api_key}`, function(error, response, body) {
          let json = JSON.parse(body);
          if (!json.items[0]) {
            if (typeof callback === 'function') {
              callback("3_-a9nVZYjk");
            }
          }
          else {
            if (typeof callback === 'function') {
              callback(json.items[0].id.videoId);
            }
          }
        });
      }

      function toInside() {
        guilds[message.guild.id].isInside = false;
      }

      function isYoutube(str) {
        return str.toLowerCase().indexOf("youtube.com") > -1;
      }
    });
  }

  toInside (guildId) {
    if (guilds.hasOwnProperty(guildId)) {
      console.log('bot left the channel')
      guilds[guildId].isInside = false;
    } else {
      console.log('guild does not exist for', guildId)
    }
  }
}

module.exports = Musicc
