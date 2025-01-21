import request from "supertest"
import { app } from "src/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { createAndAuthenticateUser } from "src/utils/tests/create-and-authenticate-user"

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a gym', async () => {
   const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Contorno do Corpo',
        description: 'Some description',
        phone: '31994040501',
        latitude: -19.9239123,
        longitude: -44.0019156
      })

    expect(response.statusCode).toEqual(201)
  })
})
