const { SlashCommandBuilder } = require('@discordjs/builders');
const {EmbedBuilder,Client} = require("discord.js");
const {QueryType,Player,Playlist, Queue} = require("discord-player");

module.exports = {
data: new SlashCommandBuilder()
  .setName('마우봇음악')
  .setDescription('음악을 재생합니다.')
  .addSubcommand((subCommand)=> 
    subCommand
    .setName("검색")
    .setDescription("키워드를 이용하여 음악을 재생합니다.")
    .addStringOption(option =>
      option
      .setName("검색어")
      .setDescription("키워드를 검색합니다.")
      .setRequired(true)
    )
  )
  .addSubcommand(subCommand=>
    subCommand
    .setName("플레이리스트")
    .setDescription("유튜브에서 플레이리스트를 실행합니다.")
    .addStringOption(option=>
      option
      .setName("url")
      .setDescription("플레이리스트 url")
      .setRequired(true)
    )
  )
  .addSubcommand(subCommand=>
    subCommand
    .setName("url재생")
    .setDescription("유튜브에서 url을 이용하여 음악을 재생합니다")
    .addStringOption(option=>
      option
      .setName("url")
      .setDescription("음악 url")
      .setRequired(true)
    )
  ),
  execute:async({client,interaction})=>{
 if(!interaction.member.voice.channel)
 {
  await interaction.reply("이 명령어를 사용하기 위해서는 음성채널에 있어야 합니다!");
  return;
 }
    const queue= await client.Player.createQueue( interaction.guild);

    if(!queue.connection) await queue.connect(interaction.member.voice.channel)

    let embed = new EmbedBuilder();
    if(interaction.options.getSubcommand()==="url재생")
    {
      let url = interaction.options.getString("url");
      
      const result = await  client.Player.search(url,{
        requestedBy: interaction.uesr,
        searchEngine:QueryType.YOUTUBE_VIDEO,
      });
      if(result.tracks.length === 0)
      {
        await interaction.reply("검색 결과가 없습니다.");
        return 
      }
      const song =result.tracks[0];
      await queue.addTrack(song);

      embed.setDescription(`**[${song.title}](${song.url})**를 queue에 추가하였습니다.`)
      .setThumbnail(song.thumbnail)
      .setFooter({text:`Duration:${song.Duration}`});
    }
    else if(interaction.options.getSubcommand()==="플레이리스트")
    {
      let url = interaction.options.getString("url");
      
      const result = await  client.Player.search(url,{
        requestedBy: interaction.uesr,
        searchEngine:QueryType.YOUTUBE_PLAYLIST,
      });
      if(result.tracks.length === 0)
      {
        await interaction.reply("검색 결과가 없습니다.");
        return 
      }
      const playlist =result.playlist;
      await queue.addTracks(playlist.tracks)

      embed.setDescription(`**[${playlist.title}](${playlist.url})**를 queue에 추가하였습니다.`)
      .setFooter({text:`Duration:${playlist.duration}`});
    }
    else if(interaction.options.getSubcommand()==="검색")
    {
      let url = interaction.options.getString("검색어");
      
      const result = await  client.Player.search(url,{
        requestedBy: interaction.uesr,
        searchEngine:QueryType.AUTO,
      });
      if(result.tracks.length === 0)
      {
        await interaction.reply("검색 결과가 없습니다.");
        return 
      }
      const song =result.tracks[0];
      
      await queue.addTrack(song);
      
      embed.setDescription(`**[${song.title}](${song.url})**를 queue에 추가하였습니다.`)
      .setThumbnail(song.thumbnail)
      .setFooter({text:`길이:${song.duration}`});
    }

    if(!queue.playing) await queue.play();

    await interaction.reply({
      embeds:[embed]
    })
		// await interaction.reply({embeds:[new EmbedBuilder().setTitle("마우도움말").setDescription("마우봇의 명령어들을 확인해보세요!").addFields([{name:"/안녕 마우!",value:"마우에게 인사를 합니다."}])]});
	},
 
};