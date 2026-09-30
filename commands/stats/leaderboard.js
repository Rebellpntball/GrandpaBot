const { SlashCommandBuilder } = require('discord.js');
const User = require('../../database/models/User');
const { baseEmbed } = require('../../src/utils/embeds');
const botConfig = require('../../config/bot');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Top killers / richest Grandpa Coin holders')
    .addStringOption((o) =>
      o.setName('type').setDescription('Board type').addChoices(
        { name: 'Kills', value: 'kills' },
        { name: 'K/D', value: 'kd' },
        { name: 'Coins', value: 'coins' },
        { name: 'Streak', value: 'streak' },
      ),
    ),
  async execute(interaction) {
    const type = interaction.options.getString('type') || 'kills';
    let users;
    let title;
    if (type === 'coins') {
      users = await User.find().sort({ balance: -1 }).limit(10);
      title = `${botConfig.currency.emoji} Top Grandpa Coins`;
    } else if (type === 'streak') {
      users = await User.find().sort({ 'stats.bestStreak': -1 }).limit(10);
      title = 'Best Kill Streaks';
    } else if (type === 'kd') {
      users = await User.find({ 'stats.deaths': { $gt: 0 } }).sort({ 'stats.kills': -1 }).limit(30);
      users = users
        .map((u) => ({ u, kd: u.stats.kills / Math.max(1, u.stats.deaths) }))
        .sort((a, b) => b.kd - a.kd)
        .slice(0, 10)
        .map((x) => x.u);
      title = 'Top K/D';
    } else {
      users = await User.find().sort({ 'stats.kills': -1 }).limit(10);
      title = 'Top Kills';
    }
    const lines = users.map((u, i) => {
      const name = u.username || u.discordId;
      if (type === 'coins') return `**${i + 1}.** ${name} — ${u.balance.toLocaleString()}`;
      if (type === 'streak') return `**${i + 1}.** ${name} — ${u.stats.bestStreak}`;
      if (type === 'kd') return `**${i + 1}.** ${name} — ${u.getKD()} (${u.stats.kills}/${u.stats.deaths})`;
      return `**${i + 1}.** ${name} — ${u.stats.kills} kills`;
    });
    await interaction.reply({
      embeds: [baseEmbed(botConfig.colors.info).setTitle(title).setDescription(lines.join('\n') || 'No data yet.')],
    });
  },
};
