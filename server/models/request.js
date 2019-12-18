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

schema.statics.addPlusOne = async function(id, player) {
  const Request = this;
  try {
    const request = await Request.findById(id).exec();
    if (!request.plusOnes.includes(player)) {
      request.plusOnes.push(player);
      await request.save();
    }
    const populatedRequest = await Request.findById(id)
      .populate({
        path: "game",
        model: "Game",
        populate: {
          path: "location",
          model: "Location"
        }
      })
      .populate("admins")
      .populate("plusOnes")
      .exec();
    return populatedRequest;
  } catch (error) {
    throw new Error("Error => [Model: Request | Static: addPlusOne]");
  }
};

module.exports = mongoose.model("Request", schema);
