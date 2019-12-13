const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  userName: {
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
  auth: {
    type: mongoose.Schema.Types.Mixed,
  },
  sports: {
    type: [mongoose.Types.ObjectId],
    ref: "Sport"
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Status"
  },
  statusLog: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Status"
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
    type: [{
      sport: mongoose.Types.ObjectId,
      skill: {
        type: Number,
        min: 0,
        max: 5,
      }
    }]
  },
  sportsRatings: {
    type: [{
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
    }]
  },

},
{
  timestamps: true
});

module.exports = mongoose.model('Player', schema);
