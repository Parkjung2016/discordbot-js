const { SlashCommandBuilder } = require('@discordjs/builders');
const {EmbedBuilder,Client}  = require("discord.js");
const {QueryType,Player,Playlist} = require("discord-player");
module.exports = {
data: new SlashCommandBuilder()
  .setName('마우봇음악종료')
  .setDescription('재생중인 음악을 종료합니다.'),
 execute:async({client,interaction})=>{

  const queue =  client.Player.getQueue(interaction.guild);

  if(!queue)
  {
    await interaction.reply("재생중이 음악이 없습니다!");
    return ;
  }

  queue.destroy();
  await interaction.reply("음악이 종료되었습니다!");
}
};