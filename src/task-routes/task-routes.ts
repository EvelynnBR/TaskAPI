import { Router } from "express"
import { TaskController } from "@/task-controllers/task-controller"

export const taskRoutes = Router()
const taskController = new TaskController()

taskRoutes.post("/", taskController.create)
