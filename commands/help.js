
const { SlashCommandBuilder, ActionRowBuilder,StringSelectMenuBuilder } = require('discord.js');

module.exports = {
	
  
	data: new SlashCommandBuilder()
		.setName('마우봇도움말')
		.setDescription('도움말을 보여줍니다'),
		execute:async({interaction})=>{
		const row = new ActionRowBuilder()
		.addComponents(
			new StringSelectMenuBuilder()
				.setCustomId('select')
				.setPlaceholder('아무것도 선택되지 않았습니다.')
				.addOptions(
					{
						label: '소통',
						description: '마우랑 의사소통을 하는 명령어들을 보여줍니다.',
						value: 'Communication',
						
					},
					{
						label: '음악',
						description: '음악관련 명령어들을 보여줍니다.',
						value: 'Song',
						
					},
				),
		);
	await interaction.reply({ content: '종류를 선택하세요!', components:[row], ephemeral: true });
	

		// await interaction.reply({embeds:[new EmbedBuilder().setTitle("마우도움말").setDescription("마우봇의 명령어들을 확인해보세요!").addFields([{name:"/안녕 마우!",value:"마우에게 인사를 합니다."}])]});
	},
};