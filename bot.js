const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '+';


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});
client.on("message", message => {
 
  function discoRole() {
    let random = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    roles.forEach((role) => {
      let theRole = message.guild.roles.find("name", role);
      theRole.edit({color: random}).catch(e => {
        return message.channel.send(":x: **Error:** The role you specified in the `config.json` is either not a role on this server, or his a role higher than the highest role that I have.");
      });
    });
  }
 
  if(message.content.startsWith(prefix + "startdisco")) {
    if(allowedUsers.includes(message.author.id)) {
    setInterval(() => { discoRole(); }, config.ms);
    message.channel.send("```css\nDiscoing...```");
    message.channel.send("Please make sure you read the README, you could get IP banned from discord because of ratelimits.");
  } else {
    message.reply(`You do not have permission to disco. If you have downloaded this bot off of github please go to the config.json and add your user ID to the "allowedUsers" value.`);
  }
} else
 
if(message.content.startsWith(prefix + "stopdisco")) {
  if(allowedUsers.includes(message.author.id)) {
  message.channel.send("I've stopped discoing.");
  setTimeout(() => { console.log(process.exit(0)); }, 300);
} else {
  message.reply(`You do not have permission to disco. If you have downloaded this bot off of github please go to the config.json and add your user ID to the "allowedUsers" value.`);
  }
}
 
});
const config = require('config.json');
const prefix = config.prefix;
 
const allowedUsers = config.allowedUsers;
const roles = config.roleToDisco;
 
client.on("ready", () => {
    client.user.setPresence({ game: { name: `Disco Roles! Created by ÑÍGHTTÉRRØR` }, type: 0 });
    console.log("Disco role bot online! Created by ÑÍGHTTÉRRØR");
});
