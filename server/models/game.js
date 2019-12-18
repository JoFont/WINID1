const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    starters: {
      type: {
        players: [
          {
            type: mongoose.Types.ObjectId,
            ref: "Player"
          }
        ],
        number: {
          type: Number,
          default: 0,
          min: 0
        }
      }
    },
    subs: {
      type: {
        players: [
          {
            type: mongoose.Types.ObjectId,
            ref: "Player"
          }
        ],
        number: {
          type: Number,
          default: 0,
          min: 0
        }
      }
    },
    queue: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Player"
      }
    ],
    team1: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Player"
      }
    ],
    team2: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Player"
      }
    ],
    sport: {
      type: mongoose.Types.ObjectId
    },
    teams: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Team"
      }
    ],
    players: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Player"
      }
    ],
    admins: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Player"
      }
    ],
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
    locationPhotoUrl: {
      type: String,
      trim: true
    },
    schedule: {
      type: Date
    },
    status: {
      type: mongoose.Types.ObjectId,
      ref: "Status"
    },
    chatRef: {
      type: String,
      required: true
    },
    statusLog: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Status"
      }
    ]
  },
  {
    timestamps: true
  }
);

schema.statics.createAndPush = async function(data, users) {
  const Game = this;
  try {
    const newGame = await Game.create({
      starters: { number: data.starters_number },
      subs: { number: data.subs_number },
      price: {
        value: data.price * 100
      },
      location: data.location._id,
      schedule: Date.parse(data.date + "T" + data.time),
      chatRef: data.chatRef
    });
    newGame.admins.push(users);
    newGame.players.push(users);
    newGame.save();
    return newGame;
  } catch (error) {
    throw error("Error => [Model: Game | Static: createAndPush]");
  }
};

schema.statics.addPlayerToPlayers = async function(id, player) {
  const Game = this;
  try {
    const game = await Game.findById(id);
    if (!game.includes(player)) {
      game.players.push(player);
      game.save();
    }
    return game;
  } catch (error) {
    throw error("Error => [Model: Game | Static: addPlayerToPlayers]");
  }
};

module.exports = mongoose.model("Game", schema);
