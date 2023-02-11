const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed}  = require("discord.js");
const {QueryType,Player,Playlist} = require("discord-player");
module.exports = {
data: new SlashCommandBuilder()
  .setName('마우봇음악멈추기')
  .setDescription('재생중인 음악을 멈춥니다.'),
 execute:async({client,interaction})=>{
  console.log( client.Player);
  const queue =  client.Player.getQueue(interaction.guild);

  if(!queue)
  {
    await interaction.reply("재생중이 음악이 없습니다!");
    return ;
  }


  queue.setPaused(true);
  await interaction.reply("재생중인 음악이 멈췄습니다!");
}
};