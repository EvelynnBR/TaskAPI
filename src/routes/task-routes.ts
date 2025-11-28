import { Router } from "express"
import { TaskController } from "@/controllers/task-controller"
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated"

export const taskRoutes = Router()
const taskController = new TaskController()

taskRoutes.post("/", taskController.create)
taskRoutes.get("/", ensureAuthenticated, taskController.index)
