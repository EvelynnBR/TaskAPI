import { Router } from "express"
import { taskRoutes } from "@/task-routes/task-routes"

export const routes = Router()

routes.use("/tasks", taskRoutes)

