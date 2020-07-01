const mongoose = require('mongoose')

const recordSchema = new mongoose.Schema({
  hospital: String,
  doctorComments: String,
  rut: String,
  date: Date,
  doctor: String,
  status: String
})

module.exports.RecordModel = mongoose.model('records', recordSchema)
