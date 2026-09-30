require('dotenv').config();
const {
  Client,
  GatewayIntentBits,
  Collection,
  Events,
  Partials,
} = require('discord.js');
const path = require('path');
const { connectDatabase } = require('./database/connect');
const { loadCommands } = require('./src/utils/loadCommands');
const botConfig = require('./config/bot');
const { pickFlavor } = require('./src/utils/embeds');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Channel],
});

client.commands = new Collection();
client.botConfig = botConfig;

async function main() {
  await connectDatabase(process.env.MONGO_URI);

  const commands = loadCommands(path.join(__dirname, 'commands'));
  for (const [name, cmd] of commands) {
    client.commands.set(name, cmd);
  }
  console.log(`[GrandpaBot] Loaded ${client.commands.size} commands`);

  const eventsPath = path.join(__dirname, 'events');
  const fs = require('fs');
  if (fs.existsSync(eventsPath)) {
    for (const file of fs.readdirSync(eventsPath).filter((f) => f.endsWith('.js'))) {
      const event = require(path.join(eventsPath, file));
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  }

  client.once(Events.ClientReady, (c) => {
    const msg = pickFlavor('startup') || `${botConfig.name} online`;
    console.log(`[GrandpaBot] Logged in as ${c.user.tag}`);
    console.log(`[GrandpaBot] ${msg}`);
    c.user.setActivity('Grandpa Coins', { type: 3 });
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction, client);
    } catch (err) {
      console.error(err);
      const reply = { content: 'Grandpa tripped over the code. Try again.', ephemeral: true };
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(reply).catch(() => {});
      } else {
        await interaction.reply(reply).catch(() => {});
      }
    }
  });

  await client.login(process.env.DISCORD_TOKEN);
}

main().catch((err) => {
  console.error('Failed to start GrandpaBot:', err);
  process.exit(1);
});
