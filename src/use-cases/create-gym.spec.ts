import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryGymsRepository } from "src/repositories/in-memory/in-memory-gyms-repository"
import { CreateGymUseCase } from "./create-gym"


let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase
describe('Register Use Case', () => {

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to register', async () => {

    const { gym } = await sut.execute({
      title: 'Contorno do Corpo',
      description: null,
      phone: null,
      latitude: -19.9239123,
      longitude: -44.0019156
    })

    expect(gym.id).toEqual(expect.any(String))

  })

})

