const { SlashCommandBuilder } = require("discord.js");
const { request } = require("undici");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meow")
    .setDescription("Random cats images"),
  async execute(interaction) {
    await interaction.deferReply();

    const results = await request("https://aws.random.cat/meow");
    const { file } = await results.body.json();
    await wait(1000);

    await interaction.editReply({ files: [file] });
  },
};

// const embed = new EmbedBuilder()
//   .setColor(0x0099ff)
//   .setTitle("Meow? 😾")
//   .setURL("https://github.com/emeraldknight-sp/vanilla-ultron-discord-bot")
//   .setAuthor({
//     name: interaction.client.user,
//     iconURL: `https://cdn.discordapp.com/avatars/${interaction.client.id}/${interaction.client.icon}.png`,
//   })
//   .setImage(file)
//   .setFooter({
//     text: "Some footer text here",
//     iconURL: "https://i.imgur.com/AfFp7pu.png",
//   });
// interaction.channel.send({ embeds: [embed] });
