const Discord = require('discord.js');
exports.run = async (client, $, message, args) => {
  /*
  let search;
  if(args) {
    search = args.join(' ');
  } else {
    search = message.author.id;
  }
  let userid = await $.functions.fetchUser(client, search, message).id;
  if(!userid) return message.channel.send('Can\'t find user with that name');
  const member = message.guild.fetchMember(userid);
  */
  let member = await message.guild.fetchMember(args[0])
  let output = '';
  const visible = $.functions.accesibleChannels(message, member).array();
  for(let read = 0; read < visible.length; ){//─└├
    const current = visible[read++];
    const lastChannel = visible[read] === undefined || visible[read].type == 'category' ? true : false;
    const front = current.parent ? (lastChannel ? '└' : '├') : (current.type == 'category' ? '\n' : '─');
    output += front + current + '\n';
  }                                 
  const embed = new Discord.RichEmbed()
    .setTitle(`Channels accesible by ${member.user.tag}`)
    .setDescription(output)
    .setColor('RANDOM');
  message.channel.send(embed);
};

exports.config = {
  enabled: true,
  guildOnly: true,
  aliases: ['user_access', 'access_user', 'channels'],
  botOwnerOnly: true,
  hidden: false
};

exports.info = {
  name: "access",
  category: "Miscellaneous",
  description: "Show what channels user can access",
  usage: "user_access <user>"
};