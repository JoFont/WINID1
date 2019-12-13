const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true
      // unique: true
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
    sports: {
      type: [mongoose.Types.ObjectId],
      ref: 'Sport'
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Status'
    },
    statusLog: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Status'
    },
    range: {
      type: Number,
      default: 30
    },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'] // 'location.type' must be 'Point'
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
            ref: 'Sport'
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

schema.statics.findOrCreate = async function(id, firebaseUser) {
  const Player = this;
  try {
    const player = await Player.findById(id).exec();
    if (player) {
      return player;
    } else {
      const newPlayer = await Player.create({
        _id: id,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || 'Your Name',
        photoUrl: `https://api.adorable.io/avatars/256/${firebaseUser.email}.png`
      });
      return newPlayer;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

schema.statics.findByUsername = async function(username) {
  const Player = this;
  try {
    const player = await Player.findOne({ username: username }).exec();
    if (player) {
      return player;
    } else {
      throw error("There's no player with that username");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = mongoose.model('Player', schema);
