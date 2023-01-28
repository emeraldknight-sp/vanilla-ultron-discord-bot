const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);
const ultronOutrajes = require(`../utils/ultronOutrajes`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`help`)
    .setDescription(`Provides a commands list`),
  async execute(interaction) {
    const bot = interaction.client.user;
    const member = interaction.member;
    const guild = interaction.guild;

    const embed = new EmbedBuilder()
      .setColor(`#ED413E`)
      .setAuthor({
        name: `Lista de comandos para ${bot.username}`,
        iconURL: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png `,
        url: `https://github.com/emeraldknight-sp/vanilla-ultron-discord-bot`,
      })
      .setTitle(`Confira os comandos disponíveis.`)
      .setDescription(
        `Estes são todos os comandos que tenho disponível para serem utilizados, em caso de dúvida sempre utilize este comando ou consulte o site para ficar a par das novidades!`
      )
      .setThumbnail(
        bot.avatar
          ? `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`
          : `https://cdn.discordapp.com/embeds/avatars/${
              bot.discriminator % 5
            }.png`
      )
      .addFields({
        name: `🎧 Música`,
        value: `\`play\` \`pause\` \`skip\` \`stop\` `,
      })
      .addFields({
        name: `👤 Administração`,
        value: `\`ban\` \`unban\` \`kick\` \`silence\` `,
      })
      .addFields({
        name: `🎲 Diversão`,
        value: `\`lucky\` \`meow\` `,
      })
      .addFields({
        name: `🧰 Utilidades`,
        value: `\`ping\` `,
      })
      .setImage(
        `https://media.tenor.com/E3aPdVVFEtgAAAAd/ultron-avengersageofultron.gif`
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
