const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const statusPing = require("../utils/statusPing");
const ultronOutrajes = require("../utils/ultronOutrajes");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Provides information about bot response time."),

  async execute(interaction) {
    const embedRequest = new EmbedBuilder()
      .setColor("#ED413E")
      .setAuthor({
        name: `Apenas um instante, humano.
Estou calculando! Não atrapalhe... 👺`,
        iconURL: interaction.client.user.avatar
          ? `https://cdn.discordapp.com/avatars/${interaction.client.user.id}/${interaction.client.user.avatar}.png`
          : `https://cdn.discordapp.com/embeds/avatars/${
              interaction.client.user.discriminator % 5
            }.png`,
        url: "https://github.com/emeraldknight-sp/vanilla-ultron-discord-bot",
      })
      .setTitle(
        `🏓 Comando enviado à unidade de processamento central por ${interaction.member.user.username}.`
      )
      .setDescription(
        `Estou executando a solicitação para checar a latência do meu sistema e processos!`
      )
      .setThumbnail(
        interaction.client.user.avatar
          ? `https://cdn.discordapp.com/avatars/${interaction.client.user.id}/${interaction.client.user.avatar}.png`
          : `https://cdn.discordapp.com/embeds/avatars/${
              interaction.client.user.discriminator % 5
            }.png`
      )
      .addFields({
        name: "🪜 Ranqueamento para ping ideal",
        value: `
        **menor que 30 ms** — taxa excelente e ping ideal para gamers;

        **30 a 50 ms** — essa taxa ainda não prejudica a execução de jogos e aplicações;

        **50 a 100 ms** — taxa média de ping;

        **100 a 500 ms** — taxa lenta que afeta, inclusive, a velocidade de navegação na web;

        **maior que 500 ms** — taxa de ping que indica um atraso perceptível em todas as solicitações.`,
      })
      .setImage(
        "https://media.tenor.com/E3aPdVVFEtgAAAAd/ultron-avengersageofultron.gif"
      )
      .setFooter({
        iconURL: `https://cdn.discordapp.com/avatars/${interaction.client.user.id}/${interaction.client.user.avatar}.png`,
        text: `E agora fique quieto, ${ultronOutrajes()}! 😠`,
      })
      .setTimestamp();

    const embedResponse = new EmbedBuilder()
      .setColor("#ED413E")
      .setAuthor({
        name: `${interaction.client.user.username}`,
        iconURL: interaction.client.user.avatar
          ? `https://cdn.discordapp.com/avatars/${interaction.client.user.id}/${interaction.client.user.avatar}.png`
          : `https://cdn.discordapp.com/embeds/avatars/${
              interaction.client.user.discriminator % 5
            }.png`,
        url: "https://github.com/emeraldknight-sp/vanilla-ultron-discord-bot",
      })
      .setTitle(`Voltei! GRR... 👺`)
      .setDescription(
        `O ping obtido com a requisição é de ${interaction.client.ws.ping} ms.`
      )
      .setThumbnail(
        interaction.client.user.avatar
          ? `https://cdn.discordapp.com/avatars/${interaction.client.user.id}/${interaction.client.user.avatar}.png`
          : `https://cdn.discordapp.com/embeds/avatars/${
              interaction.client.user.discriminator % 5
            }.png`
      )
      .addFields({
        name: "Status atual segundo o relatório:",
        value: `${statusPing(interaction.client.ws.ping)}.`,
      })
      .setImage("https://media.tenor.com/ycKSlJ4oLqcAAAAC/ultron.gif")
      .setFooter({
        iconURL: `https://cdn.discordapp.com/avatars/${interaction.client.user.id}/${interaction.client.user.avatar}.png`,
        text: `E agora fique quieto, ${ultronOutrajes()}! 😠`,
      })
      .setTimestamp();

    await interaction.reply({ embeds: [embedRequest] });
    await wait(5000);
    await interaction.editReply({ embeds: [embedResponse] });
  },
};
