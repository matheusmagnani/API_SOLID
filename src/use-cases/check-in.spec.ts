import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { InMemoryGymsRepository } from "src/repositories/in-memory/in-memory-gyms-repository"
import { InMemoryCheckInsRepository } from "src/repositories/in-memory/in-memory-check-ins-repository"
import { CheckInUseCase } from "./check-in"
import { Decimal } from "@prisma/client/runtime/library"
import { MaxDistanceErrorError } from "./errors/max-distance-error"
import { MaxNumberOfCheckInsErrorError } from "./errors/max-number-of-check-ins-error"


let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {

  beforeEach(async () => {
     checkInsRepository = new InMemoryCheckInsRepository()
     gymsRepository = new InMemoryGymsRepository()
     sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: "gym-01",
      title: "Contorno do Corpo",
      description: "",
      phone: "",
      latitude: -19.9249823,
      longitude: -43.9534571
    })
    

     vi.useFakeTimers()
      
  })

  afterEach(() => {
      vi.useRealTimers()
  })

  it('should be able to check in', async () => {

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.9249823,
      userLongitude: -43.9534571
    })

    expect(checkIn.id).toEqual(expect.any(String))

  })


  it('should not be able to check in twice in the same day', async () => {

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

   await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.9249823,
      userLongitude: -43.9534571
    })

   await expect(() => sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.9249823,
      userLongitude: -43.9534571
   })).rejects.toBeInstanceOf(MaxNumberOfCheckInsErrorError)

  }),

  it('should be able to check in twice but in different days', async () => {

    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

   await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.9249823,
      userLongitude: -43.9534571
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

   const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -19.9249823,
      userLongitude: -43.9534571

   })

   expect(checkIn.id).toEqual(expect.any(String))

  })

  it('should not be able to check in on distant gym', async () => {

    gymsRepository.items.push({
      id: "gym-02",
      title: "Contorno do Corpo",
      description: "",
      phone: "",
      latitude: new Decimal(-19.9249823),
      longitude: new Decimal(-43.9534571)
    })


    await expect(() => sut.execute({
      gymId: 'gym-02',
      userId: 'user-01',
      userLatitude: -19.9239123,
      userLongitude: -44.0019156
    })).rejects.toBeInstanceOf(MaxDistanceErrorError)

  })

  
})