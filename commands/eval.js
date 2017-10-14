exports.run = function(client, message, args) {
  if(message.author.id !== mods.josh && message.author.id !== mods.hunter && message.author.id !== admins.john && message.author.id !== admins.edan && message.author.id !== admins.griffin) return message.reply('can\'t use this, bud');

  var results = message.content.split(' ').slice(1).join(' ');
  var c = results;
  var code = eval(c);

  if(typeof code !== "string")
    code = require("util").inspect(code);

  try {
    message.channel.send(`Input:\`\`\`js\n${c}\`\`\`\nInput:\`\`\`js\n${code}\`\`\``);
  } catch (e) {
    console.log(c.red(e.stack));
    message.channel.send(e, { code : 'js' });
  }
};
