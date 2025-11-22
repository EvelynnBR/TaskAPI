import { Router } from "express"
import { taskRoutes } from "@/routes/task-routes"
import { userRoutes } from "@/routes/user-routes"

export const routes = Router()

routes.use("/tasks", taskRoutes)
routes.use("/user", userRoutes)
