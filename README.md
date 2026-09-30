# GrandpaBot

Discord bot for **Grandpa's Fresh Dayz Servers**.

Shared **Grandpa Coins** across all servers, killfeed + leaderboards, Expansion Market import → shop catalog, basket/tickets (max 10 items, kits unlimited), base JSON relocator, bot-defined airdrops, admin tools, and TOS-friendly dirty-grandpa flavor.

**10 server slots** — each slot can be Xbox, PlayStation, Steam/PC, or Reforger (DayZ or Reforger).

Your community copy: `config/servers.grandpas.js` (7 live + 3 open slots).
Generic template: `config/servers.example.js`.

---

## Features

| Feature | Description |
|--------|-------------|
| Shared economy | One Grandpa Coins balance for every server |
| Killfeed | Parse ADM-style lines, post embeds, pay kill rewards |
| Leaderboards | Kills, K/D, coins, streaks |
| Market browser | `/market` categories from imported or seeded catalog |
| Basket + checkout | Max 10 items; premade kits exempt |
| Tickets | Staff list / fulfill / cancel |
| Expansion import | `/importmarket` from Market JSON folder (PC) |
| Base relocator | `/relocate` offsets object JSON to new coords |
| Airdrops | Bot-defined templates + announce (not Expansion Missions) |
| Link | `/link` gamertag for stats & rewards |
| Admin | `/adjust` coins, tickets, airdrops, import, relocate |
| Optional X | Env stubs for posting kills/leaderboards to X |

---

## Requirements

- Node.js **18+**
- MongoDB (local or Atlas)
- Discord bot application (token + application ID)

---

## Setup (user configures)

```bash
git clone https://github.com/Rebellpntball/GrandpaBot.git
cd GrandpaBot
cp .env.example .env
# edit .env — DISCORD_TOKEN, CLIENT_ID, GUILD_ID, MONGO_URI, OWNER_IDS

# Generic 10 slots:
cp config/servers.example.js config/servers.js

# OR Grandpa's Fresh preset (7 servers + 3 open):
cp config/servers.grandpas.js config/servers.js

npm install
npm run deploy
npm start
```

Invite the bot with `applications.commands` + bot scopes.
Set role IDs in `config/bot.js` (`roles.admin`, etc.) after invite.

Each server slot supports:
- **platform:** `xbox` | `playstation` | `steam` | `pc` | `reforger`
- **game:** `dayz` | `reforger`
- **mode:** `pve` | `pvp` | `other`

---

## Important commands

**Players**

- `/balance` `/pay` `/daily`
- `/market` `/basket add|view|clear|checkout`
- `/link` `/leaderboard`

**Staff**

- `/tickets list|fulfill|cancel`
- `/adjust` `/importmarket` `/relocate` `/airdrop` `/seedshop`

---

## Expansion Market (PC / Steam)

1. Mount or copy your Expansion Market category JSON folder.
2. `/importmarket path:/absolute/path/to/Market catalog:pc-scifi`
3. Set `shopCatalog` on that server in `config/servers.js`.

Shop is **Discord cash only** — does not touch live Expansion ATM or stock.

---

## Base relocator

`/relocate` + template attachment + target x/z → new positioned JSON file.

---

## License

MIT — adapt for your community. Stay fresh.
