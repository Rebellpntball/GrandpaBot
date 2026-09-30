const fs = require('fs');
const path = require('path');

function loadCommands(commandsDir) {
  const commands = new Map();
  const folders = fs.readdirSync(commandsDir);
  for (const folder of folders) {
    const folderPath = path.join(commandsDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;
    const files = fs.readdirSync(folderPath).filter((f) => f.endsWith('.js'));
    for (const file of files) {
      const cmd = require(path.join(folderPath, file));
      if (cmd?.data?.name) {
        commands.set(cmd.data.name, cmd);
      }
    }
  }
  return commands;
}

module.exports = { loadCommands };
