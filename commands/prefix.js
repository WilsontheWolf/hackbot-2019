const Discord = require('discord.js')
exports.run = async (client, $, message, args) => {
  if(!message.member.permissionsIn(message.channel.id).has('MANAGE_GUILD')) return;
  if(!args[0]) return message.reply('Provide a new prefix.');
  $.settings.set(message.guild.id, args[0], 'prefix')
  message.reply('changed prefix to '+args[0])
};

exports.config = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  botOwnerOnly: false,
  hidden: false
};

exports.info = {
  name: "prefix",
  category: "System",
  description: "Changes prefix",
  usage: "prefix <new prefix>"
};
