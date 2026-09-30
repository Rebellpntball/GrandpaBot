const { EmbedBuilder } = require('discord.js');
const botConfig = require('../../config/bot');

function baseEmbed(color = botConfig.colors.primary) {
  return new EmbedBuilder()
    .setColor(color)
    .setFooter({ text: botConfig.tagline })
    .setTimestamp();
}

function successEmbed(title, description) {
  return baseEmbed(botConfig.colors.success).setTitle(title).setDescription(description);
}

function errorEmbed(title, description) {
  return baseEmbed(botConfig.colors.error).setTitle(title).setDescription(description);
}

function economyEmbed(title, description) {
  return baseEmbed(botConfig.colors.economy).setTitle(`${botConfig.currency.emoji} ${title}`).setDescription(description);
}

function killEmbed(data) {
  const e = baseEmbed(botConfig.colors.kill)
    .setTitle('Killfeed')
    .addFields(
      { name: 'Killer', value: data.killer || 'Unknown', inline: true },
      { name: 'Victim', value: data.victim || 'Unknown', inline: true },
      { name: 'Weapon', value: data.weapon || 'Unknown', inline: true },
    );
  if (data.distance != null) e.addFields({ name: 'Distance', value: `${data.distance}m`, inline: true });
  if (data.server) e.addFields({ name: 'Server', value: data.server, inline: true });
  if (data.flavor) e.setDescription(data.flavor);
  return e;
}

function pickFlavor(key) {
  const list = botConfig.flavor[key];
  if (!list || !list.length) return null;
  return list[Math.floor(Math.random() * list.length)];
}

module.exports = {
  baseEmbed,
  successEmbed,
  errorEmbed,
  economyEmbed,
  killEmbed,
  pickFlavor,
};
