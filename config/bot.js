module.exports = {
  name: 'GrandpaBot',
  tagline: "Grandpa's Fresh Dayz — Stay Fresh or Get Sent to Bed.",
  version: '1.0.0',
  currency: {
    name: process.env.CURRENCY_NAME || 'Grandpa Coins',
    emoji: process.env.CURRENCY_EMOJI || '\ud83e\ude99',
    startingBalance: 500,
    dailyAmount: 250,
  },
  shop: { maxBasketItems: 10 },
  games: {
    dayz: { label: 'DayZ', platforms: ['pc', 'steam', 'xbox', 'playstation'] },
    reforger: { label: 'Arma Reforger', platforms: ['pc', 'steam', 'xbox', 'playstation'] },
    rust: { label: 'Rust', platforms: ['pc', 'steam'] },
  },
  colors: {
    primary: 0x8B4513, success: 0x57f287, error: 0xed4245, warn: 0xfee75c,
    info: 0x5865f2, economy: 0xf1c40f, market: 0x9b59b6, order: 0xe67e22,
  },
  roles: { admin: [], staff: [] },
};
