const Discord = require('discord.js');
const Jimp = require('jimp');
exports.run = async (client, $, message, args) => {
  let image;
  switch(args.length){
    case 1:
      image = new Jimp(1, 1, Number(args[0]));
      break;
    case 2:
      image = new Jimp(2, 1, Number(args[0]));
      image.setPixelColor(Number(args[1]), 1, 2);
      break;
    default:
      return;
  }
  image.resize(Jimp.AUTO, 100, Jimp.RESIZE_NEAREST_NEIGHBOR);
  message.channel.send(new Discord.Attachment(await image.getBufferAsync(Jimp.MIME_PNG), 'image.png'));
};

exports.config = {
  enabled: true,
  guildOnly: true,
  aliases: ['color'],
  botOwnerOnly: false,
  hidden: false
};

exports.info = {
  name: "colour",
  category: "Miscellaneous",
  description: 'Compare 2/Show colour(s)',
  usage: "colour <hex> <?hex>"
};
