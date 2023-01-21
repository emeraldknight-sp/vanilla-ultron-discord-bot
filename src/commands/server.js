const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const daysParser = require("../utils/diffInDays");
const ultronOutrajes = require("../utils/ultronOutrajes");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server"),
  async execute(interaction) {
    const bot = interaction.client.user;
    const channels = interaction.guild.channels;
    const guild = interaction.guild;
    const members = interaction.guild.members;
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const embedServerInfo = new EmbedBuilder()
      .setColor("#ED413E")
      .setAuthor({
        name: `Os dados atuais de ${guild.name}! 👺`,
        iconURL: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`,
        url: "https://github.com/emeraldknight-sp/vanilla-ultron-discord-bot",
      })
      // .setTitle(`To decide what to do in the future`)
      .setDescription(
        `Com o tempo folhas de papéis ficaram em desuso para nossa necessidade de manter os dados do servidor atualizados, então por isso reuni eles e os estoquei na nuvem e aqui estão eles.`
      )
      .setThumbnail(
        `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
      )
      .addFields(
        {
          name: "📅 Criado em",
          value: `${guild.createdAt.toLocaleDateString(
            "pt-BR",
            options
          )}, ${daysParser(guild.createdAt, new Date())} dias.`,
        },
        {
          name: "👥 Quantidade de membros",
          value: `${guild.memberCount}`,
        },
        {
          name: "🗄 Canais e categorias",
          value: `${channels.cache.size}`,
        },
        {
          name: "📑 Canais do servidor",
          value: `${
            channels.cache.filter((ch) => ch.type === 0).size +
            channels.cache.filter((ch) => ch.type === 2).size +
            channels.cache.filter((ch) => ch.type === 11).size
          }`,
          inline: true,
        },
        {
          name: "🗂 Categorias do servidor",
          value: `${channels.cache.filter((ch) => ch.type === 4).size}`,
        }
      )
      .addFields(
        {
          name: "📝 Canais de texto",
          value: `${channels.cache.filter((ch) => ch.type === 0).size}`,
          inline: true,
        },
        {
          name: "🔊 Canais de voz",
          value: `${channels.cache.filter((ch) => ch.type === 2).size}`,
          inline: true,
        },
        {
          name: "💭 Canais de fórum",
          value: `${channels.cache.filter((ch) => ch.type === 11).size}`,
          inline: true,
        }
      )
      .addFields({
        name: "Contagem dos membros",
        value: `
🟢 Online: ${
          members.cache.filter((member) => member.presence?.status === "online")
            .size
        }
🟡 Ausentes: ${
          members.cache.filter((member) => member.presence?.status === "idle")
            .size
        }
🔴 Ocupados: ${
          members.cache.filter((member) => member.presence?.status === "dnd")
            .size
        }
⚫ Offline: ${
          members.cache.filter(
            (member) => member.presence?.status === undefined
          ).size
        }
`,
      })
      .setImage(
        "https://media.tenor.com/E3aPdVVFEtgAAAAd/ultron-avengersageofultron.gif"
      )
      .setFooter({
        iconURL: `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`,
        text: `Agora não me pergunte mais nada, ${ultronOutrajes()}! 😠`,
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embedServerInfo] });
  },
};
