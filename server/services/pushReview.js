const Review = require('../models/status');

module.exports = pushReview = async (id, model, reviewer, data) => {
  try {
    const modelName = await model.getModelName();
    // const modelDocument = await model.findById(id).exec();
    const { stars, upvote, downvote, comment } = data;
    const newReview = await Review.create({
      modelId: id,
      modelRef: modelName,
      ...stars && { stars },
      ...upvote && { upvote },
      ...downvote && { downvote },
      ...comment && { comment },
      reviewer: reviewer
    });

    return newReview;
  } catch (error) {
    next(error);
  }
};
