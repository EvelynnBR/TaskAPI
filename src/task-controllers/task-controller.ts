import { Request, Response, NextFunction } from "express"
import { z } from "zod"

export class TaskController {
  create(req: Request, res: Response, next: NextFunction) {
    try {
      const task = z.object({
        title: z.string().trim().min(5),
        description: z.string().trim().min(5),
        status: z.string().trim().min(1)
      })

      const { title, description, status } = task.parse(req.body)
      
      return res.status(201).json({ title, description, status })
    } catch (error) {
      next(error)
    }
  }
}
