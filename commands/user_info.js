const Discord = require('discord.js');
exports.run = async (client, $, message, args) => {
  const user = await client.fetchUser(args);
  const embed = new Discord.RichEmbed()
    .setDescription(`Information about ${user}`)
    .setColor('RANDOM')
    .setThumbnail(user.displayAvatarURL)
    .addField('Bot', user.bot, true)
    .addField('Id', user.id, true)
    .addField('Status', user.presence.status, true)
    .addField('Tag', user.tag, true);
  const member = message.guild.members.get(user.id);
  if(member){
    embed.addField('Joined at', member.joinedAt, true)
      .addField('Nickname', member.nickname, true)
      .addField('Roles', member.roles.array().join(' ||1|| '), true);
  }
  message.channel.send(embed);
};

exports.config = {
  enabled: true,
  guildOnly: false,
  aliases: ['user'],
  botOwnerOnly: false,
  hidden: false
};

exports.info = {
  name: "user_info",
  category: "Discord",
  description: 'Information about user',
  usage: "user_info <id>"
};
