const fs = require('node:fs');
const path = require('node:path');
const { EmbedBuilder } = require('@discordjs/builders');
const { Client,ComponentType,Collection, Events, GatewayIntentBits, MessageCollector} = require('discord.js');
const { Canvas} = require('canvas');
const { welcomeImage } = require('ultrax');
const jimp = require('jimp');
const { isBuffer } = require('node:util');
require("dotenv").config();

const {REST} = require("@discordjs/rest");
const {Routes} = require("discord-api-types/v10");
const {Player} = require("discord-player");
const { config } = require('dotenv');

const {TOKEN} = require('./config.json')
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildVoiceStates,
] });

const commands=[];

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.Player = new Player(client,{
	ytdlOptions: {
		quality: "highestaudio",
		highWaterMark: 1<< 25
	}
});

client.once(Events.ClientReady, () => {
	console.log('Ready!');

});
client.on(Events.InteractionCreate, async interaction => {

	if(!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	if(!command) return;

	try
	{
		await command.execute({client,interaction});
	}
	catch(err)
	{
		console.log(err);
		
	}
});
client.on(Events.InteractionCreate, async interaction => {

	if(!interaction.isStringSelectMenu) return;
	if(interaction.customId==='select')
	{
		if(interaction.values[0] ==='Communication')
		await interaction.update({
			content:' ', embeds: [new EmbedBuilder()
				.setTitle("소통 관련 도움말")
				.setDescription("마우봇과 의사소통을 할 수 있는 명령어들을 확인하세요!")
				.addFields([{name:"/안녕마우",value:"마우에게 인사를 합니다."}])]
			});
			if(interaction.values[0]==='Song')
			await interaction.update({
				content:' ', embeds: [new EmbedBuilder()
					.setTitle("음악 관련 도움말")
					.setDescription("음악관련 명령어들을 확인하세요!")
					.addFields(
						[{name:"/마우봇음악 검색",value:"키워드를 이용하여 음악을 재생합니다."}]
						[{name:"/마우봇음악 플레이리스트",value:"유튜브에서 플레이리스트를 실행합니다."}]
						)]
					
				});
		
	}

});

client.on(Events.InteractionCreate, async interaction => {

	if (!interaction.isChatInputCommand()) return ;
	
if(interaction.commandName === '구름알려줘')
{
	
	const filter = m=>m.member.id ===interaction.member.id;	
	interaction. reply('알고싶은 페이지를 말해줘!');
		const collector =interaction.channel.createMessageCollector ({filter:filter,time:3000000,});
			collector.on('collect',async (m)=> {
				let index = Number(m.content);
				if(index)
				{
			
					
				}
			
			});

}
if(interaction.commandName ==='테스트')
{	
	blur();
	const bg = './assets/bg.png';
  const avatar = interaction.member.user.displayAvatarURL({ format: "png" });
  const title = "환영합니다!";
  const subtitle = interaction.member.user.tag;
  const footer = `${client.guilds.cache.get('1063805489051336744'). members.cache.filter(member=>!member.user.bot).size+1}번째 멤버이십니다.`;
  const color = '#65b5bd';
  const channel =await interaction.member.guild.channels.fetch().then(channels=> channels.find(x=>x.name==='인사'));
  const options = {
    font: "Gungsuh",
    attachmentName: `welcome-${interaction.member.id}`,
    title_fontSize: 80,
    subtitle_fontSize: 50,
    footer_fontSize: 30,
	
};
const image = await welcomeImage(bg, avatar, title, subtitle, footer, color, options);

  channel.send({ files: [image] });
}
if(interaction.commandName ==='안녕마우')
{
	const name = interaction.member.displayName;
	
	const call = getConstantVowel(name.substr(name.length-1,1));
	let check = '야';
	if(call.t !==	'')
	check= '아';
	await interaction.reply(`👋『<@${interaction.member.id}>』${check} 만나서 반가워!👋
	나를 잘 사용해봐!!`);
}
});

function getConstantVowel(kor) {
	const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
						 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
						 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
	const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
						 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
						 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
	const t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
						 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
						 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
						 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

	const ga = 44032;
	let uni = kor.charCodeAt(0);

	uni = uni - ga;

	let fn = parseInt(uni / 588);
	let sn = parseInt((uni - (fn * 588)) / 28);
	let tn = parseInt(uni % 28);

	return {
			f: f[fn],
			s: s[sn],
			t: t[tn]
	};
}

client.on(Events.GuildMemberAdd, async member => {
	blur();
	const bg = './assets/bg.png';
  const avatar = member.user.displayAvatarURL({ format: "png" });
  const title = "환영합니다!";
  const subtitle = member.user.tag;
  const footer = `${client.guilds.cache.get('1063805489051336744'). members.cache.filter(member=>!member.user.bot).size+1}번째 멤버이십니다.`;
  const color = '#65b5bd';
  const channel =await member.guild.channels.fetch().then(channels=> channels.find(x=>x.name==='인사'));
  const options = {
    font: "Gungsuh",
    attachmentName: `welcome-${member.id}`,
    title_fontSize: 80,
    subtitle_fontSize: 50,
    footer_fontSize: 30,
	
};
const image = await welcomeImage(bg, avatar, title, subtitle, footer, color, options);

  channel.send({ files: [image] });
})


	async function blur() {
		
	// Reading Image
	const image = await jimp.read
	('https://imgur.com/07zx84o.png');
	image.blur( 7, function(err){
		if (err) throw err;
	}).write('./assets/bg.png');
}

client.login(process.env.TOKEN);