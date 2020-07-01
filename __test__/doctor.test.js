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
      hospital: 'Sotero del rio',
      phone: '+56912345678',
      date: Date.now()
    })
    expect(newDoctor).not.toBeNull()
    expect(newDoctor).not.toBeUndefined()
  }, TIMEOUT)
})
