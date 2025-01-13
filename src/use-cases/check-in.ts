import { CheckInsRepository } from "src/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";
import { GymsRepository } from "src/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCordinates } from "src/utils/get-distance-between-coordinates";
import { MaxDistanceErrorError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsErrorError } from "./errors/max-number-of-check-ins-error";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude
    }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

      const gym = await this.gymsRepository.findById(gymId)

      if(!gym) {
        throw new ResourceNotFoundError
      }

      const distance = getDistanceBetweenCordinates(
        {latitude: userLatitude, longitude: userLongitude},
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber()
        }
      )
      
      const MAX_DISTANCE_IN_KILOMETERS = 0.1

      if ( distance > MAX_DISTANCE_IN_KILOMETERS ){
          throw new MaxDistanceErrorError()
      }

      const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
        userId,
        new Date()
      )

      if(checkInOnSameDate){
        throw new MaxNumberOfCheckInsErrorError()
      }

      const checkIn = await this.checkInsRepository.create({
        user_id: userId,
        gym_id: gymId
        
      })

     return {
      checkIn
  }
}}