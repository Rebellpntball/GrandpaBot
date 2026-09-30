const botConfig = require('../../config/bot');

function memberHasRole(member, roleIds = []) {
  if (!member || !roleIds.length) return false;
  return roleIds.some((id) => member.roles.cache.has(id));
}

function isOwner(userId) {
  const owners = (process.env.OWNER_IDS || '').split(',').map((s) => s.trim()).filter(Boolean);
  return owners.includes(userId);
}

function isAdmin(member) {
  if (!member) return false;
  if (isOwner(member.id)) return true;
  if (member.permissions?.has?.('Administrator')) return true;
  return memberHasRole(member, [
    ...botConfig.roles.owner,
    ...botConfig.roles.admin,
  ]);
}

function isMod(member) {
  if (isAdmin(member)) return true;
  return memberHasRole(member, botConfig.roles.moderator);
}

module.exports = { isOwner, isAdmin, isMod, memberHasRole };
