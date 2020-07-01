const { DoctorModel } = require('./doctor.model')

module.exports.DoctorRepository = class {
  async insert (doctor) {
    doctor.date = Date.now()
    const model = new DoctorModel(doctor)
    return model.save()
      .then(doc => {
        doctor.id = doc.id
        return doctor
      })
  }
}
