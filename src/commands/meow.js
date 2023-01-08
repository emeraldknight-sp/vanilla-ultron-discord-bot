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
