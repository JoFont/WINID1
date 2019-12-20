const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    starters: [
      {
        type: [mongoose.Types.ObjectId],
        ref: "Player"
      }
    ],
    startersNum: {
      type: Number,
      default: 0,
      min: 0
    },
    subs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Player"
      }
    ],
    subsNum: {
      type: Number,
      default: 0,
      min: 0
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
      type: mongoose.Types.ObjectId,
      ref: "Sport"
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
    requestRef: {
      type: mongoose.Types.ObjectId,
      ref: "Request"
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
      startersNum: data.starters_number,
      subsNum: data.subs_number,
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
    throw new Error("Error => [Model: Game | Static: createAndPush]");
  }
};

schema.statics.addPlayerToPlayers = async function(id, player) {
  const Game = this;
  try {
    const game = await Game.findById(id).exec();
    if (!game.players.includes(player)) {
      game.players.push(player);
      await game.save();
    }
    const populatedGame = await Game.findById(id)
      .populate("players")
      .populate("starters")
      .populate("subs")
      .populate("queue")
      .populate("admins")
      .populate("location")
      .exec();
    return populatedGame;
  } catch (error) {
    throw new Error("Error => [Model: Game | Static: addPlayerToPlayers]");
  }
};

schema.statics.findSpotForPlayer = async function(id, player) {
  const Game = this;
  try {
    const game = await Game.findById(id).exec();
    if (!game.players.includes(player)) {
      game.players.push(player);
      await game.save();
    }

    if (!game.starters.includes(player)) {
      game.starters.push(player);
      await game.save();
      const populatedGame = await Game.findById(id)
        .populate("players")
        .populate("starters")
        .populate("subs")
        .populate("queue")
        .populate("admins")
        .populate("location")
        .exec();
      return populatedGame;
    } else if (!game.subs.includes(player)) {
      game.subs.push(player);
      await game.save();
      const populatedGame = await Game.findById(id)
        .populate("players")
        .populate("starters")
        .populate("subs")
        .populate("queue")
        .populate("admins")
        .populate("location")
        .exec();
      return populatedGame;
    } else if (!game.queue.includes(player)) {
      game.queue.push(player);
      await game.save();
      const populatedGame = await Game.findById(id)
        .populate("players")
        .populate("starters")
        .populate("subs")
        .populate("queue")
        .populate("admins")
        .populate("location")
        .exec();
      return populatedGame;
    }
    return false;
  } catch (error) {
    throw new Error("Error => [Model: Game | Static: addPlayerToPlayers]");
  }
};

module.exports = mongoose.model("Game", schema);
