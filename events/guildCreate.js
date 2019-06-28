const Discord = require('discord.js')
module.exports = async (client, $, guild) => {
  $.settings.ensure(guild.id, $.config.defaultSettings)
  let channel = await guild.channels.find(c=>c.name==='general');
  let welcomeMessage = `Thanks for inviting me to your server: \n- if you need command help feel free to use the \`!help\` command.`
  if(channel) channel.send(welcomeMessage)
}