import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/appError"

export class TaskDeleteController {
  async delete(request: Request, response: Response) {
    const { id } = request.params
    const userId = request.user?.id

    const taskValidation = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    })

    if (!taskValidation) {
      throw new AppError("Task não encontrada", 404)
    }

    await prisma.task.deleteMany({
      where: {
        id,
      },
    })
    return response.json({ message: "Deleted" })
  }
}
