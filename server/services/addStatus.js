const Status = require('../models/status');

module.exports = addStatus = async (id, model, past, current) => {
  try {
    const modelName = await model.getModelName();
    const modelDocument = await model.findById(id).exec();
    const newStatus = await Status.create({
      modelId: id,
      modelRef: modelName,
      current: current,
      past: past
    });
    modelDocument.statusLog.push(newStatus);
    modelDocument.status = newStatus;
    modelDocument.save();

    return modelDocument.statusLog;
  } catch (error) {
    next(error);
  }
};
