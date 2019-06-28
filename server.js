/*
Feel free to remove this if not hosting on glitch.com
*/

const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

/*   Bot stuff   */
/*   Requires   */

const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client();
const $ = { events: {}, commands: {} };
$.config = require('./config.js');
require('./functions.js')($);
const enmap = require('enmap');
$.settings = new enmap({name: 'settings'});
$.aliases = {};
/*   Startup   */

// Setting up events
fs.readdirSync('./events').forEach(file => {
  if(!file.endsWith('.js')) return;
  const event = file.slice(0, -3);  //Remove .js
  try{
    const code = require(`./events/${file}`);
    if(!$.events[event]){  //Setting up the event 
      $.events[event] = [];
      client.on(event, (...args) => {
        $.events[event].forEach(func => {
          func(client, $, ...args);  //Execute function
        });
      });
    }
    $.events[event].push(code);
    console.log(`Loaded event: ${event}`);
  }
  catch(error){ console.error(`Error loading event: ${event}`, error); }
});

// Setting up commands
fs.readdirSync('./commands').forEach(file => {
  if(!file.endsWith('.js')) return;
  const command = file.slice(0, -3);  //Remove .js
  try{
    $.commands[command] = require(`./commands/${file}`);
    //Set up aliases
    $.commands[command].config.aliases.forEach(aliase => {
      $.aliases[aliase.toLowerCase()] = $.commands[command].info.name.toLowerCase();
    });
    console.log(`Loaded command: ${command}`);
  }
  catch(error){ console.error(`Error loading command: ${command}`, error); }
});

// Login
const login = () => {
  client.login(process.env.TOKEN)
//We might unable to relogin until the process restart
//  .then(() => process.env.TOKEN = undefined)
  .catch(error => {
    console.error(error);
    console.log('Retrying after 10 seconds....');
    setTimeout(login, 10000);
  });
}
login();