import { SlashCommandBuilder } from "discord.js";

export const server = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server"),
  async execute(interaction) {
    await interaction.reply(
      `This server is ${interaction.guild.name} and has ${interaction.guild.numberCount} members.`
    );
  },
};
