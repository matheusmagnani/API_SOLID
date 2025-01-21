import request from "supertest"
import { app } from "src/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { createAndAuthenticateUser } from "src/utils/tests/create-and-authenticate-user"
import { prisma } from "src/lib/prisma"

describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'Contorno do Corpo',
        latitude: -19.9239123,
        longitude: -44.0019156
      }
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -19.9239123,
        longitude: -44.0019156
      })

    expect(response.statusCode).toEqual(201)
  })
})
