exports.run = async (client, $, message, args) => {
  const command = args.slice(1).join(' ');
  try{
    $.functions.unload(args[0], command);
  }
  catch(error){
    return await message.reply(('```js' + error.stack).substr(0, 2045) + '```');
  }
  await message.reply(`\`${command || args[0]}\` has be unloaded!!`);
};

exports.config = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  botOwnerOnly: true,
  hidden: true
};

exports.info = {
  name: "unload",
  category: "Miscellaneous",
  description: "Unload commands",
  usage: "unload <name>"
};