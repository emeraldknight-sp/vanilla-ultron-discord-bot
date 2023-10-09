import path from "node:path";
import { Client, Collection, GatewayIntentBits } from "discord.js";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "url";
import { readdir } from "fs/promises";
import { register } from "node:module";
register("ts-node/esm", pathToFileURL("./"));

import { config } from "dotenv";
config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.commands = new Collection();

async function setupCommands() {
  const commandsPath = path.join(__dirname, "commands");
  try {
    const commandFiles = await readdir(commandsPath);

    for (const file of commandFiles) {
      if (file.endsWith(".js")) {
        const filePath = path.join(commandsPath, file);
        const { default: command } = await import(filePath);
        console.log("FUNCIONA PELO AMOR DEEEEEEEEEEEUS!");

        if ("data" in command && "execute" in command) {
          client.commands.set(command.data.name, command);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
          );
        }
      }
    }
  } catch (error) {
    console.error("Error reading command files:", error);
  }
}

async function setupEvents() {
  const eventsPath = path.join(__dirname, "events");
  try {
    const eventFiles = await readdir(eventsPath);

    for (const file of eventFiles) {
      if (file.endsWith(".js")) {
        const filePath = path.join(eventsPath, file);
        console.log("Importing file:", filePath); // Adicione esta linha para depurar

        const { default: event } = await import(filePath);
        console.log("Imported event:", event); // Adicione esta linha para depurar

        if (event.once) {
          client.once(event.name, (...args) => event.execute(...args));
        } else {
          client.on(event.name, (...args) => event.execute(...args));
        }
      }
    }
  } catch (error) {
    console.error("Error reading event files:", error);
  }
}

(async () => {
  await setupCommands();
  await setupEvents();

  try {
    await client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    console.error("Error logging in:", error);
  }
})();
