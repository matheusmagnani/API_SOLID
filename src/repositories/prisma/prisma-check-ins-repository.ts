import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { prisma } from "src/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

export class PrismaCheckInsrepository implements CheckInsRepository{
  async create(data: Prisma.CheckInUncheckedCreateInput){
      const checkIn = await prisma.checkIn.create({
       data
      })
  
      return checkIn
  }
  async save(data: CheckIn){
    const checkIn = await prisma.checkIn.update({
      where : {
        id: data.id,
      },
      data
     })
 
     return checkIn
  }
  async countByUserId(userId: string){
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      }
     })
 
     return count
  }
  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20
     })
 
     return checkIns
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = startOfDay(date)
    const endOfTheDay = endOfDay(date)

    const checkin = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay,
          lte: endOfTheDay
        }
      }
    })

    return checkin
    
  }
  async findById(id: string){
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    })

    return checkIn
  }

}