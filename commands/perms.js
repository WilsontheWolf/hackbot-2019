const Discord = require('discord.js')
exports.run = async (client, $, message, args) => {
  let search;
  if(args) search = args.join(' ');
  else search = message.author.id;
  let userid = (await $.functions.fetchUser(client, search, message)).id;
  if(!userid) return message.channel.send('error getting user');
  const member = message.guild.members.get(userid);
  const cross = '<:x:544994239587811350>';
  const tick = '<:c:544992676676894731>';
  let perms = '';
  if(!member) return;
  perms += `${member.hasPermission('ADMINISTRATOR') ? tick : cross}Admin` + '\n';
  perms += `${member.hasPermission('CREATE_INSTANT_INVITE') ? tick : cross}create Invite` + '\n';
  perms += `${member.hasPermission('KICK_MEMBERS') ? tick : cross}Kick` + '\n';
  perms += `${member.hasPermission('BAN_MEMBERS') ? tick : cross}Ban` + '\n';
  perms += `${member.hasPermission('MANAGE_CHANNELS') ? tick : cross}Manage Channels` + '\n';
  perms += `${member.hasPermission('MANAGE_GUILD') ? tick : cross}Manage Server` + '\n';
  perms += `${member.hasPermission('ADD_REACTIONS') ? tick : cross}Add Reactions` + '\n';
  perms += `${member.hasPermission('VIEW_AUDIT_LOG') ? tick : cross}View Audit Log` + '\n';
  perms += `${member.hasPermission('PRIORITY_SPEAKER') ? tick : cross}Priority Speaker` + '\n';
  perms += `${member.hasPermission('VIEW_CHANNEL') ? tick : cross}View Channel` + '\n';
  perms += `${member.hasPermission('SEND_MESSAGES') ? tick : cross}Send Messages` + '\n';
  perms += `${member.hasPermission('SEND_TTS_MESSAGES') ? tick : cross}Send Text To Speach Messages` + '\n';
  perms += `${member.hasPermission('MANAGE_MESSAGES') ? tick : cross}Manage Messages (Delete Messages and Reactions)` + '\n';
  perms += `${member.hasPermission('EMBED_LINKS') ? tick : cross}Send Embeds` + '\n';
  perms += `${member.hasPermission('ATTACH_FILES') ? tick : cross}Send Files + Images` + '\n';
  perms += `${member.hasPermission('READ_MESSAGE_HISTORY') ? tick : cross}Read Message History` + '\n';
  perms += `${member.hasPermission('MENTION_EVERYONE') ? tick : cross}Use @everyone and @here` + '\n';
  perms += `${member.hasPermission('USE_EXTERNAL_EMOJIS') ? tick : cross}Use Externial Emojis` + '\n';
  perms += `${member.hasPermission('CONNECT') ? tick : cross}Connect to Voice Channels` + '\n';
  perms += `${member.hasPermission('SPEAK') ? tick : cross}Speak in Voice Channels` + '\n';
  perms += `${member.hasPermission('MUTE_MEMBERS') ? tick : cross}Mute Members` + '\n';
  perms += `${member.hasPermission('DEAFEN_MEMBERS') ? tick : cross}Deafen Members` + '\n';
  perms += `${member.hasPermission('MOVE_MEMBERS') ? tick : cross}Move Members Between Voice Channels` + '\n';
  perms += `${member.hasPermission('USE_VAD') ? tick : cross}Use Voice Activity Detection` + '\n';
  perms += `${member.hasPermission('MANAGE_NICKNAMES') ? tick : cross}Manage Nicknames` + '\n';
  perms += `${member.hasPermission('MANAGE_ROLES') ? tick : cross}Manage Roles` + '\n';
  perms += `${member.hasPermission('MANAGE_WEBHOOKS') ? tick : cross}Manage Webhooks` + '\n';
  perms += `${member.hasPermission('MANAGE_EMOJIS') ? tick : cross}Manage Emojis`;
  const embed = new Discord.RichEmbed()
    .setAuthor(member.displayName, member.displayAvatarURL)
    .setDescription(perms)
    .setFooter(`Stats are for ${member.displayName} in ${message.guild.name} as of`)
    .setTimestamp();
  message.channel.send(embed);
};

exports.config = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  botOwnerOnly: false,
  hidden: false
};

exports.info = {
  name: "perms",
  category: "Server",
  description: "Get a users perms.",
  usage: "perms <user>"
};
