import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGymsRepository } from "src/repositories/in-memory/in-memory-gyms-repository"
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms"


let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {

  beforeEach(async () => {
     gymsRepository = new InMemoryGymsRepository()
     sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {

    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -19.9249823,
      longitude: -43.9534571
    })

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -19.6287341,
      longitude: -43.9107139
    })

    const { gyms } = await sut.execute({
      
      userLatitude: -19.9249823,
      userLongitude: -43.9534571
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Near Gym"})
    ])

  })

  
})