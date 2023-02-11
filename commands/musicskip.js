const { SlashCommandBuilder } = require('@discordjs/builders');
const {EmbedBuilder }= require("discord.js");
const {QueryType,Player,Playlist,Queue} = require("discord-player");

module.exports = {
data: new SlashCommandBuilder()
  .setName('마우봇음악스킵')
  .setDescription('재생중인 음악을 스킵합니다.'),
  async execute({client,interaction}) {
  const queue =  client.Player.getQueue(interaction.guildId);

  if(!queue)
  {
    await interaction.reply("재생중이 음악이 없습니다!");
    return ;
  }
  const currentSong =queue.current;
  queue.skip();
  await interaction.reply({
    embeds:[
      new EmbedBuilder()
      .setDescription(`**${currentSong.title}**를 스킵하였습니다!`)
      .setThumbnail(currentSong.thumbnail)
    ]
  })
 }
};