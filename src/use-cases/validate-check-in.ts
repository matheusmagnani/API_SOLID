import { CheckInsRepository } from "src/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { compareAsc, differenceInMinutes } from "date-fns";
import { LateCkeckInValidationError } from "./errors/late-check-in-validation-error";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) {}

  async execute({
    checkInId
    }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {

      const checkIn = await this.checkInsRepository.findById(checkInId)

      if(!checkIn) {
        throw new ResourceNotFoundError()
      }

      const distanceInMinutesFromCheckInCreation = differenceInMinutes(new Date(), checkIn.created_at)

      if(distanceInMinutesFromCheckInCreation > 20){
        throw new LateCkeckInValidationError()
      }

      checkIn.validated_at = new Date()

      await this.checkInsRepository.save(checkIn)

     return {
      checkIn
  }
}}