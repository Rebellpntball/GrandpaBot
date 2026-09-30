const { SlashCommandBuilder } = require('discord.js');
const { transfer, getBalance } = require('../../src/economy/wallet');
const { economyEmbed, errorEmbed, pickFlavor } = require('../../src/utils/embeds');
const botConfig = require('../../config/bot');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pay')
    .setDescription('Send Grandpa Coins to another player')
    .addUserOption((o) => o.setName('user').setDescription('Who gets the coins').setRequired(true))
    .addIntegerOption((o) =>
      o.setName('amount').setDescription('How many').setRequired(true).setMinValue(1),
    ),
  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');
    if (target.id === interaction.user.id) {
      return interaction.reply({ embeds: [errorEmbed('Nope', "You can't pay yourself.")], ephemeral: true });
    }
    if (target.bot) {
      return interaction.reply({ embeds: [errorEmbed('Nope', "Bots don't need Grandpa Coins.")], ephemeral: true });
    }
    const result = await transfer(interaction.user.id, target.id, amount, `Pay to ${target.username}`);
    if (!result.ok) {
      return interaction.reply({ embeds: [errorEmbed('Broke', pickFlavor('broke') || 'Not enough Grandpa Coins.')], ephemeral: true });
    }
    const bal = await getBalance(interaction.user.id);
    await interaction.reply({
      embeds: [
        economyEmbed(
          'Payment sent',
          `Sent **${amount.toLocaleString()}** ${botConfig.currency.name} to **${target.username}**.\nYour balance: **${bal.toLocaleString()}**`,
        ),
      ],
    });
  },
};
