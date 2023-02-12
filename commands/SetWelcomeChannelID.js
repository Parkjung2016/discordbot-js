const { SlashCommandBuilder, ActionRowBuilder,StringSelectMenuBuilder,EmbedBuilder,PermissionFlagsBits } = require('discord.js');
const setting = require('../setting');
module.exports = {
data: new SlashCommandBuilder()
  .setName('마우봇환영채널설정')
  .setDescription('멤버 추가될시 나오는 환영인사 채널을 설정합니다.')
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
  .addChannelOption(option=>
  option
  .setName('환영채널')
  .setDescription('환영인사가 나오는 채널을 설정합니다.')),
 execute:async({client,interaction})=>{
   const channelID = interaction.options.getChannel(interaction.options.data[0].name).name;
   if(!channelID)
   {
    interaction.reply('올바른 채널을 선택해주세요!');
    return;
   }
   setting.setWelcomeChannelId(channelID)

 console.log(  setting.getWelcomeChannelId());
  interaction.reply('채널설정완료');
  }
};