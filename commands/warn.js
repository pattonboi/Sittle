const sql = require('sqlite');
sql.open('./ui.sqlite');

exports.run = function(client, message, args) {
  var u = message.mentions.members.first();
  var m = message.guild.member(message.author.id).roles.find("name", "Moderators");
  var a = message.guild.member(message.author.id).roles.find("name", "Administration");

  if(!a && !m && !message.guild.member(message.author.id).hasPermission("ADMINISTRATOR")) return message.reply("maybe when you're a big boi, buddy.");
  if(!u) return message.reply("gotta @ someone if you want to warn them, dad.");
  if(u.user.id == message.author.id) return message.reply('no.');

  try {
    sql.get(`SELECT * FROM members WHERE userID = '${u.user.id}'`).then(row => {
      if(!row) {
        sql.run('INSERT INTO members (userTag, userID, warnings) VALUES (?, ?, ?)', [u.user.tag, u.user.id, 1]);
        return message.reply(`${u.user.tag} now has 1 warning.`);
      } else {
        sql.run(`UPDATE members SET warnings = ${row.warnings += 1} WHERE userID = '${u.user.id}'`);
        sql.get(`SELECT * FROM members WHERE userID = '${u.user.id}'`).then(r => {
          return message.reply(`${r.userTag} has ${r.warnings} warning(s).`)
        });
      }
    });
  } catch (e) {
    message.channel.send(e, {code:'js'});
    console.log(c.red(e.stack));
  }
};
