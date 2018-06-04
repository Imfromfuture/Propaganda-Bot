const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0){
		console.log("Couldn't find commands.");
		return;
	}

	jsfile.forEach((f, i) =>{
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
})

bot.on("ready", async () => {
	console.log(`${bot.user.username} is spreading propaganda!`);
	bot.user.setGame("Propaganda for all to hear!");
});

bot.on("guildMemberAdd", async member => {
	console.log(`${member.id} gave themself cancer.`);

	let welcomechannel = member.guild.channels.find(`name`, "who-entered-the-solarsystem");
	welcomechannel.send(`Guess what! ${member} has gave themself cancer!`);
});

bot.on("guildMemberRemove", async member => {
	console.log(`${member.id} cured themself of cancer.`);

	let welcomechannel = member.guild.channels.find(`name`, "who-entered-the-solarsystem");
	welcomechannel.send(`Guess what! ${member} has cured their cancer!`);
});

bot.on("channelCreate", async channel => {



	console.log(`${channel.name} has been created.`);

	let sChannel = channel.guild.channels.find(`name`, "announcements");
	sChannel.send(`${channel} has been created.`);
});

bot.on("channelDelete", async channel => {



	console.log(`${channel.name} has been removed.`);

	let sChannel = channel.guild.channels.find(`name`, "announcements");
	sChannel.send(`${channel.name} has been removed`);
});

bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let prefix = botconfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	let commandfile = bot.commands.get(cmd.slice(prefix.length));
	if(commandfile) commandfile.run(bot,message,args);

	if(cmd === `${prefix}botinfo`){

		let bicon = bot.user.displayAvatarURL;
		let botembed = new Discord.RichEmbed()
		.setDescription("Bot Information")
		.setColor("#ff0000")
		.setThumbnail(bicon)
		.addField("Bot Name", bot.user.username)
		.addField("Created On", bot.user.createdAt);

		return message.channel.send(botembed);
	}

});

bot.login(botconfig.token);
