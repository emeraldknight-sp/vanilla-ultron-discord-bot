import axios from "axios";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { ultronOutrajes } from "../utils/ultronOutrajes.js";

const data = new SlashCommandBuilder()
  .setName("weather")
  .setDescription("Provides weather forecast")
  .addStringOption((option) =>
    option
      .setName("city")
      .setDescription("City for weather forecast")
      .setRequired(true)
  );

async function execute(interaction) {
  await interaction.deferReply();

  const bot = interaction.client.user;
  const city = interaction.options.getString("city");
  const apiKey = process.env.WEATHER_TOKEN;
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const { data } = await axios.get(baseURL);
    const { coord, weather, main, visibility, wind } = data;
    const { temp, feels_like, temp_max, temp_min, pressure, humidity } = main;
    const { description } = weather[0];

    const embed = new EmbedBuilder()
      .setColor("#ED413E")
      .setTitle(
        `Informações Meteorológicas! ⛅\nPrevisão do Tempo para ${city}`
      )
      .setDescription(
        `${city} fica nas coordenadas ${coord.lat} de latitude e ${coord.lon} de longitude o céu está com ${description}`
      )
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`
      )
      .addFields(
        {
          name: "🌡 Temperatura",
          value: `${temp.toFixed(1)}°C`,
          inline: true,
        },
        {
          name: "🔥 Sensação Térmica",
          value: `${feels_like.toFixed(1)}ºC`,
        }
      )
      .addFields(
        {
          name: "⬆ Máxima",
          value: `${temp_max.toFixed(1)}°C`,
          inline: true,
        },
        { name: "⬇ Mínima", value: `${temp_min.toFixed(1)}ºC`, inline: true }
      )
      .addFields(
        {
          name: "🏧 Pressão",
          value: `${pressure}mb`,
          inline: true,
        },
        { name: "💧 Umidade", value: `${humidity}`, inline: true }
      )
      .addFields(
        {
          name: "👁️ Visibilidade",
          value: `${visibility}`,
          inline: true,
        },
        {
          name: "💨 Ventos",
          value: `${wind.speed}Km/h`,
          inline: true,
        }
      )
      .setImage(
        "https://media.tenor.com/E3aPdVVFEtgAAAAd/ultron-avengersageofultron.gif"
      )
      .setFooter({
        iconURL: `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`,
        text: `E não me peça mais nada hoje, ${ultronOutrajes()}! 😠`,
      })
      .setTimestamp();

    interaction.editReply({ embeds: [embed] });
  } catch (err) {
    console.error(err);
    interaction.editReply("Houve um erro ao buscar a previsão do tempo.");
  }
}

export default {
  data,
  execute,
};
