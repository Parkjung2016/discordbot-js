
const { SlashCommandBuilder, ActionRowBuilder,StringSelectMenuBuilder,EmbedBuilder,PermissionFlagsBits } = require('discord.js');

module.exports = {
	
  
	data: new SlashCommandBuilder()
		.setName('마우봇관리자도우말')
		.setDescription('관리자 전용 명령어를 볼수 있습니다.')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
		execute:async({interaction})=>{
			await interaction.reply({embeds:[
        new EmbedBuilder()
        .setTitle("마우봇관리자도움말")
        .setDescription("관리자 전용 명령어들을 확인하세요!")
        .addFields([
          {name:"/마우봇멤버추방",
          value:"멤버를 서버에서 추방시킵니다."},
          {name:"/마우봇환영채널설정",
          value:"멤버 추가될시 나오는 환영인사 채널을 설정합니다."},
        ])]});

		// await interaction.reply({embeds:[new EmbedBuilder().setTitle("마우도움말").setDescription("마우봇의 명령어들을 확인해보세요!").addFields([{name:"/안녕 마우!",value:"마우에게 인사를 합니다."}])]});
	},
};