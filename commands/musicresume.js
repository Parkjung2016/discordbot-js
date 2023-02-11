const { SlashCommandBuilder } = require('@discordjs/builders');
const {EmbedBuilder }= require("discord.js");
const {QueryType,Player,Playlist,Queue} = require("discord-player");

module.exports = {
data: new SlashCommandBuilder()
  .setName('마우봇음악재개')
  .setDescription('현재 음악을 다시 재생합니다.'),
  async execute({client,interaction}) {
console.log(interaction.guild);
  const queue =  client.Player.getQueue(interaction.guild);

  if(!queue)
  {
    await interaction.reply("재생중이 음악이 없습니다!");
    return ;
  }
  const currentSong =queue.current;

  queue.setPaused(false);
  await interaction.reply("현재 음악을 다시 재생하였습니다!");
}
};