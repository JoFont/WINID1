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
      default: 'Point'
    },
    coordinates: [
      {
        type: Number,
        min: -180,
        max: 180
      }
    ],
  },
  type: {
    type: String,
    enum: ["Public", "Private"]
  },
},
{
  timestamps: true
});


schema.index({ location: '2dsphere' });

module.exports = mongoose.model('Location', schema);
