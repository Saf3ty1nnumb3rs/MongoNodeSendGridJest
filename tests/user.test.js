const request = require('supertest')
const app = require('../src/app')
const mongoose = require('mongoose')
const User = require('../src/models/User')

describe('User', () => {
  const userOne = {
    name: 'Jeff',
    email: 'jeff@example.com',
    password: 'supersecret!1'
  }
  // Clear data before each test run
  beforeEach(async done => {
    await User.deleteMany()
    await new User(userOne).save()
    done()
  })

  afterAll(async done => {
    // Closing the DB connection allows Jest to exit successfully.
    await mongoose.connection.close()
    done()
  })
  test('Should sign up a new user', async done => {
    await request(app)
      .post('/users')
      .send({
        name: 'Andrew',
        email: 'andrew@example.com',
        password: 'secret!1'
      })
      .expect(201)
    done()
  })

  test('Should log in existing user', async done => {
    await request(app)
      .post('/auth/login')
      .send({
        email: userOne.email,
        password: userOne.password
      })
      .expect(200)
    done()
  })

  test('Should not log in non-existant user', async done => {
    await request(app)
      .post('/auth/login')
      .send({
        email: userOne.email,
        password: 'not the password'
      })
      .expect(401)
    done()
  })
})
