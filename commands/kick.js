exports.run = function(client, message, args) {
  if(!message.guild.member(message.author.id).hasPermission(['ADMINISTRATOR', 'KICK_MEMBERS'])) return message.reply('nope, can\'t use this, bud.');

  var u = message.mentions.members.first();
  if(!u) return message.reply(`c'mon ${message.author.username}, gotta @ someone to kick.`);
  if(!message.guild.member(u.user.id).kickable) return message.reply('can\'t kick them, dad. Sorry D`:');
  if(message.guild.member(message.author.id).highestRole.calculatedPosition <= message.guild.member(u.user.id).highestRole.calculatedPosition) return message.reply(`you can't kick this memeber, because their highest role is greater than or equal to your highest role's hierarchy.`);
  var reason = message.content.split(u);
  var r = reason[1];

  try {
    message.guild.member(u.user.id).kick([r]);
    const embed = new Discord.RichEmbed()
      .setFooter(message.author.username, message.author.avatarURL)
      .setTimestamp()
      .addField(`The user ${u.user.tag} was kicked by ${message.author.tag}, for the following reason.`, `\`\`\`${r}\`\`\``)
    message.channel.send({ embed });
  } catch (e) {
    console.log(e.stack);
    message.channel.send(e, { code : 'js' });
  }
};
