import { beforeEach, describe, expect, it } from "vitest"
import { AuthenticateUseCase } from "./authenticate"
import { inMemoryUsersRepository } from "src/repositories/in-memory/in-memory-users-repository"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"


let usersRepository: inMemoryUsersRepository
let sut: AuthenticateUseCase
describe('Authenticate Use Case', () => {

  beforeEach(() => {
     usersRepository = new inMemoryUsersRepository
     sut = new AuthenticateUseCase(usersRepository)
      
  })

  it('should be able to authenticate', async () => {

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))

  }),

  it('should be able to authenticate with wrong email', async () => {
    expect(() => sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
      

  }),

  it('should be able to authenticate with wrong password', async () => {
    
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    expect(() => sut.execute({
      email: 'johndoe@example.com',
      password: '123123',
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
      

  })
})