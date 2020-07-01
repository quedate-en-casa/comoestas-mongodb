const mongoose = require('mongoose')
const { DoctorRepository } = require('./src/doctor/doctor.repository')
module.exports = (settings) => {
  mongoose.connect(settings.uri, settings.options)
  return {
    doctor: new DoctorRepository()
  }
}
