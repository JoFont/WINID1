const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    admins: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Player"
      }
    ],
    game: {
      type: mongoose.Types.ObjectId,
      ref: "Game",
      required: true
    },
    need: {
      type: Number,
      required: true,
      min: 1
    },
    chatRef: {
      type: String,
      required: true
    },
    plusOnes: [
      {
        player: {
          type: mongoose.Types.ObjectId,
          ref: "Player"
        },
        status: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Status"
        },
        statusLog: [
          {
            type: mongoose.Types.ObjectId,
            ref: "Status"
          }
        ]
      }
    ],
    status: {
      type: mongoose.Types.ObjectId,
      ref: "Status"
    }
  },
  {
    timestamps: true
  }
);

schema.statics.createAndPushAdmins = async function(data) {
  const Request = this;
  try {
    console.log(data);
    const newRequest = await Request.create({
      need: data.need,
      game: data.game,
      chatRef: data.chatRef
    });
    newRequest.admins.push(data.admins);
    await newRequest.save();
    return newRequest;
  } catch (error) {
    throw new Error("Error => [Model: Request | Static: createAndPushAdmins]");
  }
};

module.exports = mongoose.model("Request", schema);
