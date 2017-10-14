const sql = require('sqlite');
sql.open('./ui.sqlite');
module.exports = message => {
  sql.run('CREATE TABLE IF NOT EXISTS members (userTag TEXT, userID text, warnings INTEGER)').then(row => {
    if(!row) {
      sql.run('INSERT INTO members (userTag, userID, warnings) VALUES (?, ?, ?)', [message.author.tag, message.author.id, 0]);
    } else {
      sql.get(`SELECT * FROM members WHERE userID = '${message.author.id}'`).then(r => {
        if(row.userTag !== message.author.tag) return;
        sql.run(`UPDATE members SET userTag = ${message.author.tag} WHERE userID = ${message.author.id}`);
      });
    }
  });

  if(!message.content.startsWith(prefix)) return;
  if(message.author.bot) return;
  if(message.channel.type !== "text") return message.channel.send("You cannot use commands in DMs.")

  const args = message.content.split(' ');
  const command = args.shift().slice(prefix.length);

  try {
    let cmdFile = require(`../commands/${command}`);
    cmdFile.run(client, message, args);
  } catch (e) {
    console.log(c.red(`Command ${command} has failed.\n${e.stack}`));
  }
};
