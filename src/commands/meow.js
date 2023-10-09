import { SlashCommandBuilder } from "discord.js";
import { request } from "undici";
import wait from "node:timers/promises";

const data = new SlashCommandBuilder()
  .setName("meow")
  .setDescription("Random cats images");

async function execute(interaction) {
  await interaction.deferReply();

  const results = await request("https://aws.random.cat/meow");
  const { file } = await results.body.json();
  await wait.setTimeout(1000);

  await interaction.editReply({ files: [file] });
}

export default {
  data,
  execute,
};
