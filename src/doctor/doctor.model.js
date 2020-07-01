const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
  fullName: String,
  hospital: String,
  rut: String,
  phone: String,
  date: Date
})

module.exports.DoctorModel = mongoose.model('doctors', doctorSchema)
