const Discord = require('discord.js')
exports.run = async (client, $, message, args) => {
  const embed = new Discord.RichEmbed()
    .setAuthor('Commands', client.user.avatarUrl)
    .setColor('RANDOM');
  let help = {};
  for(const name in $.commands) {
    const command = $.commands[name];
    if(command.config.hidden) continue;
    if(!help[command.info.category]) help[command.info.category] = {};
    help[command.info.category][command.info.name] = command;
  }
  switch(args.length){
    case 0:
      for(const category in help) {
        let output = '';
        const commands = help[category];
        for(const name in commands){
          const command = commands[name];
          output += '\n' + command.info.name; 
        }
        embed.addField(category, output, true);
      }
      embed.setTitle('Category');
      embed.setDescription('help <category> <command>');
      break;
    case 1:
      {
        const commands = help[args[0]];
        if(!commands) return;
        for(const name in commands){
          const command = commands[name];
          embed.addField(command.info.name, `\`${command.info.usage}\`\n${command.info.description}`, true);
        }
        embed.setTitle(args[0] + ' category');
        break;
      }
    case 2:
      {
        const commands = help[args[0]];
        if(!commands) return;
        const command = help[args[0]][args[1]];
        if(!command) return;
        embed.addField('Aliases', command.config.aliases.join(' ||l|| '), true);
        embed.addField('Guild only', command.config.guildOnly, true);
        embed.addField('Bot owner only', command.config.botOwnerOnly, true);
        embed.setDescription(`\`${command.info.usage}\`\n${command.info.description}`);
        embed.setTitle(command.info.name);
        break;
      }
    default:
      break;
  }
  message.channel.send(embed);

};

exports.config = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  botOwnerOnly: false,
  hidden: false
};

exports.info = {
  name: "help",
  category: "Miscellaneous",
  description: "Shows all commands",
  usage: "help <category> <command>"
};
