const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const daysParser = require("../utils/diffInDays");
const ultronOutrajes = require("../utils/ultronOutrajes");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user"),

  async execute(interaction) {
    const embedUserInfo = new EmbedBuilder()
      .setColor("#ED413E")
      .setAuthor({
        name: `Os dados atuais de ${interaction.member.user.username}! 👺`,
        iconURL: interaction.member.user.avatar
          ? `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png`
          : `https://cdn.discordapp.com/embeds/avatars/${
              interaction.member.user.discriminator % 5
            }.png`,
        url: "https://github.com/emeraldknight-sp/vanilla-ultron-discord-bot",
      })
      // .setTitle(`To decide what to do in the future`)
      // .setDescription(`To decide what to do in the future`)
      .setThumbnail(
        interaction.member.user.avatar
          ? `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png`
          : `https://cdn.discordapp.com/embeds/avatars/${
              interaction.member.user.discriminator % 5
            }.png`
      )
      .addFields(
        {
          name: "Registrado desde",
          value: `${interaction.member.user.createdAt.toLocaleString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })} (${daysParser(
            interaction.member.user.createdAt,
            new Date()
          )} dias)`,
        },
        {
          name: "No servidor desde",
          value: `${interaction.member.joinedAt.toLocaleString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}`,
        }
      )
      .setImage(
        "https://media.tenor.com/E3aPdVVFEtgAAAAd/ultron-avengersageofultron.gif"
      )
      .setFooter({
        iconURL: `https://cdn.discordapp.com/avatars/${interaction.client.user.id}/${interaction.client.user.avatar}.png`,
        text: `E não me peça mais nada hoje, ${ultronOutrajes()}! 😠`,
      })
      .setTimestamp();

    interaction.reply({ embeds: [embedUserInfo] });
  },
};
