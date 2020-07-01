/* eslint-env jest */

const { GenericContainer } = require('testcontainers')

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
    const newDoctor = await db.doctor.insert({
      fullName: 'John Doe',
      rut: '1-1',
      hospital: 'PPTH',
      phone: '+56912345678'
    })
    expect(newDoctor).not.toBeNull()
    expect(newDoctor).not.toBeUndefined()
    expect(newDoctor.id).not.toBeNull()
    expect(newDoctor.id).not.toBeUndefined()
  }, TIMEOUT)
})

describe('Records repository test suite', () => {
  beforeAll(async (done) => {
    await db.record.insert({
      hospital: 'PPTH',
      doctorComments: 'First comment',
      rut: '1-1',
      doctor: 'Gregory House',
      status: 'Good'
    })
    await db.record.insert({
      hospital: 'PPTH',
      doctorComments: 'Second comment',
      rut: '1-1',
      doctor: 'Gregory House',
      status: 'Good'
    })
    done()
  })
  test('Insert record', async () => {
    const record = await db.record.insert({
      hospital: 'PPTH',
      doctorComments: 'Some comment',
      rut: '1-2',
      doctor: 'James Wilson',
      status: 'Bad'
    })
    expect(record).not.toBeNull()
    expect(record).not.toBeUndefined()
    expect(record.id).not.toBeNull()
    expect(record.id).not.toBeUndefined()
    expect(record.date).not.toBeUndefined()
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
