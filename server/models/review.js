const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    stars: {
      type: Number,
      min: 0,
      max: 5
    },
    upvote: Boolean,
    downvote: Boolean,
    comment: {
      type: String,
      trim: true
    },
    modelId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
      // will look at the `onModel` property to find the right model.
      refPath: 'modelRef'
    },
    modelRef: {
      type: String,
      required: true,
      enum: ['Player', 'Location']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Review', schema);
