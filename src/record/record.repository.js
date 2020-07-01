const { RecordModel } = require('./record.model')
const { RecordDomain } = require('comoestas-core/src/record/record.domain')

module.exports.RecordRepository = class {
  async insert (record) {
    record.date = Date.now()
    const model = new RecordModel({
      hospital: record.hospital,
      doctorComments: record.doctorComments,
      rut: record.rut,
      date: record.date,
      doctor: record.doctor,
      status: record.statusg
    })
    return model.save()
      .then(doc => {
        record.id = doc.id
        return record
      })
  }

  async getListByRut (rut) {
    return RecordModel
      .find({
        rut: rut
      })
      .sort({
        date: 'desc'
      })
      .exec()
      .then(docs => {
        return docs
          .map(doc => {
            const record = new RecordDomain(doc.hospital, doc.doctorComments, doc.rut, doc.date, doc.doctor, doc.status)
            record.id = doc.id
            return record
          })
      })
  }
}
