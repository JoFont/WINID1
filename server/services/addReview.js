const Review = require('../models/status');

module.exports = addReview = async (id, model, reviewer, data) => {
  try {
    const modelName = await model.getModelName();
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
