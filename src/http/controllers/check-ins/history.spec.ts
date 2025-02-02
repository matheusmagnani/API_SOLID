import request from "supertest"
import { app } from "src/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { createAndAuthenticateUser } from "src/utils/tests/create-and-authenticate-user"
import { prisma } from "src/lib/prisma"

describe('Check-ins History (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to list the history of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        title: 'Contorno do Corpo',
        latitude: -19.9239123,
        longitude: -44.0019156
      }
    })

    await prisma.checkIn.createMany({
      data: [
        {
        gym_id: gym.id,
        user_id: user.id
        },
        {
        gym_id: gym.id,
        user_id: user.id
        }
      ]
  })

    const response = await request(app.server)
      .get(`/check-ins/history`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user.id
      })
    ])
  })
})
