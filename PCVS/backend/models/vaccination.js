const mongoose = require ('mongoose');

const vaccinationSchema = mongoose.Schema({
  vaccinationID: {type: String, required: true},
  batch: {type: String, required: true},
  centre: {type: String, required: true},
  user: {type: String, required: true},
  status: {type: String, required: true},
  Appointdate: {type: Date, required: true},
});

module.exports = mongoose.model('Vaccination',vaccinationSchema);
