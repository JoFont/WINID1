const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  sports: {
    type: [mongoose.Types.ObjectId],
  },
  admins: {
    type: [mongoose.Types.ObjectId],
    ref: "Player"
  },
  amenities: {
    lockerRoom: Boolean,
    showers: Boolean,
    bar: Boolean,
    indoor: Boolean
  },
  info: {
    type: String,
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
    }]
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  type: {
    type: String,
    enum: ["Public", "Private"]
  },
},
{
  timestamps: true
});

module.exports = mongoose.model('Location', schema);
