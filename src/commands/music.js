import {
  AudioPlayerStatus,
  NoSubscriberBehavior,
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  joinVoiceChannel,
} from "@discordjs/voice";
import { SlashCommandBuilder } from "discord.js";
import ytdl from "ytdl-core";
import ytsr from "youtube-sr";

const data = new SlashCommandBuilder()
  .setName("music")
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
    interaction.editReply(
      "Você precisa estar em um canal de voz para reproduzir música."
    );
    return;
  }

  const query = interaction.options.getString("query") ?? "No reason provided";

  if (!query) {
    interaction.editReply(
      "Forneça um termo de pesquisa para encontrar uma música no YouTube."
    );
    return;
  }

  const searchResults = await ytsr.searchOne(query);

  if (!searchResults) {
    interaction.editReply(
      "Não foi possível encontrar nenhum resultado para a pesquisa."
    );
    return;
  }

  const url = searchResults.url;

  const connection =
    getVoiceConnection(interaction.guild.id) ||
    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

  const player = createAudioPlayer({
    behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
  });

  const resource = createAudioResource(ytdl(url), {
    inputType: ytdl.STREAM,
    inlineVolume: true,
  });

  player.play(resource);
  connection.subscribe(player);

  player.on(AudioPlayerStatus.Playing, () => {
    interaction.editReply(`Tocando ${searchResults.title}`);
  });

  player.on(AudioPlayerStatus.Idle, () => {
    interaction.editReply("Reprodução concluída.");
    connection.destroy();
  });
}

export default {
  data,
  execute,
};
