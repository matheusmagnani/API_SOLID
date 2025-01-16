import { CheckInUseCase } from "../check-in"
import { PrismaCheckInsrepository } from "src/repositories/prisma/prisma-check-ins-repository"
import { PrismaGymsRepository } from "src/repositories/prisma/prisma-gyms-repository"

export function makecheckInUseCase() {

      const checkInsRepository = new PrismaCheckInsrepository()
      const gymsRepository = new PrismaGymsRepository()
      const checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository)
      
      return checkInUseCase
}
