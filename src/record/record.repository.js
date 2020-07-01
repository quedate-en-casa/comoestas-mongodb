const { RecordModel } = require('./record.model')

module.exports.RecordRepository = class {
  async insert (record) {
    record.date = Date.now()
    const model = new RecordModel(record)
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
            return {
              id: doc.id,
              hospital: doc.hospital,
              doctorComments: doc.doctorComments,
              rut: doc.rut,
              date: doc.date,
              doctor: doc.doctor,
              status: doc.status
            }
          })
      })
  }
}
