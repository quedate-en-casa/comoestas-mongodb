const mongoose = require('mongoose')
const { DoctorRepository } = require('./src/doctor/doctor.repository')
const { RecordRepository } = require('./src/record/record.repository')
module.exports = (settings) => {
  mongoose.connect(settings.uri, settings.options)
  return {
    doctor: new DoctorRepository(),
    record: new RecordRepository()
  }
}
