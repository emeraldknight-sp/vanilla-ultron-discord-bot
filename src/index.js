import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { config } from "./config.js";
import { status } from "./status.js";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();

const __dirname = dirname(fileURLToPath(import.meta.url));

const commandsPath = path.join(__dirname, "/commands");

const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);

  // IMPORTANDO O ARQUIVO
  const command = import(`${filePath}`)
    .then((param) => {
      if ("data" in command && "execute" in command) {
        client.commands.set(param.data.name, param);
        console.log(client.commands);
      }
    })
    .catch(() => {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    });
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.once(Events.ClientReady, (clientReady) => {
  console.log(
    `Ready! Device successfully connected. Hello there, I am ${clientReady.user.tag}!`
  );

  const setStatus = () => {
    let randomStatus = status[Math.floor(Math.random() * status.length)];
    client.user.setPresence({ game: randomStatus });
  };

  setStatus();
  setInterval(() => setStatus(), 10000);
});

client.login(config.token);
