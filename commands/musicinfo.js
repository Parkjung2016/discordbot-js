const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageEmbed, EmbedBuilder}  = require("discord.js");
const {QueryType,Player,Playlist} = require("discord-player");
module.exports = {
data: new SlashCommandBuilder()
  .setName('마우봇음악정보')
  .setDescription('재생중인 음악의 정보를 확인합니다.'),
 execute:async({client,interaction})=>{
  
  const queue = client.Player.getQueue(interaction.guildId);

  if(!queue) return await interaction.reply("재생중인 음악이 없습니다!")

  let bar = queue.createProgressBar({
    queue:false,
    length:19,
  })
  const song =queue.current

  await interaction.reply({
    embeds:[new EmbedBuilder()
    .setThumbnail(song.thumbnail)
    .setDescription(`현재 재생중입니다 [${song.title}](${song.url})\n\n`+bar)
    ],
    
  
  })
}
};