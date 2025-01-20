import { z } from "zod";
import { FastifyRequest, FastifyReply } from "fastify"
import { makeSearchGymsUseCase } from "src/use-cases/factories/make-search-gyms-use-case";
import { makeFetchNearbyGymsUseCase } from "src/use-cases/factories/make-fetch-nearby-gyms-use-case";

export async function nearby(request: FastifyRequest, reply: FastifyReply){
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    })
  })

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body);


  const fetchnearbyGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await fetchnearbyGymsUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude
    })

   

  return reply.status(200).send({
    gyms
  });
  }