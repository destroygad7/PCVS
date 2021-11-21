const mongoose = require ('mongoose');

const centreSchema = mongoose.Schema({
  centreID: {type: String, required: true},
  centreName: {type: String, required: true},
  centreAddress: {type: String, required: true},
  centrePos: {type: Number, required: true},
  centreState: {type: String, required: true},
});

module.exports = mongoose.model('Centre',centreSchema);
