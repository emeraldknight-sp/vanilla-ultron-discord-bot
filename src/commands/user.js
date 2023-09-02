const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { diffInDays } = require("../utils/diffInDays");
const { ultronOutrajes } = require("../utils/ultronOutrajes");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user"),

  async execute(interaction) {
    const member = interaction.member;
    const guild = interaction.guild;
    const bot = interaction.client.user;
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const embedUserInfo = new EmbedBuilder()
      .setColor("#ED413E")
      .setAuthor({
        name: `Os dados atuais de ${member.user.username}! 👺`,
        iconURL: member.user.avatar
          ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`
          : `https://cdn.discordapp.com/embeds/avatars/${
              member.user.discriminator % 5
            }.png`,
        url: "https://github.com/emeraldknight-sp/vanilla-ultron-discord-bot",
      })
      .setTitle(`🔔 Ficha de Membro`)
      .setDescription(
        `**${member.user.username}** é membro de ${guild.name} a ${diffInDays(
          member.joinedAt
        )} dias! 🎉 Com o tempo folhas de papéis ficaram em desuso para nossa necessidade de manter os dados dos nossos membros atualizados, então por isso reuni eles e os estoquei na nuvem e aqui estão eles.`
      )
      .setThumbnail(
        member.user.avatar
          ? `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`
          : `https://cdn.discordapp.com/embeds/avatars/${
              member.user.discriminator % 5
            }.png`
      )
      .addFields(
        {
          name: "👤 Usuário",
          value: `${member.user.tag}`,
        },
        {
          name: "🆔 *User Serial Number*",
          value: `${member.user.id}`,
        },
        {
          name: "📅 Registrado desde",
          value: `${member.user.createdAt.toLocaleString(
            "pt-BR",
            options
          )} (${daysParser(member.user.createdAt, new Date())} dias)`,
        },
        {
          name: `➡ No servidor desde`,
          value: `${member.joinedAt.toLocaleString("pt-BR", options)}`,
        }
      )
      .setImage(
        "https://media.tenor.com/E3aPdVVFEtgAAAAd/ultron-avengersageofultron.gif"
      )
      .setFooter({
        iconURL: `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`,
        text: `E não me peça mais nada hoje, ${ultronOutrajes()}! 😠`,
      })
      .setTimestamp();

    interaction.reply({ embeds: [embedUserInfo] });
  },
};
