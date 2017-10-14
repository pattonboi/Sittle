exports.run = function(client, message, args) {
  let result = args.slice(1).join(' ');

  if(!result[0]) {
    const embed = new Discord.RichEmbed()
      .addField('`D:prune`', `Delete some messages, or a certain user's messages.\`\`\`D:prune 100\nD:prune @''#3517 32\`\`\``, true)
      .addField('`D:role`', `Delete a role, or color it with a hex code.\`\`\`D:role delete Friendos\nD:role color Twitch-Follower fff000\`\`\``, true)
      .addField('`D:ban`', `It can ban some niggers, like this:\n\`\`\`D:ban @jwicker6#6091 Fuck you, cuck boi\`\`\``, true)
      .addField('`D:warn`', `Warn a user, if they're being a cuck.\`\`\`D:warn @jwicker6#6091\`\`\``, true)
      .addField('`D:kick`', `Maybe kick someone or something.\n\`\`\`D:kick @Dawn#1642 don't "k" me again, nig boi\`\`\``, true)
      .addField('`D:info`', `Get the info for a user, I guess.\`\`\`D:info @Mr.Shufflebottom#8217\`\`\``, true)
      .setTimestamp()
      .setFooter('Eat pant', client.user.avatarURL)
      .setColor("008000")
    message.channel.send({embed});
  }

//   if(result[0] == "role") {
//     message.channel.send(`Help for the \`role\` command.\n\nIf you want to delete a role, you can use it like this:\n\`D:role delete Twitch Follower\`\n\nIf you want to color a role you can use it like this (Remember, if the role name has spaces use dashes instead):\n\`D:role color Twitch-Follower ff0000\``);
//   }
//
//   if(result[0] == "warn") {
//     message.channel.send(`Help for the \`warn\` command.\n\nJust warns a user, and adds tracks the amount of warnings a user has in a database.\n\`D:warn @Meth#9333\``);
//   }
//
//   if(result[0] == "prune") {
//     message.channel.send(`Help for the \`prune\` command\n\nDeletes messages from a person, or channel. For a person it's: \`D:prune @Panda#4777 *amount upto 100*\`\nFor channels it's just: \`D:prune *amount upto 100*\``);
//   }
//
//   if(result[0] == "info") {
//     message.channel.send(`Help for the \`info\` command\n\nGives the info of a user, such as when their account was created, when they joined the server, and how many warnings they have.\n\`D:info @¯\_(ツ)_/¯#3155\``);
//   }
//
//   if(result[0] == "kick") {
//     message.channel.send(`Help for the \`kick\` command.\n\nKicks someone with a reason:\n\`D:kick @Slim Shady#6420 hecc u, buddy-boi.\``);
//   }
//
//   if(result[0] == "ban") {
//     message.channel.send(`Help for the \`ban\` command.\n\nBans a user, with a reason:\n\`D:ban @Sebastian#4084 okay, dad.\``);
//   }
};

// yes, John, I do want some dick
// what?
// too long
// I don't know, John. How long do I?
