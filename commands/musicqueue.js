const { SlashCommandBuilder } = require('@discordjs/builders');
const {QueryType,Player,Playlist} = require("discord-player");
const { EmbedBuilder } = require('discord.js');
module.exports = {
data: new SlashCommandBuilder()
  .setName('마우봇음악리스트')
  .setDescription('리스트에 있는 10개의 음악들을 보여줍니다.')
  .addNumberOption((option)=>option.setName("페이지").setDescription("리스트의 페이지 수").setMinValue(1)),
 execute:async({client,interaction})=>{

  const queue =  client.Player.getQueue(interaction.guild);

  if(!queue||!queue.playing)
  {
    await interaction.reply("재생중이 음악이 없습니다!");
    return ;
  }
const totalPages = Math.ceil(queue.tracks.length/10)||1
const page = (interaction.options.getNumber("페이지")||1)-1
if(page+1>totalPages)
{
  return await interaction.reply(`잘못된 페이지 수 입니다. **${totalPages}**까지가 최대입니다.`);
}
  const queueString = queue.tracks.slice(page*10,page*10+10).map((song,i)=>{

     return `\`${page*10+i+1})[${song.duration}] ${song.title}\` - ${song.url}`;
  }).join("\n");

  const currentSong =queue.current;
  await interaction.reply({
    embeds:[
      new EmbedBuilder()
      .setDescription(`**현재 재생중인 음악:**\n\`${currentSong.title} - \`<${currentSong.url}>\n\n**리스트:**\n${queueString}`)
      .setThumbnail(currentSong.thumbnail)
    ]
  })
}
};