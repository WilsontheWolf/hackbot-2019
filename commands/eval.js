const Discord = require('discord.js')
const enmap = require('enmap')
exports.run = async (client, $, message, args) => {
  const code = args.join(" ");
  try {
    const code = args.join(" ");
    var evaled
    if (code.search('await') != -1) evaled = await eval("( async () => {return " + code + "})()");
    else evaled = await eval(code);
    
    if (typeof evaled !== "string") {
      var evaled = require("util").inspect(evaled);
    }
  } catch(err) {
    var length = `\`\`\`${err}\`\`\``.length
    var embedErr = new Discord.RichEmbed()
    .setColor('RED')
    .setTitle('**Error**')
    .setFooter(`Eval command executed by ${message.author.username}`)
    .setTimestamp();
    if(length >= 2049){
      console.error(`An eval command executed by ${message.author.username}'s error was too long \(${length}/2048\) the responce was:\n${evaled}`);
      embedErr.setDescription(`The error was too long with a length of \`${length}/2048\` characters. it was logged to the console`);
    }
    else{
      embedErr.setDescription(`\`\`\`${err}\`\`\``);
    }
    message.channel.send(embedErr);
    return;
  }
  var length = `\`\`\`${evaled}\`\`\``.length
  var embed = new Discord.RichEmbed()
  .setColor('GREEN')
  .setTitle('**Success**')
  .setFooter(`eval command executed by ${message.author.username}`)
  .setTimestamp()
  if(length >= 2049){ console.log(`An eval command executed by ${message.author.username}'s responce was too long \(${length}/2048\) the responce was:
${evaled}`)
                     embed.setDescription(`The responce was too long with a length of \`${length}/2048\` characters. it was logged to the console`)}
  else{embed.setDescription(`\`\`\`${evaled}\`\`\``);}
  message.channel.send(embed);
};

exports.config = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  botOwnerOnly: true,
  hidden: true
};

exports.info = {
  name: "eval",
  category: "System",
  description: "Run js code. Useful for debugging, but can be dangerous.",
  usage: "eval <code>"
};