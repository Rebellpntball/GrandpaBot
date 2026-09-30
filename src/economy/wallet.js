const User = require('../../database/models/User');
const Transaction = require('../../database/models/Transaction');
const botConfig = require('../../config/bot');

async function getOrCreateUser(discordId, username = '') {
  let user = await User.findOne({ discordId });
  if (!user) {
    user = await User.create({
      discordId,
      username,
      balance: botConfig.currency.startingBalance,
    });
  }
  return user;
}

async function getBalance(discordId) {
  const user = await getOrCreateUser(discordId);
  return user.balance;
}

async function addCoins(discordId, amount, type = 'other', reason = '', meta = {}) {
  if (amount === 0) return getOrCreateUser(discordId);
  const user = await getOrCreateUser(discordId);
  user.balance = Math.max(0, user.balance + amount);
  await user.save();
  await Transaction.create({
    userId: discordId,
    type,
    amount,
    balanceAfter: user.balance,
    reason,
    meta,
  });
  return user;
}

async function removeCoins(discordId, amount, type = 'other', reason = '', meta = {}) {
  return addCoins(discordId, -Math.abs(amount), type, reason, meta);
}

async function transfer(fromId, toId, amount, reason = 'Player transfer') {
  amount = Math.abs(amount);
  const from = await getOrCreateUser(fromId);
  if (from.balance < amount) {
    return { ok: false, error: 'insufficient' };
  }
  await removeCoins(fromId, amount, 'pay', reason, { to: toId });
  await addCoins(toId, amount, 'pay', reason, { from: fromId });
  return { ok: true };
}

async function canAfford(discordId, amount) {
  const bal = await getBalance(discordId);
  return bal >= amount;
}

module.exports = {
  getOrCreateUser,
  getBalance,
  addCoins,
  removeCoins,
  transfer,
  canAfford,
};
