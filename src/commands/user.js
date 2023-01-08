const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user"),

  async execute(interaction) {
    await interaction.reply(
      `${
        interaction.member
      }, user since ${interaction.member.user.createdAt.toLocaleString(
        "en-US",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )}. and member of this server since ${interaction.member.joinedAt.toLocaleString(
        "en-US",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )}. your roles ${interaction.member.roles}.`
    );
  },
};
