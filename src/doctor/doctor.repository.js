const { DoctorModel } = require('./doctor.model')

module.exports.DoctorRepository = class {
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
}
