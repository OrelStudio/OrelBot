const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'roll',
      group: 'list',
      memberName: 'roll',
      description: 'Roll a dice'
    });
  }

  async run(message, args) {
    let roll = Math.floor(Math.random() * 6) + 1;
    message.reply("You rolled a " + roll);
  }
}

module.exports = DiceRollCommand;
