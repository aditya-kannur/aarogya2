const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  execution_id: String,
  fileName: String,
  fileType: String,
  startTime: String,
  endTime: String,
  reviewStatus: String,
  environment: String
});

module.exports = mongoose.model('Document', documentSchema);
