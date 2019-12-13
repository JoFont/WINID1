const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true
      // unique: true
    },
    displayName: {
      type: String,
      trim: true,
      unique: true
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
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
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
  try {
    const player = await this.findById(id).exec();
    if (player) return user;
    const newPlayer = await this.create({
      _id: id,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || 'Random User',
      photoUrl: `https://api.adorable.io/avatars/256/${firebaseUser.email}.png`
    });
    return newPlayer;
  } catch (error) {
    next(error);
  }
};

module.exports = mongoose.model('Player', schema);
