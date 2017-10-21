exports.run = function(client, message, args) {
  let result = args.slice(1).join(' ');
  
  if(!result[0]) {
    const embed = new Discord.RichEmbed()
	.addField('Correct!`', `Griffin's middle name is Wayne!\`\`\`Contrubuted by Patton\`\`\``, true)
	.setTimestamp()
	.setFooter('Eat Griffin, idk', client.user.avatarURL)
	.setColor("008000")
	message.channel.send({embed});
	}
	//Made by Patton :)