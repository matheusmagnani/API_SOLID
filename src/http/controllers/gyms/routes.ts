import { FastifyInstance } from "fastify";
import { verifyJWT } from "src/http/middlewares/verify-jwt";
import { verifyUserRole } from "src/http/middlewares/verify-user-role";
import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";

export async function gymsRoutes(app: FastifyInstance){
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post('/gyms',{ onRequest: [verifyUserRole('ADMIN')]}, create)
}
