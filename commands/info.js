const path = require('path');
const moment = require('moment');
const sql = require('sqlite');
sql.open('./ui.sqlite');

exports.run = function(client, message, args) {
  var u = message.mentions.members.first();

  if(!u) return message.reply('gotta @ a user for their info.');
  sql.run('CREATE TABLE IF NOT EXISTS members (userTag TEXT, userID TEXT, warnings INTEGER)');

  sql.get(`SELECT * FROM members WHERE userID ='${u.user.id}'`).then(row => {
    var acd = moment(u.user.createdTimestamp).format("MMM Do YYYY, h:mm a");
    var sjd = moment(message.guild.member(u.user.id).joinedTimestamp).format("MMM Do YYYY, h:mm a");
    if(!row) {
      sql.run('INSERT INTO members (userTag, userID, warnings) VALUES (?, ?, ?)', [u.user.tag, u.user.id, 0]);
      const embed = new Discord.RichEmbed()
        .setAuthor(u.user.tag, u.user.avatarURL)
        .setThumbnail()
        .addField('User ID', u.user.id, true)
        .addField('Warnings', '0', true)
        .addField('Account Creation Date', acd, true)
        .addField('Server Join Date', sjd, true)
        .setColor("#008000")
      return message.channel.send({embed})
    }
    try {
      var color = "fuck you";
      if(row.warnings <= 1) var color = "#008000";
      if(row.warnings == 2) var color = "#FFFF00";
      if(row.warnings >= 3) var color = "#ff0000";
      const embed = new Discord.RichEmbed()
        .setAuthor(row.userTag, u.user.avatarURL)
        .setThumbnail(u.user.avatarURL)
        .addField('User ID', row.id, true)
        .addField('Warnings', row.warnings, true)
        .addField('Account Creation Date', acd, true)
        .addField('Server Join Date', sjd, true)
        .setColor(color)
      message.channel.send({embed});
    } catch (e) {
      message.channel.send(e, {code:'js'});
      console.log(c.red(e.stack));
    }
  });
};
