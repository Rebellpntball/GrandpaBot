const { SlashCommandBuilder } = require('discord.js');
const { getOrCreateUser } = require('../../src/economy/wallet');
const { economyEmbed } = require('../../src/utils/embeds');
const botConfig = require('../../config/bot');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Check your Grandpa Coins (shared across all servers)')
    .addUserOption((o) =>
      o.setName('user').setDescription('Check someone else').setRequired(false),
    ),
  async execute(interaction) {
    const target = interaction.options.getUser('user') || interaction.user;
    const user = await getOrCreateUser(target.id, target.username);
    const embed = economyEmbed(
      "Grandpa's Bank",
      `**${target.username}**\n\n` +
        `${botConfig.currency.emoji} **Balance:** ${user.balance.toLocaleString()} ${botConfig.currency.name}\n` +
        `Bank: **${user.bank.toLocaleString()}**\n\n` +
        `_One wallet. All servers._`,
    );
    await interaction.reply({ embeds: [embed] });
  },
};
