exports.run = async (client, $, message, args) => {
  const command = args.slice(1).join(' ');
  try{
    $.functions.reload(args[0], command);
  }
  catch(error){
    return await message.reply(('```js' + error.stack).substr(0, 2045) + '```');
  }
  await message.reply(`\`${command || args[0]}\` has be reloaded!!`);
};

exports.config = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  botOwnerOnly: true,
  hidden: true
};

exports.info = {
  name: "reload",
  category: "Miscellaneous",
  description: "Reload command",
  usage: "reload <name>"
};