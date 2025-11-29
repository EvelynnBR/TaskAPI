import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/appError"

export class TaskController {
  async create(request: Request, response: Response) {
    const userId = request.user?.id
    if (! userId) {
      throw new AppError("User ID not found from token", 401)
    }

    const task = z.object({
      title: z.string().trim().min(5),
      description: z.string().trim().min(5),
    })

    const { title, description } = task.parse(request.body)

    const createdTask = await prisma.task.create({
      data: {
        userId,
        title,
        description,
      },
    })

    return response.status(201).json({ createdTask })
  }

  async index(request: Request, response: Response) {
    const lisTask = await prisma.task.findMany({
      where: {
        userId: request.user?.id,
      },
      select: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        title: true,
        description: true,
        status: true,
      },
    })
    return response.json(lisTask)
  }
}
