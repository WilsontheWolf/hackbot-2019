const Discord = require('discord.js');
exports.run = async (client, $, message, args) => {
  let output = '';
  const channels = $.functions.sortChannels(message.guild.channels).array();
  const Synced = '<:Synced:594192772832165888>';
  const PartiallySynced = '<:PartiallySynced:594190649339674645>';
  const NotSynced = '<:NotSynced:594192773159190613>';
  let category;
  for(let read = 0; read < channels.length; ){//─└├
    const current = channels[read++];
    const lastChannel = channels[read] === undefined || channels[read].type == 'category' ? true : false;
    let type = '';
    if(current.type == 'category') category = current;
    if(category && current.type != 'category'){
      type = Synced;
      //p1 is category
      //p2 is channel
      category.permissionOverwrites.forEach(p1 => {
        if(type == NotSynced) return;
        const p2 = current.permissionOverwrites.get(p1.id);
        if(!p2){
          if(p1.allow || p1.deny) type = NotSynced;
          else type = PartiallySynced;
        }
        else if((p1.allow & p2.allow) != p1.allow || (p1.deny & p2.deny) != p1.deny) type = NotSynced;
      });
      current.permissionOverwrites.forEach(p2 => {
        if(type != Synced) return;
        const p1 = category.permissionOverwrites.get(p2.id);
        if(!p1 || p2.allow ^ p1.allow || p1.deny ^ p2.deny) type = PartiallySynced;
      });
    }
    const front = current.parent ? (lastChannel ? '└' : '├') : (current.type == 'category' ? '\n' : '─');
    output += front + type + current + '\n';
  }                                 
  const embed = new Discord.RichEmbed()
    .setTitle(`Channels`)
    .setDescription(output)
    .setColor('RANDOM');
  message.channel.send(embed);
};

exports.config = {
  enabled: true,
  guildOnly: true,
  aliases: ['sync', 'channels'],
  botOwnerOnly: true,
  hidden: false
};

exports.info = {
  name: "synced",
  category: "Server",
  description: 'Show channels are synced/partially synced/not synced',
  usage: "synced"
};
