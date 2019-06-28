const Discord = require('discord.js')
exports.run = async (client, $, message, args) => {
  const link = `https://discordapp.com/api/guilds/${message.guild.id}/widget.png?style=`;
  let json = await $.functions.readURL(`https://discordapp.com/api/guilds/${message.guild.id}/widget.json?${$.functions.Rnd(0, 1993049)}`)
  const embed = new Discord.RichEmbed().setDescription('Please enable the widget in the server settings.')
if(!json) return message.channel.send(embed)
  embed.setDescription(':zero: shield\n:one: banner1\n:two: banner2\n:three: banner3\n:four: banner4\n✅ Done')
    .setImage(link + 'shield');
  const msg = await message.channel.send(embed);
  (  async () => {// allows reactions to be done without waitingf for the bot to be done
  await msg.react('0⃣');
  await msg.react('1⃣');
  await msg.react('2⃣');
  await msg.react('3⃣');
  await msg.react('4⃣');
    await msg.react('✅');})()
  const filter = (reaction, user) => {
    if(user.id != message.author.id) return false;
    return true;
  }
  let type = 'shield'
  const collector = msg.createReactionCollector(filter, { time: 60000 * 5 });
  collector.on('collect', r => {
    switch(r.emoji.name){
      case '0⃣':
        type = 'shield'
        msg.edit(embed.setImage(link + type));
        break;
      case '1⃣':
        type = 'banner1'
        msg.edit(embed.setImage(link + type));
        break;
      case '2⃣':
        
        type = 'banner2'
        msg.edit(embed.setImage(link + type));
        break;
      case '3⃣':
        type = 'banner3'
        msg.edit(embed.setImage(link + type));
        break;
      case '4⃣':
        type = 'banner4'
        msg.edit(embed.setImage(link + type));
        break;
      case '✅':
        collector.stop();
        break;
      default:
    }
  });
  collector.on('end', collected => {
    msg.edit(embed.setDescription(`Ended.\nUrl: ${link+type}`));
  });
};

exports.config = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  botOwnerOnly: false,
  hidden: false
};

exports.info = {
  name: "widget",
  category: "Miscellaneous",
  description: 'Previw widgets',
  usage: "widget"
};