const { SlashCommandBuilder } = require('discord.js');
const { addCoins, getOrCreateUser } = require('../../src/economy/wallet');
const { economyEmbed, errorEmbed } = require('../../src/utils/embeds');
const { isAdmin } = require('../../src/utils/permissions');
const botConfig = require('../../config/bot');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('adjust')
    .setDescription('Admin: add or remove Grandpa Coins')
    .addUserOption((o) => o.setName('user').setDescription('Target').setRequired(true))
    .addIntegerOption((o) =>
      o.setName('amount').setDescription('Positive to add, negative to remove').setRequired(true),
    )
    .addStringOption((o) => o.setName('reason').setDescription('Why').setRequired(false)),
  async execute(interaction) {
    if (!isAdmin(interaction.member)) {
      return interaction.reply({ embeds: [errorEmbed('Nope', 'Admin only. Grandpa said so.')], ephemeral: true });
    }
    const target = interaction.options.getUser('user');
    const amount = interaction.options.getInteger('amount');
    const reason = interaction.options.getString('reason') || 'Admin adjust';
    await addCoins(target.id, amount, 'admin_adjust', reason, { by: interaction.user.id });
    const user = await getOrCreateUser(target.id);
    await interaction.reply({
      embeds: [
        economyEmbed(
          'Balance adjusted',
          `**${target.username}** → ${amount >= 0 ? '+' : ''}${amount.toLocaleString()} ${botConfig.currency.name}\nNew balance: **${user.balance.toLocaleString()}**\nReason: ${reason}`,
        ),
      ],
    });
  },
};
