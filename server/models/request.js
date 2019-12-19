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
        type: mongoose.Types.ObjectId,
        ref: "Player"
      }
    ],
    acceptedPlusOnes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Player"
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
  const Game = mongoose.model("Game");
  try {
    console.log(data);
    const newRequest = await Request.create({
      need: data.need,
      game: data.game,
      chatRef: data.chatRef
    });
    newRequest.admins.push(data.admins);
    await newRequest.save();
    await Game.findByIdAndUpdate(data.game, { requestRef: newRequest._id });
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
        },
        populate: {
          path: "sport",
          model: "Sport"
        }
      })
      .populate("admins")
      .populate("plusOnes")
      .populate("acceptedPlusOnes")
      .exec();
    return populatedRequest;
  } catch (error) {
    throw new Error("Error => [Model: Request | Static: addPlusOne]");
  }
};

schema.statics.acceptPlusOne = async function(id, player) {
  const Request = this;
  const Game = mongoose.model("Game");
  let spotWasFound;
  try {
    const request = await Request.findById(id).exec();
    if (!request.acceptedPlusOnes.includes(player) && request.acceptedPlusOnes.length < request.need) {
      request.acceptedPlusOnes.push(player);
      await request.save();
      spotWasFound = await Game.findSpotForPlayer(request.game._id, player);
    }
    const populatedRequest = await Request.findById(id)
      .populate({
        path: "game",
        model: "Game",
        populate: {
          path: "location",
          model: "Location"
        },
        populate: {
          path: "sport",
          model: "Sport"
        }
      })
      .populate("admins")
      .populate("plusOnes")
      .populate("acceptedPlusOnes")
      .exec();
    return { populatedRequest: populatedRequest, spotWasFound: spotWasFound };
  } catch (error) {
    throw new Error("Error => [Model: Request | Static: acceptPlusOne]");
  }
};

module.exports = mongoose.model("Request", schema);
