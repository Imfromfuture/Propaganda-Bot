const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Insufficient Permissions.");
	if(!args[0]) return message.channel.send("Insufficient Permissions");
	message.channel.bulkDelete(args[0]).then(() => {
		message.channel.send(`Removed ${args[0]} message(s).`).then(msg.delete(1000))
	})
}

module.exports.help = {
	name: "clear"
}

// Reminder: Implement a SuperAgent command sometime in the future