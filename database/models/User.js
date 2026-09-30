const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true, index: true },
  username: { type: String, default: '' },
  balance: { type: Number, default: 500, min: 0 },
  bank: { type: Number, default: 0, min: 0 },
  links: [{
    serverId: String,
    gamertag: String,
    linkedAt: { type: Date, default: Date.now },
  }],
  stats: {
    kills: { type: Number, default: 0 },
    deaths: { type: Number, default: 0 },
    longestShot: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },
  },
  lastDaily: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.methods.getKD = function () {
  if (this.stats.deaths === 0) return this.stats.kills.toFixed(2);
  return (this.stats.kills / this.stats.deaths).toFixed(2);
};

userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('User', userSchema);
