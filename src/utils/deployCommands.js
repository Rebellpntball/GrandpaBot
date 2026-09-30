require('dotenv').config();
const { REST, Routes } = require('discord.js');
const { loadCommands } = require('./loadCommands');
const path = require('path');

async function deploy() {
  const commands = loadCommands(path.join(__dirname, '../../commands'));
  const body = [...commands.values()].map((c) => c.data.toJSON());
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  console.log(`Deploying ${body.length} slash commands...`);
  if (process.env.GUILD_ID) {
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body },
    );
    console.log('Guild commands deployed.');
  } else {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body });
    console.log('Global commands deployed (may take up to 1 hour).');
  }
}

deploy().catch((e) => {
  console.error(e);
  process.exit(1);
});
