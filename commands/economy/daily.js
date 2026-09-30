const { SlashCommandBuilder } = require('discord.js');
const { getOrCreateUser, addCoins } = require('../../src/economy/wallet');
const { economyEmbed, errorEmbed } = require('../../src/utils/embeds');
const botConfig = require('../../config/bot');

const COOLDOWN_MS = 24 * 60 * 60 * 1000;
const DAILY_AMOUNT = 250;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Claim your daily Grandpa Coins'),
  async execute(interaction) {
    const user = await getOrCreateUser(interaction.user.id, interaction.user.username);
    const now = Date.now();
    if (user.lastDaily && now - user.lastDaily.getTime() < COOLDOWN_MS) {
      const left = COOLDOWN_MS - (now - user.lastDaily.getTime());
      const hrs = Math.ceil(left / (60 * 60 * 1000));
      return interaction.reply({
        embeds: [errorEmbed('Already claimed', `Come back in about **${hrs}h**.`)],
        ephemeral: true,
      });
    }
    user.lastDaily = new Date();
    await user.save();
    await addCoins(interaction.user.id, DAILY_AMOUNT, 'daily', 'Daily claim');
    const updated = await getOrCreateUser(interaction.user.id);
    await interaction.reply({
      embeds: [
        economyEmbed(
          'Daily claimed',
          `Grandpa slid you **${DAILY_AMOUNT}** ${botConfig.currency.name}.\nBalance: **${updated.balance.toLocaleString()}**`,
        ),
      ],
    });
  },
};
