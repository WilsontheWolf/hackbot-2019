const Discord = require('discord.js')
exports.run = async (client, $, message, args) => {
  const data = await $.functions.decodeUrl(args[0])
  const msg = await client.channels.get(data.channel).fetchMessage(data.message);
  await msg.react('👍')
  await msg.react('👎')
  message.reply('Succsesfully added vote reactions to the message.')
};

exports.config = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  botOwnerOnly: false,
  hidden: false
};

exports.info = {
  name: "vote",
  category: "Miscellaneous",
  description: "Add a 👍 and 👎 emoji to a message. To vote a new message include `<vote>` in a message.",
  usage: "vote <message URL>"
};