const Discord = require('discord.js');
exports.run = async (client, $, message, args) => {
  if(/^<.+>$/.test(args[0])) args[0] = args[0].substr(1, args[0].length - 2);
  if(!/^https:\/\/(?:ptb.)?discordapp.com\/(?:api\/)?oauth2\/authorize\?/.test(args[0])) return;
  const parameter = $.functions.getParameterURL(args[0]);
  const embed = new Discord.RichEmbed()
    .setAuthor('OAuth2 information')
    .setTitle('Link')
    .setURL(args[0])
    .setColor('RANDOM');
  if(parameter.client_id) {
    embed.addField('Client id', parameter.client_id, true)
    await client.fetchUser(parameter.client_id).then(bot => {
      embed.addField('Client name', `${bot} (${bot.tag})`, true)
      .setThumbnail(bot.displayAvatarURL);
    }).catch(err => err);  //There might be no user
  }
  if(parameter.permissions) embed.addField('Bot\'s permissions', parameter.permissions, true);
  if(parameter.redirect_uri) embed.addField('Redirect to', parameter.redirect_uri, true);
  if(parameter.response_type) embed.addField('Response type', parameter.response_type, true);
  if(parameter.scope) embed.addField('Scope', parameter.scope.replace(/ /g, ' ||l|| '), true);
  message.channel.send(embed);
};
//https://discordapp.com/oauth2/authorize?&client_id=CLIENT_ID&scope=bot&permissions=PREMISSIONS
//https://ptb.discordapp.com/oauth2/authorize?&client_id=CLIENT_ID&scope=bot&permissions=PREMISSIONS
exports.config = {
  enabled: true,
  guildOnly: false,
  aliases: ['auth', 'oauth', 'auth2'],
  botOwnerOnly: false,
  hidden: false
};

exports.info = {
  name: "oauth2",
  category: "Miscellaneous",
  description: 'Information about oauth2',
  usage: "oauth2 <link>"
};