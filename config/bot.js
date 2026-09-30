module.exports = {
  name: 'GrandpaBot',
  tagline: "Grandpa's Fresh Dayz — Stay Fresh or Get Sent to Bed.",
  currency: {
    name: 'Grandpa Coins',
    emoji: '🪙',
    startingBalance: 500,
  },
  shop: {
    maxBasketItems: 10,
  },
  colors: {
    primary: 0x8B4513,
    success: 0x2ecc71,
    error: 0xe74c3c,
    warn: 0xf39c12,
    info: 0x3498db,
    kill: 0xc0392b,
    economy: 0xf1c40f,
  },
  roles: {
    owner: [],
    admin: [],
    moderator: [],
    vip: [],
  },
  flavor: {
    startup: [
      "Grandpa's awake. Don't make him regret it.",
      "Coffee's on. Coins are flowin'. Try not to die dumb.",
      "Listen here ya little shits — GrandpaBot is online.",
    ],
    kill: [
      "That's a fine kill, boy.",
      "Grandpa saw that. Not bad.",
      "Someone's mama is gonna hear about this.",
    ],
    death: [
      "Get up. Grandpa didn't raise quitters.",
      "That's gonna leave a mark.",
      "Walk it off... or respawn. Whatever.",
    ],
    purchase: [
      "Pleasure doin' business. Don't spend it all on bullets.",
      "Grandpa's Bank appreciates your patronage.",
      "Receipt's in the mail. Just kiddin'. There is no mail.",
    ],
    broke: [
      "You're broker than Grandpa's patience.",
      "Come back when you got Grandpa Coins.",
      "Empty pockets? Grandpa's not a charity.",
    ],
  },
};
