import request from "supertest"
import { app } from "src/app"
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { createAndAuthenticateUser } from "src/utils/tests/create-and-authenticate-user"

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to search gyms by title', async () => {
   const { token } = await createAndAuthenticateUser(app)
  
      await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Contorno do Corpo',
          description: 'Some description',
          phone: '31994040501',
          latitude: -19.9239123,
          longitude: -44.0019156
      })

      await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Pratique Fitness',
          description: 'Some description',
          phone: '31994040501',
          latitude: -19.9239123,
          longitude: -44.0019156
      })

      const response = await request(app.server)
        .get('/gyms/search')
        .query({
          query: 'Pratique Fitness'
        })
        .set('Authorization', `Bearer ${token}`)
        .send()  

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Pratique Fitness'
      })
    ])
  })
})
