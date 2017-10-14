exports.run = function(client, message, args) {
  if(!message.guild.member(message.author.id).hasPermission(['ADMINISTRATOR', 'BAN_MEMBERS'])) return message.reply('nope, can\'t use this, bud.');

  var u = message.mentions.members.first();
  if(!u) return message.reply(`c'mon ${message.author.username}, gotta @ someone to ban.`);
  if(!message.guild.member(u.user.id).bannable) return message.reply('can\'t ban them, dad. Sorry D`:');
  if(message.guild.member(message.author.id).highestRole.calculatedPosition <= message.guild.member(u.user.id).highestRole.calculatedPosition) return message.reply(`you can't ban this memeber, because their highest role is greater than or equal to your highest role's hierarchy.`);
  var reason = message.content.split(u);
  var r = reason[1];

  try {
    message.guild.ban(u.user.id, {days:0, reason:r.toString()});
    const embed = new Discord.RichEmbed()
      .setFooter(message.author.username, message.author.avatarURL)
      .setTimestamp()
      .addField(`The user ${u.user.tag} was banned by ${message.author.tag}, for the following reason.`, `\`\`\`${r.toString()}\`\`\``)
    message.channel.send({ embed });
  } catch (e) {
    console.log(e.stack);
    message.channel.send(e, { code : 'js' });
  }
};
