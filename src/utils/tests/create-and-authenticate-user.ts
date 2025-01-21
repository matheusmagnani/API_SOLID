import { hash } from "bcryptjs"
import { FastifyInstance } from "fastify"
import { prisma } from "src/lib/prisma"
import request from "supertest"

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false){
      await prisma.user.create({
        data: {
          name: 'Matheus Magnani',
          email: 'matheus@gmail.com',
          password_hash: await hash('123456', 6),
          role: isAdmin ? 'ADMIN' : 'MEMBER'
        }
      })

      const authResponse = await request(app.server)
        .post('/session')
        .send({
          email: 'matheus@gmail.com',
          password: '123456'
      })
  
      const { token } = authResponse.body

      return {
        token
      }
}