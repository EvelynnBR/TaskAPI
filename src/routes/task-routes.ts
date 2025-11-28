import { Router } from "express"
import { TaskController } from "@/controllers/task-controller"
import { TaskStatusController } from "@/controllers/task-status-controller"
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated"

export const taskRoutes = Router()
const taskController = new TaskController()
const taskStatusController = new TaskStatusController()

taskRoutes.post("/", taskController.create)
taskRoutes.get("/", ensureAuthenticated, taskController.index)
taskRoutes.patch("/:id", ensureAuthenticated, taskStatusController.update)
