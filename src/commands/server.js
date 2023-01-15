const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ultronOutrajes = require("../utils/ultronOutrajes");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server"),
  async execute(interaction) {
    const online = interaction.guild.members.cache.filter(
      (member) => member.presence?.status === "online"
    ).size;

    const idle = interaction.guild.members.cache.filter(
      (member) => member.presence?.status === "idle"
    ).size;

    const dnd = interaction.guild.members.cache.filter(
      (member) => member.presence?.status === "dnd"
    ).size;

    const offline = interaction.guild.members.cache.filter(
      (member) => member.presence?.status === undefined
    ).size;

    const createdAt = interaction.guild.createdAt.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const memberCount = interaction.guild.memberCount;
    const guildName = interaction.guild.name;
    const guildId = interaction.guild.id;
    const guildIcon = interaction.guild.icon;

    const textChannels = interaction.guild.channels.cache.filter(
      (ch) => ch.type === 0
    ).size;
    const voiceChannels = interaction.guild.channels.cache.filter(
      (ch) => ch.type === 2
    ).size;
    const forumChannels = interaction.guild.channels.cache.filter(
      (ch) => ch.type === 11
    ).size;

    const totalChannels = voiceChannels + textChannels + forumChannels;
    const totalChannelsCategories = interaction.guild.channels.cache.size;
    const totalCategories = interaction.guild.channels.cache.filter(
      (ch) => ch.type === 4
    ).size;

    const embedServerInfo = new EmbedBuilder()
      .setColor("#ED413E")
      .setAuthor({
        name: `Os dados atuais de ${guildName}! 👺`,
        iconURL: `https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.png`,
        url: "https://github.com/emeraldknight-sp/vanilla-ultron-discord-bot",
      })
      // .setTitle(`To decide what to do in the future`)
      .setDescription(
        `Com o tempo folhas de papéis ficaram em desuso para nossa necessidade de manter os dados do servidor atualizados, então por isso reuni eles e os estoquei na nuvem e aqui estão eles.`
      )
      .setThumbnail(
        `https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.png`
      )
      .addFields(
        {
          name: "📅 Criado em",
          value: `${createdAt}`,
        },
        {
          name: "👥 Quantidade de membros",
          value: `${memberCount}`,
        },
        {
          name: "🗄 Canais e categorias",
          value: `${totalChannelsCategories}`,
        },
        {
          name: "📑 Canais do servidor",
          value: `${totalChannels}`,
          inline: true,
        },
        {
          name: "🗂 Categorias do servidor",
          value: `${totalCategories}`,
        }
      )
      .addFields(
        {
          name: "📝 Canais de texto",
          value: `${textChannels}`,
          inline: true,
        },
        {
          name: "🔊 Canais de voz",
          value: `${voiceChannels}`,
          inline: true,
        },
        {
          name: "💭 Canais de fórum",
          value: `${forumChannels}`,
          inline: true,
        }
      )
      .addFields({
        name: "Contagem dos membros",
        value: `
🟢 Online: ${online}
🟡 Ausentes: ${idle}
🔴 Ocupados: ${dnd}
⚫ Offline: ${offline}
`,
      })
      .setImage(
        "https://media.tenor.com/E3aPdVVFEtgAAAAd/ultron-avengersageofultron.gif"
      )
      .setFooter({
        iconURL: `https://cdn.discordapp.com/avatars/${interaction.client.user.id}/${interaction.client.user.avatar}.png`,
        text: `Agora não me pergunte mais nada, ${ultronOutrajes()}! 😠`,
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embedServerInfo] });
  },
};
