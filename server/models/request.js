const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  admins: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Player",
    required: true,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true
  },
  need: {
    type: Number,
    required: true,
    min: 1
  },
  plusOnes: {
    type: [{
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: true
      },
      status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status"
      },
      statusLog: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Status"
      }
    }]
  },
},
{
  timestamps: true
});

module.exports = mongoose.model('Request', schema);
