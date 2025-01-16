import { PrismaCheckInsrepository } from "src/repositories/prisma/prisma-check-ins-repository"
import { ValidateCheckInUseCase } from "../validate-check-in"

export function makeValidateCheckinUseCase() {

      const checkInsRepository = new PrismaCheckInsrepository()
      const useCase = new ValidateCheckInUseCase(checkInsRepository)
      
      return useCase
}
