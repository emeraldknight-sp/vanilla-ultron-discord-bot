const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server"),
  execute(interaction) {
    interaction.reply(
      `This server is ${interaction.guild.name} and has ${
        interaction.guild.memberCount
      } members, created on ${interaction.guild.createdAt.toLocaleString(
        "pt-BR",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )}.`
    );
  },
};
