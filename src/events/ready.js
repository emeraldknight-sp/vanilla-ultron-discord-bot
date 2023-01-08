const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
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
        type: ActivityType.Streaming,
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

    setInterval(setStatus, 10 * 1000);
    console.log(`✅ ${client.user.username} has logged into Discord!`);
  },
};
