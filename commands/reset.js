exports.run = function(client, message, args) {
  var u = message.mentions.members.first();

  if(!u) return message.reply('gotta @ someone, daddy-o.');

  try {
    sql.get(`SELECT * FROM members WHERE userID = '${u.user.id}'`).then(row => {
      if(!row) {
        sql.run('INSERT INTO members (userTag, userID, warnings) VALUES (?, ?, ?)', [u.user.tag, u.user.id, 0]);
        return message.reply(`${u.user.tag} has no warnings.`);
      }

      if(row.warnings == 0) {
        return message.reply(`${u.user.tag} has no warnings.`);
      }

      sql.run(`UPDATE members SET warnings = ${row.warnings - row.warnings} WHERE userID = ${u.user.id}`).then(() => {
        return message.reply(`${u.user.tag}'s warnings were reset.`);
      });
    });
  } catch (e) {
    console.log(c.red(e.stack));
    message.channel.send(e, {code:'js'});
  }
};
// John's a fucking bitch.
