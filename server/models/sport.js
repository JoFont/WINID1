const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    trim: true
  },
  description: String,
  rules: String,
  defaults: {
    starters: Number,
    subs: Number,
    teams: Number,
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Sport', schema);
