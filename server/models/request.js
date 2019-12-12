const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  admins: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Player",
    required: true,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Game",
    required: true
  },
  need: {
    type: Number,
    required: true,
    min: 1
  },
  plusOnes: {
    type: [{
      player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: true
      },
      status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"]
      },
      statusLog: {
        type: [{
          status: {
            type: String,
            required: true
          },
          pastStatus: {
            type: String,
            required: true
          },
          date: {
            type: Date,
            default: Date.now()
          }
        }]
      }
    }]
  },
},
{
  timestamps: true
});

module.exports = mongoose.model('Request', schema);
