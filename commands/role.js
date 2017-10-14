exports.run = function(client, message, args) {
  if(!message.guild.member(message.author.id).hasPermission('MANAGE_ROLES')) return message.reply('can\'t use this. Dx');
  var choice = args.slice(1);
  if(!args[0]) return message.reply('gotta pick if you want to `color` a role, `create` a role, or `delete` a role.');

  else if(args[0] == "color") {
    var result = message.content.split(" | ").slice(1);
    var color = result[0];
    var rolename = message.content.split(' ').slice(2);
    var name = rolename[0].split('-').slice(args[3]);
    var n = name.join(' ');
    var role = message.guild.roles.find('name', n);

    console.log(args[1]);
    console.log(color);

    if(!result) return message.reply("gotta leave a name and hex code for the role.");
    if(!role) return message.reply("I can't find a role with that name.")
    if(!color) return message.reply("gotta leave a color, my ni:b::b:a.")
    if(color.length > 7 || color.length < 3) return message.reply("that's not an accurate hex code, baby boi.");
    if(color.length == 7) var color = color.slice(1, 7);
    if(color.length == 4) var color = color.slice(1, 4);

    try {
      message.guild.roles.find('name', n).setColor(`#${color}`, [`${message.author.tag} changed ${n}'s color to \`#${color}\``]).then(role => {
        message.channel.send(`Successfully changed ${role.name}'s color to \`#${color}\`.`);
      });
    } catch (e) {
      message.channel.send(`\`\`\`The proper usage of this command is:\nD:color *role name* | *hex code*\`\`\``)
      console.log(c.red(e.stack));
    }
  }

  /*
    God damn you disord.js, and you not letting me make roles
  */

  // else if(args[0] == "create") {
  //   var rolename = message.content.split(' ').slice(2);
  //   var name = rolename[0].split('-').slice(args[3]);
  //   var n = name.join(' ');
  //
  //   console.log(n);
  //   console.log(rolename);
  //   console.log(args);
  //   console.log(name);
  //
  //   if(!name) return message.reply('gotta atleast leave a role name. The proper usage of this command is: \`\`\`D:role create *role name* | *role color*\`\`\`');
  //   if(!args[3]) {
  //     var color = 'DEFAULT';
  //   } else {
  //     if(args[3].length > 7 || args[3].length < 3) return message.reply('that\'s an improper hex code.')
  //     if(args[3].length == 7) var color = arwgs[2].slicwe(1, 7);
  //     if(args[3].length == 4) var color = args[2].slice(1, 4);
  //   }
  //
  //   try {
  //     message.guild.createRole([n, `#${color}`]);
  //     message.channel.send(`${message.author.tag} created the role ${n}.`);
  //   } catch (e) {
  //     message.channel.send(e, {code : 'js'});
  //     console.log(c.red(e.stack));
  //   }
  // }

  else if(args[0] == "delete") {
    var result = message.content.split('D:role delete ');
    try {
      message.guild.roles.find('name', result[1]).delete({reason:`${message.author.tag} deleted the role ${result}.`}).then(role => {
        message.channel.send(`I successfully deleted the role \`${role.name}\`.`);
      });
    } catch (e) {
      console.log(c.red(e.stack));
      message.channel.send("I cannot find a role with that name.");
    }
  }

  else if(args[0] == "help") {
    const embed = new Discord.RichEmbed()
      .setColor('#000FFF')
      .setDescription('To use the role sub commands, do it like this: ```D:role *color or delete* *arguements*```')
      .addField('`color`', 'This can color a role. Use it like this: \`\`\`D:role color *role name* *hex code*\`\`\`If there\'s spaces in the role\'s name, instead of putting spaced, put `-`\'s.')
      .addField('`delete`', 'This can delete a role. You may use it like this: \`\`\`D:role delete *role name*\`\`\`')
    message.channel.send({embed});
  }

  else {
    return message.reply(`not sure what ${args[0]} is. But if you wanna use this, youre gonna need to use \`color\`, \`delete\`, or you can use \`help\` to see what the fuck this is.`);
  }
};
