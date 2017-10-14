exports.run = function(client, message, args) {
  if(!message.guild.member(message.author.id).hasPermission('MANAGE_MESSAGES')) return message.reply('no, bad.')
  var u = message.mentions.members.first();
  var params = message.content.split(u).slice(1);
  var amount = parseInt(params[0], 10);

  if(!params) return message.reply('gotta leave an amount to prune.');
  if(amount > 100) return message.reply("can't delete more than 100 messages at a time.");
  if(amount < 2) return message.reply('you can\'t delete less than 2 messages.')

  if(u) {
    message.channel.fetchMessages({ limit : 100 }).then(messages => {
      let array = messages.array();
      var ua = array.filter(m => m.author.id == u.user.id);
      ua.length += 1;
      var as = ua.splice(0, amount += 1);

      try {
        message.channel.bulkDelete(as).then(() => {
          message.channel.send(`I successfully deleted ${params[0]} messages from ${u.user.tag}.`);
        });
      } catch (e) {
        message.channel.send(e, {code : 'js'});
        console.log(e.red(e.stack));
      }
    });
  }

  if(!u) {
    var a = parseInt(args[0]);
    try {
      message.channel.fetchMessages({limit : a}).then(m => {
        m.length += 1;
        message.channel.bulkDelete(m).then(() => {
          message.channel.send(`I successfully deleted ${args[0]} messages from ${message.channel.name}.`);
        });
      });
    } catch (e) {
      message.channel.send(e, {code : 'js'});
      console.log(c.red(e.stack));
    }
  }
};
