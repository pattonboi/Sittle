/*
To do:
  Finish nickname system. #Done
  Setup message and event handlers. #Done
  General moderation commands. #Done
  Maybe music shit.
*/

global.Discord = require('discord.js');
global.c = require('chalk');
global.client = new Discord.Client();

global.prefix = "D:";
global.admins = { "john":"148958241378926593", "edan":"221740788462256138", "griffin":"199374157245317120"};
global.mods = { "josh":"117728104935456770", "hunter":"228963688910946304" };
global.bot = { "prefix":"D:", "token":"" };

require('./util/eventLoader')(client);

client.on('error', e => {
  console.log(e.stack);
});

client.on('warn', e => {
  console.log(e.stack);
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  var r = oldMember.roles.find('name', 'Newfags') || oldMember.roles.find('name', 'エロのギャング') || oldMember.roles.find('name', 'Donors') || oldMember.roles.find('name', 'Moderators') || oldMember.roles.find('name', 'Administration')
  var rn = newMember.roles.find('name', 'Newfags') || newMember.roles.find('name', 'エロのギャング') || newMember.roles.find('name', 'Donors') || newMember.roles.find('name', 'Moderators') || newMember.roles.find('name', 'Administration');
  var nick = newMember.displayName.toString().split(" ");
  var nn = newMember.user.username;

  if(r && !rn) return newMember.setNickname(newMember.user.username, [`${newMember.user.username}'s special role and nickname was changed.`])
  if(!rn) return;

  if(nick[0] == "✪" || nick[0] == "✩" || nick[0] == "¥" || nick[0] == "ツ" || nick[0] == "○") {
    if(nick[0] == nick[1]) return;
    var nn = nick.slice(1).join(" ");
  } else {
    var nn = nick.join(" ");
  }
  if(!newMember.displayName && newMember.nickname == `✪ ${newMember.user.username}` && newMember.highestRole.name == "Administration") return;
  if(!newMember.displayName && newMember.nickname == `✩ ${newMember.user.username}` && newMember.highestRole.name == "Moderators") return;
  if(!newMember.displayName && newMember.nickname == `¥ ${newMember.user.username}` && newMember.highestRole.name == "Donors") return;
  if(!newMember.displayName && newMember.nickname == `ツ ${newMember.user.username}` && newMember.highestRole.name == "エロのギャング") return;
  if(!newMember.displayName && newMember.nickname == `○ ${newMember.user.username}` && newMember.highestRole.name == "Newfags") return;

  if(newMember.highestRole.name == "Administration") newMember.setNickname(`✪ ${nn}`);
  else if(newMember.highestRole.name == "Moderators") newMember.setNickname(`✩ ${nn}`);
  else if(newMember.highestRole.name == "Donors") newMember.setNickname(`¥ ${nn}`);
  else if(newMember.highestRole.name == "エロのギャング") newMember.setNickname(`ツ ${nn}`);
  else if(newMember.highestRole.name == "Newfags") newMember.setNickname(`○ ${nn}`);
});

client.login(bot.token, err => {
  if(err) console.error(err);
});

/*
  Invite Link: https://discordapp.com/oauth2/authorize?client_id=360572958927880202&scope=bot&permissions=8
*/
