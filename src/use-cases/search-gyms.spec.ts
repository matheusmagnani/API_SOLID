import { beforeEach, describe, expect, it } from "vitest"
import { SearchGymsUseCase } from "./search-gyms"
import { InMemoryGymsRepository } from "src/repositories/in-memory/in-memory-gyms-repository"


let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {

  beforeEach(async () => {
     gymsRepository = new InMemoryGymsRepository()
     sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {

    await gymsRepository.create({
      title: "Contorno do Corpo",
      description: null,
      phone: null,
      latitude: -19.9249823,
      longitude: -43.9534571
    })

    await gymsRepository.create({
      title: "Pratique Fitness",
      description: null,
      phone: null,
      latitude: -19.9249823,
      longitude: -43.9534571
    })

    const { gyms } = await sut.execute({
      query: "Contorno do Corpo",
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Contorno do Corpo"})
    ])

  }),

  it('should be able to fetch paginated gyms search', async () => {

    for(let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Pratique Fitness ${i}`,
        description: null,
        phone: null,
        latitude: -19.9249823,
        longitude: -43.9534571
      })

    }

    const { gyms } = await sut.execute({
      query: 'Pratique Fitness',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Pratique Fitness 21'}),
      expect.objectContaining({ title: 'Pratique Fitness 22'})

    ])

  })


  
})