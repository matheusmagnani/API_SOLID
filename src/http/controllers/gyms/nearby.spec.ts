import request from "supertest"
import { app } from "src/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { createAndAuthenticateUser } from "src/utils/tests/create-and-authenticate-user"

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })


  it('should be able to list nearby gyms', async () => {
   const { token } = await createAndAuthenticateUser(app)
  
      await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Contorno do Corpo',
          description: 'Some description',
          phone: '31994040501',
          latitude: -19.9249823,
          longitude: -43.9534571
      })

      await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Pratique Fitness',
          description: 'Some description',
          phone: '31994040501',
          latitude: -19.6287341,
          longitude: -43.9107139
      })

      const response = await request(app.server)
        .get('/gyms/nearby')
        .query({
          latitude: -19.9249823,
          longitude: -43.9534571
        })
        .set('Authorization', `Bearer ${token}`)
        .send()  

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Contorno do Corpo'
      })
    ])
  })
})
