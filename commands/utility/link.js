const { SlashCommandBuilder } = require('discord.js');
const { getOrCreateUser } = require('../../src/economy/wallet');
const { successEmbed } = require('../../src/utils/embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('link')
    .setDescription('Link your in-game name for killfeed stats & rewards')
    .addStringOption((o) => o.setName('gamertag').setDescription('Exact in-game name').setRequired(true))
    .addStringOption((o) => o.setName('server').setDescription('Server id').setRequired(false)),
  async execute(interaction) {
    const gamertag = interaction.options.getString('gamertag').trim();
    const serverId = interaction.options.getString('server') || 'global';
    const user = await getOrCreateUser(interaction.user.id, interaction.user.username);
    user.links = user.links.filter((l) => l.serverId !== serverId);
    user.links.push({ serverId, gamertag, linkedAt: new Date() });
    user.username = interaction.user.username;
    await user.save();
    await interaction.reply({
      embeds: [successEmbed('Linked', `**${gamertag}** linked for \`${serverId}\`.`)],
      ephemeral: true,
    });
  },
};
