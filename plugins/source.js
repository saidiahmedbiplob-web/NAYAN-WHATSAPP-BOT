const axios = require('axios');

module.exports = {
  config: {
    name: 'sc',
    aliases: ['source', 'github'],
    permission: 0,
    prefix: 'both',
    categorie: 'Utilities',
    credit: 'Developed by Mohammad Saidi',
    usages: [
      `${global.config.PREFIX}sc - Show detailed GitHub repo info.`,
      `${global.config.PREFIX}source - Alias for sc.`,
      `${global.config.PREFIX}github - Alias for sc.`
    ]
  },
  start: async ({ event, api }) => {
    const repoOwner = 'MOHAMMAD-NAYAN-07';
    const repoName = 'NAYAN-WHATSAPP-BOT';
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`;
    

    try {
      const response = await axios.get(apiUrl);
      const repo = response.data;

      const text = 
        `📦 *Repository Info*\n\n` +
        `*Name:* ${repo.full_name}\n` +
        `*Description:* ${repo.description || 'No description'}\n` +
        `*Stars:* ⭐ ${repo.stargazers_count}\n` +
        `*Forks:* 🍴 ${repo.forks_count}\n` +
        `*Watchers:* 👀 ${repo.watchers_count}\n` +
        `*Open Issues:* ❗ ${repo.open_issues_count}\n` +
        `*Default Branch:* ${repo.default_branch}\n` +
        `*Language:* ${repo.language || 'N/A'}\n` +
        `*License:* ${repo.license ? repo.license.name : 'None'}\n\n` +
        `🔗 [View on GitHub](${repo.html_url})`;

      await api.sendMessage(event.threadId, { text }, { quoted: event.message });

    } catch (error) {
      console.error(error);
      await api.sendMessage(event.threadId, { text: 'Failed to fetch repo info.' }, { quoted: event.message });
    }
  }
};
