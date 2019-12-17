const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    starters: {
      type: {
        players: {
          type: [String],
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
          type: [String],
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
      type: mongoose.Types.ObjectId
    },
    teams: {
      type: [mongoose.Types.ObjectId],
      ref: "Team"
    },
    players: {
      type: [String],
      ref: "Player"
    },
    admins: {
      type: [String],
      ref: "Player"
    },
    score: {
      type: [Number],
      default: [0, 0]
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
      ref: "Location"
    },
    schedule: {
      type: Date
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
  }
);

schema.statics.createAndPush = async function(data, users) {
  const Game = this;
  try {
    const newGame = await Game.create({
      starters: { number: data.starters },
      subs: { number: data.subs },
      price: {
        value: data.price * 100
      },
      location: data.location._id,
      schedule: Date.parse(data.datePicker + "T" + data.timePicker)
    });
    newGame.admins.push(users);
    newGame.players.push(users);
    newGame.save();
    return newGame;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("Game", schema);
