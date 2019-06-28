const Discord = require('discord.js')
//const Long = require("long");
const unirest = require('unirest')
module.exports = ($) => {
  const functions = {};
  
  functions.getPrefix = ($, guild_id) => {
    return $.settings.get(guild_id).prefix || $.config.defaultSettings.prefix;
  }
  
  functions.getParameterURL = URL => {  //Made by @Khoo Hao Yit#6191
    const parameter = {};
    URL.replace(/^[^?]+\?/, '').split('&').forEach(string => {
      const array = string.split('=');
      parameter[decodeURIComponent(array[0])] = decodeURIComponent(array[1]);
    });
    return parameter;
  }
  
  functions.sortChannels = collection => {
    return collection.sort((c1, c2) => {  //Made by @Khoo Hao Yit#6191
      //No parent
      if(!c1.parent && !c2.parent){
          //Same type
          if(c1.type == c2.type) return c1.position < c2.position ? -1 : 1;
          //One of them is a text channel
          if(c1.type == 'text' || c2.type == 'text') return c1.type == 'text' ? -1 : 1;
          //One of them is a voice channel
          if(c1.type == 'voice' || c2.type == 'voice') return c1.type == 'voice' ? -1 : 1;
          if(c1.type == 'category' || c2.type == 'category') return c1.type == 'category' ? 1 : -1;
      }
      //One have parent, one doesn't
      if(!!c1.parent ^ !!c2.parent) {
        const parent = c1.parent || c2.parent;
        //One of them is a category
        if(c1.type == 'category' || c2.type == 'category') {
          const category = c1.type == 'category' ? c1 : c2;
          //Its same as the parent
          if(category.id == parent.id) return c1.type == 'category' ? -1 : 1;
          //Its not same as the parent
          if(c1.id == category.id) return category.position < parent.position ? -1 : 1;
          if(c2.id == category.id) return category.position < parent.position ? 1 : -1;
        }
        //Channel with no parent start in front
        return c1.parent ? 1 : -1;
      }
      //Different parent
      if(c1.parent.id != c2.parent.id) return c1.parent.position < c2.parent.position ? -1 : 1;
      //Same parent
      if(c1.parent.id == c2.parent.id){
        //Same type
        if(c1.type == c2.type) return c1.position < c2.position ? -1 : 1;
        //One of them is a text channel
        if(c1.type == 'text' || c2.type == 'text') return c1.type == 'text' ? -1 : 1;
        //One of them is a voice channel
        if(c1.type == 'voice' || c2.type == 'voice') return c1.type == 'voice' ? 1 : -1;
      }
    });
  }

  functions.accesibleChannels = (msg, member) => {
    return functions.sortChannels(msg.guild.channels.filter(c => {
      let visible = member.permissionsIn(c.id).has('VIEW_CHANNEL');
      if(c.type == 'category' && !visible){
        c.children.forEach(c => { if(!visible) visible = c.memberPermissions(member).has('VIEW_CHANNEL') });
      }
      return visible;
    }));
  }
  
  functions.reload = (type, name) => {
    try{
      switch(type){
        case 'command':
          $.commands[name] = require('./commands/' + name + '.js');
          break;
        case 'events':
          $.events[name][0] = require('./events/' + name + '.js');
          break;
        case '$.functions':
          $.functions = undefined;
          require('./functions.js')($);
          console.log($);
          break;
        default:
          throw new Error('Invalid type');
      }
    }
    catch(error){
      throw error;
    }
  }
  
  functions.unload = (type, name) => {
    switch(type){
      case 'command':
        $.commands[name] = undefined;
        break;
      case 'events':
        $.events[name][0] = undefined;
        break;
    }
  }
  
  functions.readURL= async (url) =>{
    let result = await unirest.get(url);
    if(result.error) return undefined;
    if(result) return result;
    else return undefined;
  }
  
  functions.decodeUrl = url => {
    const array = url.split('/');
    if(array[2] !== 'discordapp.com'&&array[2] !== 'ptb.discordapp.com'&&array[2] !== 'canary.discordapp.com') return;
    console.log(array)
    switch(array[3]){
      case 'channels':
        return {
          type: array[3],
          guild: array[4],
          channel: array[5],
          message: array[6]
        };
      case 'emojis':
        return {
          type: array[3],
          emoji: array[4]
        };
    }
  }
  
  functions.fetchUrl = async (client, url) =>{
    if (!url) return
    url = url.split('/');
    let qchannel = client.channels.get(`${url[5]}`)
    if(!qchannel) return null
    try{
      return await qchannel.fetchMessage(`${url[6]}`)
    }catch(e){
      return null
    }
  }
  
  functions.fetchUser = async (client, search, msg) =>{
    const mention = new RegExp(/<@!?\d+>/g);
    const beg = new RegExp(/<@!?/g)
    let user
    if (search.match(mention)){
      user = search.match(mention)[0]
      user = user.slice(search.match(beg)[0].length, user.length-1)
      return await client.users.get(user)
    }
    else if (!msg.guild) {
      if(client.users.filter(user=> user.username.toLowerCase().startsWith(search.toLowerCase())).first()){
        let users = client.users.filter(user=> user.username.toLowerCase().startsWith(search.toLowerCase())).array()
        if (users.length == 1) return users[0]
        let question = ''
        console.log(users.length)
        for (var i = 0; i != users.length && i != 10; i++){
          question = question+ `[${i+1}] ${users[i].tag}\n`
        }
        let num = await $.functions.awaitReply(msg, `Please choose one of these:\n${question}`)
        return users[parseInt(num)-1]
      }
    }
    else if(msg.guild.members.filter(user=> user.displayName.toLowerCase().startsWith(search.toLowerCase())).first()){
      let users = msg.guild.members.filter(user=> user.displayName.toLowerCase().startsWith(search.toLowerCase())).array()
      if (users.length == 1) return users[0].user
      let question = ''
      console.log(users.length)
      for (var i = 0; i != users.length && i != 10; i++){
        question = question+ `[${i+1}] ${users[i].displayName} (${users[i].user.tag})\n`
      }
      let num = await $.functions.awaitReply(msg, `Please choose one of these:\n${question}`)
      return users[parseInt(num)-1].user
    }
    else return client.users.get(search)
  }
  
  functions.botPermission = (client, $, message) => {
    let permlvl = 0;
    var perms = $.config.levels;
    while (perms.length) {
      const currentLevel = perms.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  }
  
  functions.getSettings = async (guild, $) =>{
    if(!guild) return $.config.deafultSettings 
    let settings = await $.settings.get(guild.id) || undefined;
    if(!settings) return $.config.deafultSettings
    return settings
  }
  
  functions.Rnd = (min, max) => {
    return Math.floor((Math.random()*(max-min))+min)
  }
  
  functions.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };
  $.functions = functions;
}
