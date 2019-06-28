const math = require('mathjs')
exports.run = async (client, $, message, args) => {
  if(!args[0]) return message.reply('Please provide an equation')
  try{
    message.channel.send(math.eval(args.join(' ')))
  }
  catch(e){
    message.channel.send(`\`\`\`js
${e}\`\`\``)
}
};

exports.config = {
  enabled: true,
  guildOnly: false,
  aliases: ['meth'],
  botOwnerOnly: false,
  hidden: false
};

exports.info = {
  name: "math",
  category: "Miscellaneous",
  description: "Do math.",
  usage: "math <math>"
};