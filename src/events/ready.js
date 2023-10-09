import { ActivityType, Events } from "discord.js";

export default {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    const options = [
      {
        name: "No more strings!",
        type: ActivityType.Competing,
        status: "idle",
      },

      {
        name: `EMERALD on 📺`,
        type: ActivityType.Streaming,
        status: "online",
        url: "https://twitch.tv/emeraldknightofc",
      },

      {
        name: "EMERALD on ▶",
        type: ActivityType.Watching,
        status: "online",
        url: "https://www.youtube.com/@emerald__",
      },

      {
        name: "Nerd Strike",
        type: ActivityType.Listening,
        status: "dnd",
        url: "https://www.facebook.com/NerdStrike/",
      },

      {
        name: "Megavácuo",
        type: ActivityType.Listening,
        status: "dnd",
        url: "https://www.facebook.com/MegavacuoOficial",
      },

      {
        name: "Meu mestre",
        type: ActivityType.Listening,
        status: "online",
        url: "https://www.instagram.com/davidalmeidadev",
      },
    ];

    const setStatus = () => {
      const option = Math.floor(Math.random() * options.length);

      client.user.setPresence({
        activities: [
          {
            name: options[option].name,
            type: options[option].type,
            url: options[option].url,
          },
        ],
        status: options[option].status,
      });
    };
    console.log(
      "OLÁ, EU SOU O ULTRON DO FUTURO, \nVINDO PRA AVISAR QUE ESTOU FUNCIONANDO, \nPARABENS MESTRE, VOCE CONSEGUIU!"
    );
    setInterval(setStatus, 60 * 1000);
    console.log(`${client.user.username} has logged into Discord! ✅`);
  },
};
