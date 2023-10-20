import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("embed")
  .setDescription("Template embed");

async function execute(interaction) {
  const embed = {
    color: "#ED413E",
    author: {
      name: `Olá! Eu me chamo ${interaction.client.user.username} e você foi encontrado ! 🔍`,
      icon_url: interaction.client.user.avatar
        ? `https://cdn.discordapp.com/avatars/${interaction.client.user.id}/${interaction.client.user.avatar}.png`
        : `https://cdn.discordapp.com/embeds/avatars/${
            interaction.member.user.discriminator % 5
          }.png`,
      url: "https://github.com/emeraldknight-sp/vanilla-ultron-discord-bot",
    },
    title: `${interaction.user.username}, receba aqui o seu bem-vindo! 👏`,
    description: `Parabéns por ter encontrado o servidor **${interaction.guild.name}** com você somos mais e menos sozinhos por aqui, ${interaction.member.user}! 🤟\n\nEstamos agora com **${interaction.member.guild.memberCount} membros**, fique a vontade e divirta-se conosco! 🥳`,
    thumbnail: {
      url: interaction.member.user.avatar
        ? `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png`
        : `https://cdn.discordapp.com/embeds/avatars/${
            interaction.member.user.discriminator % 5
          }.png`,
    },
    fields: [
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
      },
    ],
    image: {
      url: "https://media.tenor.com/E3aPdVVFEtgAAAAd/ultron-avengersageofultron.gif",
    },
    footer: {
      icon_url: `https://cdn.discordapp.com/avatars/${interaction.client.user.id}/${interaction.client.user.avatar}.png`,
      text: `${interaction.user.id}`,
    },
    timestamp: new Date(),
  };

  await interaction.reply({ embeds: [embed] });
}

export default {
  data,
  execute,
};
