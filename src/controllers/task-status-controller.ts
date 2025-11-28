import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"
import { AppError } from "@/utils/appError"

export class TaskStatusController {
  async update(request: Request, response: Response) {
    const { id } = request.params
    const userId = request.user?.id

    const statusSchema = z.object({
      status: z.enum(["pending", "inProgress", "completed"])
    })
    const { status } = statusSchema.parse(request.body)

    console.log("ID DO PARAMS:", id)
    console.log("ID DO USER TOKEN:", userId)

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    })
    if (!task) {
      throw new AppError("Task não encontrada", 404)
    }

    const updated = await prisma.task.update({
      where: { id },
      data: {
        status
      }
    })
    return response.json(updated)
  }
}
