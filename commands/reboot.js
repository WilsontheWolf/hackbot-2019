exports.run = async (client, $, message, args) => {
  await message.reply('rebooting...')
  await client.user.setActivity('Rebooting...')
  await console.log(`${message.author.tag} rebooted the bot.`)
  process.exit(0)
};

exports.config = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  botOwnerOnly: true,
  hidden: true
};

exports.info = {
  name: "reboot",
  category: "Miscellaneous",
  description: "Restarts the bot.",
  usage: "reboot"
};