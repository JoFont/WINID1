const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    username: {
      type: String,
      trim: true,
      unique: true
    },
    displayName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    photoUrl: {
      type: String,
      require: true,
      trim: true
    },
    auth: {
      type: mongoose.Schema.Types.Mixed
    },
    sports: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Sport"
      }
    ],
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status"
    },
    statusLog: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Status"
      }
    ],
    range: {
      type: Number,
      default: 30
    },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"] // 'location.type' must be 'Point'
      },
      coordinates: {
        type: [Number]
      }
    },
    personalRatings: {
      type: [
        {
          sport: mongoose.Types.ObjectId,
          skill: {
            type: Number,
            min: 0,
            max: 5
          }
        }
      ]
    },
    sportsRatings: {
      type: [
        {
          sport: {
            type: mongoose.Types.ObjectId,
            ref: "Sport"
          },
          starCount: {
            type: Number,
            default: 0
          },
          starTotal: {
            type: Number,
            default: 0
          },
          upvote: {
            type: Number,
            default: 0
          },
          downvote: {
            type: Number,
            default: 0
          }
        }
      ]
    }
  },
  {
    timestamps: true
  }
);

schema.statics.getModelName = async function() {
  const Player = this;
  try {
    return (
      Player.collection.name.charAt(0).toUpperCase() +
      Player.collection.name.slice(1, Player.collection.name.length - 1)
    );
  } catch (error) {
    next(error);
  }
};

schema.statics.findOrCreate = async function(uid, firebaseUser) {
  const Player = this;
  try {
    const player = await Player.findOne({ uid: uid }).exec();
    if (player) return player;

    const newPlayer = await Player.create({
      uid: uid,
      email: firebaseUser.email,
      username: firebaseUser.email.split("@")[0] + Math.floor(Math.random() * 1000),
      displayName: firebaseUser.displayName || "Your Name",
      photoUrl: firebaseUser.photoURL || `https://api.adorable.io/avatars/256/${firebaseUser.email}.png`
    });
    return newPlayer;
  } catch (error) {
    console.log(error);
  }
};

schema.statics.searchByUsername = async function(query) {
  const Player = this;
  try {
    const players = await Player.find({ username: { $regex: query, $options: "g" } }).exec();
    return players;
  } catch (error) {
    throw error("Error => [Model: Player | Static: searchByUsername]");
  }
};

schema.statics.findByUsername = async function(username) {
  const Player = this;
  try {
    const player = await Player.findOne({ username: username }).exec();
    if (player) return player;
    throw error("There's no player with that username");
  } catch (error) {
    throw error("Error => [Model: Player | Static: findByUsername]");
  }
};

schema.statics.findByUid = async function(uid) {
  const Player = this;
  try {
    const player = await Player.findOne({ uid: uid }).exec();
    if (player) return player;
    throw error("There's no player with that username");
  } catch (error) {
    next(error);
  }
};

module.exports = mongoose.model("Player", schema);
