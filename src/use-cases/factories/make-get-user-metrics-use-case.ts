import { GetUserMetricsUseCase } from "../get-user-metrics"
import { PrismaCheckInsrepository } from "src/repositories/prisma/prisma-check-ins-repository"

export function makeGetUserMetricsUseCase() {

      const checkInsRepository = new PrismaCheckInsrepository()
      const useCase = new GetUserMetricsUseCase(checkInsRepository)
      
      return useCase
}
