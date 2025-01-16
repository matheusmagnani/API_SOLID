import { CheckInsRepository } from "src/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number
}

interface FetchUserCheckInsistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute({
    userId,
    page
    }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsistoryUseCaseResponse> {

      const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

     return {
      checkIns
  }
}}