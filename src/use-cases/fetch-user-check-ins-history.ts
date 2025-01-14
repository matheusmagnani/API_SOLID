import { CheckInsRepository } from "src/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckInsistoryUseCaseRequest {
  userId: string;
  page: number
}

interface FetchUserCheckInsistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsistoryUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute({
    userId,
    page
    }: FetchUserCheckInsistoryUseCaseRequest): Promise<FetchUserCheckInsistoryUseCaseResponse> {

      const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

     return {
      checkIns
  }
}}