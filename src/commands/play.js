import { SlashCommandBuilder } from "discord.js";
import {
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  AudioPlayerStatus,
  joinVoiceChannel,
  getVoiceConnection,
} from "@discordjs/voice";

// import { generateDependencyReport } from "@discordjs/voice";

const data = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Play a song or playlist")
  .addStringOption((option) =>
    option
      .setName("query")
      .setDescription("What am I looking for?")
      .setAutocomplete(true)
      .setRequired(true)
  );

async function execute(interaction) {
  await interaction.deferReply();

  const voiceChannel = interaction.member.voice.channel;
  if (!voiceChannel) {
    return interaction.editReply(
      "❗Você deve estar em um canal de voz para usar este comando."
    );
  }

  // console.log(generateDependencyReport());

  const player = createAudioPlayer({
    behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
  });

  const connection =
    getVoiceConnection(interaction.guild.id) ||
    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

  const resource = createAudioResource("./assets/e-o-pix-nada-ainda.mp3", {
    metadata: {
      title: "E o PIX, nada ainda!?",
    },
  });

  try {
    player.play(resource);
    connection.subscribe(player);

    player.on(AudioPlayerStatus.Playing, () => {
      console.log("O player de áudio começou a tocar!");
    });

    player.on(AudioPlayerStatus.Idle, () => {
      console.log("O player de áudio entrou no estado Idle.");
    });

    player.on("error", (error) => {
      console.error(
        `Erro: ${error.message} com recurso ${error.resource.metadata.title}`
      );
      player.stop();
    });

    await interaction.editReply(
      `📀 Reproduzindo algo **${resource.metadata.title}**`
    );
  } catch (err) {
    console.error(err);
    await interaction.editReply(`❌ Houve um erro ao buscar sua música.`);
  }
}

export default {
  data,
  execute,
};
