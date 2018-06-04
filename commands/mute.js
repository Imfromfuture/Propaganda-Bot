const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

	let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!tomute) return message.reply("Couldn't find user.")
	if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Insufficient Permissions.");
	let muterole = message.guild.roles.find(`name`, "muted");
	if(!muterole){
		try{
			muterole = await message.guild.createRole({
				name: "muted",
				color: "#000000",
				permissions:[]
			})
			message.guild.channels.forEach(async (channel, id) => {
				await channel.overwritePermissions(muterole, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false,
				});
			});
		}catch(e){
			console.log(e.stack);
		}
	}
	let mutetime = args[1];
	if(!mutetime) return message.reply("You didn't specify length of mute.");
	await(tomute.addRole(muterole.id));
	message.reply(`<@${tomute.id}> has been muted for ${ms(mutetime)}`);

	setTimeout(function(){
		tomute.removeRole(muterole.id);
		message.channel.send(`<@${tomute.id}> has been unmuted!`);
	}, ms(mutetime));


	let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!mUser) return message.channel.send("Couldn't find user.");
	let reason = args.join(" ").slice(22);

	let muteEmbed = new Discord.RichEmbed()
	.setDescription("Mutes")
	.setColor("#ff0000")
	.addField("Muted User", `${mUser} with ID: ${mUser.id}`)
	.addField("Muted By", `${message.author} with ID: ${message.author.id}`)
	.addField("Channel", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", reason);

	let mutechannel = message.guild.channels.find(`name`, "mute-logs")
	if(!mutechannel) return message.channel.send("Couldn't find log channel.")


	message.delete().catch(O_o=>{});
	mutechannel.send(muteEmbed);
}

module.exports.help = {
	name: "mute"
}
