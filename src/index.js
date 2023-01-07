import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { config } from "./config.js";
import { status } from "./status.js";
import path from "node:path";
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

const commandsPath = path.join

client.on("ready", () => {
  console.log("Bot conectado com sucesso!");
  const setStatus = () => {
    let randomStatus = status[Math.floor(Math.random() * status.length)];
    client.user.setPresence({ game: randomStatus });
  };

  setStatus();
  setInterval(() => setStatus(), 10000);
});

client.on("guildCreate", (guild) => {
  console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers.`);
});

client.login(config.token);
