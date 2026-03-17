const os = require("os");
module.exports = {
  config: {
    name: "uptime",
    aliases: ["up"],
    permission: 0,
    prefix: true,
    description: "Check the bot's uptime.",
    categories: "Bot Management",
    credit: "Developed by Mohammad Saidi",
  },

  start: async ({ api, event }) => {
    const { threadId } = event;

    const uptimeMs = Date.now() - global.botStartTime;

    const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptimeMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((uptimeMs / (1000 * 60)) % 60);
    const seconds = Math.floor((uptimeMs / 1000) % 60);

    const uptime = [
      days ? `${days}d` : "",
      hours ? `${hours}h` : "",
      minutes ? `${minutes}m` : "",
      `${seconds}s`
    ]
      .filter(Boolean)
      .join(" ");

    const cpuModel = os.cpus()[0].model;
    const cpuLoad = os.loadavg()[0].toFixed(2);

  
    const msg = `
╭━━━━━━━━━━━━━━━━━━━╮
│ 🚀 *BOT UPTIME STATUS*  
╰━━━━━━━━━━━━━━━━━━━╯

✨ *Online Since:*  
🔸 ${days} day(s)  
🔸 ${hours} hour(s)  
🔸 ${minutes} minute(s)  
🔸 ${seconds} second(s)  

⏱ *Total:* *${uptime}*

━━━━━━━━━━━━━━━━━━━━━━
🤖 *Bot Name:* ${global.config.botName || "Saidi Bot"}
🖥 *Engine:* ${cpuModel.split("CPU")[0].trim()}
⚙️ *CPU Load:* ${cpuLoad}
📌 *Status:* Running Smoothly  
━━━━━━━━━━━━━━━━━━━━━━
`;

    await api.sendMessage(threadId, { text: msg }, { quoted: event.message});
  }
};
