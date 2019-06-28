const Discord = require('discord.js')

module.exports = async (client, $, message) => {
  if(message.author.bot) return;
  
  if(message.content.includes('<vote>')){
    await message.react('👍')
    await message.react('👎')
    }
  if(message.guild && message.content.includes('<pin>') && message.member.permissionsIn(message.channel.id).has('MANAGE_MESSAGES')){
    if(message.guild.me.permissionsIn(message.channel.id).has('MANAGE_MESSAGES')) {
    message.pin()
  } else {
    message.author.send('I don\'t have permission to pin this message. ')
   }
  }
  
  const prefix = $.functions.getPrefix($, message.guild.id);
  if (message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  const command = $.commands[commandName] || $.commands[$.aliases[commandName]];
  
  if(!command) return;
  if(command.config.botOwnerOnly && !$.config.owners.includes(message.author.id)) return;
  if(!command.config.enabled) return;
  if(!message.guild && command.config.guildOnly) return;
  
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this guild is \`${prefix}\``);
  }
  if (!command) return
  try{
    command.run(client, $, message, args)
  }catch(e){
    console.error(e)
    message.channel.send(`I am sorry but I have encountered an error while running the command. It has been logged.\nError: \`\`\`js\n${e}\`\`\``)
    client.channels.get('592786490065551533').send(`${message.author.tag} got an error. Message: ${message.content}\nError: \`\`\`js\n${e}\`\`\``)
  }
}