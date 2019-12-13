// const Status = require('../models/status');

module.exports = pushStatus = async (id, model, past, current) => {
  const document = await model.findById(id);
  console.log(document);
};
