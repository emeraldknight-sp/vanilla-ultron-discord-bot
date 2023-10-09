import { REST } from "discord.js";
import { readdir } from "fs/promises";
import { Routes } from "discord-api-types/v10";
import { pathToFileURL } from "node:url";

import { register } from "node:module";
register("ts-node/esm", pathToFileURL("./"));

import { config } from "dotenv";
config();

const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;
const TOKEN = process.env.DISCORD_TOKEN;

const commands = [];
const commandFiles = await readdir("./src/commands");

for (const file of commandFiles) {
  const commandModule = await import(`./commands/${file}`);
  if (commandModule.default && commandModule.default.data) {
    commands.push(commandModule.default.data.toJSON());
  } else {
    console.error(`Command data is missing in file: ${file}`);
  }
}

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
