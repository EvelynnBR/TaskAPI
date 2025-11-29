import { Request, Response } from "express"
import { AppError } from "@/utils/appError"
import { prisma } from "@/database/prisma"
import { z } from "zod"

export class TaskUpdateController {
  async update(request: Request, response: Response) {
    const { id } = request.params
    const userId = request.user?.id

    const bodySchema = z.object({
      title: z.string().trim().min(5),
      description: z.string().trim().min(5),
    })

    const { title, description } = bodySchema.parse(request.body)

    const taskValidation = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!taskValidation) {
      throw new AppError("Task não encontrada", 404)
    }

    const taskUpdate = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
      },
    })

    return response.json({ taskUpdate })
  }
}
