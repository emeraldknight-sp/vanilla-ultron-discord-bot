const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Template embed"),
  execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("#ED413E")
      .setAuthor({
        name: `Olá! Eu me chamo ${interaction.client.user.username} e você foi encontrado ! 🔍`,
        iconURL: interaction.client.user.avatar
          ? `https://cdn.discordapp.com/avatars/${interaction.client.user.id}/${interaction.client.user.avatar}.png`
          : `https://cdn.discordapp.com/embeds/avatars/${
              interaction.member.user.discriminator % 5
            }.png`,
        url: "https://github.com/emeraldknight-sp/vanilla-ultron-discord-bot",
      })
      .setTitle(`${interaction.user.username}, receba aqui o seu bem-vindo! 👏`)
      .setDescription(
        `Parabéns por ter encontrado o servidor **${interaction.guild.name}** com você somos mais e menos sozinhos por aqui, ${interaction.member.user}! 🤟
        
        Estamos agora com **${interaction.member.guild.memberCount} membros**, fique a vontade e divirta-se conosco! 🥳`
      )
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
          value: `${interaction.member.user.createdAt.toLocaleString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })} (dias de conta)`,
        },
        {
          name: "No servidor desde",
          value: `${interaction.member.joinedAt.toLocaleString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}`,
        },
        {
          name: "Comandos",
          value: "`/help`",
        }
      )
      .setImage(
        "https://media.tenor.com/E3aPdVVFEtgAAAAd/ultron-avengersageofultron.gif"
      )
      .setFooter({
        iconURL: `https://cdn.discordapp.com/avatars/${interaction.client.user.id}/${interaction.client.user.avatar}.png`,
        text: `${interaction.user.id}`,
      })
      .setTimestamp();

    interaction.reply({ embeds: [embed] });
  },
};
