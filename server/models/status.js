const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    current: mongoose.Schema.Types.Mixed,
    past: mongoose.Schema.Types.Mixed,
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
      enum: ['Request', 'Game', 'Player']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Status', schema);
