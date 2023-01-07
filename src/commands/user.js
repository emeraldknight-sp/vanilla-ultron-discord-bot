import { SlashCommandBuilder } from "discord.js";

export default function () {
  return {
    data: new SlashCommandBuilder()
      .setName("user")
      .setDescription("Provides information about the user"),
    async execute(interaction) {
      await interaction.reply(
        `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
      );
    },
  };
}
