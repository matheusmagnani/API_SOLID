import { FastifyInstance } from "fastify";
import { verifyJWT } from "src/http/middlewares/verify-jwt";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { matrics } from "./metrics";

export async function checkInsRoutes(app: FastifyInstance){
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', matrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)

}
