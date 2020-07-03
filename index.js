const mongoose = require('mongoose')
const { DoctorRepository } = require('./src/doctor/doctor.repository')
const { RecordRepository } = require('./src/record/record.repository')
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = (settings) => {
  let connectionRetries = 0
  const maxConnectionRetries = settings.maxConnectionRetries || 10
  const connectionRetryDelay = settings.connectionRetryDelay || 10000
  mongoose.connect(settings.uri, settings.options)
    .catch(e => {
      console.warn(`Error staring connection ${settings.uri}: `)
    })
  mongoose.connection
    .on('error', e => {
      if (connectionRetries < maxConnectionRetries) {
        connectionRetries++
        console.info(`Waiting for '${connectionRetryDelay}' milliseconds`)
        sleep(connectionRetryDelay)
          .then(v => {
            console.info(`Connection retry '${connectionRetries}' of '${maxConnectionRetries}'`)
            mongoose.connect(settings.uri, settings.options)
              .then(v => {
                console.info(`Connection succed after '${connectionRetries}' retries`)
              })
              .catch(e => {
                console.warn(`Error staring connection ${settings.uri}: `)
              })
          })
      }
    });
  return {
    doctor: new DoctorRepository(),
    record: new RecordRepository()
  }
}
