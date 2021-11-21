const mongoose = require ('mongoose');

const batchSchema = mongoose.Schema({
  batchID: {type: String, required: true},
  batchNumber: {type: String, required: true},
  expiry: {type: Date, required: true},
  quantity: {type: Number, required: true},
  pending: {type: Number, required: true},
  administered: {type: Number, required: true},
  centre: {type: String, required: true},
  vaccine: {type: String, required: true}
});

module.exports = mongoose.model('Batch',batchSchema);
