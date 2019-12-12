const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  starters: {
    type: {
      players: {
        type: [mongoose.Types.ObjectId],
        ref: "Player"
      },
      number: {
        type: Number,
        default: 0,
        min: 0
      }
    } 
  },
  subs: {
    type: {
      players: {
        type: [mongoose.Types.ObjectId],
        ref: "Player"
      },
      number: {
        type: Number,
        default: 0,
        min: 0
      }
    } 
  },
  sport: {
    type: mongoose.Types.ObjectId,
  },
  teams: {
    type: [mongoose.Types.ObjectId],
    ref: "Team"
  },
  players: {
    type: [mongoose.Types.ObjectId],
    ref: "Player" 
  },
  admins: {
    type: [mongoose.Types.ObjectId],
    ref: "Player"
  },
  score: {
    type: [Number]
  },
  price: {
    value: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      default: "EUR"
    }
  },
  location: {
    type: mongoose.Types.ObjectId,
  },
  schedule: {
    type: Date,
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status"
  },
  statusLog: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Status"
  }
},
{
  timestamps: true
});

module.exports = mongoose.model('Game', schema);
