const Discord = require('discord.js');
exports.run = async (client, $, message, args) => {
  const guild = message.guild;
  const embed = new Discord.RichEmbed()
    .setDescription(`Information about ${guild}`)
    .setColor('RANDOM')
    .setThumbnail(guild.iconURL)
    .addField('Created at', guild.createdAt, true)
    .addField('Members', `${guild.members.size} total members
${guild.members.filter(m => !m.user.bot).size} users
${guild.members.filter(m => m.user.bot).size} bots`, true)
    .addField('Channels', `${guild.channels.size} Total channels
${guild.channels.filter(c => c.type == 'text').size} Text channels
${guild.channels.filter(c => c.type == 'voice').size} Voice channels
${guild.channels.filter(c => c.type == 'category').size} Categories`, true)
    .addField('Roles', `${guild.roles.size} total roles
${guild.roles.filter(r => !r.managed).size} standard roles
${guild.roles.filter(r => r.managed).size} managed roles`, true)
    .addField('Emojis', `${guild.emojis.size} total emojis
${guild.emojis.filter(e => !e.animated).size} standard emojis
${guild.emojis.filter(e => e.animated).size} animated emojis`, true)
    .addField('Multi factor authentication level', guild.mfaLevel, true)
    .addField('Verification level', guild.verificationLevel, true)
    .addField('Explicit content filter', guild.explicitContentFilter, true)
    .addField('Verified', guild.verified, true)
    .addField('Owner', guild.owner, true)
    .addField('Region', guild.region, true)
    .addField('Default message notificaitnos', guild.defaultMessageNotifications, true)
    .addField('System channel', guild.systemChannel , true)
    .addField('Id', guild.id, true)
  if(guild.splashURL) {
    embed.addField('Splash', '')
      .setImage(guild.splashURL);
  }
  message.channel.send(embed);
};

exports.config = {
  enabled: true,
  guildOnly: true,
  aliases: ['server'],
  botOwnerOnly: false,
  hidden: false
};

exports.info = {
  name: "server_info",
  category: "Discord",
  description: 'Information about the server',
  usage: "server_info"
};
