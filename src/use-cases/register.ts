import { hash } from "bcryptjs"
import { prisma } from "src/lib/prisma"

interface RegisterUseCaseRequest{
  name: string
  email: string
  password: string
}
export async function registerUseCase({
  name,
  email,
  password
}: RegisterUseCaseRequest){
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
     where: {
      email,
     }
  })

  if(userWithSameEmail){
    throw new Error("User with same email already")
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash
    }
  })
}