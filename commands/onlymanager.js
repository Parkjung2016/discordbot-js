const { SlashCommandBuilder } = require('@discordjs/builders');
const {EmbedBuilder,ActionRowBuilder,StringSelectMenuBuilder, PermissionsBitField}  = require("discord.js");
const { PermissionFlagsBits } = require('discord-api-types/v10');
module.exports = {
data: new SlashCommandBuilder()
  .setName('마우봇멤버추방')
  .setDescription('멤버를 서버에서 추방시킵니다.')
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
  .addUserOption(option=>option.setName('멤버').setDescription('이 멤버는 추방될것입니다').setRequired(true))
  .addStringOption(option=>option.setName('이유').setDescription('이 멤버를 추방시킨 이유')),
 execute:async({client,interaction})=>{
  const kickUser =interaction.options.getUser('멤버');
  const kickMember = await interaction.guild.members.fetch(kickUser.id);
  const channel =interaction.channel;

  if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({
    content:'이 명령어를 사용하기위해서는 추방권한이 있어야 합니다!',
    ephemeral:true
  });
if(!kickMember) return await interaction.reply({content: '이 멤버는 서버에 없습니다!',ephemeral:true});
if(!kickMember.kickable) return await interaction.reply({content:'추방시킬 수 없습니다!',ephemeral:true});

let reason = interaction.options.getString('이유');
if(!reason) reason ="이유 없음";
const dmEmbed = new EmbedBuilder()
.setColor("Blue")
.setDescription(`:white_check_mark: **<${interaction.guild.name}>에서 추방시켰습니다!** | 이유: ${reason}`)

const embed = new EmbedBuilder()
.setColor("Blue")
.setDescription(`:white_check_mark: ${kickUser.tag} **추방되었습니다!** | 이유: <${reason}>`)

await kickMember.send({embeds:[dmEmbed]}).catch(err=>{
    return;
});
await kickMember.kick({reason :reason}).catch(err=>{
 interaction.reply({content:"에러가 발생하였습니다!",ephemeral:true});
});
await interaction.reply({embeds:[embed]});

}
};