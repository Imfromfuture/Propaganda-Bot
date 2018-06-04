const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!bUser) return message.channel.send("Can't find user!");
	let bReason = args.join(" ").slice(22);
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Permissions Insufficient.")
	if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!")

	let banEmbed = new Discord.RichEmbed()
	.setDescription("~ban~")
	.setColor("#ff0000")
	.addField("Banned User", `${bUser} with ID ${bUser.id}`)
	.addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
	.addField("Banned In", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", bReason);

	let banChannel = message.guild.channels.find(`name`, "ban-logs");
	if(!banChannel) return message.channel.send("Can't find log channel.");

	message.guild.member(bUser).ban(bReason);
	banChannel.send(banEmbed);
}

module.exports.help = {
	name: "ban"
}
