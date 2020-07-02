const { DoctorModel } = require('./doctor.model')
const { DoctorOutput } = require('comoestas-core/src/doctor/doctor.output')
const { DoctorDomain } = require('comoestas-core/src/doctor/doctor.domain')

module.exports.DoctorRepository = class extends DoctorOutput {
  async insert (doctor) {
    doctor.date = Date.now()
    const model = new DoctorModel({
      fullName: doctor.fullName,
      hospital: doctor.hospital,
      rut: doctor.rut,
      phone: doctor.phone,
      date: doctor.date
    })
    return model.save()
      .then(doc => {
        doctor.id = doc.id
        return doctor
      })
  }

  async getByRut (rut) {
    return DoctorModel
      .findOne({
        rut: rut
      })
      .exec()
      .then(doc => {
        const doctor = new DoctorDomain(doc.fullName, doc.hospital, doc.rut, doc.phone, doc.date)
        doctor.id = doc.id
        return doctor
      })
  }
}
