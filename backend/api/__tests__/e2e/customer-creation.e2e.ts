import { faker } from '@faker-js/faker'
import { createHash } from 'crypto'
import supertest from 'supertest'

import { UserCredential } from '@shared/services/user-credential'

import { CustomerCreation } from '@customer/dto/customer-creation'

import { HttpServer } from '../helpers/http-server'

describe('Customer creation', () => {
  const httpServer = new HttpServer()
  let fetch: (payload: CustomerCreation) => supertest.Test
  let userCredential: UserCredential

  beforeAll(async () => {
    const { apiCredential, userCredential: uc, server } = await httpServer.start()
    const { key, token } = apiCredential

    fetch = (payload: CustomerCreation) =>
      supertest(server)
        .post('/customer/create')
        .set('api-key', key)
        .set('api-token', token)
        .send(payload)
    userCredential = uc
  })

  describe('Given an empty user credential', () => {
    it('Should return status code 400', async () => {
      const deviceKey = createHash('md5').digest('hex')
      const payload: CustomerCreation = {
        userCredential: null,
        address: {
          city: faker.address.cityName(),
          country: faker.address.country(),
          district: faker.lorem.word(),
          number: faker.random.numeric(),
          province: faker.address.state(),
          street: faker.address.street(),
          zipCode: faker.address.zipCode(),
        },
        identifier: {
          birthplace: 'Brazil',
          identifier: {
            cpf: '000.000.000-00',
            rg: '00.000.000-x',
          },
        },
        device: {
          deviceKey,
          name: faker.hacker.adjective(),
          platform: 'Android',
        },
        dateOfBirth: faker.date.birthdate().toISOString(),
        email: faker.internet.email(),
        genre: 'Male',
        name: faker.name.fullName(),
        phoneNumber: '+55 11 9 5833-0757',
      }

      await fetch(payload).expect(400)
    })
  })

  describe('Given a non-empty user credential', () => {
    it('Should return status code 201', (done) => {
      async function promise() {
        const deviceKey = createHash('md5').digest('hex')
        const payload: CustomerCreation = {
          userCredential,
          address: {
            city: faker.address.cityName(),
            country: faker.address.country(),
            district: faker.lorem.word(),
            number: faker.random.numeric(),
            province: faker.address.state(),
            street: faker.address.street(),
            zipCode: faker.address.zipCode(),
          },
          identifier: {
            birthplace: 'Brazil',
            identifier: {
              cpf: '000.000.000-00',
              rg: '00.000.000-x',
            },
          },
          device: {
            deviceKey,
            name: faker.hacker.adjective(),
            platform: 'Android',
          },
          dateOfBirth: faker.date.birthdate().toISOString(),
          email: faker.internet.email(),
          genre: 'Male',
          name: faker.name.fullName(),
          phoneNumber: '+55 11 9 5833-0757',
        }

        const { statusCode } = await fetch(payload)
        expect(statusCode).toEqual(201)
      }

      promise().then(done).catch(done)
    })
  })

  afterAll(async () => await httpServer.stop())
})
