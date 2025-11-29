import { Router } from "express"
import { TaskController } from "@/controllers/task-controller"
import { TaskStatusController } from "@/controllers/task-status-controller"
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated"
import { TaskUpdateController } from "@/controllers/task-update-controller"

export const taskRoutes = Router()
const taskController = new TaskController()
const taskStatusController = new TaskStatusController()
const taskUpdateController = new TaskUpdateController()

taskRoutes.post("/", taskController.create)
taskRoutes.get("/", ensureAuthenticated, taskController.index)
taskRoutes.patch("/:id", ensureAuthenticated, taskStatusController.update)
taskRoutes.put("/:id", ensureAuthenticated, taskUpdateController.update)
