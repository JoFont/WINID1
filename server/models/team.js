const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  info: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    imgUrl: {
      type: String,
      trim: true
    },
    description: String,
  },
  sports: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Sport"
  },
  players: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Player"
  },
  admins: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Player"
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Team', schema);
