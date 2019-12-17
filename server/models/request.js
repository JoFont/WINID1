const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  admins: [{
    type: mongoose.Types.ObjectId,
    ref: "Player"
  }],
  game: [{
    type: mongoose.Types.ObjectId,
    ref: "Game",
    required: true
  }],
  need: {
    type: Number,
    required: true,
    min: 1
  },
  plusOnes: {
    type: [{
      player: [{
        type: mongoose.Types.ObjectId,
        ref: "Player"
      }],
      status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status"
      },
      statusLog: [{
        type: mongoose.Types.ObjectId,
        ref: "Status"
      }]
    }]
  },
},
{
  timestamps: true
});

module.exports = mongoose.model('Request', schema);
