const { EmbedBuilder } = require('@discordjs/builders');
const {Client, SlashCommandBuilder, Events, GatewayIntentBits,ActionRowBuilder,StringSelectMenuBuilder } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
	
  
	data: new SlashCommandBuilder()
		.setName('테스트')
		.setDescription('마우에게 인사합니다'),
	async execute(interaction) {


		// await interaction.reply({embeds:[new EmbedBuilder().setTitle("마우도움말").setDescription("마우봇의 명령어들을 확인해보세요!").addFields([{name:"/안녕 마우!",value:"마우에게 인사를 합니다."}])]});
	},
};
