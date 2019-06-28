const Discord = require('discord.js')
exports.run = async (client, $, message, args) => {
  let emoji = '🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿'.split(' ');
  if (!args[0]) return message.reply('please provide some options');
  let choices = args.join(' ').split('-');
  let title = choices.shift() || 'Poll';
  if(choices.length >20) return message.reply('You can\'t have more than 20 reactions on a message.');
  let poll = '';
  console.log(choices);
  let i = 0;
  choices.forEach(c => {
    poll = poll + emoji[i] + c + '\n';
    i++;
  })
  const embed = new Discord.RichEmbed().setTitle(title)
    .setDescription(poll);
  let msg = await message.channel.send(embed);
  for(let react = i; react; ) await msg.react(emoji[--react]);
};

exports.config = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  botOwnerOnly: false,
  hidden: false
};

exports.info = {
  name: "poll",
  category: "Miscellaneous",
  description: "Generate a poll for your users. Maximum of 20 options.",
  usage: "poll  -option1 -option2 ..."
};