/* eslint-env jest */

const { GenericContainer } = require('testcontainers')
const { DoctorDomain } = require('comoestas-core/src/doctor/doctor.domain')
const { RecordDomain } = require('comoestas-core/src/record/record.domain')

const TIMEOUT = 1000000
let db
let mongodbContainer

beforeAll(async (done) => {
  mongodbContainer = await new GenericContainer('mongo')
    .withExposedPorts(27017)
    .start()
  db = require('../index')({
    uri: `mongodb://${mongodbContainer.getContainerIpAddress()}:${mongodbContainer.getMappedPort(27017)}/comoestas`
  })
  done()
}, TIMEOUT)

afterAll(async (done) => {
  if (mongodbContainer) {
    await mongodbContainer.stop()
  }
  done()
}, TIMEOUT)

describe('Doctor repository test suite', () => {
  test('Insert doctor', async () => {
    const doctor = new DoctorDomain('John Doe', '1-1', 'PPTH', '+56912345678')
    const newDoctor = await db.doctor.insert(doctor)
    expect(newDoctor).not.toBeNull()
    expect(newDoctor).not.toBeUndefined()
    expect(newDoctor.id).not.toBeNull()
    expect(newDoctor.id).not.toBeUndefined()
  }, TIMEOUT)
})

describe('Records repository test suite', () => {
  beforeAll(async (done) => {
    await db.record.insert(new RecordDomain('PPTH', 'First comment', '1-1', 'Gregory House', 'Good'))
    await db.record.insert(new RecordDomain('PPTH', 'Second comment', '1-1', 'Gregory House', 'Good'))
    done()
  })
  test('Insert record', async () => {
    const record = new RecordDomain('PPTH', 'Some comment', '1-2', 'James Wilson', 'Bad')
    const newRecord = await db.record.insert(record)
    expect(newRecord).not.toBeNull()
    expect(newRecord).not.toBeUndefined()
    expect(newRecord.id).not.toBeNull()
    expect(newRecord.id).not.toBeUndefined()
    expect(newRecord.date).not.toBeUndefined()
  }, TIMEOUT)

  test('Get records by rut', async () => {
    const records = await db.record.getListByRut('1-1')
    expect(records).not.toBeNull()
    expect(records).not.toBeUndefined()
    expect(records.length).not.toBe(0)
    const firstRecord = records[0]
    expect(firstRecord).not.toBeNull()
    expect(firstRecord).not.toBeUndefined()
    expect(firstRecord.id).not.toBeNull()
    expect(firstRecord.id).not.toBeUndefined()
    expect(firstRecord.date).not.toBeUndefined()
    expect(firstRecord.doctorComments).toBe('Second comment')
  }, TIMEOUT)
})
