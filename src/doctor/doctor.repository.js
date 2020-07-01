const { DoctorSchema } = require('./doctor.schema')

module.exports.DoctorRepository = class {
  async insert (doctor) {
    const schema = new DoctorSchema(doctor)
    return schema.save()
  }
}
