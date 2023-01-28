const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ultronOutrajes = require("../utils/ultronOutrajes");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lucky")
    .setDescription("Provides a lucky number"),
  async execute(interaction) {
    const bot = interaction.client.user;
    const member = interaction.member;

    console.log("MEMBRO", member);

    const embed = new EmbedBuilder()
      .setColor("#ED413E")
      .setAuthor({
        name: `Vamos ver se você está com sorte hoje, humano!`,
        iconURL: bot.avatar
          ? `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`
          : `https://cdn.discordapp.com/embeds/avatars/${
              bot.discriminator % 5
            }.png`,
        url: "https://github.com/emeraldknight-sp/vanilla-ultron-discord-bot",
      })
      .setTitle(`O seu número da sorte é...`)
      .setDescription(
        `Parabéns você girou a roleta e hoje a sorte está com você no número \`${Math.floor(
          Math.random() * 100
        )}\`!`
      )
      .setThumbnail(
        member.user.avatar
          ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`
          : `https://cdn.discordapp.com/embeds/avatars/${
              member.user.discriminator % 5
            }.png`
      )
      .setFooter({
        iconURL: `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`,
        text: `E agora fique quieto, ${ultronOutrajes()}! 😠 ・ ${
          member.user.id
        }`,
      });
    // .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
